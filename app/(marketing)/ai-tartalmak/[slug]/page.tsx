import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleBackground from "@/components/ui/ArticleBackground";

import {
  type Article,
  allArticles,
  getArticleBySlug,
} from "@/lib/article-loader";
import { ShareButtons } from "@/components/ui/share-buttons";
import { ArrowLeft, Clock } from "lucide-react";

type AiTartalomPageProps = {
  params: Promise<{ slug: string }>;
};

function calculateReadingTime(content: Article["content"]): string {
  const text = content
    .map((s) => {
      if (s.type === "image" || s.type === "sources") return "";
      return s.text || (s.items?.join(" ") ?? "");
    })
    .join(" ");
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `~ ${minutes} perc olvasás`;
}

export async function generateStaticParams() {
  return allArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) {
    return {
      title: "Cikk nem található | ZynAI",
    };
  }

  const articleUrl = `https://zynai.hu/ai-tartalmak/${article.slug}`;
  const ogImage = article.coverImage?.startsWith("http")
    ? article.coverImage
    : `https://zynai.hu${article.coverImage}`;

  return {
    title: `${article.title} | ZynAI`,
    description: article.excerpt,
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: articleUrl,
      siteName: "ZynAI",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: article.title,
          type: "image/webp",
        },
      ],
      locale: "hu_HU",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [ogImage],
    },
  };
}

export default async function AiTartalomArticlePage({ params }: AiTartalomPageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = allArticles
    .filter(
      (a) =>
        a.slug !== slug && a.slug !== "aedificium-design-esettanulmany",
    )
    .slice(0, 3);
  const readingTime = calculateReadingTime(article.content);

  return (
    <div className="relative z-[1] min-h-screen bg-[var(--bg-base)]">
      <ArticleBackground />
      <div
        aria-hidden
        style={{
          position: "fixed",
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(189,255,0,0.12) 20%, rgba(189,255,0,0.22) 50%, rgba(189,255,0,0.12) 80%, transparent 100%)",
          bottom: 0,
          height: "100vh",
          left: 0,
          pointerEvents: "none",
          top: 0,
          width: 3,
          zIndex: 20,
        }}
      />
      <div
        aria-hidden
        style={{
          position: "fixed",
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(120,60,200,0.18) 20%, rgba(120,60,200,0.3) 50%, rgba(120,60,200,0.18) 80%, transparent 100%)",
          height: "100vh",
          pointerEvents: "none",
          right: 0,
          top: 0,
          width: 3,
          zIndex: 20,
        }}
      />
      <section className="border-b border-[rgba(255,255,255,0.06)] pb-16 pt-32">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <Link
            className="mb-10 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--text-tertiary)] transition-colors duration-200 hover:text-[var(--text-primary)]"
            href="/ai-tartalmak"
          >
            <ArrowLeft aria-hidden size={14} />
            Vissza a cikkekhez
          </Link>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px] lg:gap-20">
            <div>
              <span className="mb-6 inline-block rounded-full border border-[rgba(189,255,0,0.2)] bg-[rgba(189,255,0,0.08)] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-[#BDFF00]">
                {article.tag}
              </span>

              <h1
                className="mb-6 mt-0 font-display font-medium text-[var(--text-primary)]"
                style={{
                  fontSize: "clamp(28px, 4vw, 52px)",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.1,
                }}
              >
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-5">
                <span className="font-mono text-[12px] text-[var(--text-tertiary)]">
                  {article.date}
                </span>
                <span className="text-[var(--text-tertiary)]">·</span>
                <div className="flex items-center gap-1.5">
                  <Clock
                    aria-hidden
                    className="text-[var(--text-tertiary)]"
                    size={12}
                  />
                  <span className="font-mono text-[12px] text-[var(--text-tertiary)]">
                    {readingTime}
                  </span>
                </div>
              </div>
            </div>

            <div className="self-start lg:pt-2">
              {article.coverImage ? (
                <div className="relative h-[240px] w-full overflow-hidden rounded-2xl">
                  <Image
                    alt=""
                    className="object-cover"
                    fill
                    priority
                    sizes="380px"
                    src={article.coverImage}
                    quality={80}
                  />
                </div>
              ) : (
                <p
                  className="text-[var(--text-secondary)]"
                  style={{
                    borderLeft: "2px solid rgba(189,255,0,0.3)",
                    fontSize: "18px",
                    fontStyle: "italic",
                    lineHeight: 1.7,
                    paddingLeft: "20px",
                  }}
                >
                  {article.excerpt}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[860px] px-6 py-16 lg:px-0">
        <article>
          {article.content.map((section, sectionIndex) =>
            renderArticleSection(section, sectionIndex),
          )}
        </article>
<<<<<<< HEAD
=======

>>>>>>> main
        <ShareButtons slug={article.slug} title={article.title} />
      </div>

      <section className="mx-auto max-w-[1280px] border-t border-[rgba(255,255,255,0.06)] px-6 pb-24 pt-12 lg:px-12">
        <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
          TOVÁBBI CIKKEK
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {relatedArticles.map((a) => (
            <Link
              key={a.slug}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] transition-all duration-300 hover:border-[rgba(255,255,255,0.12)]"
              href={`/ai-tartalmak/${a.slug}`}
            >
              <div className="relative h-[160px] overflow-hidden">
                {a.coverImage ? (
                  <Image
                    alt={a.title}
                    className="transition-transform duration-500 group-hover:scale-[1.04]"
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    src={a.coverImage}
                    quality={75}
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-[rgba(255,255,255,0.03)]">
                    <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[rgba(255,255,255,0.2)]">
                      Kiemelt kép
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col p-5">
                <span className="mb-3 font-mono text-[10px] uppercase tracking-[0.1em] text-[#BDFF00] opacity-80">
                  {a.tag}
                </span>
                <h3 className="mb-3 font-display text-[15px] font-medium leading-snug text-[var(--text-primary)] transition-colors group-hover:text-white">
                  {a.title}
                </h3>
                <div className="mt-auto flex items-center font-mono text-[11px] text-[var(--text-tertiary)]">
                  <Clock aria-hidden className="mr-1 shrink-0" size={11} />
                  <span>{calculateReadingTime(a.content)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function renderArticleSection(section: Article["content"][number], index: number) {
  switch (section.type) {
    case "lead":
      return (
        <p
          className="mb-10 font-normal text-[var(--text-primary)] opacity-90"
          key={index}
          style={{
            fontSize: "19px",
            fontWeight: 400,
            lineHeight: 1.8,
          }}
        >
          {section.text}
        </p>
      );

    case "h2":
      return (
        <h2
          className="font-display mb-5 mt-14 text-[var(--text-primary)]"
          key={index}
          style={{
            fontSize: "clamp(20px, 2vw, 26px)",
            lineHeight: 1.2,
          }}
        >
          {section.text}
          <span style={{ color: "#BDFF00" }}>.</span>
        </h2>
      );

    case "h3":
      return (
        <h3
          className="font-display mb-3 mt-8 text-[20px] text-[var(--text-primary)]"
          key={index}
        >
          {section.text}
        </h3>
      );

    case "paragraph":
      return (
        <p
          className="mb-6 text-[16px] text-[var(--text-secondary)]"
          key={index}
          style={{ lineHeight: 1.85 }}
        >
          {section.text}
        </p>
      );

    case "quote":
      return (
        <blockquote
          className="my-10 italic text-[var(--text-primary)]"
          key={index}
          style={{
            background: "rgba(189,255,0,0.04)",
            borderLeft: "3px solid #BDFF00",
            borderRadius: "0 12px 12px 0",
            fontSize: "18px",
            lineHeight: 1.7,
            paddingBottom: "24px",
            paddingLeft: "24px",
            paddingRight: "24px",
            paddingTop: "24px",
          }}
        >
          {section.text}
        </blockquote>
      );

    case "list":
      return (
        <ul className="mb-8 ml-0 space-y-3" key={index}>
          {(section.items ?? []).map((item, itemIndex) => (
            <li className="flex items-start gap-3" key={itemIndex}>
              <span
                aria-hidden
                className="mt-[10px] size-[5px] flex-shrink-0 rounded-sm bg-[#BDFF00]"
              />
              <span
                className="text-[var(--text-secondary)]"
                style={{
                  fontSize: "15px",
                  lineHeight: 1.75,
                }}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      );

    case "divider":
      return (
        <div key={index} style={{ margin: "56px 0", display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, rgba(189,255,0,0.3), rgba(189,255,0,0.5))" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ width: "5px", height: "5px", background: "#BDFF00", borderRadius: "1px", boxShadow: "0 0 12px rgba(189,255,0,0.5)" }} />
            {section.label && (
              <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "10px", letterSpacing: "0.18em", color: "#BDFF00", textTransform: "uppercase", fontWeight: 500 }}>
                {section.label}
              </span>
            )}
            <span style={{ width: "5px", height: "5px", background: "#BDFF00", borderRadius: "1px", boxShadow: "0 0 12px rgba(189,255,0,0.5)" }} />
          </div>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, rgba(189,255,0,0.3), rgba(189,255,0,0.5))" }} />
        </div>
      );

    case "summary":
      return (
        <div key={index} style={{ margin: "48px 0", padding: "32px 28px", background: "linear-gradient(135deg, rgba(189,255,0,0.04) 0%, rgba(189,255,0,0.01) 100%)", border: "1px solid rgba(189,255,0,0.15)", borderRadius: "16px", position: "relative" }}>
          {section.label && (
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.15em", color: "#BDFF00", textTransform: "uppercase", marginBottom: "20px", fontWeight: 500 }}>
              {section.label}
            </div>
          )}
          <ul style={{ display: "flex", flexDirection: "column", gap: "14px", margin: 0, padding: 0, listStyle: "none" }}>
            {section.items.map((item, i) => (
              <li key={i} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#BDFF00", fontWeight: 600, paddingTop: "4px", minWidth: "20px" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ fontSize: "15.5px", lineHeight: 1.7, color: "var(--text-primary)" }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      );

    case "conclusion":
      return (
        <div key={index} style={{ margin: "56px 0 32px 0", padding: "36px 32px", background: "linear-gradient(135deg, rgba(120,60,200,0.06) 0%, rgba(120,60,200,0.02) 100%)", border: "1px solid rgba(120,60,200,0.18)", borderRadius: "16px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "180px", height: "180px", background: "radial-gradient(circle, rgba(120,60,200,0.18), transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "relative" }}>
            {section.label && (
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.15em", color: "rgba(180,120,255,0.9)", textTransform: "uppercase", marginBottom: "16px", fontWeight: 500 }}>
                {section.label}
              </div>
            )}
            <div style={{ fontSize: "18px", lineHeight: 1.65, color: "var(--text-primary)", fontWeight: 400 }}>
              {section.text}
            </div>
          </div>
        </div>
      );

    case "image":
      return (
        <div key={index} className="my-10 overflow-hidden rounded-2xl">
          <Image
            alt={section.alt ?? ""}
            className="w-full object-cover"
            height={480}
            src={section.src}
            width={860}
          />
          {section.caption && (
            <p className="mt-2 text-center font-mono text-[11px] text-[var(--text-tertiary)]">
              {section.caption}
            </p>
          )}
        </div>
      );

    case "sources":
      return (
        <div key={index} className="mt-12 border-t border-[rgba(255,255,255,0.06)] pt-8">
          {section.label && (
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
              {section.label}
            </p>
          )}
          <ul className="space-y-2">
            {section.items.map((item, i) => (
              <li key={i}>
                <a
                  className="font-mono text-[12px] text-[var(--text-tertiary)] transition-colors hover:text-[#BDFF00]"
                  href={item.url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {item.title} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      );

    default:
      return null;
  }
}

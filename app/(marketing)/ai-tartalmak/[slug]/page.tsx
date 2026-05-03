import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  type Article,
  allArticles,
  getArticleBySlug,
} from "@/lib/articles";
import { ArrowLeft, ArrowRight } from "lucide-react";

type AiTartalomPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return allArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: AiTartalomPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {};
  }

  return {
    description: article.excerpt,
    title: `${article.title} — ZynAI`,
  };
}

export default async function AiTartalomArticlePage({ params }: AiTartalomPageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-[1280px] px-6 pb-24 pt-32 lg:px-12">
      <a
        className="mb-12 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--text-tertiary)] transition-colors duration-200 hover:text-[var(--text-primary)]"
        href="/ai-tartalmak"
      >
        <ArrowLeft aria-hidden size={14} />
        Vissza a cikkekhez
      </a>

      <header className="mx-auto mb-12 max-w-3xl text-center">
        <span className="inline-block rounded-full border border-[rgba(189,255,0,0.2)] bg-[rgba(189,255,0,0.08)] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-[#BDFF00]">
          {article.tag}
        </span>

        <h1
          className="mt-6 font-display font-medium text-[var(--text-primary)]"
          style={{
            fontSize: "clamp(28px, 4vw, 52px)",
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
          }}
        >
          {article.title}
        </h1>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
          <span className="font-mono text-[12px] text-[var(--text-tertiary)]">
            {article.date}
          </span>
          <span className="text-[var(--text-tertiary)]">·</span>
          <span className="font-mono text-[12px] text-[var(--text-tertiary)]">
            {article.readingTime}
          </span>
        </div>
      </header>

      <div className="mx-auto mb-12 max-w-4xl overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.04)]">
        {article.coverImage ? (
          <div className="h-[400px] w-full">
            <img
              alt=""
              className="h-full w-full object-cover"
              src={article.coverImage}
            />
          </div>
        ) : (
          <div className="flex h-[400px] w-full items-center justify-center">
            <span className="font-mono text-[12px] text-[rgba(255,255,255,0.2)]">
              Kiemelt kép
            </span>
          </div>
        )}
      </div>

      <article className="mx-auto max-w-2xl">
        {article.content.map((section, sectionIndex) =>
          renderArticleSection(section, sectionIndex),
        )}
      </article>

      <footer className="mx-auto mt-16 max-w-2xl border-t border-[rgba(255,255,255,0.06)] pt-8">
        <div className="flex items-center justify-between">
          <p className="text-[14px] text-[var(--text-secondary)]">
            Hasznos volt?
          </p>
          <a
            className="inline-flex items-center gap-2 rounded-full bg-[#BDFF00] px-5 py-2.5 text-[13px] font-medium text-[#09090B]"
            href="/kapcsolatfelvetel"
          >
            Beszéljünk erről
            <ArrowRight aria-hidden size={14} />
          </a>
        </div>
      </footer>
    </div>
  );
}

function renderArticleSection(section: Article["content"][number], index: number) {
  switch (section.type) {
    case "lead":
      return (
        <p
          className="mb-8 font-normal text-[var(--text-primary)]"
          key={index}
          style={{
            fontSize: "20px",
            lineHeight: 1.7,
            opacity: 0.9,
          }}
        >
          {section.text}
        </p>
      );

    case "h2":
      return (
        <h2
          className="font-display mb-4 mt-12 text-[var(--text-primary)]"
          key={index}
          style={{
            fontSize: "clamp(22px, 2.5vw, 30px)",
            lineHeight: 1.2,
          }}
        >
          {section.text}
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
          className="mb-6 text-[16px] leading-[1.75] text-[var(--text-secondary)]"
          key={index}
        >
          {section.text}
        </p>
      );

    case "quote":
      return (
        <blockquote
          className="my-8 border-l-2 border-[#BDFF00] pl-6 italic leading-[1.65] text-[var(--text-primary)]"
          key={index}
          style={{ fontSize: "18px" }}
        >
          {section.text}
        </blockquote>
      );

    case "list":
      return (
        <ul className="mb-6 ml-4 space-y-2" key={index}>
          {(section.items ?? []).map((item, itemIndex) => (
            <li className="flex items-start gap-3" key={itemIndex}>
              <span className="mt-2 size-[6px] flex-shrink-0 rounded-full bg-[#BDFF00]" aria-hidden />
              <span className="text-[15px] leading-[1.65] text-[var(--text-secondary)]">
                {item}
              </span>
            </li>
          ))}
        </ul>
      );

    default:
      return null;
  }
}

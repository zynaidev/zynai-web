"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import { notFound } from "next/navigation";

import { SectionLabel } from "@/components/ui/section-label";
import { getArticleBySlug } from "@/lib/articles";
import { ArrowLeft, ArrowRight } from "lucide-react";

const STATS = [
  { label: "social media elérés növekedés", suffix: "×", value: 10 },
  { label: "weboldal fejlesztési idő", suffix: " hét", value: 2 },
  { label: "napi posztjavaslat lefedettség", suffix: "%", value: 100 },
] as const;

function StatStrip() {
  return (
    <section className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
      {STATS.map((stat) => (
        <AnimatedStatCard
          key={stat.label}
          label={stat.label}
          suffix={stat.suffix}
          value={stat.value}
        />
      ))}
    </section>
  );
}

function AnimatedStatCard({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    margin: "-100px",
    once: true,
  });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1800;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] px-8 py-8 text-center"
    >
      <p
        className="font-display font-medium text-[#BDFF00]"
        style={{ fontSize: "48px" }}
      >
        {count}
        {suffix}
      </p>
      <p className="mt-2 font-mono text-[12px] uppercase tracking-wider text-[var(--text-tertiary)]">
        {label}
      </p>
    </div>
  );
}

export default function AedificiumCaseStudyPage() {
  const article = getArticleBySlug("aedificium-design-esettanulmany");

  if (!article) {
    notFound();
  }

  const body = article.content.slice(1);

  const kihivasTitle = body[0];
  const kihivasP = [body[1], body[2]];
  const socialTitle = body[3];
  const socialP = [body[4], body[5]];
  const webTitle = body[6];
  const webP = body[7];
  const resultsList = body[9];
  const quoteBlock = body[10];
  const nextTitle = body[11];
  const nextList = body[12];

  if (
    kihivasTitle?.type !== "h2" ||
    kihivasP[0]?.type !== "paragraph" ||
    kihivasP[1]?.type !== "paragraph" ||
    socialTitle?.type !== "h2" ||
    socialP[0]?.type !== "paragraph" ||
    socialP[1]?.type !== "paragraph" ||
    webTitle?.type !== "h2" ||
    webP?.type !== "paragraph" ||
    resultsList?.type !== "list" ||
    quoteBlock?.type !== "quote" ||
    nextTitle?.type !== "h2" ||
    nextList?.type !== "list"
  ) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-[1280px] px-6 pb-24 pt-32 lg:px-12">
      <a
        className="mb-16 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--text-tertiary)] transition-colors duration-200 hover:text-[var(--text-primary)]"
        href="/esettanulmanyok"
      >
        <ArrowLeft aria-hidden size={14} />
        Vissza az esettanulmányokhoz
      </a>

      <header className="mb-16 max-w-3xl">
        <SectionLabel number="ESETTANULMÁNY" text="2025" />

        <div
          className="mb-6 mt-6 h-[2px] w-12 bg-[#BDFF00]"
          style={{ boxShadow: "0 0 8px rgba(189,255,0,0.6)" }}
          aria-hidden
        />

        <h1
          className="font-display font-medium text-[var(--text-primary)]"
          style={{
            fontSize: "clamp(28px, 4vw, 52px)",
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
          }}
        >
          Hogyan hozta el a ZynAI az Aedificium Design digitális fordulatát
        </h1>

        <p className="mt-6 text-[18px] leading-[1.65] text-[var(--text-secondary)]">
          AI-vezérelt social media automatizáció és prémium weboldal-fejlesztés
          — mérhető eredményekkel, töredék idő alatt.
        </p>

        <div
          className="mt-10 mb-16 grid grid-cols-1 overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.03)] sm:grid-cols-3 sm:gap-0"
        >
          <div className="border-b border-[rgba(255,255,255,0.07)] px-6 py-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
              Ügyfél
            </p>
            <p className="text-[14px] font-medium text-[var(--text-primary)]">
              Aedificium Design, Budapest
            </p>
          </div>
          <div className="border-b border-[rgba(255,255,255,0.07)] px-6 py-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
              Weboldal
            </p>
            <p className="text-[14px] font-medium">
              <a
                className="text-[var(--text-primary)] transition-colors duration-200 hover:text-[#BDFF00]"
                href="https://aedificium.design"
                rel="noopener noreferrer"
                target="_blank"
              >
                aedificium.design
              </a>
            </p>
          </div>
          <div className="border-b border-[rgba(255,255,255,0.07)] px-6 py-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
              Időszak
            </p>
            <p className="text-[14px] font-medium text-[var(--text-primary)]">
              2025
            </p>
          </div>
        </div>
      </header>

      <StatStrip />

      <section className="mx-[-16px] mb-20 max-w-5xl sm:mx-auto">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--text-tertiary)]">
          Az Aedificium Design weboldala
        </p>
        <div
          className="overflow-hidden rounded-none border border-[rgba(255,255,255,0.08)] sm:rounded-2xl"
          style={{
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.07), 0 40px 80px rgba(0,0,0,0.7), 0 0 80px rgba(189,255,0,0.05)",
          }}
        >
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{
              background:
                "linear-gradient(to right, rgba(255,255,255,0.04), rgba(255,255,255,0.06))",
            }}
          >
            <span
              aria-hidden
              className="size-2 shrink-0 rounded-full bg-[rgba(255,255,255,0.15)]"
            />
            <span
              aria-hidden
              className="size-2 shrink-0 rounded-full bg-[rgba(255,255,255,0.15)]"
            />
            <span
              aria-hidden
              className="size-2 shrink-0 rounded-full bg-[rgba(255,255,255,0.15)]"
            />
            <div className="ml-4 hidden flex-1 rounded-md bg-[rgba(255,255,255,0.06)] px-3 py-1 font-mono text-[11px] text-[var(--text-tertiary)] sm:block">
              aedificium.design
            </div>
          </div>
          <Image
            alt="Aedificium Design weboldal"
            className="w-full h-auto object-cover object-top"
            height={720}
            priority
            src="/esettanulmanyok/aedificium_hero.png"
            width={1280}
          />
        </div>
      </section>

      <div className="mx-auto max-w-2xl">
        <CaseBlock
          paragraphs={[kihivasP[0].text!, kihivasP[1].text!]}
          title={kihivasTitle.text!}
        />

        <CaseBlock
          paragraphs={[socialP[0].text!, socialP[1].text!]}
          title={socialTitle.text!}
        />

        <CaseBlock paragraphs={[webP.text!]} title={webTitle.text!} />

        <EditorialHeading title="Eredmények" />
        <ul className="mb-6 ml-4 space-y-2">
          {resultsList.items!.map((item) => (
            <li className="flex items-start gap-3" key={item}>
              <span
                aria-hidden
                className="mt-2 size-[4px] flex-shrink-0 rounded-[2px] bg-[#BDFF00]"
              />
              <span className="text-[16px] leading-[1.8] text-[var(--text-secondary)]">
                {item}
              </span>
            </li>
          ))}
        </ul>

        <blockquote
          className="-mx-6 my-8 text-[var(--text-primary)] italic"
          style={{
            background: "rgba(189,255,0,0.04)",
            border: "none",
            borderLeft: "3px solid #BDFF00",
            borderRadius: "0 16px 16px 0",
            boxShadow:
              "inset 0 0 0 1px rgba(189,255,0,0.07), 0 0 40px rgba(189,255,0,0.04)",
            fontSize: "17px",
            lineHeight: 1.75,
            padding: "28px 32px",
          }}
        >
          {quoteBlock.text}
          <div className="mt-5 flex items-center gap-3 not-italic">
            <span
              aria-hidden
              className="h-px w-6 shrink-0 bg-[#BDFF00]"
            />
            <p className="font-mono text-[12px] text-[var(--text-tertiary)]">
              Loddo Riccardo · Aedificium Design
            </p>
          </div>
        </blockquote>

        <EditorialHeading title={nextTitle.text!} />
        <ul className="mb-6 ml-4 space-y-2">
          {nextList.items!.map((item) => (
            <li className="flex items-start gap-3" key={item}>
              <span
                aria-hidden
                className="mt-2 size-[4px] flex-shrink-0 rounded-[2px] bg-[#BDFF00]"
              />
              <span className="text-[16px] leading-[1.8] text-[var(--text-secondary)]">
                {item}
              </span>
            </li>
          ))}
        </ul>

        <footer className="relative mx-auto mt-24 max-w-2xl border-t border-[rgba(255,255,255,0.06)] pt-16 text-center">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[-60px] z-0"
            style={{
              background:
                "radial-gradient(ellipse, rgba(189,255,0,0.07) 0%, transparent 70%)",
              filter: "blur(60px)",
              height: "300px",
              transform: "translateX(-50%)",
              width: "500px",
            }}
          />
          <div className="relative z-[1]">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
              Következő lépés
            </p>
            <h2
              className="font-display mx-auto mb-4 max-w-[28ch] text-[var(--text-primary)]"
              style={{
                fontSize: "clamp(28px, 3.5vw, 42px)",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              Hasonló eredményeket szeretnél?
            </h2>
            <p className="mx-auto mb-10 max-w-[40ch] text-[16px] text-[var(--text-secondary)]">
              Nézzük meg, hol hozhat valódi eredményt az AI a te vállalkozásodban.
            </p>

            <div className="flex justify-center">
              <a
                className="relative inline-flex overflow-hidden rounded-full bg-[#BDFF00]"
                href="/kapcsolatfelvetel"
                style={{
                  boxShadow:
                    "0 0 40px rgba(189,255,0,0.3), 0 0 80px rgba(189,255,0,0.1)",
                }}
              >
                <span className="flex flex-1 items-center justify-center px-8 py-4 font-medium text-[15px] text-[#09090B]">
                  Kezdjük el
                </span>
                <span
                  aria-hidden
                  className="pointer-events-none w-px shrink-0 self-stretch bg-[rgba(9,9,11,0.15)]"
                />
                <span className="flex items-center px-5 py-4">
                  <ArrowRight aria-hidden size={16} className="text-[#09090B]" />
                </span>
              </a>
            </div>

            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
              Ingyenes · 30 perc · Nem kötelez el semmire
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

function EditorialHeading({ title }: { title: string }) {
  return (
    <h2
      className="font-display mb-5 mt-14 text-[var(--text-primary)]"
      style={{ fontSize: "clamp(20px, 2vw, 26px)" }}
    >
      {title}
      <span className="text-[#BDFF00]" style={{ marginLeft: 4 }}>
        .
      </span>
    </h2>
  );
}

function CaseBlock({
  title,
  paragraphs,
}: {
  title: string;
  paragraphs: string[];
}) {
  return (
    <>
      <EditorialHeading title={title} />
      {paragraphs.map((text, paragraphIndex) => (
        <p
          className="mb-5 text-[16px] leading-[1.8] text-[var(--text-secondary)]"
          key={`${title}-${paragraphIndex}`}
        >
          {text}
        </p>
      ))}
    </>
  );
}

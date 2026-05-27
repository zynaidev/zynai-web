"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useMemo, useState, useSyncExternalStore } from "react";

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function subscribePrefersReducedMotion(onChange: () => void): () => void {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

import { SectionLabel } from "@/components/ui/section-label";
import { allArticles } from "@/lib/article-loader";

const ARTICLES_PER_PAGE = 9;

const blogArticles = allArticles.filter(
  (a) => a.slug !== "aedificium-design-esettanulmany",
);

const CATEGORIES = ["ÖSSZES", "AI HÍREK", "ÜZLETI ELEMZÉS"] as const;
const MotionLink = motion.create(Link);

export default function BlogArchivePage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] =
    useState<(typeof CATEGORIES)[number]>("ÖSSZES");
  const [page, setPage] = useState(0);

  const filtered = useMemo(
    () =>
      blogArticles.filter((a) => {
        const matchesCategory =
          activeCategory === "ÖSSZES" || a.tag === activeCategory;
        const q = search.toLowerCase();
        const matchesSearch =
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q);
        return matchesCategory && matchesSearch;
      }),
    [search, activeCategory],
  );

  const totalPages = Math.ceil(filtered.length / ARTICLES_PER_PAGE);
  const maxPage = Math.max(0, totalPages - 1);
  const pageIndex = Math.min(page, maxPage);

  const visibleArticles =
    filtered.length === 0
      ? []
      : filtered.slice(
          pageIndex * ARTICLES_PER_PAGE,
          pageIndex * ARTICLES_PER_PAGE + ARTICLES_PER_PAGE,
        );

  const showHero = pageIndex === 0 && filtered.length > 0;
  const heroArticle = visibleArticles[0];
  const gridArticles = showHero
    ? visibleArticles.slice(1)
    : visibleArticles;

  const prefersReduced = useSyncExternalStore(
    subscribePrefersReducedMotion,
    prefersReducedMotion,
    () => false,
  );

  const gridContainerVariants = prefersReduced
    ? { hidden: {}, visible: {} }
    : {
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      };

  const gridCardVariants = prefersReduced
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, ease: "easeOut" as const },
        },
      };

  const heroReduced = prefersReduced
    ? ({
        initial: { opacity: 1, y: 0 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0 },
      } as const)
    : ({
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: "easeOut" as const },
      } as const);

  return (
    <>
      <style>{`
        .group:hover [data-hover-line] {
          transform: scaleX(1) !important;
        }
      `}</style>

      <div className="mx-auto max-w-[1280px] px-6 pb-24 pt-32 lg:px-12">
        <header className="mb-12">
          <SectionLabel number="06" text="AI TARTALMAK" />
          <h1
            className="font-display text-[var(--text-primary)]"
            style={{
              fontSize: "clamp(40px, 5vw, 64px)",
              lineHeight: "1.1",
              letterSpacing: "-0.025em",
            }}
          >
            AI tartalmak.
          </h1>
          <p
            className="mt-4 max-w-[48ch] text-[17px] text-[var(--text-secondary)]"
          >
            Heti összefoglalók, elemzések, eszközök és esettanulmányok —
            <br />
            minden ami egy magyar vállalkozónak kell az AI világban.
          </p>
        </header>

        <div className="mb-10 flex flex-col gap-4">
          <div className="relative max-w-md">
            <Search
              aria-hidden
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]"
              size={16}
            />
            <input
              aria-label="Keresés a cikkek között"
              className="w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] py-3 pl-11 pr-4 text-[14px] text-[var(--text-primary)] outline-none"
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(0);
              }}
              placeholder="Keresés a cikkek között..."
              type="text"
              value={search}
            />
          </div>

          <div className="relative flex flex-wrap gap-2">
            <AnimatePresence initial={false}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat);
                    setPage(0);
                  }}
                  className="relative cursor-pointer rounded-full px-4 py-2 font-mono text-[12px] uppercase tracking-[0.08em] transition-colors duration-150"
                  style={{
                    color:
                      activeCategory === cat
                        ? "#09090B"
                        : "var(--text-secondary)",
                    border:
                      activeCategory === cat
                        ? "1px solid transparent"
                        : "1px solid rgba(255,255,255,0.08)",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {activeCategory === cat && (
                    <motion.div
                      layoutId="active-category-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ background: "#BDFF00" }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <span style={{ position: "relative", zIndex: 1 }}>{cat}</span>
                </button>
              ))}
            </AnimatePresence>
          </div>

          <p className="font-mono text-[11px] text-[var(--text-tertiary)]">
            {filtered.length} cikk
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-[16px] text-[var(--text-secondary)]">
              Nincs találat erre a keresésre.
            </p>
            <button
              type="button"
              className="mt-6 inline-flex items-center justify-center rounded-full border border-[var(--border-hairline)] px-6 py-3 font-mono text-[12px] uppercase tracking-[0.08em] text-[var(--text-secondary)] transition-all duration-200 hover:border-[var(--border-default)] hover:text-[var(--text-primary)]"
              onClick={() => {
                setSearch("");
                setActiveCategory("ÖSSZES");
                setPage(0);
              }}
            >
              Szűrők törlése
            </button>
          </div>
        ) : (
          <>
            {showHero && heroArticle != null ? (
              <MotionLink
                initial={heroReduced.initial}
                animate={heroReduced.animate}
                transition={heroReduced.transition}
                className="group relative mb-8 grid grid-cols-1 gap-0 overflow-hidden rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] transition-all duration-300 hover:border-[var(--border-default)] lg:grid-cols-2"
                href={`/ai-tartalmak/${heroArticle.slug}`}
              >
                <div
                  className="border-b border-[var(--border-hairline)] bg-[rgba(255,255,255,0.04)] lg:border-b-0 lg:border-r"
                  style={{
                    minHeight: "320px",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  {heroArticle.coverImage ? (
                    <Image
                      alt={heroArticle.title}
                      src={heroArticle.coverImage}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover"
                      quality={80}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[rgba(255,255,255,0.2)]">
                        Kiemelt kép
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex min-h-0 flex-col justify-between p-8 lg:p-12">
                  <div>
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center">
                        {heroArticle.isWeekly ? (
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                            <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#BDFF00", background: "rgba(189,255,0,0.08)", border: "1px solid rgba(189,255,0,0.25)", borderRadius: "999px", padding: "3px 10px" }}>
                              AI PULZUS
                            </span>
                            <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em" }}>
                              HETI ÖSSZEFOGLALÓ
                            </span>
                          </div>
                        ) : (
                          <>
                            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--accent)] opacity-80">
                              {heroArticle.tag}
                            </span>
                            <span className="ml-3 inline-block rounded-full border border-[rgba(189,255,0,0.3)] bg-[rgba(189,255,0,0.1)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[#BDFF00]">
                              LEGÚJABB
                            </span>
                          </>
                        )}
                      </div>
                      <span className="font-mono text-[10px] text-[var(--text-tertiary)]">
                        {heroArticle.date}
                      </span>
                    </div>
                    <h2
                      className="font-display mt-4 font-medium text-[var(--text-primary)]"
                      style={{
                        fontSize: "clamp(22px, 2.5vw, 32px)",
                        lineHeight: "1.2",
                      }}
                    >
                      {heroArticle.title}
                    </h2>
                    <p className="mt-4 text-[15px] leading-[1.65] text-[var(--text-secondary)]">
                      {heroArticle.excerpt}
                    </p>
                    <p className="mt-3 font-mono text-[11px] text-[var(--text-tertiary)]">
                      {heroArticle.readingTime}
                    </p>
                  </div>

                  <div className="mt-8 lg:mt-10">
                    <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--text-tertiary)] transition-colors duration-200 group-hover:text-[var(--accent)]">
                      Elolvasom
                      <ArrowRight
                        className="transition-transform duration-200 group-hover:translate-x-1"
                        size={12}
                      />
                    </div>
                  </div>
                </div>

                <div
                  className="pointer-events-none absolute bottom-0 left-0 right-0"
                  data-hover-line
                  style={{
                    height: "2px",
                    background:
                      "linear-gradient(to right, transparent 0%, rgba(189,255,0,0.8) 20%, rgba(189,255,0,1) 50%, rgba(189,255,0,0.8) 80%, transparent 100%)",
                    boxShadow:
                      "0 0 12px rgba(189,255,0,0.6), 0 0 24px rgba(189,255,0,0.3)",
                    transform: "scaleX(0)",
                    transformOrigin: "left center",
                    transition:
                      "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                />
              </MotionLink>
            ) : null}

            <motion.div
              key={`${activeCategory}-${page}-${search}`}
              initial="hidden"
              animate="visible"
              variants={gridContainerVariants}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {gridArticles.map((article) => (
                <MotionLink
                  key={article.slug}
                  variants={gridCardVariants}
                  className="group relative flex min-h-[380px] flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] p-6 transition-all duration-300 hover:border-[var(--border-default)]"
                  href={`/ai-tartalmak/${article.slug}`}
                  style={article.isWeekly ? { borderLeft: "2px solid rgba(189,255,0,0.3)" } : undefined}
                >
                  <div
                    style={{
                      height: "180px",
                      overflow: "hidden",
                      borderRadius: "12px",
                      marginBottom: "16px",
                      position: "relative",
                    }}
                  >
                    {article.coverImage ? (
                      <Image
                        alt={article.title}
                        src={article.coverImage}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                        quality={75}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.04)]">
                        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[rgba(255,255,255,0.2)]">
                          Kiemelt kép
                        </span>
                      </div>
                    )}
                    {article.isWeekly && (
                      <div style={{ position: "absolute", top: "10px", right: "10px", fontFamily: "var(--font-mono, monospace)", fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#BDFF00", background: "rgba(9,9,11,0.85)", border: "1px solid rgba(189,255,0,0.2)", borderRadius: "999px", padding: "3px 8px", backdropFilter: "blur(8px)" }}>
                        AI PULZUS
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--accent)] opacity-80">
                        {article.tag}
                      </span>
                      <span className="font-mono text-[10px] text-[var(--text-tertiary)]">
                        {article.date}
                      </span>
                    </div>
                    <h2 className="font-display mb-3 text-[16px] font-medium leading-[1.35] text-[var(--text-primary)] transition-colors duration-200 group-hover:text-white">
                      {article.title}
                    </h2>
                    <p className="text-[13px] leading-[1.6] text-[var(--text-tertiary)]">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center gap-1.5 pt-3 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--text-tertiary)] transition-colors duration-200 group-hover:text-[var(--accent)]">
                    Elolvasom
                    <ArrowRight
                      className="transition-transform duration-200 group-hover:translate-x-1"
                      size={12}
                    />
                  </div>

                  <div
                    className="pointer-events-none absolute bottom-0 left-0 right-0"
                    data-hover-line
                    style={{
                      height: "2px",
                      background:
                        "linear-gradient(to right, transparent 0%, rgba(189,255,0,0.8) 20%, rgba(189,255,0,1) 50%, rgba(189,255,0,0.8) 80%, transparent 100%)",
                      boxShadow:
                        "0 0 12px rgba(189,255,0,0.6), 0 0 24px rgba(189,255,0,0.3)",
                      transform: "scaleX(0)",
                      transformOrigin: "left center",
                      transition:
                        "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  />
                </MotionLink>
              ))}
            </motion.div>

            <div className="mt-10 flex items-center justify-between">
              <span className="font-mono text-[12px] text-[var(--text-tertiary)]">
                Oldal {pageIndex + 1} / {Math.max(totalPages, 1)}
              </span>
              <div className="flex items-center gap-2">
                <button
                  aria-label="Előző oldal"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-hairline)] text-[var(--text-tertiary)] transition-all duration-200 hover:border-[var(--border-default)] hover:text-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-30"
                  disabled={pageIndex === 0}
                  onClick={() =>
                    setPage((p) => Math.max(0, Math.min(p, maxPage) - 1))
                  }
                  type="button"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  aria-label="Következő oldal"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-hairline)] text-[var(--text-tertiary)] transition-all duration-200 hover:border-[var(--border-default)] hover:text-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-30"
                  disabled={pageIndex >= maxPage}
                  onClick={() =>
                    setPage((p) => Math.min(maxPage, Math.min(p, maxPage) + 1))
                  }
                  type="button"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

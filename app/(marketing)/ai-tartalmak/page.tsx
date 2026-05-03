"use client";

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

const ARTICLES_PER_PAGE = 9;

const CATEGORIES = [
  "ÖSSZES",
  "AI HÍREK",
  "ÜZLETI ELEMZÉS",
  "TRENDEK",
  "LEHETŐSÉGEK",
  "ESZKÖZÖK",
  "ESETTANULMÁNY",
] as const;

const allArticles = [
  {
    id: 1,
    tag: "AI HÍREK",
    date: "2026. április 27.",
    title: "GPT-5 és a kis cégek: mit jelent ez valójában?",
    excerpt:
      "Az OpenAI legújabb modellje megjelent — de mit változtat ez egy 10 fős vállalkozás napi működésén?",
    slug: "gpt-5-kis-cegek",
  },
  {
    id: 2,
    tag: "ÜZLETI ELEMZÉS",
    date: "2026. április 20.",
    title: "Automatizálható-e az ügyfélszolgálat 2026-ban?",
    excerpt:
      "Három magyar KKV tapasztalatai alapján nézzük meg, hol érdemes AI-t bevetni és hol nem.",
    slug: "ugyfelszolgalat-automatizalas-2026",
  },
  {
    id: 3,
    tag: "TRENDEK",
    date: "2026. április 13.",
    title: "Helyi AI modellek: az adatvédelem új korszaka",
    excerpt:
      "A self-hosted megoldások egyre elérhetőbbek. Mi kell hozzá és mikor éri meg?",
    slug: "helyi-ai-modellek-adatvedelem",
  },
  {
    id: 4,
    tag: "LEHETŐSÉGEK",
    date: "2026. április 6.",
    title: "n8n workflow automatizáció kezdőknek",
    excerpt:
      "A legnépszerűbb nyílt forráskódú automatizációs eszköz — hogyan kezdj el vele?",
    slug: "n8n-workflow-automatizacio",
  },
  {
    id: 5,
    tag: "AI HÍREK",
    date: "2026. március 30.",
    title: "Claude 3.7 Sonnet: mire jó az üzleti életben?",
    excerpt: "Az Anthropic legújabb modelljének üzleti alkalmazásai és korlátai.",
    slug: "claude-37-sonnet-uzleti-elet",
  },
  {
    id: 6,
    tag: "ÜZLETI ELEMZÉS",
    date: "2026. március 23.",
    title: "AI asszisztens vs. AI integráció: mi a különbség?",
    excerpt:
      "Sokan összekeverik a két fogalmat. A különbség megértése meghatározza a stratégiát.",
    slug: "ai-asszisztens-vs-integracio",
  },
  {
    id: 7,
    tag: "TRENDEK",
    date: "2026. március 16.",
    title: "Magyar KKV-k az AI versenyben: hol tartunk?",
    excerpt:
      "Felmérés alapján elemezzük, hol állnak a hazai kis- és közepes vállalkozások.",
    slug: "magyar-kkv-ai-verseny",
  },
  {
    id: 8,
    tag: "LEHETŐSÉGEK",
    date: "2026. március 9.",
    title: "Számlázás automatizálása AI-val: esettanulmány",
    excerpt:
      "Egy ügyfélnél 8 óra/hét megtakarítást eredményezett ez a megoldás.",
    slug: "szamlazas-automatizalas-esettanulmany",
  },
  {
    id: 9,
    tag: "AI HÍREK",
    date: "2026. március 2.",
    title: "Gemini 2.0 Flash: ingyenes és mégis erős",
    excerpt:
      "Google legújabb modelljének képességei és korlátai üzleti kontextusban.",
    slug: "gemini-20-flash-uzleti",
  },
  {
    id: 10,
    tag: "ÜZLETI ELEMZÉS",
    date: "2026. február 23.",
    title: "Mikor NEM éri meg AI-t bevezetni?",
    excerpt:
      "Az AI nem minden problémára megoldás. Őszinte elemzés a határokról.",
    slug: "mikor-nem-erti-meg-ai",
  },
  {
    id: 11,
    tag: "ESZKÖZÖK",
    date: "2026. február 16.",
    title: "5 AI eszköz amit minden KKV-nak ismernie kell 2026-ban",
    excerpt:
      "Nem ChatGPT — ezek az eszközök adják a valódi üzleti előnyt.",
    slug: "5-ai-eszkoz-kkv-2026",
  },
  {
    id: 12,
    tag: "ESETTANULMÁNY",
    date: "2026. február 9.",
    title: "Tízszeres elérés AI-val: az Aedificium Design esete",
    excerpt:
      "Hogyan változtatta meg egy kis dizájniroda működését az AI integráció.",
    slug: "aedificium-design-esettanulmany",
  },
  {
    id: 13,
    tag: "ESZKÖZÖK",
    date: "2026. február 2.",
    title: "Make vs n8n: melyiket válaszd automatizáláshoz?",
    excerpt:
      "Két népszerű platform összehasonlítása magyar KKV szemszögből.",
    slug: "make-vs-n8n-automatizalas",
  },
  {
    id: 14,
    tag: "ESETTANULMÁNY",
    date: "2026. január 26.",
    title: "AI alapú ügyfélkommunikáció: 3 hónap tapasztalat",
    excerpt:
      "Valós számok, valós eredmények egy 8 fős szolgáltató cégtől.",
    slug: "ai-ugyfelkommunikacio-3-honap",
  },
] as const;

export default function BlogArchivePage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] =
    useState<(typeof CATEGORIES)[number]>("ÖSSZES");
  const [page, setPage] = useState(0);

  const filtered = useMemo(
    () =>
      allArticles.filter((a) => {
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
              <motion.a
                initial={heroReduced.initial}
                animate={heroReduced.animate}
                transition={heroReduced.transition}
                className="group relative mb-8 grid grid-cols-1 gap-0 overflow-hidden rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] transition-all duration-300 hover:border-[var(--border-default)] lg:grid-cols-2"
                href={`/ai-tartalmak/${heroArticle.slug}`}
              >
                <div
                  className="flex h-[320px] items-center justify-center border-b border-[var(--border-hairline)] bg-[rgba(255,255,255,0.04)] lg:h-auto lg:min-h-full lg:border-b-0 lg:border-r"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[rgba(255,255,255,0.2)]">
                    Kiemelt kép
                  </span>
                </div>

                <div className="flex min-h-0 flex-col justify-between p-8 lg:p-12">
                  <div>
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center">
                        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--accent)] opacity-80">
                          {heroArticle.tag}
                        </span>
                        <span className="ml-3 inline-block rounded-full border border-[rgba(189,255,0,0.3)] bg-[rgba(189,255,0,0.1)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[#BDFF00]">
                          LEGÚJABB
                        </span>
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
                      ~ 4 perc olvasás
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
              </motion.a>
            ) : null}

            <motion.div
              key={`${activeCategory}-${page}-${search}`}
              initial="hidden"
              animate="visible"
              variants={gridContainerVariants}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {gridArticles.map((article) => (
                <motion.a
                  key={article.id}
                  variants={gridCardVariants}
                  className="group relative flex min-h-[380px] flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] p-6 transition-all duration-300 hover:border-[var(--border-default)]"
                  href={`/blog/${article.slug}`}
                >
                  <div className="mb-4 h-[180px] w-full overflow-hidden rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.04)]">
                    <span className="flex h-full items-center justify-center font-mono text-[11px] uppercase tracking-[0.1em] text-[rgba(255,255,255,0.2)]">
                      Kiemelt kép
                    </span>
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
                </motion.a>
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

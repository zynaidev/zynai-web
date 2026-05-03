"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

export function Resources() {
  const ARTICLES_PER_PAGE = 4;
  const [page, setPage] = useState(0);

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
  ];

  const maxPage = Math.floor((allArticles.length - 1) / ARTICLES_PER_PAGE);
  const visibleArticles = allArticles.slice(
    page * ARTICLES_PER_PAGE,
    page * ARTICLES_PER_PAGE + ARTICLES_PER_PAGE
  );

  return (
    <>
      <style>{`
        .group:hover [data-hover-line] {
          transform: scaleX(1) !important;
        }
      `}</style>
      <section className="relative py-20 md:py-32" id="munkak">
      <span aria-hidden="true" className="absolute top-0" id="cikkek" />
      <Container>
        <SectionLabel number="05" text="SZAKMAI ANYAGOK" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-6">
          <div className="lg:col-span-5 lg:sticky lg:top-[100px]">
            <h2
              style={{
                fontSize: "clamp(36px, 4.5vw, 56px)",
                lineHeight: "1.1",
                letterSpacing: "-0.02em",
              }}
            >
              <span className="block text-[var(--text-primary)]">
                Heti összefoglaló.
              </span>
              <span
                className="block"
                style={{ opacity: 0.7, color: "var(--text-primary)" }}
              >
                Magyar KKV szemmel.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-7 flex items-start">
            <p
              style={{ fontSize: "clamp(16px, 1.2vw, 18px)" }}
              className="text-[var(--text-secondary)] leading-[1.65] max-w-[56ch]"
            >
              Minden vasárnap megjelenő elemzés az AI világ legfontosabb híreivel,
              trendjeivel és üzleti lehetőségeivel — kifejezetten magyar kis- és
              középvállalkozóknak, akik nem akarnak lemaradni.
            </p>
          </div>
        </div>

        {/* Articles header row with pagination */}
        <div className="mb-6 mt-12 flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
            LEGUTÓBBI CIKKEK
          </span>
          <div className="flex items-center gap-2">
            <button
              aria-label="Előző cikkek"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-hairline)] text-[var(--text-tertiary)] transition-all duration-200 hover:border-[var(--border-default)] hover:text-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-30"
              disabled={page === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              type="button"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              aria-label="Következő cikkek"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-hairline)] text-[var(--text-tertiary)] transition-all duration-200 hover:border-[var(--border-default)] hover:text-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-30"
              disabled={page === maxPage}
              onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
              type="button"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* 4-column article grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visibleArticles.map((article) => (
            <a
              key={article.id}
              className="group relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] p-6 transition-all duration-300 hover:border-[var(--border-default)]"
              href={`/blog/${article.slug}`}
            >
              {/* Tag + Date */}
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--accent)] opacity-80">
                    {article.tag}
                  </span>
                  <span className="font-mono text-[10px] text-[var(--text-tertiary)]">
                    {article.date}
                  </span>
                </div>
                <h3 className="font-display mb-3 text-[16px] font-medium leading-[1.35] text-[var(--text-primary)] transition-colors duration-200 group-hover:text-white">
                  {article.title}
                </h3>
                <p className="text-[13px] leading-[1.6] text-[var(--text-tertiary)]">
                  {article.excerpt}
                </p>
              </div>

              {/* Read more */}
              <div className="mt-auto flex items-center gap-1.5 pt-3 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--text-tertiary)] transition-colors duration-200 group-hover:text-[var(--accent)]">
                Elolvasom
                <ArrowRight
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  size={12}
                />
              </div>
              {/* Hover fill line — slides up from bottom to 50% height */}
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
            </a>
          ))}
        </div>

        {/* Összes cikk CTA */}
        <div className="mt-8 flex items-center justify-center">
          <a
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border-hairline)] px-6 py-3 font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--text-secondary)] transition-all duration-200 hover:border-[var(--border-default)] hover:text-[var(--text-primary)]"
            href="/ai-tartalmak"
          >
            Összes cikk megtekintése
            <ArrowRight size={14} />
          </a>
        </div>
      </Container>
    </section>
    </>
  );
}

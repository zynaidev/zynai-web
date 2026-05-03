import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { allArticles as realArticles } from "@/lib/articles";

export function Resources() {
  const allArticles = realArticles
    .filter((a) => a.slug !== "aedificium-design-esettanulmany")
    .slice(0, 4);

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

        <div className="mb-6 mt-12">
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
            LEGUTÓBBI CIKKEK
          </span>
        </div>

        {/* 4-column article grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {allArticles.map((article) => (
            <a
              key={article.slug}
              className="group relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] p-6 transition-all duration-300 hover:border-[var(--border-default)]"
              href={`/ai-tartalmak/${article.slug}`}
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

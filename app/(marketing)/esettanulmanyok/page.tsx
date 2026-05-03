import type { Metadata } from "next";

import { SectionLabel } from "@/components/ui/section-label";
import { ArrowRight } from "lucide-react";

export function generateMetadata(): Metadata {
  return {
    description:
      "Valós eredmények, valós vállalkozásokkal — AI integráció a gyakorlatban.",
    title: "Esettanulmányok — ZynAI",
  };
}

export default function CaseStudiesIndexPage() {
  return (
    <>
      <style>{`
        .group:hover [data-hover-line] {
          transform: scaleX(1) !important;
        }
      `}</style>
      <div className="mx-auto max-w-[1280px] px-6 pb-24 pt-32 lg:px-12">
        <header className="mb-16 max-w-2xl">
          <SectionLabel number="" text="ESETTANULMÁNYOK" />

          <h1
            className="mt-4 font-display font-medium text-[var(--text-primary)]"
            style={{
              fontSize: "clamp(40px, 5vw, 64px)",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
            }}
          >
            Valós eredmények.
          </h1>

          <p className="mt-6 text-[17px] text-[var(--text-secondary)]">
            Nem ígéretek — konkrét számok, valós vállalkozásoktól.
          </p>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <a
            className="group relative overflow-hidden rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] transition-colors hover:border-[var(--border-default)]"
            href="/esettanulmanyok/aedificium-design"
          >
            <div className="relative h-[220px] overflow-hidden">
              <img
                alt=""
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                src="/esettanulmanyok/Aedificium/aedificium_hero.png"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[rgba(9,9,11,0.3)]"
              />
            </div>

            <div className="p-8">
              <span className="inline-block font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--accent)] opacity-80">
                ESETTANULMÁNY
              </span>

              <h2 className="mt-3 font-display text-[22px] font-medium text-[var(--text-primary)]">
                Aedificium Design × ZynAI
              </h2>

              <p className="mt-3 text-[14px] leading-[1.65] text-[var(--text-secondary)]">
                Tízszeres social media elérés és prémium weboldal 2 hét alatt.
              </p>

              <div className="mt-6 flex gap-6">
                <div>
                  <p className="font-display text-[24px] text-[#BDFF00]">
                    10×
                  </p>
                  <p className="mt-0.5 font-mono text-[11px] uppercase text-[var(--text-tertiary)]">
                    elérés növekedés
                  </p>
                </div>
                <div>
                  <p className="font-display text-[24px] text-[#BDFF00]">
                    2 hét
                  </p>
                  <p className="mt-0.5 font-mono text-[11px] uppercase text-[var(--text-tertiary)]">
                    fejlesztési idő
                  </p>
                </div>
              </div>

              <div className="mt-6 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--text-tertiary)] transition-colors duration-200 group-hover:text-[#BDFF00]">
                Elolvasom
                <ArrowRight
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  size={12}
                />
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
          </a>

          <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-dashed border-[rgba(255,255,255,0.08)] p-8">
            <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--text-tertiary)]">
              Hamarosan újabb esettanulmányok
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

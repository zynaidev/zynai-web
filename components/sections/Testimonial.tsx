import { ArrowRight } from "lucide-react";

export function Testimonial() {
  return (
    <section className="relative overflow-hidden bg-[var(--bg-base)] py-16 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        <div className="mx-auto max-w-2xl">
          <article
            className="rounded-[24px] border border-[rgba(255,255,255,0.06)] px-8 py-10 lg:px-12 lg:py-12"
            style={{
              background: "rgba(255,255,255,0.03)",
              boxShadow:
                "0 0 0 0.5px rgba(255,255,255,0.04) inset",
            }}
          >
            <p
              style={{
                marginBottom: -16,
                fontFamily:
                  '"Instrument Sans", ui-sans-serif, system-ui, sans-serif',
                fontSize: 64,
                lineHeight: 1,
                color: "#BDFF00",
                opacity: 0.6,
              }}
              aria-hidden
            >
              &ldquo;
            </p>

            <p
              className="text-[color:var(--text-primary)]"
              style={{
                fontSize: "clamp(16px, 1.4vw, 20px)",
                lineHeight: 1.65,
                fontStyle: "italic",
              }}
            >
              Már a kezdeti fázisban tízszeres elérést tapasztaltunk, ami kiemelkedő eredmény.
              A weboldal rendkívül profi, designközpontú és stabil.
              A befektetett összeghez képest kimagasló értéket kaptunk.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <div
                className="h-6 shrink-0 bg-[#BDFF00]"
                style={{ width: 2 }}
                aria-hidden
              />
              <div className="flex flex-col items-start gap-0.5">
                <span className="text-[14px] font-medium text-[var(--text-primary)]">
                  Loddo Riccardo
                </span>
                <a
                  href="https://aedificium.design/"
                  target="_blank"
                  rel="noopener"
                  className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--text-tertiary)] transition-colors duration-200 hover:text-[#BDFF00]"
                >
                  Aedificium Design
                </a>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[rgba(255,255,255,0.06)] pt-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
                Részletes esettanulmány
              </span>
              <a
                href="/esettanulmanyok/aedificium-design"
                className="group inline-flex items-center gap-2 text-[13px] font-medium text-[var(--text-primary)] transition-colors duration-200 hover:text-[#BDFF00]"
              >
                Elolvasom az esettanulmányt
                <ArrowRight
                  size={14}
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-x-[3px]"
                />
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

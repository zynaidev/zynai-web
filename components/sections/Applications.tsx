import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

const cardBase =
  "relative flex w-full min-h-[320px] flex-col gap-4 overflow-hidden rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] p-8 pb-24 lg:min-h-[380px] lg:p-10 lg:pb-32";

export function Applications() {
  return (
    <section className="relative overflow-hidden bg-[#191919] py-20 md:py-32">
      <style>{`
        @keyframes geo-scroll {
          0%   { transform: translateX(0%); }
          25%  { transform: translateX(0%); }
          50%  { transform: translateX(-25%); }
          75%  { transform: translateX(-25%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes wave-continuous {
          from { transform: translateX(0%); }
          to { transform: translateX(-50%); }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <Container className="relative z-10 px-4 lg:px-6">
        <SectionLabel number="03" text="ALKALMAZÁSI TERÜLETEK" />

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col items-start lg:col-span-5 lg:self-start lg:sticky lg:top-[100px]">
            <h2
              style={{
                fontSize: "clamp(36px, 4.5vw, 56px)",
                lineHeight: "1.1",
                letterSpacing: "-0.02em",
              }}
            >
              <span className="block text-[var(--text-primary)]">
                Hol jelenik meg
              </span>
              <span
                className="block"
                style={{ opacity: 0.7, color: "var(--text-primary)" }}
              >
                a gyakorlatban?
              </span>
            </h2>
          </div>

          <div className="max-w-[56ch] lg:col-span-7">
            <p className="font-sans text-base leading-[1.65] text-text-secondary lg:text-[18px]">
              Az alábbi területek a leggyakrabban azonosított lehetőségek a
              folyamatfelmérések alapján. A konkrét megvalósítás minden esetben
              a vállalkozás specifikus folyamataihoz igazodik.
            </p>
          </div>
        </div>
      </Container>

      <div className="mt-16 px-4 lg:mt-20 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-3 lg:gap-5">

          {/* Card 1 — Email és kommunikáció */}
          <div>
            <div className={cardBase}>
              <h3
                className="font-display font-medium tracking-[-0.01em] text-text-primary"
                style={{ fontSize: "22px" }}
              >
                Email és kommunikáció
              </h3>
              <p className="font-sans text-[15px] leading-[1.65] text-text-secondary">
                Bejövő levelek osztályozása, priorizálása és sablonvezérelt
                megválaszolása az üzenetek tartalmának valós idejű elemzése
                alapján.
              </p>

              {/* Card 1 decoration — two circles merging */}
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 overflow-hidden">
                <svg
                  viewBox="0 0 500 192"
                  width="100%"
                  height="100%"
                  fill="none"
                  preserveAspectRatio="xMidYMax meet"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <style>{`
                      @keyframes circle-left {
                        0%   { transform: translateX(-400px); }
                        25%  { transform: translateX(0px); animation-timing-function: ease-out; }
                        50%  { transform: translateX(0px); animation-timing-function: ease-in-out; }
                        75%  { transform: translateX(60px); animation-timing-function: ease-in; }
                        100% { transform: translateX(900px); }
                      }
                      @keyframes circle-right {
                        0%   { transform: translateX(-400px); }
                        25%  { transform: translateX(0px); animation-timing-function: ease-out; }
                        50%  { transform: translateX(0px); animation-timing-function: ease-in-out; }
                        75%  { transform: translateX(-60px); animation-timing-function: ease-in; }
                        100% { transform: translateX(900px); }
                      }
                    `}</style>
                  </defs>
                  <circle
                    cx="160" cy="192" r="110"
                    stroke="#393939" strokeWidth="1.5" fill="none"
                    style={{ animation: "circle-left 8s linear infinite" }}
                  />
                  <circle
                    cx="340" cy="192" r="110"
                    stroke="#393939" strokeWidth="1.5" fill="none"
                    style={{ animation: "circle-right 8s linear infinite" }}
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Card 2 — Tartalomgyártás és marketing */}
          <div className="lg:mt-12">
            <div className={cardBase}>
              <h3
                className="font-display font-medium tracking-[-0.01em] text-text-primary"
                style={{ fontSize: "22px" }}
              >
                Tartalomgyártás és marketing
              </h3>
              <p className="font-sans text-[15px] leading-[1.65] text-text-secondary">
                Rendszeres tartalmak generálása strukturált brand irányelvek és
                meglévő adatforrások alapján — közösségi média, hírlevelek,
                termékleírások.
              </p>

              {/* Card 2 decoration — deep synchronized waves */}
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 overflow-hidden">
                <div
                  style={{
                    width: "200%",
                    height: "100%",
                    animation: "wave-continuous 12s linear infinite",
                  }}
                >
                  <svg
                    viewBox="0 0 1000 192"
                    width="100%"
                    height="100%"
                    fill="none"
                    preserveAspectRatio="xMinYMax meet"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 140 C83 40, 167 230, 250 140 C333 40, 417 230, 500 140 C583 40, 667 230, 750 140 C833 40, 917 230, 1000 140 C1083 40, 1167 230, 1250 140 C1333 40, 1417 230, 1500 140 C1583 40, 1667 230, 1750 140 C1833 40, 1917 230, 2000 140"
                      stroke="#393939"
                      strokeWidth="1.5"
                      fill="none"
                    />
                    <path
                      d="M0 160 C83 60, 167 250, 250 160 C333 60, 417 250, 500 160 C583 60, 667 250, 750 160 C833 60, 917 250, 1000 160 C1083 60, 1167 250, 1250 160 C1333 60, 1417 250, 1500 160 C1583 60, 1667 250, 1750 160 C1833 60, 1917 250, 2000 160"
                      stroke="#393939"
                      strokeWidth="1"
                      fill="none"
                      opacity="0.5"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 — Értékesítés és CRM automatizáció */}
          <div className="lg:mt-24">
            <div className={cardBase}>
              <h3
                className="font-display font-medium tracking-[-0.01em] text-text-primary"
                style={{ fontSize: "22px" }}
              >
                Értékesítés és CRM automatizáció
              </h3>
              <p className="font-sans text-[15px] leading-[1.65] text-text-secondary">
                Lead minősítés, ajánlatgenerálás és ügyfélkezelési folyamatok
                automatizálása. Az értékesítési pipeline pontosan olyan tempóban
                halad, amilyen tempóban az érdeklődők érkeznek.
              </p>

              {/* Card 3 decoration — diamond grid with edge fade + smooth scroll */}
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 overflow-hidden">
                <div
                  className="absolute inset-0 z-10"
                  style={{
                    background: `
linear-gradient(to bottom, var(--bg-elevated) 0%, transparent 40%),
linear-gradient(to right, var(--bg-elevated) 0%, transparent 15%, transparent 85%, var(--bg-elevated) 100%)
`.trim(),
                  }}
                />

                <div
                  style={{
                    width: "200%",
                    height: "100%",
                    animation: "wave-continuous 16s linear infinite",
                    position: "relative",
                    zIndex: 0,
                  }}
                >
                  <svg
                    viewBox="0 0 1000 192"
                    width="100%"
                    height="100%"
                    fill="none"
                    preserveAspectRatio="xMinYMax meet"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <pattern
                        id="diamondGrid2"
                        x="0"
                        y="0"
                        width="70"
                        height="70"
                        patternUnits="userSpaceOnUse"
                        patternTransform="rotate(45)"
                      >
                        <rect
                          x="2"
                          y="2"
                          width="66"
                          height="66"
                          fill="none"
                          stroke="#393939"
                          strokeWidth="1"
                        />
                      </pattern>
                    </defs>
                    <rect
                      x="0"
                      y="0"
                      width="2000"
                      height="192"
                      fill="url(#diamondGrid2)"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

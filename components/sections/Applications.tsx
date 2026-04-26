"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { BarChart3, Globe, Mail, PenTool } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

const cards = [
  {
    id: "email",
    icon: Mail,
    title: "Email és kommunikáció",
    body: "Bejövő levelek osztályozása, priorizálása és sablonvezérelt megválaszolása az üzenetek tartalmának valós idejű elemzése alapján. A rendszer megérti a kontextust, és csak a valóban személyes válaszokat adja át emberi kezelésre.",
    examples: [
      "Ügyfélszolgálati levelek automatikus kategorizálása",
      "Ajánlatkérések strukturált adatba alakítása",
      "Sablonválaszok generálása a beérkező tartalom alapján",
    ],
  },
  {
    id: "content",
    icon: PenTool,
    title: "Tartalomgyártás és marketing",
    body: "Rendszeres tartalmak generálása strukturált brand irányelvek és meglévő adatforrások alapján — közösségi média, hírlevelek, termékleírások.",
    examples: null,
  },
  {
    id: "data",
    icon: BarChart3,
    title: "Adatfeldolgozás és riportálás",
    body: "Több forrásból érkező üzleti adatok automatikus aggregálása, tisztítása és időzített továbbítása — emberi beavatkozás nélkül.",
    examples: null,
  },
  {
    id: "web",
    icon: Globe,
    title: "Weboldal-integráció",
    body: "Lead rögzítés, minősítés és első szintű ügyfélkommunikáció automatizálása a meglévő weboldalba integrálva. A látogatók azonnal kapnak releváns válaszokat, a rendszer csak a valódi érdeklődőket küldi át.",
    examples: null,
  },
];

// Stacked horizontal lines — suggests a threaded inbox
function EmailLines() {
  const widths = [240, 200, 220, 180, 160];
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-8 right-8 flex flex-col gap-4 opacity-60 transition-opacity duration-[250ms] ease-out group-hover:opacity-85"
    >
      {widths.map((w, i) => (
        <div
          key={i}
          className="h-px rounded-full"
          style={{ width: w, backgroundColor: "rgba(255,255,255,0.04)" }}
        />
      ))}
    </div>
  );
}

// Short lines of varying length — suggests structured text generation
function WritingLines() {
  const widths = [32, 48, 24, 40];
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-6 top-6 flex flex-col gap-1.5 opacity-70 transition-opacity duration-[250ms] ease-out group-hover:opacity-95"
    >
      {widths.map((w, i) => (
        <div
          key={i}
          className="h-px rounded-full"
          style={{ width: w, backgroundColor: "rgba(255,255,255,0.05)" }}
        />
      ))}
    </div>
  );
}

// Tiny ascending bar chart — one bar has a subtle accent tint
function MiniBarChart() {
  const bars = [
    { h: 12, accent: false },
    { h: 18, accent: false },
    { h: 14, accent: false },
    { h: 24, accent: true },
    { h: 20, accent: false },
  ];
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-6 top-6 flex items-end gap-1 opacity-70 transition-opacity duration-[250ms] ease-out group-hover:opacity-100"
    >
      {bars.map((bar, i) => (
        <div
          key={i}
          className="w-[3px] rounded-full"
          style={{
            height: bar.h,
            backgroundColor: bar.accent
              ? "rgba(189,255,0,0.4)"
              : "rgba(255,255,255,0.06)",
          }}
        />
      ))}
    </div>
  );
}

// Repeating dot grid that fades in from the left — suggests content being scanned
function DotGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-0 right-0 top-0 w-[40%] opacity-50 transition-opacity duration-[250ms] ease-out group-hover:opacity-75"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
        backgroundSize: "16px 16px",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 50%, black 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 50%, black 100%)",
      }}
    />
  );
}

// Icon chip with soft accent glow that appears on card hover
function IconChip({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="relative w-fit">
      {/* glow layer — expands behind chip on group-hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-1 rounded-2xl bg-[rgba(189,255,0,0)] blur-[8px] transition-all duration-300 group-hover:bg-[rgba(189,255,0,0.08)]"
      />
      <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)]">
        <Icon
          className="text-text-secondary transition-colors duration-[250ms] ease-out group-hover:text-text-primary"
          size={20}
          strokeWidth={1.5}
        />
      </div>
    </div>
  );
}

export function Applications() {
  const [heroCard, ...sideCards] = cards;
  const webCard = sideCards[sideCards.length - 1];
  const middleCards = sideCards.slice(0, -1);

  const shouldReduceMotion = useReducedMotion();

  const cardVariants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { duration: 0.6, ease: "easeOut" as const, delay },
    }),
  };

  return (
    <section className="relative py-20 md:py-32">
      <Container>
        <SectionLabel number="03" text="ALKALMAZÁSI TERÜLETEK" />

        <h2
          className="mt-6 font-display font-medium leading-[1.1] tracking-[-0.02em] text-text-primary"
          style={{ fontSize: "clamp(32px, 4.5vw, 48px)", maxWidth: "18ch" }}
        >
          Hol jelenik meg a gyakorlatban?
        </h2>

        <p
          className="mt-6 max-w-[60ch] font-sans leading-[1.65] text-text-secondary"
          style={{ fontSize: "clamp(16px, 1.1vw, 18px)" }}
        >
          Az alábbi területek a leggyakrabban azonosított lehetőségek a
          folyamatfelmérések alapján. A konkrét megvalósítás minden esetben a
          vállalkozás specifikus folyamataihoz igazodik.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-2 lg:mt-20 lg:auto-rows-[280px] lg:grid-cols-12">
          {/* Card 1 — hero, left column spanning 2 rows */}
          <motion.div
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-glass)] p-6 backdrop-blur-md transition-all duration-[250ms] ease-out hover:border-[var(--border-default)] hover:bg-[var(--bg-glass-strong)] lg:col-span-7 lg:row-span-2 lg:p-8"
            custom={0}
            initial="hidden"
            variants={cardVariants}
            viewport={{ once: true, amount: 0.2 }}
            whileInView="visible"
          >
            <EmailLines />

            <IconChip icon={heroCard.icon} />

            <h3
              className="mt-6 font-display font-medium leading-[1.25] text-text-primary"
              style={{ fontSize: "clamp(22px, 1.6vw, 26px)" }}
            >
              {heroCard.title}
            </h3>

            <p className="mt-3 max-w-[50ch] font-sans text-[14px] leading-[1.6] text-text-secondary lg:text-[15px]">
              {heroCard.body}
            </p>

            {heroCard.examples ? (
              <div className="mt-auto border-t border-[var(--border-hairline)] pt-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
                  PÉLDÁK
                </p>
                <ul className="mt-3 flex flex-col">
                  {heroCard.examples.map((example) => (
                    <li
                      className="mt-2 flex items-start gap-3 font-sans text-[13px] leading-[1.7] text-text-secondary"
                      key={example}
                    >
                      <div
                        aria-hidden="true"
                        className="mt-2 h-1 w-1 shrink-0 rounded-full"
                        style={{ backgroundColor: "rgba(189,255,0,0.7)" }}
                      />
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </motion.div>

          {/* Cards 2 & 3 — right column, each 1 row */}
          {middleCards.map((card, i) => (
            <motion.div
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-glass)] p-6 backdrop-blur-md transition-all duration-[250ms] ease-out hover:border-[var(--border-default)] hover:bg-[var(--bg-glass-strong)] lg:col-span-5 lg:row-span-1 lg:p-8"
              custom={(i + 1) * 0.1}
              initial="hidden"
              key={card.id}
              variants={cardVariants}
              viewport={{ once: true, amount: 0.2 }}
              whileInView="visible"
            >
              {card.id === "content" ? <WritingLines /> : <MiniBarChart />}

              <IconChip icon={card.icon} />

              <h3
                className="mt-6 font-display font-medium leading-[1.25] text-text-primary"
                style={{ fontSize: "clamp(22px, 1.6vw, 26px)" }}
              >
                {card.title}
              </h3>

              <p className="mt-3 font-sans text-[14px] leading-[1.6] text-text-secondary lg:text-[15px]">
                {card.body}
              </p>
            </motion.div>
          ))}

          {/* Card 4 — full-width band */}
          <motion.div
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-glass)] p-6 backdrop-blur-md transition-all duration-[250ms] ease-out hover:border-[var(--border-default)] hover:bg-[var(--bg-glass-strong)] md:col-span-2 lg:col-span-12 lg:row-span-1 lg:p-8"
            custom={0.3}
            initial="hidden"
            variants={cardVariants}
            viewport={{ once: true, amount: 0.2 }}
            whileInView="visible"
          >
            <DotGrid />

            <IconChip icon={webCard.icon} />

            <h3
              className="mt-6 font-display font-medium leading-[1.25] text-text-primary"
              style={{ fontSize: "clamp(22px, 1.6vw, 26px)" }}
            >
              {webCard.title}
            </h3>

            <p className="mt-3 max-w-[50ch] font-sans text-[14px] leading-[1.6] text-text-secondary lg:text-[15px]">
              {webCard.body}
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

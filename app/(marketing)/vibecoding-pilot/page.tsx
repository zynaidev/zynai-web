import type { Metadata } from "next";

import { HeroGrain } from "@/components/hero-grain";
import { heroLayers } from "@/components/hero-layers";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/animations/reveal";

import { NotifyForm } from "./NotifyForm";

export const metadata: Metadata = {
  title: "VibeCoding képzés – hamarosan folytatjuk",
  description:
    "A VibeCoding képzések jelenleg lezárultak. Iratkozz fel, és elsőként értesítünk a következő képzés időpontjáról és tematikájáról.",
  alternates: {
    canonical: "/vibecoding-pilot",
  },
  openGraph: {
    title: "VibeCoding képzés – hamarosan folytatjuk — ZynAI",
    description:
      "A VibeCoding képzések jelenleg lezárultak. Iratkozz fel, és elsőként értesítünk a következő képzés időpontjáról és tematikájáról.",
    url: "/vibecoding-pilot",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "ZynAI — AI integráció magyar vállalkozásoknak",
      },
    ],
  },
};

export default function VibeCodingKepzesPage() {
  return (
    <section className="relative pt-32 pb-28 sm:pt-36 lg:pt-44 lg:pb-36">
      <HeroGrain />
      <div
        aria-hidden
        className="hero-dot-grid pointer-events-none absolute inset-0"
        style={{ zIndex: heroLayers.grid }}
      />
      <Container className="relative" style={{ zIndex: heroLayers.content }}>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--text-secondary)]">
              <span className="size-2 rounded-full bg-[var(--text-tertiary)]" />
              VibeCoding képzés
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1
              className="mt-7 font-display font-medium text-[var(--text-primary)]"
              style={{
                fontSize: "clamp(34px, 5.5vw, 56px)",
                letterSpacing: "-0.03em",
                lineHeight: 1.08,
              }}
            >
              A képzések jelenleg lezárultak.{" "}
              <span className="text-[#BDFF00]">Hamarosan folytatjuk.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-7 max-w-xl text-[18px] leading-[1.7] text-[var(--text-secondary)]">
              Köszönöm mindenkinek, aki részt vett a pilot képzésen. Ha szeretnél
              ott lenni a következőn, iratkozz fel: elsőként küldöm el az
              időpontot és a tematikát.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mx-auto mt-14 max-w-2xl rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[rgba(13,13,16,0.6)] p-6 backdrop-blur-xl sm:p-10">
            <h2 className="text-center font-display text-[22px] font-medium text-[var(--text-primary)]">
              Értesítést kérek a következő képzésről
            </h2>
            <p className="mx-auto mt-3 mb-8 max-w-md text-center text-[16px] leading-[1.6] text-[var(--text-tertiary)]">
              Csak a képzés indulásáról írok, más levelet nem küldök.
            </p>
            <NotifyForm />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

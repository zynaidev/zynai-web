import type { Metadata } from "next";

import { CalEmbed } from "@/components/CalEmbed";

export function generateMetadata(): Metadata {
  return {
    title: "Időpontfoglalás",
    description:
      "Foglalj egy 30 perces, díjmentes online egyeztetést — átbeszéljük, hogyan működtök most, és hol hozhat valódi eredményt az AI a vállalkozásodban.",
    alternates: {
      canonical: "/idopontfoglalas",
    },
    openGraph: {
      title: "Időpontfoglalás — ZynAI",
      description:
        "Foglalj egy 30 perces, díjmentes online egyeztetést — átbeszéljük, hogyan működtök most, és hol hozhat valódi eredményt az AI a vállalkozásodban.",
      url: "/idopontfoglalas",
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
}

export default function IdopontfoglalasPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-base)] pt-32 pb-24">
      <div className="mx-auto max-w-[780px] px-6">
        <header className="mb-12">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-[#BDFF00]">
            IDŐPONTFOGLALÁS
          </p>
          <h1 className="mb-4 font-display text-[36px] font-medium text-[var(--text-primary)] lg:text-[48px]">
            Foglalj időpontot
          </h1>
          <p className="text-[15px] leading-[1.85] text-[var(--text-secondary)]">
            30 perc, online. Átbeszéljük, hogyan működtök most és hol megy el
            a legtöbb idő. A beszélgetés után 3 munkanapon belül küldök egy
            írásos tervet.
          </p>
        </header>

        <CalEmbed />

        <p className="mt-8 text-[14px] text-[var(--text-tertiary)]">
          Ha egyik időpont sem jó, írj:{" "}
          <a
            href="mailto:info@zynai.hu"
            className="text-[var(--text-secondary)] underline underline-offset-2 hover:text-[#BDFF00]"
          >
            info@zynai.hu
          </a>
        </p>
      </div>
    </main>
  );
}

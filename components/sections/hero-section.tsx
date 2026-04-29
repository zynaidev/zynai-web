"use client";

import type { MouseEvent } from "react";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const ParticleSphere = dynamic(
  () =>
    import("@/components/visuals/ParticleSphere").then(
      (mod) => mod.ParticleSphere,
    ),
  { ssr: false },
);


const heroBackgroundStyles = `
  @keyframes hero-blob-1 {
    0%, 100% { transform: translate(0%, 0%) scale(1); }
    30% { transform: translate(8%, -12%) scale(1.08); }
    60% { transform: translate(-6%, 8%) scale(0.94); }
    80% { transform: translate(10%, 5%) scale(1.04); }
  }
  @keyframes hero-blob-2 {
    0%, 100% { transform: translate(0%, 0%) scale(1); }
    25% { transform: translate(-12%, 6%) scale(1.12); }
    55% { transform: translate(8%, -10%) scale(0.92); }
    80% { transform: translate(-5%, 12%) scale(1.06); }
  }
  @keyframes hero-blob-3 {
    0%, 100% { transform: translate(0%, 0%) scale(0.96); }
    40% { transform: translate(6%, 10%) scale(1.06); }
    70% { transform: translate(-10%, -6%) scale(0.90); }
  }
  @keyframes hero-blob-4 {
    0%, 100% { transform: translate(0%, 0%) scale(1); }
    50% { transform: translate(-6%, -8%) scale(1.08); }
  }
  @media (prefers-reduced-motion: reduce) {
    [data-hero-blob] { animation: none !important; }
  }
`;

function HeroBackground() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: heroBackgroundStyles }} />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* LAYER 1 — Base gradient: deep dark with slight warm undertone */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 65% 50%, rgba(15, 22, 35, 0.95) 0%, rgba(9, 9, 11, 1) 70%)",
          }}
        />

        {/* LAYER 2A — Mesh blob: lime accent, sphere area (right side) */}
        <div
          data-hero-blob
          className="absolute"
          style={{
            top: "-10%",
            right: "-5%",
            width: "65%",
            height: "90%",
            background:
              "radial-gradient(circle, rgba(189, 255, 0, 0.14) 0%, transparent 65%)",
            filter: "blur(70px)",
            animation: "hero-blob-1 24s ease-in-out infinite",
            willChange: "transform",
          }}
        />

        {/* LAYER 2B — Mesh blob: deep violet, upper right */}
        <div
          data-hero-blob
          className="absolute"
          style={{
            top: "-20%",
            right: "15%",
            width: "55%",
            height: "70%",
            background:
              "radial-gradient(circle, rgba(100, 40, 180, 0.20) 0%, transparent 60%)",
            filter: "blur(80px)",
            animation: "hero-blob-2 30s ease-in-out infinite",
            willChange: "transform",
          }}
        />

        {/* LAYER 2C — Mesh blob: teal, lower area */}
        <div
          data-hero-blob
          className="absolute"
          style={{
            bottom: "-10%",
            right: "5%",
            width: "50%",
            height: "60%",
            background:
              "radial-gradient(circle, rgba(20, 160, 180, 0.12) 0%, transparent 60%)",
            filter: "blur(85px)",
            animation: "hero-blob-3 35s ease-in-out infinite",
            willChange: "transform",
          }}
        />

        {/* LAYER 2D — Mesh blob: subtle lime, left side bleed */}
        <div
          data-hero-blob
          className="absolute"
          style={{
            top: "20%",
            left: "-10%",
            width: "40%",
            height: "50%",
            background:
              "radial-gradient(circle, rgba(189, 255, 0, 0.06) 0%, transparent 60%)",
            filter: "blur(90px)",
            animation: "hero-blob-4 28s ease-in-out infinite",
            willChange: "transform",
          }}
        />

        {/* LAYER 3 — Spotlight: focused radial on the sphere area */}
        <div
          className="absolute"
          style={{
            top: "-30%",
            right: "-10%",
            width: "80%",
            height: "130%",
            background:
              "radial-gradient(ellipse 60% 70% at 70% 40%, rgba(189, 255, 0, 0.09) 0%, rgba(100, 40, 180, 0.06) 40%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* LAYER 4 — Edge fades */}
        <div
          className="absolute inset-x-0 top-0 h-32"
          style={{
            background:
              "linear-gradient(to bottom, rgba(9,9,11,0.6) 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{
            background:
              "linear-gradient(to top, rgba(9,9,11,1) 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-y-0 left-0 w-[45%]"
          style={{
            background:
              "linear-gradient(to right, rgba(9,9,11,0.5) 0%, transparent 100%)",
          }}
        />

        {/* LAYER 5 — Noise grain overlay */}
        <div
          className="absolute inset-0 mix-blend-overlay"
          style={{
            opacity: 0.04,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
    </>
  );
}

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { duration: 0.7, ease: "easeOut" as const, delay },
    }),
  };

  const handleAnchorClick =
    (anchorId: string) => (event: MouseEvent<HTMLAnchorElement>) => {
      const target = document.getElementById(anchorId);

      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({
        behavior: shouldReduceMotion ? "auto" : "smooth",
        block: "start",
      });
      window.history.pushState(null, "", `#${anchorId}`);
    };

  return (
    <section className="relative isolate flex min-h-0 lg:min-h-[100dvh] items-start lg:items-center overflow-visible pt-32 lg:pt-36 pb-5 lg:pb-24">
      <HeroBackground />

      <Container className="relative z-10 grid pb-10 pt-0 gap-12 md:grid-cols-12 md:gap-8 md:items-center lg:gap-12 lg:p-0">
        <div className="md:col-span-7">
          <motion.div
            className="flex items-center gap-3"
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeUp}
          >
            <span
              aria-hidden="true"
              className="h-px w-6 bg-[var(--accent)]"
            />
            <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-text-tertiary">
              AI INTEGRÁCIÓ · ÜZLETI TANÁCSADÁS
            </p>
          </motion.div>

          <motion.h1
            className="mt-8 max-w-[14ch] font-display font-medium text-text-primary text-balance"
            style={{
              fontSize: "clamp(36px, 7vw, 72px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
            initial="hidden"
            animate="visible"
            custom={0.15}
            variants={fadeUp}
          >
            A vállalkozások hatékonyabbak, ha az AI a folyamataik része — nem
            egy különálló eszköz.
          </motion.h1>

          <motion.p
            className="mt-8 max-w-[50ch] font-sans text-base leading-[1.65] text-text-secondary md:text-lg"
            initial="hidden"
            animate="visible"
            custom={0.35}
            variants={fadeUp}
          >
            Bakos Attila vagyok — AI integrációval alakítom át az üzleti
            folyamatokat. Ez az oldal bemutatja a módszertanomat, a
            megvalósított projektjeimet és azt, amit ma az AI-ról tényszerűen
            érdemes tudni.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col gap-3 md:flex-row md:items-center"
            initial="hidden"
            animate="visible"
            custom={0.52}
            variants={fadeUp}
          >
            <a
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 font-sans text-sm font-semibold text-[var(--accent-on-light)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_24px_var(--accent-glow)]",
                "w-full md:w-auto",
              )}
              href="#munkak"
              onClick={handleAnchorClick("munkak")}
            >
              Esettanulmányok
              <ArrowRight aria-hidden="true" size={16} />
            </a>
            <a
              className={cn(
                "inline-flex items-center justify-center rounded-full border border-border-default bg-transparent px-6 py-3 font-sans text-sm font-semibold text-text-primary transition-all duration-300 hover:bg-bg-glass-strong",
                "w-full md:w-auto",
              )}
              href="#cikkek"
              onClick={handleAnchorClick("cikkek")}
            >
              Szakmai cikkek
            </a>
          </motion.div>
        </div>

        {/* Desktop: sphere absolutely positioned, breaks out of grid */}
        <div
          className="hidden lg:block absolute pointer-events-none"
          style={{
            top: "-10%",
            right: "-5vw",
            width: "58%",
            height: "120%",
            zIndex: 5,
            maskImage:
              "radial-gradient(ellipse 75% 75% at 55% 45%, black 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 75% 75% at 55% 45%, black 30%, transparent 75%)",
          }}
        >
          <ParticleSphere />
        </div>
      </Container>
    </section>
  );
}

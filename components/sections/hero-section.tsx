"use client";

import type { MouseEvent } from "react";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const revealEase = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  const revealProps = ({
    y,
    duration,
    delay = 0,
  }: {
    y: number;
    duration: number;
    delay?: number;
  }) =>
    shouldReduceMotion
      ? { initial: false }
      : {
          animate: { opacity: 1, y: 0 },
          initial: { opacity: 0, y },
          transition: { delay, duration, ease: revealEase },
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
    <section className="relative isolate flex min-h-[85vh] items-center overflow-hidden py-20 lg:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -right-72 -top-64 h-[900px] w-[900px] rounded-full bg-[rgba(189,255,0,0.10)] blur-[140px]" />
        <div className="absolute -bottom-80 -left-72 h-[1000px] w-[1000px] rounded-full bg-[#3b1d70]/[0.06] blur-[140px]" />
        <div className="absolute left-1/2 top-1/4 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-white/[0.014] opacity-40 blur-[140px]" />
        <div className="hero-dot-grid absolute inset-0" />
        <div className="hero-noise-grain absolute inset-0" />
      </div>

      <Container className="grid gap-12 md:grid-cols-12 md:gap-8 md:items-center lg:gap-12">
        <div className="md:col-span-7">
          <motion.div
            className="flex items-center gap-3"
            {...revealProps({ duration: 0.5, y: 12 })}
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
              fontSize: "clamp(40px, 7vw, 72px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
            {...revealProps({ delay: 0.1, duration: 0.7, y: 16 })}
          >
            A vállalkozások hatékonyabbak, ha az AI a folyamataik része — nem
            egy különálló eszköz.
          </motion.h1>

          <motion.p
            className="mt-8 max-w-[50ch] font-sans text-base leading-[1.65] text-text-secondary md:text-lg"
            {...revealProps({ delay: 0.3, duration: 0.6, y: 12 })}
          >
            Bakos Attila vagyok — üzleti folyamatokat vizsgálok meg és alakítok
            át AI integrációval. Ez az oldal bemutatja a módszertanomat, a
            megvalósított projektjeimet és azt, amit ma az AI-ról tényszerűen
            érdemes tudni.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col gap-3 md:flex-row md:items-center"
            {...revealProps({ delay: 0.5, duration: 0.5, y: 12 })}
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

        <div className="mt-12 flex justify-center md:col-span-5 md:mt-0">
          <div className="flex aspect-square w-[280px] items-center justify-center rounded-2xl border border-border-hairline bg-bg-glass p-8 text-center backdrop-blur-md md:w-full">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-text-tertiary">
              {"// VIZUALIZÁCIÓ — KÖVETKEZŐ FÁZIS"}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

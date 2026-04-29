"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const auroraStyles = `
  @keyframes aurora-drift-1 {
    0%, 100% { transform: translate(0%, 0%) scale(1); }
    25% { transform: translate(15%, -10%) scale(1.1); }
    50% { transform: translate(-10%, 5%) scale(0.95); }
    75% { transform: translate(8%, 12%) scale(1.05); }
  }
  @keyframes aurora-drift-2 {
    0%, 100% { transform: translate(0%, 0%) scale(1); }
    33% { transform: translate(-20%, 8%) scale(1.15); }
    66% { transform: translate(12%, -15%) scale(0.9); }
  }
  @keyframes aurora-drift-3 {
    0%, 100% { transform: translate(0%, 0%) scale(1); }
    40% { transform: translate(10%, 18%) scale(1.08); }
    80% { transform: translate(-15%, -8%) scale(0.92); }
  }
  @keyframes aurora-drift-4 {
    0%, 100% { transform: translate(0%, 0%) scale(0.95); }
    50% { transform: translate(-8%, -12%) scale(1.1); }
  }
  @media (prefers-reduced-motion: reduce) {
    [data-aurora-blob] {
      animation: none !important;
    }
  }
`;

function AuroraBackground() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Base subtle dark gradient — slightly warmer than bg-base, gives the aurora something to glow against */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(20, 30, 40, 0.5) 0%, transparent 70%)",
        }}
      />

      {/* Blob 1 — Lime accent, top-left area, large */}
      <div
        data-aurora-blob
        className="absolute"
        style={{
          top: "0%",
          left: "15%",
          width: "60%",
          height: "75%",
          background:
            "radial-gradient(circle, rgba(189, 255, 0, 0.27) 0%, transparent 60%)",
          filter: "blur(70px)",
          animation: "aurora-drift-1 22s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Blob 2 — Deep violet, right side */}
      <div
        data-aurora-blob
        className="absolute"
        style={{
          top: "10%",
          right: "5%",
          width: "50%",
          height: "70%",
          background:
            "radial-gradient(circle, rgba(120, 60, 200, 0.33) 0%, transparent 60%)",
          filter: "blur(75px)",
          animation: "aurora-drift-2 28s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Blob 3 — Teal/cyan, bottom-left */}
      <div
        data-aurora-blob
        className="absolute"
        style={{
          bottom: "0%",
          left: "0%",
          width: "55%",
          height: "65%",
          background:
            "radial-gradient(circle, rgba(40, 180, 200, 0.22) 0%, transparent 60%)",
          filter: "blur(72px)",
          animation: "aurora-drift-3 30s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Blob 4 — Lime accent again, bottom-right (reinforces brand color) */}
      <div
        data-aurora-blob
        className="absolute"
        style={{
          bottom: "5%",
          right: "15%",
          width: "45%",
          height: "55%",
          background:
            "radial-gradient(circle, rgba(189, 255, 0, 0.18) 0%, transparent 60%)",
          filter: "blur(65px)",
          animation: "aurora-drift-4 25s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Subtle noise grain overlay for film-like texture */}
      <div
        className="absolute inset-0 mix-blend-overlay opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Top and bottom edge fade — softens the section's transition into adjacent sections */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, var(--bg-base) 0%, transparent 5%, transparent 95%, var(--bg-base) 100%)",
        }}
      />
    </div>
  );
}

export function FinalCTA() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { duration: 0.6, ease: "easeOut" as const, delay },
    }),
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: auroraStyles }} />
      <section className="relative py-section-mobile lg:py-section-desktop overflow-hidden">
        <AuroraBackground />

        <div className="container mx-auto max-w-[1280px] px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0}
              variants={fadeUp}
            >
              {/* Pre-heading */}
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--border-default)]" />
                <span className="font-mono text-[12px] uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
                  KÖVETKEZŐ LÉPÉS
                </span>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--border-default)]" />
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0.15}
              variants={fadeUp}
            >
              {/* Heading */}
              <h2
                className="mt-8 font-display font-medium text-[var(--text-primary)]"
                style={{
                  fontSize: "clamp(36px, 5vw, 56px)",
                  lineHeight: "1.1",
                  letterSpacing: "-0.025em",
                }}
              >
                Beszéljünk arról, hol hozhat eredményt az AI a vállalkozásodban.
              </h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0.28}
              variants={fadeUp}
            >
              {/* Body paragraph */}
              <p
                className="mt-8 text-[var(--text-secondary)] leading-[1.65] max-w-2xl mx-auto"
                style={{ fontSize: "clamp(16px, 1.2vw, 18px)" }}
              >
                Egy 30 perces folyamatfelmérési konzultáció keretében átnézzük a
                vállalkozás jelenlegi működését, és konkrét képet adok arról, hol
                hozhat valódi eredményt az AI integráció — és hol nem éri meg vele
                foglalkozni.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0.42}
              variants={fadeUp}
            >
              {/* CTA button */}
              <div className="mt-12 flex flex-col items-center gap-4">
                <a
                  href="/idopontfoglalas"
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--accent)] text-[var(--accent-on-light)] font-medium hover:scale-[1.02] transition-all duration-300"
                  style={{
                    boxShadow: "0 0 32px rgba(189, 255, 0, 0.25)",
                    fontSize: "16px",
                  }}
                >
                  Időpontot foglalok
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </a>

                {/* Sub-CTA mono caption */}
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
                  INGYENES · 30 PERC · NEM KÖTELEZ EL SEMMIRE
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const auroraStyles = `
  @keyframes aurora-drift-1 {
    0%, 100% { transform: translate(0%, 0%) scale(1); }
    20% { transform: translate(18%, -15%) scale(1.15); }
    45% { transform: translate(-12%, 8%) scale(0.92); }
    70% { transform: translate(10%, 16%) scale(1.1); }
    85% { transform: translate(-6%, -8%) scale(1.05); }
  }
  @keyframes aurora-drift-2 {
    0%, 100% { transform: translate(0%, 0%) scale(1); }
    25% { transform: translate(-22%, 12%) scale(1.18); }
    55% { transform: translate(16%, -18%) scale(0.88); }
    80% { transform: translate(-10%, 14%) scale(1.12); }
  }
  @keyframes aurora-drift-3 {
    0%, 100% { transform: translate(0%, 0%) scale(1); }
    30% { transform: translate(14%, 22%) scale(1.12); }
    60% { transform: translate(-18%, -12%) scale(0.88); }
    85% { transform: translate(8%, 6%) scale(1.08); }
  }
  @media (prefers-reduced-motion: reduce) {
    [data-aurora-blob] { animation: none !important; }
  }
  @keyframes shimmer-sweep {
    from { left: -60%; }
    to { left: 160%; }
  }
  .btn-shimmer {
    position: absolute;
    top: 0;
    width: 40%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transform: skewX(-20deg);
    pointer-events: none;
  }
  .cta-group:hover .btn-shimmer {
    animation: shimmer-sweep 0.5s ease forwards;
  }
  .cta-sweep-fill {
    position: absolute;
    inset: 0;
    pointer-events: none;
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 0.35s ease-in-out;
    background: #09090B;
  }
  .cta-group:hover .cta-sweep-fill {
    transform: scaleX(1);
  }
  .cta-left-text {
    position: relative;
    z-index: 10;
    transition: color 0.35s ease-in-out;
  }
  .cta-group:hover .cta-left-text {
    color: #BDFF00;
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
          minWidth: "300px",
          minHeight: "300px",
          background:
            "radial-gradient(circle, rgba(189, 255, 0, 0.34) 0%, transparent 60%)",
          filter: "blur(70px)",
          animation: "aurora-drift-1 20s ease-in-out infinite",
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
          minWidth: "300px",
          minHeight: "300px",
          background:
            "radial-gradient(circle, rgba(120, 60, 200, 0.42) 0%, transparent 60%)",
          filter: "blur(75px)",
          animation: "aurora-drift-2 20s ease-in-out infinite",
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
        className="absolute inset-0 z-[11]"
        style={{
          background:
            "linear-gradient(to bottom, var(--bg-base) 0%, transparent 12%, transparent 88%, var(--bg-base) 100%)",
        }}
      />

      {/* Left / right edge fade */}
      <div
        className="pointer-events-none absolute inset-0 z-[11] hidden sm:block"
        style={{
          background:
            "linear-gradient(to right, var(--bg-base) 0%, transparent 12%, transparent 88%, var(--bg-base) 100%)",
        }}
      />
    </div>
  );
}

function usePrefersReducedMotion(): boolean {
  return true;
}

function MagneticSplitCta() {
  return (
    <a
      href="/kapcsolatfelvetel"
      className="cta-group relative inline-flex overflow-hidden rounded-full"
      style={{
        boxShadow:
          "0 0 36px rgba(189,255,0,0.28), 0 0 72px rgba(189,255,0,0.10)",
      }}
    >
      <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-[#BDFF00] px-8 py-4">
        <span className="cta-sweep-fill z-[8]" aria-hidden />
        <span className="pointer-events-none absolute inset-0 z-[9] overflow-hidden">
          <span className="btn-shimmer absolute left-0 top-0" aria-hidden />
        </span>
        <span className="cta-left-text font-medium text-[15px] text-[#09090B]">
          Kezdjük el
        </span>
      </div>

      <div
        className="pointer-events-none w-px self-stretch shrink-0 bg-[rgba(9,9,11,0.15)]"
        aria-hidden
      />

      <div className="relative flex items-center bg-[#BDFF00] px-5 py-4">
        <ArrowRight size={16} className="text-[#09090B]" aria-hidden />
      </div>
    </a>
  );
}

export function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  usePrefersReducedMotion();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: auroraStyles }} />
      <section
        ref={sectionRef}
        className="relative flex min-h-0 md:min-h-[90vh] items-center overflow-hidden bg-[var(--bg-base)] border-t border-[var(--border-hairline)] py-20 sm:py-24 lg:py-40"
      >
        <AuroraBackground
        />

        <div className="container relative z-10 mx-auto max-w-[1280px] px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              className="relative z-10 mx-auto max-w-2xl rounded-[32px] px-8 py-12 sm:px-10 sm:py-14 lg:px-12 lg:py-16 text-center"
              style={{
                transformStyle: "preserve-3d",
                transformOrigin: "center center",
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(24px) saturate(160%)",
                WebkitBackdropFilter: "blur(24px) saturate(160%)",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow:
                  "0 0 0 0.5px rgba(255,255,255,0.04) inset, 0 40px 100px rgba(0,0,0,0.45)",
              }}
            >
              <motion.div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[32px]" />

              <div className="relative z-10 flex flex-col items-center text-center">
                <h2
                  className="font-display font-medium text-[var(--text-primary)] text-center"
                  style={{
                    fontSize: "clamp(32px, 4.5vw, 52px)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.025em",
                    marginBottom: 48,
                  }}
                >
                  Beszéljünk arról, hol hozhat{" "}
                  <span style={{ color: "#BDFF00" }}>eredményt</span>
                  {" "}az{" "}
                  <span style={{ color: "#09090B" }}>AI</span>
                  {" "}a vállalkozásodban.
                </h2>

                <MagneticSplitCta />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

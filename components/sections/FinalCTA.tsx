"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { CtaAurora } from "@/components/cta-aurora";

const auroraStyles = `
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
        <CtaAurora />

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

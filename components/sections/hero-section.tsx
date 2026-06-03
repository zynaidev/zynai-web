"use client";

import { type MouseEvent, useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const ParticleSphere = dynamic(
  () =>
    import("@/components/visuals/ParticleSphere").then(
      (mod) => mod.ParticleSphere,
    ),
  { ssr: false, loading: () => null },
);


function TypewriterText({ text, color }: { text: string; color: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 95);
    return () => clearInterval(interval);
  }, [isInView, text]);

  return (
    <motion.span
      ref={ref}
      style={{ color }}
      animate={done ? {
        textShadow: [
          "0 0 0px rgba(189,255,0,0)",
          "0 0 18px rgba(189,255,0,0.35)",
          "0 0 0px rgba(189,255,0,0)",
        ],
      } : {}}
      transition={done ? {
        duration: 3.5,
        repeat: Infinity,
        ease: "easeInOut",
      } : {}}
    >
      {displayed}
      {!done && displayed.length > 0 && (
        <span
          style={{
            display: "inline-block",
            width: "2px",
            height: "0.85em",
            background: color,
            marginLeft: "2px",
            verticalAlign: "middle",
            animation: "blink 0.7s step-end infinite",
          }}
        />
      )}
    </motion.span>
  );
}

const heroBackgroundStyles = `
  @keyframes hero-blob-1 {
    0%, 100% { transform: translate3d(0%, 0%, 0) scale(1); }
    50% { transform: translate3d(8%, -10%, 0) scale(1.05); }
  }
  @keyframes hero-blob-2 {
    0%, 100% { transform: translate3d(0%, 0%, 0) scale(1); }
    50% { transform: translate3d(-10%, 8%, 0) scale(1.08); }
  }
  @media (prefers-reduced-motion: reduce) {
    [data-hero-blob] { animation: none !important; }
  }
  @media (max-width: 1023px) {
    [data-hero-blob] { display: none !important; }
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
            animation: "hero-blob-1 20s ease-in-out infinite",
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
            animation: "hero-blob-2 20s ease-in-out infinite",
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
  const [isDesktop, setIsDesktop] = useState(false);
  const [showSphere, setShowSphere] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowSphere(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleAnchorClick =
    (anchorId: string) => (event: MouseEvent<HTMLAnchorElement>) => {
      const target = document.getElementById(anchorId);

      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      window.history.pushState(null, "", `#${anchorId}`);
    };

  return (
    <section className="relative isolate flex w-full min-h-[75vh] lg:min-h-[88vh] items-start lg:items-center overflow-hidden pt-32 lg:pt-36 pb-5 lg:pb-24" style={{ isolation: "isolate" }}>
      <HeroBackground />

      <Container className="relative z-10 grid pb-6 lg:pb-10 pt-0 gap-12 md:grid-cols-12 md:gap-8 md:items-center lg:gap-12 lg:p-0">
        <div className="md:col-span-7">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-px w-6 bg-[var(--accent)]"
            />
            <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-text-tertiary">
              AI INTEGRÁCIÓ · ÜZLETI TANÁCSADÁS
            </p>
          </div>

          <h1
            className="mt-8 max-w-[14ch] font-display font-medium text-text-primary text-balance"
            style={{
              fontSize: "clamp(36px, 7vw, 72px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            A vállalkozások hatékonyabbak, ha az AI a folyamataik része —{" "}
            <TypewriterText text="nem egy különálló eszköz." color="#BDFF00" />
          </h1>

          <p
            className="mt-8 max-w-[50ch] font-sans text-base leading-[1.65] text-text-secondary md:text-lg"
          >
            Bakos Attila vagyok — AI integrációval alakítom át az üzleti
            folyamatokat. Ez az oldal bemutatja a módszertanomat, a
            megvalósított projektjeimet és azt, amit ma az AI-ról tényszerűen
            érdemes tudni.
          </p>

          <div
            className="mt-10 flex flex-col gap-3 md:flex-row md:items-center"
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
          </div>
        </div>

        {/* Desktop: sphere absolutely positioned, breaks out of grid */}
        {isDesktop && showSphere && (
          <div
            className="absolute pointer-events-none"
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
        )}
      </Container>
    </section>
  );
}

"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Caveat } from "next/font/google";
import Image from "next/image";
import { useRef } from "react";

import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

const caveat = Caveat({
  subsets: ["latin", "latin-ext"],
  weight: ["500"],
  display: "swap",
});

const technicalCompetencies = [
  "Folyamatautomatizáció",
  "AI integráció",
  "n8n workflow fejlesztés",
  "Python programozás",
  "Linux rendszerüzemeltetés",
  "Self-hosted infrastruktúra",
];

const businessCompetencies = ["Üzleti folyamatelemzés", "Magyar KKV tanácsadás"];

const badgeClassName =
  "inline-flex cursor-default rounded-full border border-[var(--border-hairline)] bg-[var(--bg-glass)] px-3 py-1.5 font-mono uppercase text-text-secondary transition-all duration-300 hover:border-[var(--border-default)] hover:bg-[var(--bg-glass-strong)] hover:text-text-primary";

const badgeStyle = { fontSize: "11px", letterSpacing: "0.08em" } as const;

export function About() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const portraitY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [20, -20],
  );

  const fadeUp = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { duration: 0.6, ease: "easeOut" as const, delay },
    }),
  };

  const portraitReveal = shouldReduceMotion
    ? {
        initial: { opacity: 1, scale: 1 },
        whileInView: { opacity: 1, scale: 1 },
        transition: { duration: 0 },
      }
    : {
        initial: { opacity: 0, scale: 0.96 },
        whileInView: { opacity: 1, scale: 1 },
        transition: { duration: 0.8, ease: "easeOut" as const, delay: 0.3 },
      };

  const signatureReveal = shouldReduceMotion
    ? {
        initial: { opacity: 1, y: 0 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0 },
      }
    : {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: "easeOut" as const, delay: 0.7 },
      };

  return (
    <section className="relative py-20 md:py-32" id="rolam" ref={sectionRef}>
      <Container>
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left column — text content */}
          <div className="lg:col-span-7">
            <motion.div
              className="flex items-center gap-6"
              custom={0}
              initial="hidden"
              variants={fadeUp}
              viewport={{ once: true, amount: 0.2 }}
              whileInView="visible"
            >
              <SectionLabel number="04" text="RÓLAM" />
              <div
                aria-hidden="true"
                className="h-px flex-1 bg-gradient-to-r from-[var(--border-default)] via-[var(--border-hairline)] to-transparent"
              />
            </motion.div>

            <motion.p
              className="mt-8 font-mono uppercase text-text-tertiary"
              custom={0.1}
              initial="hidden"
              style={{ fontSize: "12px", letterSpacing: "0.12em" }}
              variants={fadeUp}
              viewport={{ once: true, amount: 0.2 }}
              whileInView="visible"
            >
              BAKOS ATTILA · AI INTEGRÁTOR &amp; ÜZLETI TANÁCSADÓ
            </motion.p>

            <motion.h2
              className="mt-6 font-display font-medium leading-[1.1] tracking-[-0.02em] text-text-primary"
              custom={0.2}
              initial="hidden"
              style={{ fontSize: "clamp(32px, 4.5vw, 48px)", maxWidth: "18ch" }}
              variants={fadeUp}
              viewport={{ once: true, amount: 0.2 }}
              whileInView="visible"
            >
              Technológiai háttér, üzleti{" "}
              <span className="relative inline-block">
                fókusz
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full"
                  style={{
                    background:
                      "linear-gradient(to right, var(--accent), rgba(189, 255, 0, 0))",
                  }}
                />
              </span>
              .
            </motion.h2>

            <motion.div
              className="mt-8 max-w-[56ch] font-sans leading-[1.65] text-text-secondary"
              custom={0.35}
              initial="hidden"
              style={{ fontSize: "clamp(16px, 1.1vw, 18px)" }}
              variants={fadeUp}
              viewport={{ once: true, amount: 0.2 }}
              whileInView="visible"
            >
              <p>
                Közel tíz éve tervezek és valósítok meg webes rendszereket és
                automatizációs megoldásokat. A cél mindig ugyanaz volt: az
                ügyfeleim a lehető leghatékonyabban tudjanak működni. Ez nem
                változott.
              </p>
              <p className="mt-4">
                Ami változott, az az eszköztár. Az elmúlt éveket tudásom
                mélyítésével töltöttem — Python programozás, Linux
                rendszerüzemeltetés és AI ágens fejlesztés területén.{" "}
                Hiszek benne, hogy a magyar vállalkozásoknak fel kell
                zárkózniuk az amerikai és nyugat-európai technológiai szintre.
                Az AI integráció ennek nem egy opcionális eleme — hanem a
                törzse.
              </p>
            </motion.div>

            {/* Competencies */}
            <motion.div
              className="mt-12 space-y-6"
              custom={0.5}
              initial="hidden"
              variants={fadeUp}
              viewport={{ once: true, amount: 0.2 }}
              whileInView="visible"
            >
              <div>
                <p
                  className="mb-3 font-mono uppercase text-text-tertiary"
                  style={{ fontSize: "11px", letterSpacing: "0.12em" }}
                >
                  TECHNIKAI KOMPETENCIÁK
                </p>
                <div className="flex flex-wrap gap-3">
                  {technicalCompetencies.map((label) => (
                    <span
                      className={badgeClassName}
                      key={label}
                      style={badgeStyle}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p
                  className="mb-3 font-mono uppercase text-text-tertiary"
                  style={{ fontSize: "11px", letterSpacing: "0.12em" }}
                >
                  ÜZLETI KOMPETENCIÁK
                </p>
                <div className="flex flex-wrap gap-3">
                  {businessCompetencies.map((label) => (
                    <span
                      className={badgeClassName}
                      key={label}
                      style={badgeStyle}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right column — portrait + signature */}
          <div className="lg:col-span-5">
            <motion.div
              initial={portraitReveal.initial}
              transition={portraitReveal.transition}
              viewport={{ once: true, amount: 0.2 }}
              whileInView={portraitReveal.whileInView}
            >
              <motion.div style={{ y: portraitY }}>
                <div className="relative w-full max-w-[380px] mx-auto lg:mx-0">
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-[var(--border-hairline)]">
                    <Image
                      alt="Bakos Attila — AI integrátor"
                      className="object-cover"
                      fill
                      priority={false}
                      sizes="380px"
                      src="/brand/attila/bakos_attila_portrai.webp"
                    />

                    {/* Filmic grain overlay */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 mix-blend-overlay"
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
                        opacity: 0.18,
                      }}
                    />

                    {/* Subtle vignette */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0"
                      style={{
                        boxShadow: "inset 0 0 80px 0 rgba(0, 0, 0, 0.5)",
                      }}
                    />
                  </div>

                  {/* Accent glow behind the portrait */}
                  <div
                    aria-hidden="true"
                    className="absolute -inset-3 -z-10 rounded-3xl"
                    style={{
                      background:
                        "radial-gradient(circle at 30% 40%, rgba(189, 255, 0, 0.10), transparent 60%)",
                      filter: "blur(40px)",
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Signature block */}
            <motion.div
              className="mt-6 flex max-w-[380px] mx-auto lg:mx-0 items-center gap-3"
              initial={signatureReveal.initial}
              transition={signatureReveal.transition}
              viewport={{ once: true, amount: 0.5 }}
              whileInView={signatureReveal.whileInView}
            >
              <span
                className={`${caveat.className} text-[42px] leading-none text-text-primary`}
                style={{ letterSpacing: "0.01em" }}
              >
                Bakos Attila
              </span>
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  background: "var(--accent)",
                  boxShadow: "0 0 8px var(--accent-glow)",
                  marginTop: "12px",
                }}
              />
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

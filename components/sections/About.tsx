"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

function SignatureAnimate() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes sig-dot-appear {
          0% { opacity: 0; box-shadow: 0 0 0px 0px rgba(189,255,0,0); }
          55% { opacity: 1; box-shadow: 0 0 10px 4px rgba(189,255,0,0.65); }
          100% { opacity: 0.7; box-shadow: 0 0 3px 1px rgba(189,255,0,0.25); }
        }
        @keyframes sig-dot-pulse {
          0%, 100% { opacity: 0.7; box-shadow: 0 0 3px 1px rgba(189,255,0,0.25); }
          50% { opacity: 1; box-shadow: 0 0 6px 2px rgba(189,255,0,0.5); }
        }
      ` }} />
      <div
        ref={ref}
        style={{
          marginTop: "28px",
          display: "flex",
          justifyContent: "flex-start",
          paddingLeft: "8px",
        }}
      >
        <div style={{ position: "relative", width: "360px" }}>
          <img
            src="/brand/Bakos_Attila_sign.svg"
            alt="Bakos Attila aláírása"
            style={{
              width: "360px",
              height: "auto",
              filter: "invert(1)",
              opacity: 0.8,
              display: "block",
              clipPath: isInView ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
              transition: isInView
                ? "clip-path 3.6s cubic-bezier(0.76, 0, 0.24, 1) 0.3s"
                : "none",
            }}
          />
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              right: "8px",
              bottom: "20%",
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "var(--accent)",
              opacity: 0,
              animation: isInView
                ? "sig-dot-appear 0.8s ease-out 5.9s forwards, sig-dot-pulse 2.2s ease-in-out 6.7s infinite"
                : "none",
            }}
          />
        </div>
      </div>
    </>
  );
}

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
              className="mt-8 max-w-[56ch] font-sans text-[18px] leading-[1.65]"
              custom={0.35}
              initial="hidden"
              variants={fadeUp}
              viewport={{ once: true, amount: 0.2 }}
              whileInView="visible"
            >
              <p className="text-text-secondary">
                Több mint tíz éve dolgozom digitális rendszerek tervezésével. Az
                elmúlt éveket AI-alapú automatizációs projektek megvalósításával
                töltöttem — magyar KKV-k számára, ahol a cél mindig ugyanaz volt:
                a meglévő folyamatokat kevesebb emberi erőforrással, pontosabban
                működtetni.
              </p>
              <p className="mt-4 font-medium text-text-primary">
                Nem demókat, hanem napi szinten használt, élesben futó
                rendszereket.
                <br></br>
                <br></br>
              </p>
              <p className="text-text-secondary">
              Hiszek benne, hogy a magyar vállalkozásoknak fel kell zárkózniuk az Amerikai és Nyugat-Európai technológiai megoldásokhoz.
              Az AI integráció ennek nem egy opcionális eleme hanem a törzse.
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
                  {/* Lime accent glow — top left */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute"
                    style={{
                      top: "-15%",
                      left: "-20%",
                      width: "70%",
                      height: "70%",
                      background:
                        "radial-gradient(circle, rgba(189,255,0,0.18) 0%, transparent 70%)",
                      filter: "blur(50px)",
                      zIndex: 0,
                    }}
                  />
                  {/* Violet glow — bottom right */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute"
                    style={{
                      bottom: "-10%",
                      right: "-15%",
                      width: "60%",
                      height: "60%",
                      background:
                        "radial-gradient(circle, rgba(100,60,200,0.15) 0%, transparent 70%)",
                      filter: "blur(50px)",
                      zIndex: 0,
                    }}
                  />

                  <div className="relative z-10 aspect-[4/5] w-full overflow-hidden rounded-2xl border border-[var(--border-hairline)]">
                    <Image
                      alt="Bakos Attila — AI integrátor"
                      className="object-cover"
                      fill
                      priority={false}
                      sizes="380px"
                      src="/brand/attila/bakos_attila_portrai.webp"
                    />

                    {/* Vignette overlay */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0"
                      style={{
                        boxShadow: "inset 0 0 60px 0 rgba(0,0,0,0.4)",
                        borderRadius: "inherit",
                      }}
                    />
                    {/* Bottom fade — portrait melts into background */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/3"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(9,9,11,0.6) 0%, transparent 100%)",
                      }}
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

                    {/* Left accent line */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute left-0 top-[15%] bottom-[15%] w-[2px]"
                      style={{
                        background:
                          "linear-gradient(to bottom, transparent 0%, rgba(189,255,0,0.6) 30%, rgba(189,255,0,0.6) 70%, transparent 100%)",
                        zIndex: 20,
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

            <SignatureAnimate />
          </div>
        </div>
      </Container>
    </section>
  );
}

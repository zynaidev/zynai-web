"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { CountUp } from "@/components/animations/CountUp";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

const revealEase = [0.22, 1, 0.36, 1] as const;

const stats = [
  {
    description:
      "A jelenlegi munkaórák technikailag automatizálhatók a ma elérhető AI technológiákkal.",
    duration: 1.6,
    index: "01",
    source: "McKINSEY GLOBAL INSTITUTE, 2025",
    suffix: "%",
    to: 57,
  },
  {
    description:
      "Heti átlagos időmegtakarítás AI eszközök rendszeres használatával.",
    duration: 1.4,
    index: "02",
    source: "RMIT ONLINE & DELOITTE, 2026",
    suffix: "ÓRA",
    to: 9,
  },
  {
    description:
      "A szervezetek hatékonyságnövekedésről számoltak be AI bevezetését követően.",
    duration: 1.8,
    index: "03",
    source: "DELOITTE STATE OF AI REPORT, 2026",
    suffix: "%",
    to: 66,
  },
];

const DURATION = 5000;
const STATS_COUNT = 3;
export default function WhatIsAI() {
  const shouldReduceMotion = useReducedMotion();

  const [activeIndex, setActiveIndex] = useState(-1);
  const [isPaused, setIsPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setActiveIndex(0);
  }, []);

  const startLoop = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % STATS_COUNT);
      setProgressKey((k) => k + 1);
    }, DURATION);
  }, []);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIsPaused(true);
      return;
    }

    if (!isPaused) startLoop();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [isPaused, startLoop]);

  const revealProps = ({
    duration,
    delay = 0,
  }: {
    duration: number;
    delay?: number;
  }) =>
    shouldReduceMotion
      ? { initial: false }
      : {
          initial: { opacity: 0, y: 16 },
          transition: { delay, duration, ease: revealEase },
          viewport: { once: true, margin: "-100px" },
          whileInView: { opacity: 1, y: 0 },
        };

  return (
    <section className="relative py-20 lg:py-32" id="modszer">
      <style>{`
        @keyframes fillLine {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
      <Container>
        <motion.div {...revealProps({ duration: 0.6 })}>
          <SectionLabel number="01" text="MI AZ AI INTEGRÁCIÓ?" />
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8"
          {...revealProps({ delay: 0.1, duration: 0.7 })}
        >
          <div className="flex flex-col items-start lg:col-span-5 lg:self-start lg:sticky lg:top-[100px]">
            <h2
              className="font-display font-medium leading-[1.05] tracking-[-0.03em] text-text-primary [font-size:clamp(40px,5vw,64px)]"
            >
              <span className="block text-[var(--text-primary)]">
                Nem eszköz.
              </span>
              <span
                className="block text-[var(--text-secondary)]"
                style={{ opacity: 0.7 }}
              >
                Működési modell.
              </span>
            </h2>
          </div>

          <div className="max-w-[56ch] lg:col-span-7">
            <p className="font-sans text-base leading-[1.65] text-text-secondary lg:text-[18px]">
              Az AI integráció nem egy szoftver bevezetéséről szól. Arról szól,
              hogy egy vállalkozás napi működésének mely pontjain lehet az
              emberi munkát pontosabbá, gyorsabbá vagy részben kiválthatóvá
              tenni — úgy, hogy az eredmény megbízható és fenntartható legyen.
            </p>
            <p className="mt-6 font-sans text-base leading-[1.65] text-text-secondary lg:text-[18px]">
              A legtöbb vállalkozásnál ezek a pontok nem nyilvánvalóak. Nem
              azért, mert bonyolultak, hanem mert belülről nehéz látni, mi az
              ami automatizálható, és mi az, ami valójában emberi jelenlétet
              igényel.
            </p>
            <p className="mt-6 font-sans text-[20px] font-medium leading-[1.65] text-text-primary">
              Ez az a döntési folyamat, amiben segítek.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-3 gap-0"
          {...revealProps({ delay: 0.2, duration: 0.6 })}
        >
          {stats.map((stat, index) => (
            <div
              key={stat.index}
              className={`group relative z-10 cursor-default border p-8 transition-all duration-300 max-md:-mt-px max-md:first:mt-0 md:-ml-px md:first:ml-0 lg:p-10 ${
                activeIndex === index && activeIndex >= 0
                  ? "border-[rgba(189,255,0,0.4)] bg-[var(--bg-glass)]"
                  : "border-[var(--border-hairline)] hover:border-[var(--accent)] hover:bg-[var(--bg-glass)]"
              }`}
              onMouseEnter={() => {
                setIsPaused(true);
                setActiveIndex(index);
              }}
              onMouseLeave={() => {
                setIsPaused(false);
                setProgressKey((k) => k + 1);
              }}
            >
              <div className="mb-8 flex items-center gap-4">
                <span className="font-mono text-[13px] tracking-[0.12em] text-[var(--accent)]">
                  {stat.index}
                </span>
                <div className="relative h-px flex-1 overflow-hidden bg-[var(--border-hairline)]">
                  {activeIndex === index && activeIndex >= 0 && (
                    <div
                      key={`progress-${progressKey}`}
                      className="absolute inset-y-0 left-0 bg-[rgba(189,255,0,0.6)]"
                      style={{
                        animation: isPaused
                          ? "none"
                          : `fillLine ${DURATION}ms linear forwards`,
                        width: isPaused ? "100%" : "0%",
                      }}
                    />
                  )}
                </div>
              </div>

              <div
                className={`font-mono text-[56px] leading-none font-normal tracking-[-0.02em] transition-colors duration-300 lg:text-[64px] ${
                  activeIndex === index && activeIndex >= 0
                    ? "text-[rgba(189,255,0,0.75)]"
                    : "text-[var(--text-primary)]"
                }`}
              >
                <CountUp
                  duration={stat.duration}
                  from={0}
                  suffix={stat.suffix}
                  to={stat.to}
                />
              </div>

              <p className="mt-4 max-w-[28ch] text-[14px] leading-[1.6] text-[var(--text-secondary)]">
                {stat.description}
              </p>

              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--text-tertiary)]">
                {stat.source}
              </p>

              <div
                className={`absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[rgba(189,255,0,0.5)] transition-transform duration-300 ${
                  activeIndex === index && activeIndex >= 0
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

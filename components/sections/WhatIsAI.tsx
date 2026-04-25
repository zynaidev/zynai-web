"use client";

import { motion, useReducedMotion } from "framer-motion";

import { CountUp } from "@/components/animations/CountUp";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { IntegrationDiagram } from "@/components/visuals/IntegrationDiagram";

const revealEase = [0.22, 1, 0.36, 1] as const;

const stats = [
  {
    duration: 1.6,
    label:
      "A jelenlegi munkaórák technikailag automatizálhatók a ma elérhető AI technológiákkal",
    source: "MCKINSEY GLOBAL INSTITUTE, 2025",
    suffix: "%",
    to: 57,
  },
  {
    duration: 1.4,
    label:
      "Heti átlagos időmegtakarítás AI eszközök rendszeres használatával",
    source: "RMIT ONLINE & DELOITTE, 2026",
    suffix: " ÓRA",
    to: 9,
  },
  {
    duration: 1.8,
    label:
      "A szervezetek hatékonyságnövekedésről számoltak be AI bevezetését követően",
    source: "DELOITTE STATE OF AI REPORT, 2026",
    suffix: "%",
    to: 66,
  },
];

export default function WhatIsAI() {
  const shouldReduceMotion = useReducedMotion();

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
      <Container>
        <motion.div {...revealProps({ duration: 0.6 })}>
          <SectionLabel number="01" text="MI AZ AI INTEGRÁCIÓ?" />
          <h2 className="type-section-heading mt-6 max-w-[18ch]">
            Nem eszköz. Működési modell.
          </h2>
        </motion.div>

        <motion.div
          className="mt-16 grid gap-16 lg:grid-cols-2"
          {...revealProps({ delay: 0.1, duration: 0.7 })}
        >
          <div className="max-w-[56ch]">
            <p className="type-body-large">
              Az AI integráció nem egy szoftver bevezetéséről szól. Arról szól,
              hogy egy vállalkozás napi működésének mely pontjain lehet az
              emberi munkát pontosabbá, gyorsabbá vagy részben kiválthatóvá
              tenni — úgy, hogy az eredmény megbízható és fenntartható legyen.
            </p>
            <p className="type-body-large mt-6">
              A legtöbb vállalkozásnál ezek a pontok nem nyilvánvalóak. Nem
              azért, mert bonyolultak, hanem mert belülről nehéz látni, mi az
              ami automatizálható, és mi az, ami valójában emberi jelenlétet
              igényel.
            </p>
            <p className="mt-6 max-w-[56ch] font-sans text-xl font-medium leading-[1.65] text-text-primary">
              Ez az a döntési folyamat, amiben segítek.
            </p>
          </div>

          <div className="flex justify-center lg:justify-center">
            <div className="flex aspect-square max-h-[480px] w-full items-center justify-center rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-glass)] p-6 backdrop-blur-md">
              <IntegrationDiagram />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-16 grid lg:mt-24 lg:grid-cols-3"
          {...revealProps({ delay: 0.2, duration: 0.6 })}
        >
          {stats.map((stat) => (
            <article
              className="border-t border-border-hairline px-4 py-6 first:border-t-0 lg:border-l lg:border-t-0 lg:px-8 lg:first:border-l-0"
              key={stat.source}
            >
              <p className="font-mono font-normal leading-none tracking-[-0.02em] text-text-primary [font-size:clamp(48px,6vw,72px)]">
                <CountUp
                  duration={stat.duration}
                  from={0}
                  suffix={stat.suffix}
                  to={stat.to}
                />
              </p>
              <p className="mt-4 max-w-[32ch] font-sans text-base leading-[1.5] text-text-secondary">
                {stat.label}
              </p>
              <p className="mt-6 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-text-tertiary">
                {stat.source}
              </p>
            </article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

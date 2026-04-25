"use client";

import { ChevronDown } from "lucide-react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useState } from "react";

import { Reveal } from "@/components/animations/reveal";
import { ScrollTriggerFade } from "@/components/animations/scroll-trigger";
import { HeroBackground } from "@/components/three/HeroBackground";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { GlassCard } from "@/components/ui/glass-card";
import { PillBadge } from "@/components/ui/pill-badge";
import { SectionLabel } from "@/components/ui/section-label";
import { cn } from "@/lib/utils";

const placeholderSections = [
  {
    heading: "Módszertan, röviden és lényegre törően.",
    id: "modszer",
    number: "02",
    text: "MÓDSZER",
  },
  {
    heading: "Válogatott munkák érkeznek a következő fázisban.",
    id: "munkak",
    number: "03",
    text: "MUNKÁK",
  },
  {
    heading: "Cikkek és jegyzetek hamarosan.",
    id: "cikkek",
    number: "04",
    text: "CIKKEK",
  },
  {
    heading: "Rólam szóló rész készül.",
    id: "rolam",
    number: "05",
    text: "RÓLAM",
  },
];

function ScrollIndicator() {
  const prefersReducedMotion = useReducedMotion();
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 80], [1, 0]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsHidden(latest > 80);
  });

  return (
    <motion.div
      className="absolute bottom-12 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-text-tertiary"
      style={{ opacity: prefersReducedMotion ? (isHidden ? 0 : 1) : opacity }}
    >
      <span>GÖRDÍTS</span>
      <motion.span
        animate={prefersReducedMotion ? undefined : { y: [-3, 0, -3] }}
        transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
      >
        <ChevronDown aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.5} />
      </motion.span>
    </motion.div>
  );
}

export function HeroSection() {
  return (
    <>
      <section className="relative isolate flex min-h-screen items-center overflow-hidden py-section-mobile lg:py-section-desktop">
        <HeroBackground />
        <Container className="relative z-10 grid gap-12 lg:grid-cols-[1fr_0.72fr] lg:items-center">
          <div className="max-w-3xl">
            <Reveal>
              <SectionLabel number="01" text="AI SYSTEMS FOR AMBITIOUS TEAMS" />
              <h1 className="type-hero mt-5 text-balance">
                Build sharper digital products with Zynai.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="type-body-large mt-6 max-w-2xl">
                A dark, motion-rich foundation for the next phase of the brand,
                content system, and ambient 3D interactions.
              </p>
            </Reveal>
            <Reveal className="mt-6 flex flex-wrap gap-2" delay={0.16}>
              <PillBadge>Folyamatautomatizáció</PillBadge>
              <PillBadge>n8n workflow fejlesztés</PillBadge>
              <PillBadge>AI integráció</PillBadge>
            </Reveal>
            <Reveal className="mt-8 flex flex-col gap-3 sm:flex-row" delay={0.2}>
              <Link
                className={cn(buttonVariants({ variant: "primary" }))}
                href="/style-guide"
              >
                View style guide
              </Link>
              <Link
                className={cn(buttonVariants({ variant: "secondary" }))}
                href="/blog"
              >
                Read articles
              </Link>
            </Reveal>
          </div>
          <ScrollTriggerFade>
            <GlassCard className="shadow-2xl shadow-black/30">
              <div className="aspect-square rounded-2xl border border-border-hairline bg-gradient-to-br from-white/10 via-white/[0.03] to-transparent" />
              <p className="type-label mt-5">
                Framer Motion · GSAP · Lenis · R3F
              </p>
            </GlassCard>
          </ScrollTriggerFade>
        </Container>
        <ScrollIndicator />
      </section>

      {placeholderSections.map((section) => (
        <section className="py-32" id={section.id} key={section.id}>
          <Container>
            <SectionLabel number={section.number} text={section.text} />
            <h2 className="mt-5 max-w-3xl font-display text-3xl font-medium leading-tight tracking-[-0.02em] text-text-secondary md:text-4xl">
              {section.heading}
            </h2>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.12em] text-text-tertiary">
              {"// Tartalom hamarosan"}
            </p>
          </Container>
        </section>
      ))}
    </>
  );
}

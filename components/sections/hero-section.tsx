import Link from "next/link";

import { Reveal } from "@/components/animations/reveal";
import { ScrollTriggerFade } from "@/components/animations/scroll-trigger";
import { AmbientScene } from "@/components/three/ambient-scene";
import { BackgroundGlow } from "@/components/ui/background-glow";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { GlassCard } from "@/components/ui/glass-card";
import { PillBadge } from "@/components/ui/pill-badge";
import { SectionLabel } from "@/components/ui/section-label";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="relative isolate flex min-h-[calc(100vh-4rem)] items-center overflow-hidden py-section-mobile lg:py-section-desktop">
      <BackgroundGlow />
      <AmbientScene />
      <Container className="grid gap-12 lg:grid-cols-[1fr_0.72fr] lg:items-center">
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
    </section>
  );
}

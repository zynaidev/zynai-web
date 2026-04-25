import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/animations/reveal";
import { ScrollTriggerFade } from "@/components/animations/scroll-trigger";
import { AmbientScene } from "@/components/three/ambient-scene";

export function HeroSection() {
  return (
    <section className="relative isolate flex min-h-[calc(100vh-4rem)] items-center overflow-hidden">
      <AmbientScene />
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[1fr_0.72fr] lg:items-center">
        <div className="max-w-3xl">
          <Reveal>
            <p className="mb-5 font-mono text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
              AI systems for ambitious teams
            </p>
            <h1 className="text-5xl font-semibold tracking-[-0.06em] text-balance sm:text-7xl">
              Build sharper digital products with Zynai.
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              A dark, motion-rich foundation for the next phase of the brand,
              content system, and ambient 3D interactions.
            </p>
          </Reveal>
          <Reveal className="mt-8 flex flex-col gap-3 sm:flex-row" delay={0.2}>
            <Link
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
              href="/style-guide"
            >
              View style guide
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
            <Link
              className="inline-flex h-12 items-center justify-center rounded-full border border-border px-6 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              href="/blog"
            >
              Read articles
            </Link>
          </Reveal>
        </div>
        <ScrollTriggerFade>
          <div className="rounded-[2rem] border border-border/70 bg-card/50 p-6 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="aspect-square rounded-[1.5rem] border border-border/70 bg-gradient-to-br from-neutral-200/20 via-neutral-500/10 to-transparent" />
            <p className="mt-5 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
              Framer Motion · GSAP · Lenis · R3F
            </p>
          </div>
        </ScrollTriggerFade>
      </div>
    </section>
  );
}

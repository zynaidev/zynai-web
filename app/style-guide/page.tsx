import { ArrowLink } from "@/components/ui/arrow-link";
import { BackgroundGlow } from "@/components/ui/background-glow";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { GlassCard } from "@/components/ui/glass-card";
import { PillBadge } from "@/components/ui/pill-badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionLabel } from "@/components/ui/section-label";

const colorTokens = [
  { group: "Backgrounds", name: "--bg-base", value: "#09090B" },
  { group: "Backgrounds", name: "--bg-elevated", value: "#0D0D10" },
  { group: "Backgrounds", name: "--bg-glass", value: "rgba(255,255,255,0.03)" },
  { group: "Backgrounds", name: "--bg-glass-strong", value: "rgba(255,255,255,0.05)" },
  { group: "Borders", name: "--border-hairline", value: "rgba(255,255,255,0.06)" },
  { group: "Borders", name: "--border-default", value: "rgba(255,255,255,0.10)" },
  { group: "Borders", name: "--border-accent", value: "#BDFF00" },
  { group: "Text", name: "--text-primary", value: "#FAFAFA" },
  { group: "Text", name: "--text-secondary", value: "#A1A1AA" },
  { group: "Text", name: "--text-tertiary", value: "#71717A" },
  { group: "Text", name: "--text-mono", value: "#A1A1AA" },
  { group: "Accent", name: "--accent", value: "#BDFF00" },
  { group: "Accent", name: "--accent-glow", value: "rgba(189,255,0,0.15)" },
  { group: "Accent", name: "--accent-text", value: "#BDFF00" },
  { group: "Accent", name: "--accent-on-light", value: "#1a1a00" },
];

export default function StyleGuidePage() {
  return (
    <main className="relative isolate overflow-hidden">
      <BackgroundGlow />
      <Container className="py-section-mobile lg:py-section-desktop">
        <SectionLabel number="00" text="DESIGN SYSTEM" />
        <h1 className="type-hero mt-5">ZynAI design system reference.</h1>
        <p className="type-body-large mt-6 max-w-3xl">
          Internal baseline for the sophisticated dark interface language:
          technical, credible, and sparing with lime emphasis.
        </p>
      </Container>

      <section className="py-section-mobile lg:py-section-desktop">
        <Container>
          <SectionLabel number="01" text="COLOR TOKENS" />
          <SectionHeading>Core palette and semantic variables.</SectionHeading>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {colorTokens.map((token) => (
              <GlassCard className="p-5 lg:p-6" key={token.name}>
                <div
                  className="h-20 rounded-xl border border-border-hairline"
                  style={{ background: token.value }}
                />
                <p className="type-label mt-4">{token.group}</p>
                <div className="mt-2 flex items-center justify-between gap-4">
                  <p className="font-mono text-sm text-text-primary">{token.name}</p>
                  <p className="font-mono text-xs text-text-tertiary">{token.value}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-section-mobile lg:py-section-desktop">
        <Container>
          <SectionLabel number="02" text="TYPOGRAPHY" />
          <SectionHeading>Fluid type scale.</SectionHeading>
          <div className="mt-10 grid gap-4">
            <GlassCard>
              <p className="type-label">HERO H1 · INSTRUMENT SANS 500</p>
              <p className="type-hero mt-4">Sophisticated AI integration.</p>
            </GlassCard>
            <GlassCard>
              <p className="type-label">SECTION H2 · INSTRUMENT SANS 500</p>
              <p className="type-section-heading mt-4">Technical depth without visual noise.</p>
            </GlassCard>
            <GlassCard>
              <p className="type-label">CARD H3 · INSTRUMENT SANS 500</p>
              <p className="type-card-heading mt-4">Credible systems language</p>
            </GlassCard>
            <GlassCard>
              <p className="type-label">BODY LARGE · INTER 400</p>
              <p className="type-body-large mt-4">
                Intro paragraphs use a relaxed line height and muted contrast for calm,
                premium readability across viewport sizes.
              </p>
            </GlassCard>
            <GlassCard>
              <p className="type-label">BODY · INTER 400</p>
              <p className="type-body mt-4">
                Default body copy stays at 16px with 1.6 line-height and secondary text color.
              </p>
            </GlassCard>
            <GlassCard>
              <p className="type-label">MONO UI LABEL · GEIST MONO 500</p>
              <p className="type-label mt-4">01 — MI AZ AI INTEGRÁCIÓ?</p>
            </GlassCard>
            <GlassCard>
              <p className="type-label">MONO STAT · GEIST MONO 400</p>
              <p className="type-stat mt-4 text-accent">57%</p>
            </GlassCard>
          </div>
        </Container>
      </section>

      <section className="py-section-mobile lg:py-section-desktop">
        <Container>
          <SectionLabel number="03" text="COMPONENTS" />
          <SectionHeading>Reusable interface primitives.</SectionHeading>
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <GlassCard>
              <p className="type-card-heading">Buttons</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button>Primary CTA</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost action</Button>
                <Button size="sm">Small CTA</Button>
              </div>
            </GlassCard>
            <GlassCard>
              <p className="type-card-heading">Badges and links</p>
              <div className="mt-6 flex flex-wrap gap-2">
                <PillBadge>Folyamatautomatizáció</PillBadge>
                <PillBadge>n8n workflow fejlesztés</PillBadge>
                <PillBadge>AI integráció</PillBadge>
              </div>
              <div className="mt-6">
                <ArrowLink href="/" text="Explore homepage" />
              </div>
            </GlassCard>
            <GlassCard>
              <p className="type-card-heading">Glass card</p>
              <p className="type-body mt-4">
                Cards use bg-glass, 20px backdrop blur, a hairline border, 16px radius,
                and responsive 24px / 40px padding.
              </p>
            </GlassCard>
          </div>
        </Container>
      </section>

      <section className="py-section-mobile lg:py-section-desktop">
        <Container>
          <SectionLabel number="04" text="SPACING" />
          <SectionHeading>Layout rhythm.</SectionHeading>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <GlassCard>
              <p className="type-card-heading">Sections</p>
              <p className="type-body mt-4">Mobile vertical padding: 80px</p>
              <p className="type-body">Desktop vertical padding: 160px</p>
            </GlassCard>
            <GlassCard>
              <p className="type-card-heading">Container and cards</p>
              <p className="type-body mt-4">Container max-width: 1280px</p>
              <p className="type-body">Horizontal padding: 24px mobile, 48px desktop</p>
              <p className="type-body">Card padding: 24px mobile, 40px desktop</p>
            </GlassCard>
          </div>
        </Container>
      </section>
    </main>
  );
}

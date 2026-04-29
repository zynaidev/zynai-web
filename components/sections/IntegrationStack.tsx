"use client";

const VERIFIED_ICONS = new Set([
  "anthropic",
  "openai",
  "googlegemini",
  "mistralai",
  "meta",
  "elevenlabs",
  "huggingface",
  "n8n",
  "zapier",
  "airtable",
  "notion",
  "slack",
  "discord",
  "telegram",
  "hubspot",
  "stripe",
  "github",
  "vercel",
  "cloudflare",
  "supabase",
  "postgresql",
  "linux",
  "docker",
]);

const row1Logos = [
  { name: "Claude", iconKey: "anthropic" },
  { name: "OpenAI", iconKey: "openai" },
  { name: "Gemini", iconKey: "googlegemini" },
  { name: "Mistral", iconKey: "mistralai" },
  { name: "Llama", iconKey: "meta" },
  { name: "Perplexity", iconKey: "perplexity" },
  { name: "ElevenLabs", iconKey: "elevenlabs" },
  { name: "Hugging Face", iconKey: "huggingface" },
];

const row2Logos = [
  { name: "n8n", iconKey: "n8n" },
  { name: "Make", iconKey: "make" },
  { name: "Zapier", iconKey: "zapier" },
  { name: "Airtable", iconKey: "airtable" },
  { name: "Notion", iconKey: "notion" },
  { name: "Slack", iconKey: "slack" },
  { name: "Discord", iconKey: "discord" },
  { name: "Telegram", iconKey: "telegram" },
  { name: "Google Workspace", iconKey: "googleworkspace" },
];

const row3Logos = [
  { name: "HubSpot", iconKey: "hubspot" },
  { name: "Stripe", iconKey: "stripe" },
  { name: "GitHub", iconKey: "github" },
  { name: "Vercel", iconKey: "vercel" },
  { name: "Cloudflare", iconKey: "cloudflare" },
  { name: "Supabase", iconKey: "supabase" },
  { name: "PostgreSQL", iconKey: "postgresql" },
  { name: "Linux", iconKey: "linux" },
  { name: "Docker", iconKey: "docker" },
];

const marqueeStyles = `
  @keyframes marquee-left {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes marquee-right {
    0% { transform: translateX(-50%); }
    100% { transform: translateX(0); }
  }
  @media (prefers-reduced-motion: reduce) {
    [data-marquee-track] {
      animation: none !important;
    }
  }
`;

function LogoChip({ name, iconKey }: { name: string; iconKey: string }) {
  const hasVerifiedIcon = VERIFIED_ICONS.has(iconKey);

  return (
    <div className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-glass)] backdrop-blur-md flex-shrink-0 hover:border-[var(--border-default)] hover:bg-[var(--bg-glass-strong)] transition-all duration-300">
      {hasVerifiedIcon ? (
        // eslint-disable-next-line @next/next/no-img-element -- Simple Icons CDN, lazy-loaded
        <img
          src={`https://cdn.simpleicons.org/${iconKey}/A1A1AA`}
          alt=""
          aria-hidden="true"
          className="w-4 h-4 opacity-80"
          loading="lazy"
        />
      ) : null}
      <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-[var(--text-secondary)] whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

function Marquee({
  direction,
  logos,
  duration = 60,
}: {
  direction: "left" | "right";
  logos: { name: string; iconKey: string }[];
  duration?: number;
}) {
  const items = [...logos, ...logos];

  return (
    <div
      className="relative h-[72px] flex items-center border-y border-[var(--border-hairline)] bg-[var(--bg-elevated)] overflow-hidden group"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
      }}
    >
      <div
        data-marquee-track
        className="flex gap-6 lg:gap-12 will-change-transform group-hover:[animation-play-state:paused]"
        style={{
          animation: `marquee-${direction} ${duration}s linear infinite`,
          width: "max-content",
          paddingLeft: "1.5rem",
        }}
      >
        {items.map((logo, idx) => (
          <LogoChip
            key={`${logo.name}-${idx}`}
            name={logo.name}
            iconKey={logo.iconKey}
          />
        ))}
      </div>
    </div>
  );
}

export function IntegrationStack() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: marqueeStyles }} />
      <section className="relative py-section-mobile lg:py-section-desktop overflow-hidden">
      {/* Section header — within standard container */}
      <div className="container mx-auto max-w-[1280px] px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto">
          {/* Decorative pre-heading row */}
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--border-default)]" />
            <span className="font-mono text-[12px] uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
              INTEGRÁCIÓK
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--border-default)]" />
          </div>

          {/* Heading */}
          <h2
            className="mt-6 font-display font-medium text-[var(--text-primary)]"
            style={{
              fontSize: "clamp(32px, 4.5vw, 48px)",
              lineHeight: "1.1",
              letterSpacing: "-0.02em",
            }}
          >
            Nem cserélni kell. Bővíteni.
          </h2>

          {/* Subhead */}
          <p
            className="mt-6 text-[var(--text-secondary)] leading-[1.65] max-w-2xl mx-auto"
            style={{ fontSize: "clamp(16px, 1.2vw, 18px)" }}
          >
            A meglévő szoftverkörnyezet — CRM, e-mail, könyvelés, projektkezelés adja a kiindulópontot. Az AI rétegként épül rá, és összeköti azt, ami eddig külön élt.
          </p>
        </div>
      </div>

      {/* 3 marquee strips */}
      <div className="mt-10 lg:mt-14 space-y-3 lg:space-y-4">
        <Marquee direction="left" logos={row1Logos} duration={60} />
        <Marquee direction="right" logos={row2Logos} duration={70} />
        <Marquee direction="left" logos={row3Logos} duration={65} />
      </div>
    </section>
    </>
  );
}

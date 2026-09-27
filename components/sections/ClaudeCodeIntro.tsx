import { HeroGrain } from "@/components/hero-grain";
import { heroLayers } from "@/components/hero-layers";
import { RevealLines } from "@/components/reveal-lines";
import { heroShimmerStartMs } from "@/components/reveal-lines-timing";
import { Shimmer } from "@/components/shimmer";
import { Container } from "@/components/ui/container";

export function ClaudeCodeIntro() {
  return (
    <section className="relative py-section-mobile lg:py-section-desktop">
      <HeroGrain />
      <div
        aria-hidden="true"
        className="hero-dot-grid pointer-events-none absolute inset-0"
        style={{ zIndex: heroLayers.grid }}
      />
      <Container className="relative" style={{ zIndex: heroLayers.content }}>
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-accent/30 bg-accent-glow px-4 py-1.5 text-center font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-accent-text sm:text-[11px] sm:tracking-[0.14em]">
            <span className="relative flex size-2 shrink-0">
              <span className="absolute inline-flex size-full animate-ping motion-reduce:animate-none rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            <span>Ingyenes eszköz</span>
          </span>

          <Shimmer className="mt-7 block" delayMs={heroShimmerStartMs(0)}>
            <RevealLines as="h1" className="type-hero">
              <span className="hero-laminate">Prompt-építő Claude Code-hoz</span>
            </RevealLines>
          </Shimmer>

          <p className="type-body-large mx-auto mt-7 max-w-xl">
            Magyarul írod le, mit szeretnél. Angol promptot kapsz, pontos
            hatókörrel — úgy, ahogy egy valódi projekten is használnám.
          </p>
          <p className="type-body mx-auto mt-5 max-w-xl">
            A legtöbb hiba nem ott keletkezik, ahol az AI kódol, hanem ott,
            ahol elindítod. Ha nem mondod meg, melyik fájlt módosíthatja,
            hozzányúl máshoz is. Ha nem kéred, hogy előbb olvasson,
            találgatni fog. Ha nem zárod le, megy tovább. Ez az eszköz
            ezeket teszi bele helyetted.
          </p>
          <p className="type-body mx-auto mt-5 max-w-xl">
            A prompt angolul pontosabb, mert a modellek túlnyomórészt angol
            kódon és angol dokumentáción tanultak. A jelentést viszont
            magyarul kéred vissza, mert azt neked kell értened. Ez nem stílus
            kérdése: a saját projektedet a végén neked kell tudnod
            karbantartani.
          </p>
        </div>
      </Container>
    </section>
  );
}

import type { Metadata } from "next";

import { ClaudeCodeClosing } from "@/components/sections/ClaudeCodeClosing";
import { ClaudeCodeIntro } from "@/components/sections/ClaudeCodeIntro";
import { ClaudeCodePromptBuilder } from "@/components/sections/ClaudeCodePromptBuilder";
import { ClaudeCodeTips } from "@/components/sections/ClaudeCodeTips";
import { Container } from "@/components/ui/container";

// Cím és leírás szó szerint: content/claude-code/prompt-epito.md, 8. szakasz.
// A cím "absolute"-ként van megadva, mert a szöveg már saját maga
// tartalmazza a "| ZynAI" végződést — a gyökér layout "%s — ZynAI"
// sablonja duplázná a márkajelzést, ha egyszerű stringként adnánk meg.
const OG_IMAGE = {
  url: "/claude-code/zynai-claude-code.png",
  width: 1200,
  height: 630,
  alt: "Pixelgrafika három színes, Space Invaders-stílusú alakkal a „Promptépítő Claude Code-hoz” felirat felett, sötét háttéren.",
};

export const metadata: Metadata = {
  title: {
    absolute:
      "Promptépítő Claude Code-hoz — magyar nyelvű promptgenerátor | ZynAI",
  },
  description:
    "Magyarul írod le, mit szeretnél, és pontos hatókörű angol promptot kapsz Claude Code-hoz. Ingyenes eszköz, tíz prompttípussal.",
  openGraph: {
    images: [OG_IMAGE],
  },
  twitter: {
    images: [OG_IMAGE],
  },
};

export default function ClaudeCodePage() {
  return (
    <main>
      <ClaudeCodeIntro />

      <ClaudeCodePromptBuilder />

      <section className="border-t border-border-hairline py-section-mobile lg:py-section-desktop">
        <Container>
          <h2 className="type-section-heading">
            Három dolog, ami minden promptnál számít
          </h2>
          <ol className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <li className="rounded-lg border border-border-hairline bg-bg-elevated p-card-mobile md:p-card-desktop">
              <h3 className="type-card-heading">Pontos hatókör.</h3>
              <p className="type-body mt-2">
                Mondd meg, melyik fájlhoz nyúlhat, és hogy máshoz ne
                nyúljon. E nélkül szétfut a munka, és a végén nem tudod, mi
                változott.
              </p>
            </li>
            <li className="rounded-lg border border-border-hairline bg-bg-elevated p-card-mobile md:p-card-desktop">
              <h3 className="type-card-heading">Előbb olvasson, aztán írjon.</h3>
              <p className="type-body mt-2">
                Meglévő kódnál kérd, hogy előbb olvassa el és mondja el, mit
                talált. Feltételezett okra ne adj parancsot.
              </p>
            </li>
            <li className="rounded-lg border border-border-hairline bg-bg-elevated p-card-mobile md:p-card-desktop">
              <h3 className="type-card-heading">Zárd le, és kérj jelentést.</h3>
              <p className="type-body mt-2">
                A „Stop when done&quot; nélkül továbbmegy. A kért jelentés
                nélkül pedig neked kell kitalálnod, mi történt.
              </p>
            </li>
          </ol>
          <p className="type-body-large mt-6">
            Ha ezt a hármat betartod, a promptjaid nyolcvan százaléka
            rendben lesz. A maradék húsz a gyakorlatból jön.
          </p>
        </Container>
      </section>

      <ClaudeCodeTips />

      <ClaudeCodeClosing />

      <section className="border-t border-border-hairline py-8 md:py-12">
        <Container>
          <p className="mx-auto max-w-xl text-center text-sm text-text-secondary">
            Amit ide beírsz, a saját böngésződben marad. Nem küldjük el
            sehová, és nem tároljuk. Ha törlöd a böngésződ adatait, a
            mentett promptjaid is eltűnnek — ezért van a letöltés gomb.
          </p>
        </Container>
      </section>
    </main>
  );
}

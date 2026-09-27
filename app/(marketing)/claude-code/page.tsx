import Link from "next/link";

import { ClaudeCodePromptBuilder } from "@/components/sections/ClaudeCodePromptBuilder";
import { Container } from "@/components/ui/container";

export default function ClaudeCodePage() {
  return (
    <main>
      <section>
        <Container>
          <p>Ingyenes eszköz</p>
          <h1>Prompt-építő Claude Code-hoz</h1>
          <p>
            Magyarul írod le, mit szeretnél. Angol promptot kapsz, pontos
            hatókörrel — úgy, ahogy egy valódi projekten is használnám.
          </p>
          <p>
            A legtöbb hiba nem ott keletkezik, ahol az AI kódol, hanem ott,
            ahol elindítod. Ha nem mondod meg, melyik fájlt módosíthatja,
            hozzányúl máshoz is. Ha nem kéred, hogy előbb olvasson,
            találgatni fog. Ha nem zárod le, megy tovább. Ez az eszköz
            ezeket teszi bele helyetted.
          </p>
          <p>
            A prompt angolul pontosabb, mert a modellek túlnyomórészt angol
            kódon és angol dokumentáción tanultak. A jelentést viszont
            magyarul kéred vissza, mert azt neked kell értened. Ez nem stílus
            kérdése: a saját projektedet a végén neked kell tudnod
            karbantartani.
          </p>
        </Container>
      </section>

      <ClaudeCodePromptBuilder />

      <section>
        <Container>
          <h2>Három dolog, ami minden promptnál számít</h2>
          <ol>
            <li>
              <h3>Pontos hatókör.</h3>
              <p>
                Mondd meg, melyik fájlhoz nyúlhat, és hogy máshoz ne
                nyúljon. E nélkül szétfut a munka, és a végén nem tudod, mi
                változott.
              </p>
            </li>
            <li>
              <h3>Előbb olvasson, aztán írjon.</h3>
              <p>
                Meglévő kódnál kérd, hogy előbb olvassa el és mondja el, mit
                talált. Feltételezett okra ne adj parancsot.
              </p>
            </li>
            <li>
              <h3>Zárd le, és kérj jelentést.</h3>
              <p>
                A „Stop when done" nélkül továbbmegy. A kért jelentés
                nélkül pedig neked kell kitalálnod, mi történt.
              </p>
            </li>
          </ol>
          <p>
            Ha ezt a hármat betartod, a promptjaid nyolcvan százaléka
            rendben lesz. A maradék húsz a gyakorlatból jön.
          </p>
        </Container>
      </section>

      <section>
        <Container>
          <h2>Tippek és trükkök</h2>
          <p>
            Ez a rész változik, ahogy a modellek változnak. Minden bejegyzés
            dátumozva van — ha régi, kezeld fenntartással.
          </p>
          <ul>
            <li>
              <h3>2026. 09. — A kontextus a legdrágább erőforrásod</h3>
              <p>
                Nem a kimenet kerül sokba, hanem az, hogy minden üzenetnél
                viszed magaddal az egész előzményt. Ezért olcsó a pontos
                prompt, és drága a felderítés, a hosszú szál és a teljes
                képernyős képernyőkép. Feladatonként új beszélgetés.
              </p>
            </li>
            <li>
              <h3>2026. 09. — A képernyőkép a leggyorsabb hibajelentés</h3>
              <p>
                Vizuális hibánál illeszd be a képet, és írd mellé, mit látsz
                és mit vártál helyette. Csak a releváns részről készíts
                képet — a teljes oldalas kép sokba kerül és keveset mond.
              </p>
            </li>
            <li>
              <h3>2026. 09. — Az „eltűnt a hiba, de nem tudom, miért" gyanús</h3>
              <p>
                Ez azt jelenti, hogy elnyomta, nem javította. Keress
                `any`-t, `@ts-ignore`-t és üres `catch` blokkot. Ugyanígy
                gyanús, ha teljes átírást javasol: az azt jelenti, hogy nem
                találja a hibát.
              </p>
            </li>
            <li>
              <h3>2026. 09. — Ami beágyazható, azt ne építsd meg</h3>
              <p>
                Foglalás, térkép, videó: ezekre van kész beágyazás. Az AI
                szívesen megépíti neked a sajátodat, de azt neked kell
                karbantartanod.
              </p>
            </li>
          </ul>
        </Container>
      </section>

      <section>
        <Container>
          <h2>Ez egy kivonat egy nagyobb rendszerből</h2>
          <p>
            Ezek a sablonok egy munkamódszer részei, ami valódi
            ügyfélprojekteken állt össze. A teljes rendszerben van
            specifikációs sablon, projektszabályok, élesítés előtti
            ellenőrzőlista és menetrend arra az esetre, ha elakadsz.
          </p>
          <p>
            A VibeCoding képzésen ezt tanítom: nem a kódolást, hanem a
            döntéseket. Mit építs, milyen sorrendben, és honnan tudod, hogy
            kész van.
          </p>
          <Link href="/vibecoding-pilot">Megnézem a képzést</Link>
          <a
            href="https://www.facebook.com/groups/1355789193061643"
            rel="noopener noreferrer"
            target="_blank"
          >
            Csatlakozom a Facebook-csoporthoz
          </a>
        </Container>
      </section>

      <section>
        <Container>
          <p>
            Amit ide beírsz, a saját böngésződben marad. Nem küldjük el
            sehová, és nem tároljuk. Ha törlöd a böngésződ adatait, a
            mentett promptjaid is eltűnnek — ezért van a letöltés gomb.
          </p>
        </Container>
      </section>
    </main>
  );
}

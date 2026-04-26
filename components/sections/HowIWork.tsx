import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

type WorkflowCard = {
  index: string;
  title: string;
  body: string;
  deliverables: string[];
};

const cardZIndex = ["z-10", "z-20", "z-30"] as const;

const workflowCards: WorkflowCard[] = [
  {
    index: "01 / 03",
    title: "Folyamatfelmérés",
    body: "A vállalkozás működésének strukturált átvizsgálása. Azonosítom azokat a területeket, ahol az AI integráció mérhető eredményt hozhat — és azokat is, ahol nem érné meg a befektetést.",
    deliverables: [
      "Folyamattérkép",
      "ROI becslés",
      "Prioritási sorrend",
      "Megvalósítási terv",
    ],
  },
  {
    index: "02 / 03",
    title: "Rendszertervezés és integráció",
    body: "A meglévő szoftverkörnyezetbe illesztett automatizációs rendszerek tervezése és megvalósítása. n8n, Claude API, Google-ökoszisztéma és egyéb eszközök kombinációjával.",
    deliverables: [
      "n8n workflow",
      "API integráció",
      "AI prompt design",
      "Tesztelés és átadás",
    ],
  },
  {
    index: "03 / 03",
    title: "Self-hosted infrastruktúra",
    body: "Akinek az adatvédelem vagy a hosszú távú költséghatékonyság indokolja, saját szerveren futó AI rendszert alakítok ki. A vállalkozás adatai nem kerülnek ki külső rendszerekbe, az üzemeltetési költség töredékére csökken.",
    deliverables: [
      "Saját szerver",
      "Helyi LLM",
      "Teljes adatkontroll",
      "Alacsony üzemeltetés",
    ],
  },
];

export function HowIWork() {
  return (
    <section className="relative py-20 md:py-32 lg:py-40" id="hogyan">
      <Container>
        <SectionLabel number="02" text="HOGYAN DOLGOZOM?" />
        <h2 className="type-section-heading mt-6 lg:max-w-[16ch]">
          Folyamatfelmérés. Diagnózis. Megvalósítás.
        </h2>

        <div className="mt-10 max-w-[60ch]">
          <p className="type-body-large">
            Minden projekt egy strukturált folyamatfelméréssel kezdődik.
            Megvizsgálom a vállalkozás jelenlegi működését — az ismétlődő
            feladatokat, az emberi szűk keresztmetszeteket, az adatáramlást a
            rendszerek között. Ebből kiderül, hol van valódi lehetőség az AI
            bevezetésére, és hol nincs.
          </p>
          <p className="type-body-large mt-5">
            Az eredmény nem egy prezentáció. Egy konkrét kép arról, mit érdemes
            megvalósítani, milyen sorrendben, és milyen várható hatással.
          </p>
          <p className="mt-5 font-sans leading-[1.65] text-text-primary [font-size:clamp(16px,1.2vw,18px)]">
            A megvalósítást is én végzem — a diagnózistól az éles rendszerig.
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-8 md:mt-24 lg:gap-0">
          {workflowCards.map((card, index) => (
            <article
              className={`relative rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-glass)] p-6 backdrop-blur-md md:p-10 lg:sticky lg:top-[100px] lg:min-h-[480px] ${cardZIndex[index]}`}
              key={card.index}
            >
              <div className="flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7">
                  <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-text-tertiary">
                    {card.index}
                  </p>
                  <h3 className="mt-4 font-display font-medium leading-[1.15] tracking-[-0.02em] text-text-primary [font-size:clamp(28px,3vw,40px)]">
                    {card.title}
                  </h3>
                  <p className="mt-5 max-w-[50ch] font-sans text-base leading-[1.65] text-text-secondary">
                    {card.body}
                  </p>
                  <ul className="mt-8 flex flex-wrap gap-2">
                    {card.deliverables.map((deliverable) => (
                      <li
                        className="rounded-full border border-[var(--border-hairline)] bg-[var(--bg-glass)] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--text-secondary)]"
                        key={deliverable}
                      >
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-5">
                  <div className="flex aspect-square items-center justify-center rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] lg:aspect-[4/3]">
                    <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-text-tertiary opacity-50">
                      {"// VIZUÁLIS ELEM — KÖVETKEZŐ FÁZIS"}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

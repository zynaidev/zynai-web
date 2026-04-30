"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { ProcessFlowSVG } from "@/components/visuals/ProcessFlowSVG";
import { NetworkSVG } from "@/components/visuals/NetworkSVG";
import { ServerSVG } from "@/components/visuals/ServerSVG";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type WorkflowCard = {
  index: string;
  title: string;
  body: string;
  deliverables: string[];
};

const cardZIndex = ["lg:z-[1]", "lg:z-[2]", "lg:z-[3]"] as const;

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
  const cardsScope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!cardsScope.current) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const articles = gsap.utils.toArray<HTMLElement>(
          cardsScope.current!.querySelectorAll("[data-workflow-card]"),
        );
        if (articles.length < 2) return;

        articles.forEach((el) => {
          gsap.set(el, { opacity: 1, scale: 1 });
        });

        const triggers = articles.slice(0, -1).map((article, i) => {
          const next = articles[i + 1];
          return ScrollTrigger.create({
            trigger: next,
            start: "top bottom",
            end: "top 100px",
            scrub: true,
            animation: gsap.to(article, {
              ease: "none",
              opacity: 0.6,
              scale: 0.94,
            }),
          });
        });

        return () => {
          triggers.forEach((st) => st.kill());
        };
      });

      return () => {
        mm.revert();
      };
    },
    { scope: cardsScope },
  );

  return (
    <section className="relative py-20 md:py-32 lg:py-40" id="hogyan">
      <Container>
        <SectionLabel number="02" text="HOGYAN DOLGOZOM?" />

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col items-start lg:col-span-6 lg:self-start lg:sticky lg:top-[100px]">
            <h2
              className="break-words"
              style={{
                fontSize: "clamp(40px, 5vw, 64px)",
                lineHeight: "1.05",
                letterSpacing: "-0.03em",
              }}
            >
              <span className="block text-[var(--text-primary)]">
                Folyamatfelmérés.
              </span>
              <span className="block text-[var(--text-primary)]">
                Diagnózis.
              </span>
              <span
                className="block"
                style={{ opacity: 0.7, color: "var(--text-primary)" }}
              >
                Megvalósítás.
              </span>
            </h2>
          </div>

          <div className="max-w-[56ch] lg:col-span-6">
            <p className="font-sans text-base leading-[1.65] text-text-secondary lg:text-[18px]">
              Minden projekt egy strukturált folyamatfelméréssel kezdődik.
              Megvizsgálom a vállalkozás jelenlegi működését — az ismétlődő
              feladatokat, az emberi szűk keresztmetszeteket, az adatáramlást a
              rendszerek között. Ebből kiderül, hol van valódi lehetőség az AI
              bevezetésére, és hol nincs.
            </p>
            <p className="mt-5 font-sans text-base leading-[1.65] text-text-secondary lg:text-[18px]">
              Az eredmény nem egy prezentáció. Egy konkrét kép arról, mit érdemes
              megvalósítani, milyen sorrendben, és milyen várható hatással.
            </p>
            <p className="mt-5 font-sans text-base font-medium leading-[1.65] text-text-primary lg:text-[18px]">
              A megvalósítást is én végzem — a diagnózistól az éles rendszerig.
            </p>
          </div>
        </div>

        <div
          className="mt-16 flex flex-col gap-8 md:mt-24 lg:gap-0"
          ref={cardsScope}
        >
          {workflowCards.map((card, index) => (
            <article
              className={`relative rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] p-6 md:p-10 lg:sticky lg:top-[100px] lg:min-h-[480px] ${cardZIndex[index]}`}
              data-workflow-card=""
              key={card.index}
            >
              <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden">
                <div
                  className={
                    index === 0
                      ? "absolute top-[-20%] right-[-10%] w-[60%] h-[80%]"
                      : "absolute top-[-10%] right-[-10%] w-[60%] h-[80%]"
                  }
                  style={{
                    background:
                      index === 0
                        ? "radial-gradient(circle, rgba(189,255,0,0.07) 0%, transparent 70%)"
                        : index === 1
                          ? "radial-gradient(circle, rgba(100,80,220,0.10) 0%, transparent 70%)"
                          : "radial-gradient(circle, rgba(30,100,200,0.10) 0%, transparent 70%)",
                    filter: "blur(40px)",
                  }}
                />
              </div>
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

                <div className="lg:col-span-5 lg:h-full lg:min-h-0">
                  <div className="hidden lg:flex items-center justify-center w-full h-full">
                    <div className="w-[80%] h-[80%] flex items-center justify-center">
                      {index === 0 ? (
                        <ProcessFlowSVG />
                      ) : index === 1 ? (
                        <NetworkSVG />
                      ) : (
                        <ServerSVG />
                      )}
                    </div>
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

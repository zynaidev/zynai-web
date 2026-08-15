"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { PAIN_POINTS } from "@/lib/contact-types";

const PAIN_POINT_COPY: Record<string, { title: string; desc: string }> = {
  ajanlatadas: {
    title: "Napokig tart, mire kimegy egy ajánlat.",
    desc: "Mire összeáll az árazás és megírod, a versenytárs már válaszolt.",
  },
  email_ismetlodo: {
    title: "Ugyanarra a kérdésre válaszolsz tizedszer.",
    desc: "Az érdeklődők nagyjából ugyanazt kérdezik, mégis mindet kézzel írod meg.",
  },
  adatmasolas: {
    title: "Valaki minden reggel adatokat gépel át.",
    desc: "Egyik rendszerből a másikba, kézzel — elgépelésekkel együtt.",
  },
  szamlazas_admin: {
    title: "Az adminisztráció elviszi a hét egy napját.",
    desc: "Számlák rögzítése, dokumentumok iktatása, ismétlődő papírmunka.",
  },
  riportok: {
    title: "A havi kimutatás összerakása külön projekt.",
    desc: "Több helyről kell összeszedni az adatokat, mire kijön egy szám.",
  },
  ugyfelkovetes: {
    title: "Érdeklődők vesznek el utánkövetés hiányában.",
    desc: "Nem azért nem vettek, mert nem akartak — csak senki nem jelentkezett náluk.",
  },
  tartalom: {
    title: "A tartalomgyártás mindig utolsó helyre csúszik.",
    desc: "Tudod, hogy kellene írni, de sosem lesz rá idő.",
  },
};

// "egyeb" szándékosan kimarad ebből a szekcióból — az csak a wizard szabad
// szöveges opciója, nem egy felismerhető fájdalompont.
const painPointCards = PAIN_POINTS.filter((p) => p.id !== "egyeb").map(
  (p) => ({ id: p.id, ...PAIN_POINT_COPY[p.id] }),
);

export function PainPoints() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <>
      <style>{`
        .pp-card:hover [data-hover-line] {
          transform: scaleX(1) !important;
        }
      `}</style>
      <section className="relative py-20 md:py-32" id="idorablok" ref={sectionRef}>
        <Container>
          <SectionLabel number="01" text="ISMERŐS?" />

          <motion.div
            className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex flex-col items-start lg:col-span-5 lg:self-start lg:sticky lg:top-[100px]">
              <h2 className="font-display font-medium leading-[1.05] tracking-[-0.03em] text-text-primary [font-size:clamp(40px,5vw,64px)]">
                <span className="block text-[var(--text-primary)]">
                  Ismerős valamelyik?
                </span>
                <span
                  className="block text-[var(--text-secondary)]"
                  style={{ opacity: 0.7 }}
                >
                  Akkor van mit automatizálni.
                </span>
              </h2>
            </div>

            <div className="max-w-[56ch] lg:col-span-7">
              <p className="font-sans text-base leading-[1.65] text-text-secondary lg:text-[18px]">
                Ezeket a listákat nem véletlenül ismered fel. Szinte minden
                magyar KKV ugyanazon a néhány ponton veszít napi szinten
                időt. A jó hír, hogy pont ezek azok, amiket ma már
                megbízhatóan ki lehet váltani.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-20 lg:gap-5"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            {painPointCards.map((card, index) => (
              <Link
                key={card.id}
                href={`/kapcsolatfelvetel?pain=${card.id}`}
                className={cn(
                  "pp-card group relative flex flex-col justify-center gap-2 overflow-hidden rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] p-6 transition-all duration-300 hover:border-[var(--border-default)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)] lg:p-8",
                  index === painPointCards.length - 1 && "md:col-span-2",
                )}
              >
                <h3 className="font-display text-[18px] font-medium leading-[1.35] text-[var(--text-primary)] transition-colors duration-200 group-hover:text-white lg:text-[20px]">
                  {card.title}
                </h3>
                <p className="text-[14px] leading-[1.6] text-[var(--text-secondary)] lg:text-[15px]">
                  {card.desc}
                </p>

                {/* Hover fill line — a Resources szekció lime hover-vonalának mintája */}
                <div
                  className="pointer-events-none absolute bottom-0 left-0 right-0"
                  data-hover-line
                  style={{
                    height: "2px",
                    background:
                      "linear-gradient(to right, transparent 0%, rgba(189,255,0,0.8) 20%, rgba(189,255,0,1) 50%, rgba(189,255,0,0.8) 80%, transparent 100%)",
                    boxShadow:
                      "0 0 12px rgba(189,255,0,0.6), 0 0 24px rgba(189,255,0,0.3)",
                    transform: "scaleX(0)",
                    transformOrigin: "left center",
                    transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                />
              </Link>
            ))}
          </motion.div>

          <motion.div
            className="mt-12 flex items-center justify-center"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <Link
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-hairline)] px-6 py-3 text-center font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--text-secondary)] transition-all duration-200 hover:border-[var(--border-default)] hover:text-[var(--text-primary)]"
              href="/kapcsolatfelvetel"
            >
              Több is igaz rád? Jelöld be mindet egy perc alatt.
              <ArrowRight size={14} className="shrink-0" />
            </Link>
          </motion.div>
        </Container>
      </section>
    </>
  );
}

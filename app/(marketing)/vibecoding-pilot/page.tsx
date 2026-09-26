import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ClipboardList,
  FileText,
  Map,
  MessageCircle,
  MessagesSquare,
  ScrollText,
  Sparkles,
  Terminal,
  Users,
  X,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/animations/reveal";

import { PilotApplicationForm } from "./PilotApplicationForm";
import { FaqAccordion, type FaqItem } from "./FaqAccordion";
import { HeroStats } from "./HeroStats";
import { LandingExamples } from "./LandingExamples";
import { PilotStickyCta } from "./PilotStickyCta";

export const metadata: Metadata = {
  title: "VibeCoding 1.0 - Pilot — építs AI-jal weboldalt, október 8-tól",
  description:
    "VibeCoding 1.0 - Pilot, hat hét. Előzetes tapasztalat nélkül, kész architektúrán tanulod meg a folyamatot egy gyakorlóprojekten, és elindítod a sajátodat.",
};

const RESULTS = [
  "Kész gyakorlóoldal, amin a módszert megtanulod",
  "Elindított saját projekt, saját domainen",
  "Működő űrlap és mérés, amiről tudod, hogy tényleg mér",
  "A munkarendszered: brief, szabályok, promptok, hibakeresés, minőségi kapu",
  "Ajánlat és karbantartás a következő projekthez",
];

const WEEKS: {
  n: string;
  title: string;
  text: string;
  extra?: { title: string; text: string };
}[] = [
  {
    n: "01",
    title: "Brief",
    text: "Kapsz egy kész briefet, és tudod, mit vállalhatsz el — és mit nem.",
  },
  {
    n: "02",
    title: "Első élő oldal",
    text: "Kapsz egy éles oldalt, még mielőtt tétje lenne, és egy menetet arra, hogyan állsz vissza, ha elromlik.",
  },
  {
    n: "03",
    title: "Teljes váz",
    text: "Kapsz egy kész oldalszerkezetet, és azt a módszert, amivel egy változtatás egy helyen marad.",
  },
  {
    n: "04",
    title: "Designolt oldal",
    text: "Kapsz egy kész, megtervezett oldalt, és látod, mitől konvertál az egyik, a másik miért nem.",
  },
  {
    n: "05",
    title: "Űrlap, e-mail, mérés",
    text: "Kapsz működő űrlapot, valódi e-mail-kézbesítést és mérést. A jel, hogy kész: megérkezett az e-mail.",
  },
  {
    n: "06",
    title: "Minőségi kapu",
    text: "Önállóan, segítség nélkül indítasz el egy projektet a saját briefedből. Itt derül ki, rögzült-e a módszer.",
    extra: {
      title: "Ajánlat és átadás",
      text: "Kapsz árazást, ajánlatot és átadási menetet. Egy folyamatot, amit a következő munkánál újra használsz.",
    },
  },
];

const INCLUDES = [
  "12 élő webinár, egyenként 60 perc",
  "0. alkalom: technikai belépő a képzés előtt",
  "Legfeljebb 4 fős kör",
  "Páros rendszer két alkalom között",
  "Zárt Discord-csoport",
  "A webinárok felvétele 1 évig visszanézhető",
  "+30 nap utánkövetés, utána a fejlesztői közösség",
  "A munkakészlet véglegesen a tiéd",
];

const SUPPORT: { icon: typeof Users; lead: string; text: string }[] = [
  {
    icon: Users,
    lead: "Páros rendszer",
    text: "Két alkalom között van kihez fordulnod, nem csak az élő webináron.",
  },
  {
    icon: MessagesSquare,
    lead: "Élő Q&A",
    text: "Ha kell, külön alkalmat iktatunk be. Bármilyen elakadásnál addig megyünk, amíg meg nem oldjuk.",
  },
  {
    icon: MessageCircle,
    lead: "Discord",
    text: "Képernyőképet vagy kérdést küldesz. Munkanapokon 24 órán belül válaszolok.",
  },
];

const TOOLKIT: { icon: typeof FileText; label: string }[] = [
  { icon: FileText, label: "Specifikációs sablon" },
  { icon: ScrollText, label: "Projektszabályok" },
  { icon: Terminal, label: "Prompt-minták" },
  { icon: ClipboardList, label: "Élesítés előtti ellenőrzőlista" },
  { icon: Map, label: "Menetrend elakadásra" },
];

const FOR_YOU = [
  {
    n: "01",
    lead: "Pályát módosítanál",
    text: "és egy gyakorlati, eladható digitális készséget építenél fel. Nem egy újabb AI-eszközt akarsz kipróbálni, hanem megtanulni, hogyan lesz egy ötletből működő weboldal.",
  },
  {
    n: "02",
    lead: "Van vállalkozásod vagy ötleted",
    text: "amihez weboldal kell, és nem akarsz kiszolgáltatott lenni annak, aki elkészíti.",
  },
  {
    n: "03",
    lead: "Használtál már AI-t",
    text: "és láttad, hogy öt perc alatt legenerál egy oldalt. Azt is láttad, hogy az az oldal nem ügyfélképes, csak nem tudtad megfogalmazni, miért.",
  },
];

const NOT_FOR_YOU = [
  "Azt várod, hogy hat hét alatt fejlesztő legyél. Nem leszel az, és ezt nem is ígérem.",
  "Nem tudsz heti nagyjából hat órát rászánni.",
  "Csak generáltatni akarsz, érteni nem. Arra vannak gyorsabb eszközök.",
];

const SKILLS = [
  {
    lead: "Specifikáció",
    text: "Egy ötletből olyan leírást készítesz, amely alapján te és az AI is tudjátok, mit kell építeni.",
  },
  {
    lead: "Irányítás",
    text: "Úgy kéred a módosítást, hogy az AI ne kezdjen el közben máshol is változtatni.",
  },
  {
    lead: "Hibakeresés",
    text: "Felismered, amikor az AI magabiztosan téved, és megtalálod, hol rontotta el.",
  },
  {
    lead: "Élesítés",
    text: "Saját domainen élesíted az oldalt, és érted, mi történik mögötte: domain, DNS, HTTPS, e-mail.",
  },
  {
    lead: "Mérés",
    text: "Ellenőrzöd, hogy egy konverzió tényleg megtörténik-e, és nem csak a kódban szerepel.",
  },
  {
    lead: "Kész van-e",
    text: "Eldöntöd, mikor van kész valami, és mikor csak úgy néz ki.",
  },
  {
    lead: "Költség",
    text: "Kézben tartod, melyik eszköz mire való, és mi drágítja.",
  },
];

const DATA_ROWS: { label: string; value: ReactNode }[] = [
  { label: "Indulás", value: "2026. október 8., csütörtök" },
  { label: "Időtartam", value: "6 hét, heti 2×60 perc élő webinár" },
  { label: "0. alkalom", value: "technikai belépő a képzés előtt" },
  {
    label: "Időpontok",
    value: "minden kedden és csütörtökön, 18:00-tól",
  },
  { label: "Létszám", value: "legfeljebb 4 fő" },
  { label: "Ráfordítás", value: "heti kb. 6 óra, a webinárokkal együtt" },
  { label: "Utánkövetés", value: "+30 nap a zárás után, a már élő projekten" },
  {
    label: "Közösség",
    value: "a 30 nap után a fejlesztői közösség tagja leszel",
  },
  { label: "Felvétel", value: "a webinárok egy évig visszanézhetők" },
  { label: "Kapcsolattartás", value: "páros rendszer és zárt Discord-csoport" },
  { label: "Ár", value: "br. 49 000 Ft" },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Tényleg nem kell hozzá programozói tudás?",
    answer:
      "Nem. Technikai előképzettség nem kell, a tanulásra való hajlandóság igen. A munka során végig látod, mi miért készült: az AI minden lépésnél elmondja, mit csinált, és mi ezt együtt értelmezzük. A végére laikusként is érteni fogod, hogyan épül fel az oldalad, melyik rész mit csinál, és hol kell hozzányúlni, ha változtatni kell.",
  },
  {
    question: "Mi van, ha nincs saját projektötletem?",
    answer:
      "A gyakorlóprojekt kész brieffel önmagában is végigvihető. Saját ötlet nélkül is részt vehetsz, a módszer ugyanaz.",
  },
  {
    question: "Mi történik, ha elakadok?",
    answer:
      "Van páros rendszered: két alkalom között van kihez fordulnod. Ha kell, külön élő Q&A alkalmat iktatunk be, és bármilyen elakadásnál addig megyünk, amíg meg nem oldjuk. Emellett zárt Discord-csoport, ahová képernyőképet vagy kérdést küldhetsz — munkanapokon 24 órán belül válaszolok.",
  },
  {
    question: "Windows vagy Mac kell?",
    answer:
      "Mindkettő jó. A 0. alkalmon, a technikai belépőn együtt állítjuk be a környezetet, és addig nem megyünk tovább, amíg nálad is nem működik.",
  },
  {
    question: "Mi lesz az oldalammal a képzés után?",
    answer:
      "A tiéd, mindenestül: a kód, a domain, a fiókok. Ez nem mellékes részlet, hanem az egyik dolog, amit itt megtanulsz: minden a tulajdonos nevén legyen.",
  },
  {
    question: "Élőben zajlanak az alkalmak?",
    answer:
      "Igen. Tizenkét élő webinár, egyenként 60 perc, plusz egy technikai belépő a képzés előtt. Nem előre felvett videók. Az élő időn a gyakorlóprojekttel dolgozunk, a kérdéseidre ott kapsz választ.",
  },
  {
    question: "Lesz felvétel az alkalmakról?",
    answer: "Igen. A webinárok felvétele egy évig visszanézhető.",
  },
];

function Em({ children }: { children: ReactNode }) {
  return (
    <strong className="font-medium text-[var(--text-primary)]">{children}</strong>
  );
}

function GhostNumber({ children }: { children: ReactNode }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute right-0 top-0 z-0 hidden select-none font-display font-medium leading-none text-white/[0.025] lg:block"
      style={{ fontSize: "clamp(120px, 12vw, 200px)", letterSpacing: "-0.04em" }}
    >
      {children}
    </span>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2
      className="font-display font-medium text-[var(--text-primary)]"
      style={{
        fontSize: "clamp(28px, 4vw, 44px)",
        letterSpacing: "-0.025em",
        lineHeight: 1.1,
      }}
    >
      {children}
    </h2>
  );
}

function PrimaryCta({ label, full }: { label: string; full?: boolean }) {
  return (
    <a
      href="#jelentkezes"
      className={`group relative inline-flex overflow-hidden rounded-full ${
        full ? "w-full" : ""
      }`}
      style={{
        boxShadow: "0 0 40px rgba(189,255,0,0.3), 0 0 80px rgba(189,255,0,0.1)",
      }}
    >
      <span className="flex flex-1 items-center justify-center px-8 py-4 text-[15px] font-medium text-[#09090B] bg-[#BDFF00]">
        {label}
      </span>
      <span
        aria-hidden
        className="pointer-events-none w-px shrink-0 self-stretch bg-[rgba(9,9,11,0.15)]"
      />
      <span className="flex items-center bg-[#BDFF00] px-5 py-4">
        <ArrowRight
          aria-hidden
          size={16}
          className="text-[#09090B] transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </span>
    </a>
  );
}

function CheckIcon() {
  return (
    <span className="mt-0.5 flex size-[22px] shrink-0 items-center justify-center rounded-full bg-[rgba(189,255,0,0.12)]">
      <Check aria-hidden size={13} className="text-[#BDFF00]" />
    </span>
  );
}

export default function VibeCodingPilotPage() {
  return (
    <div className="pb-28 [&_section]:scroll-mt-24">
      <PilotStickyCta />

      {/* 1. Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-24">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[-10%] z-0 h-[560px] w-[880px] -translate-x-1/2"
          style={{
            background:
            "radial-gradient(ellipse at center, rgba(189,255,0,0.12) 0%, transparent 68%)",
            filter: "blur(50px)",
          }}
        />
        <div
          aria-hidden
          className="hero-dot-grid pointer-events-none absolute inset-0 z-0"
        />
        <Container className="relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-[rgba(189,255,0,0.3)] bg-[rgba(189,255,0,0.06)] px-4 py-1.5 text-center font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-[#BDFF00] sm:text-[11px] sm:tracking-[0.14em]">
                <span className="relative flex size-2 shrink-0">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#BDFF00] opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-[#BDFF00]" />
                </span>
                <span>
                  VibeCoding 1.0 - Pilot
                  <span className="mx-1.5" aria-hidden>
                    ·
                  </span>
                  <span className="whitespace-nowrap">csak 4 hely</span>
                </span>
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1
                className="mt-7 font-display font-medium text-[var(--text-primary)]"
                style={{
                  fontSize: "clamp(36px, 6vw, 64px)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                }}
              >
                Építs AI-jal weboldalt — úgy, hogy{" "}
                <span className="text-[#BDFF00]">érted is</span>, mit csinálsz
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-7 max-w-xl text-[18px] leading-[1.7] text-[var(--text-secondary)] lg:text-[20px]">
                Hat hét, kis csoport, előzetes tapasztalat nélkül. A végére egy
                bemutatkozó- vagy szolgáltatói oldalt végig tudsz vinni.
              </p>
              <p className="mx-auto mt-5 max-w-xl text-[17px] leading-[1.6] text-[var(--text-secondary)]">
                Technikai előképzettség <Em>nem kell</Em>. Tanulásra való
                hajlandóság <span className="text-[#BDFF00]">igen</span>.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-10 flex justify-center">
                <PrimaryCta label="Jelentkezem a beszélgetésre" />
              </div>
            </Reveal>
          </div>
          <HeroStats />
        </Container>
      </section>

      {/* 2. Az eredmény */}
      <section
        id="eredmeny"
        className="scroll-mt-24 border-t border-[var(--border-hairline)] py-28 lg:py-36"
      >
        <Container>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <SectionLabel number="01" text="AZ EREDMÉNY" />
              <SectionHeading>
                A gyakorlóoldalon tanulod meg, a sajátodon élesíted
              </SectionHeading>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="space-y-3">
                {RESULTS.map((item) => (
                  <li
                    className="flex items-start gap-3 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] px-5 py-4"
                    key={item}
                  >
                    <CheckIcon />
                    <span className="text-[15px] leading-[1.6] text-[var(--text-secondary)]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 flex gap-3 rounded-2xl border border-[rgba(189,255,0,0.2)] bg-[rgba(189,255,0,0.05)] px-6 py-5 text-[15px] leading-[1.7] text-[var(--text-primary)]">
                <Sparkles
                  aria-hidden
                  size={18}
                  className="mt-0.5 shrink-0 text-[#BDFF00]"
                />
                <span>
                  És ami ennél is fontosabb:{" "}
                  <Em>tudni fogod, mi van benne</Em>, és hol kell hozzányúlni, ha
                  változtatni kell.
                </span>
              </p>
            </Reveal>
          </div>

          <Reveal>
            <div className="mx-auto mt-14 max-w-3xl text-[18px] leading-[1.75] text-[var(--text-secondary)]">
              <p>
                A módszert egy közös gyakorlóprojekten tanuljuk meg, kész
                brieffel — így a figyelem a folyamaton van, nem a szövegíráson.
                A saját projekted a 2. héttől fut a háttérben, és a képzés alatt
                élesíted, saját domainen. Ha még nincs saját ötleted, a
                gyakorlóprojekt önmagában is végigvihető.
              </p>
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#BDFF00]">
                    Gyakorlóprojekt
                  </p>
                  <p className="mt-3 text-[15px] leading-[1.65]">
                    Kész brief. Az 1–5. héten ezen tanuljuk a módszert, közösen.
                  </p>
                </div>
                <div className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#BDFF00]">
                    Saját projekt
                  </p>
                  <p className="mt-3 text-[15px] leading-[1.65]">
                    A 2. héttől a háttérben, a 6. héttől önállóan. Ezt élesíted,
                    saját domainen.
                  </p>
                </div>
              </div>
              <p className="mt-6">
                <Em>
                  A módszer utána bármilyen hasonló projekten megismételhető.
                </Em>{" "}
                A hat hét a folyamaté: nem az ügyfeled oldalát szállítod le.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <a
              href="/esettanulmanyok/silverlimo"
              className="group mx-auto mt-6 flex max-w-5xl flex-col overflow-hidden rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] transition-colors duration-300 hover:border-[rgba(189,255,0,0.3)] sm:flex-row"
            >
              <div className="relative h-[180px] shrink-0 overflow-hidden border-b border-[var(--border-hairline)] sm:h-auto sm:min-h-[220px] sm:w-[280px] sm:self-stretch sm:border-b-0 sm:border-r">
                <Image
                  alt="A SilverLimo weboldala"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  fill
                  sizes="280px"
                  src="/esettanulmanyok/silverlimo_hero.webp"
                />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#BDFF00]">
                  Esettanulmány · SilverLimo
                </p>
                <p className="mt-4 text-[16px] leading-[1.7] text-[var(--text-primary)]">
                  Ezen a munkamódszeren készült.
                </p>
                <p className="mt-3 text-[14px] leading-[1.65] text-[var(--text-secondary)]">
                  Egy lassú WordPress oldal helyett mérhető, gyors oldal:{" "}
                  <Em>14× gyorsabb első tartalom</Em>,{" "}
                  <Em>24× gyorsabb szerverválasz</Em>. Ezt a tudást utána a saját
                  projektjeiden is használhatod.
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-[#BDFF00]">
                  Megnézem az esettanulmányt
                  <ArrowUpRight
                    aria-hidden
                    size={15}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </div>
            </a>
            <a
              href="/esettanulmanyok/aedificium-design"
              className="group mx-auto mt-4 flex max-w-5xl flex-col overflow-hidden rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] transition-colors duration-300 hover:border-[rgba(189,255,0,0.3)] sm:flex-row"
            >
              <div className="relative h-[180px] shrink-0 overflow-hidden border-b border-[var(--border-hairline)] sm:h-auto sm:min-h-[220px] sm:w-[280px] sm:self-stretch sm:border-b-0 sm:border-r">
                <Image
                  alt="Az Aedificium Design weboldala"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  fill
                  sizes="280px"
                  src="/esettanulmanyok/aedificium_hero.png"
                />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#BDFF00]">
                  Esettanulmány · Aedificium Design
                </p>
                <p className="mt-4 text-[16px] leading-[1.7] text-[var(--text-primary)]">
                  Prémium weboldal, két hét alatt.
                </p>
                <p className="mt-3 text-[14px] leading-[1.65] text-[var(--text-secondary)]">
                  A stúdió social media elérése{" "}
                  <Em>tízszeresére nőtt</Em>.
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-[#BDFF00]">
                  Megnézem az esettanulmányt
                  <ArrowUpRight
                    aria-hidden
                    size={15}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </div>
            </a>
          </Reveal>
          <LandingExamples />
        </Container>
      </section>

      {/* 3. Miért 49 000 Ft — pricing */}
      <section className="border-t border-[var(--border-hairline)] bg-[rgba(255,255,255,0.015)] py-28 lg:py-36">
        <Container>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 lg:grid-cols-[1fr_minmax(0,380px)] lg:gap-14">
            <Reveal>
              <SectionLabel number="02" text="VIBECODING 1.0 - PILOT" />
              <SectionHeading>Belépő az AI-fejlesztés világába</SectionHeading>
              <div className="mt-8 space-y-5 text-[16px] leading-[1.8] text-[var(--text-secondary)]">
                <p>
                  A tananyag és a munkamódszer kész,{" "}
                  <Em>valódi ügyfélprojektekben készült</Em>. Ezt a képzést
                  csoportban viszont most tartom először.
                </p>
                <p>
                  A VibeCoding 1.0 <Em>2027-ben indul</Em>. Ez a Pilot: ezt a
                  formát még nem oktattam, és szükségem van a visszajelzésedre.
                  Hol akadtál el, mi volt zavaros, mit kellett kétszer
                  elmagyaráznom.{" "}
                  <Em>Kiemelt figyelmet kapsz az anyag elsajátításához</Em>,
                  mindezt a 2027-es képzés árának töredékéért.
                </p>
                <p>
                  <Em>
                    Nem egy videótárat veszel meg: a gyakorlóprojekten együtt
                    haladunk, hétről hétre.
                  </Em>
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative overflow-hidden rounded-3xl border border-[rgba(189,255,0,0.25)] bg-[rgba(189,255,0,0.03)] p-8">
                <div
                  aria-hidden
                  className="pointer-events-none absolute right-[-30px] top-[-30px] h-[160px] w-[160px]"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(189,255,0,0.16) 0%, transparent 70%)",
                    filter: "blur(20px)",
                  }}
                />
                <div className="relative z-10">
                  <span className="inline-flex rounded-full bg-[#BDFF00] px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-[#09090B]">
                    VibeCoding 1.0 - Pilot
                  </span>
                  <div className="mt-5 flex items-end gap-2">
                    <span
                      className="font-display font-medium text-[var(--text-primary)]"
                      style={{ fontSize: "48px", letterSpacing: "-0.03em", lineHeight: 1 }}
                    >
                      49 000 Ft
                    </span>
                  </div>
                  <p className="mt-2 text-[13px] leading-[1.6] text-[var(--text-tertiary)]">
                    bruttó, a teljes 6 hetes mentorált körre. A 2027-ben induló
                    VibeCoding 1.0 árának töredéke.
                  </p>

                  <div className="my-6 h-px bg-[rgba(255,255,255,0.08)]" />

                  <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
                    Amit tartalmaz
                  </p>
                  <ul className="space-y-2.5">
                    {INCLUDES.map((item) => (
                      <li className="flex items-start gap-2.5" key={item}>
                        <Check
                          aria-hidden
                          size={16}
                          className="mt-0.5 shrink-0 text-[#BDFF00]"
                        />
                        <span className="text-[14px] leading-[1.5] text-[var(--text-secondary)]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7">
                    <PrimaryCta full label="Jelentkezem" />
                  </div>
                  <p className="mt-3 text-center text-[12px] leading-[1.5] text-[var(--text-tertiary)]">
                    A jelentkezés nem vásárlás — előbb beszélgetünk.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 4. Nem üres lappal kezdesz — munkakészlet */}
      <section className="relative overflow-hidden border-t border-[var(--border-hairline)] py-28 lg:py-36">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <SectionLabel number="03" text="A MUNKAKÉSZLET" />
              <SectionHeading>Munkakészletet kapsz, nem csak videókat</SectionHeading>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 space-y-5 text-[16px] leading-[1.8] text-[var(--text-secondary)]">
                <p>
                  A legtöbb kezdő annál akad el, hogy{" "}
                  <Em>ott ül az üres képernyő előtt</Em>, és nem tudja, mit
                  kérjen az AI-tól. Ezért nem a semmiből indulsz.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
                {TOOLKIT.map(({ icon: Icon, label }) => (
                  <div
                    className="group flex flex-col items-center gap-3 rounded-2xl px-3 py-6 text-center transition-colors duration-300 hover:bg-[rgba(255,255,255,0.04)]"
                    key={label}
                  >
                    <span className="flex size-11 items-center justify-center rounded-xl bg-[rgba(189,255,0,0.1)] transition-transform duration-300 group-hover:scale-110">
                      <Icon aria-hidden size={20} className="text-[#BDFF00]" />
                    </span>
                    <span className="text-[13px] font-medium leading-[1.4] text-[var(--text-primary)]">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 text-[16px] leading-[1.8] text-[var(--text-secondary)]">
                Ezek nem tananyagnak készültek.{" "}
                <Em>Több év ügyfélmunkájából álltak össze, hibákból</Em> — és{" "}
                <Em>mindegyik véglegesen a tiéd marad</Em>. Velük az AI-jal
                végzett fejlesztés lényegesen rövidebb, mint üres lapról
                indulva.
              </p>
              <p className="mt-5 text-[16px] leading-[1.8] text-[var(--text-secondary)]">
                A következő projekteden ugyanezekkel dolgozol — és{" "}
                <Em>azért a munkáért már pénzt is kérhetsz</Em>.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 5. Kinek szól */}
      <section className="relative overflow-hidden border-t border-[var(--border-hairline)] bg-[rgba(255,255,255,0.015)] py-28 lg:py-36">
        <Container>
          <div className="relative">
            <GhostNumber>04</GhostNumber>
            <Reveal>
              <SectionLabel number="04" text="KINEK SZÓL" />
              <SectionHeading>Neked szól, ha…</SectionHeading>
            </Reveal>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {FOR_YOU.map((card, i) => (
              <Reveal delay={0.05 * i} key={card.n}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] p-7 transition-colors duration-300 hover:border-[rgba(189,255,0,0.3)]">
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-[#BDFF00] to-transparent transition-transform duration-500 group-hover:scale-x-100"
                  />
                  <p
                    className="font-display font-medium text-[#BDFF00]"
                    style={{ fontSize: "28px" }}
                  >
                    {card.n}
                  </p>
                  <p className="mt-4 text-[15px] leading-[1.7] text-[var(--text-secondary)]">
                    <Em>{card.lead}</Em>, {card.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.05}>
            <div className="mx-auto mt-16 max-w-2xl">
              <h3
                className="font-display font-medium text-[var(--text-primary)]"
                style={{ fontSize: "clamp(22px, 2.4vw, 28px)" }}
              >
                Nem neked szól, ha…
              </h3>
              <ul className="mt-6 space-y-4">
                {NOT_FOR_YOU.map((item) => (
                  <li className="flex items-start gap-3" key={item}>
                    <X
                      aria-hidden
                      size={18}
                      className="mt-1 shrink-0 text-[var(--text-tertiary)]"
                    />
                    <span className="text-[18px] leading-[1.7] text-[var(--text-secondary)]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mx-auto mt-16 max-w-2xl">
              <h3
                className="font-display font-medium text-[var(--text-primary)]"
                style={{ fontSize: "clamp(22px, 2.4vw, 28px)" }}
              >
                Ez nem egy videótár
              </h3>
              <div className="mt-6 space-y-5 text-[18px] leading-[1.75] text-[var(--text-secondary)]">
                <p>
                  Nem végignézel valamit, és a végén kapsz egy tanúsítványt.
                </p>
                <p>
                  Heti nagyjából <Em>hat órát</Em> kell rászánnod, és a saját
                  kezeddel kell végigmenned a folyamaton.{" "}
                  <Em>Én végigkísérlek, de helyetted nem építem meg.</Em>
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 6. Mit fogsz tudni megcsinálni */}
      <section className="relative overflow-hidden border-t border-[var(--border-hairline)] py-28 lg:py-36">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="relative">
              <GhostNumber>05</GhostNumber>
              <Reveal>
                <SectionLabel number="05" text="MIT FOGSZ TUDNI" />
                <SectionHeading>
                  Nem a kódolást tanulod meg, hanem a{" "}
                  <span className="text-[#BDFF00]">döntéseket</span>
                </SectionHeading>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <p className="mt-8 text-[16px] leading-[1.8] text-[var(--text-secondary)]">
                A kód nagy részét az AI írja. Azt viszont nem dönti el, mi
                épüljön, milyen sorrendben, és mikor van kész.{" "}
                <Em>
                  A te dolgod megérteni, mit építesz, irányítani a folyamatot, és
                  ellenőrizni az eredményt.
                </Em>
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-12 font-mono text-[12px] uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
                A végére ezeket tudod
              </p>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 sm:gap-x-12">
                {SKILLS.map((skill, i) => (
                  <div
                    className="border-t border-[rgba(255,255,255,0.08)] py-6"
                    key={skill.lead}
                  >
                    <p className="font-mono text-[12px] tracking-[0.14em] text-[#BDFF00]">
                      0{i + 1}
                    </p>
                    <p className="mt-2 font-display text-[18px] font-medium text-[var(--text-primary)]">
                      {skill.lead}
                    </p>
                    <p className="mt-2 text-[15px] leading-[1.65] text-[var(--text-secondary)]">
                      {skill.text}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-4 flex gap-3 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] px-6 py-6">
                <X
                  aria-hidden
                  size={18}
                  className="mt-0.5 shrink-0 text-[var(--text-tertiary)]"
                />
                <div>
                  <p className="mb-2 font-mono text-[12px] uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
                    Amit nem tanítok
                  </p>
                  <p className="text-[15px] leading-[1.7] text-[var(--text-secondary)]">
                    Fizetési rendszert, bejelentkezést, webshopot, érzékeny
                    adatok kezelését, saját szerver üzemeltetését, mély
                    keresőoptimalizálást és összetett háttérrendszereket. Ezek
                    nem tartoznak ebbe a képzésbe. Az alap keresőoptimalizálás
                    és a hozzáférhetőségi minimum benne van: ettől lesz az oldal
                    átadható.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 7. A hat hét */}
      <section className="border-t border-[var(--border-hairline)] bg-[rgba(255,255,255,0.015)] py-28 lg:py-36">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <SectionLabel number="06" text="A HAT HÉT" />
              <SectionHeading>Hétről hétre ezt viszed haza</SectionHeading>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 text-[16px] leading-[1.7] text-[var(--text-secondary)]">
                Heti két élő webinár, 60 perc. A telepítés és a beállítás videóba
                megy, mert gyorsan elavul.{" "}
                <Em>Az élő idő a döntésé és a hibával való építésé.</Em>
              </p>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {WEEKS.map((week, i) => (
                <Reveal
                  className={week.extra ? "sm:col-span-2" : undefined}
                  delay={0.04 * i}
                  key={week.title}
                >
                  <div className="flex h-full gap-4 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] p-6">
                    <span className="font-display text-[22px] font-medium text-[#BDFF00]">
                      {week.n}
                    </span>
                    <div>
                      <p className="font-display text-[17px] font-medium text-[var(--text-primary)]">
                        {week.title}
                      </p>
                      <p className="mt-2 text-[15px] leading-[1.65] text-[var(--text-secondary)]">
                        {week.text}
                      </p>
                      {week.extra ? (
                        <div className="mt-5 border-t border-[rgba(255,255,255,0.08)] pt-5">
                          <p className="font-display text-[17px] font-medium text-[var(--text-primary)]">
                            {week.extra.title}
                          </p>
                          <p className="mt-2 text-[15px] leading-[1.65] text-[var(--text-secondary)]">
                            {week.extra.text}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.1}>
              <p className="mt-12 font-mono text-[12px] uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
                Ha elakadsz, nem maradsz egyedül
              </p>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {SUPPORT.map(({ icon: Icon, lead, text }) => (
                  <div key={lead}>
                    <span className="flex size-11 items-center justify-center rounded-xl bg-[rgba(189,255,0,0.1)]">
                      <Icon aria-hidden size={20} className="text-[#BDFF00]" />
                    </span>
                    <p className="mt-4 font-display text-[16px] font-medium text-[var(--text-primary)]">
                      {lead}
                    </p>
                    <p className="mt-2 text-[14px] leading-[1.65] text-[var(--text-secondary)]">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal>
              <p className="mt-6 text-[15px] leading-[1.7] text-[var(--text-secondary)]">
                +30 nap utánkövetés a zárás után, a már élő saját projekten.
                Utána tagja leszel a fejlesztői közösségnek: a többi tanulóval
                együtt fejlődhetsz, és megoszthatod a gondolataidat és a
                kérdéseidet.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 8. Ki tanít */}
      <section className="border-t border-[var(--border-hairline)] py-28 lg:py-36">
        <Container>
          <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,300px)_1fr] lg:gap-14">
            <Reveal>
              <div className="relative mx-auto aspect-[4/5] w-full max-w-[300px] overflow-hidden rounded-2xl border border-[var(--border-hairline)] lg:mx-0">
                <Image
                  alt="Bakos Attila — AI-integrátor"
                  className="object-cover object-top"
                  fill
                  sizes="300px"
                  src="/brand/attila/bakos_attila_portrait.webp"
                />
              </div>
            </Reveal>
            <div>
              <Reveal>
                <SectionLabel number="07" text="KI TANÍT" />
                <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
                  Bakos Attila · AI-integrátor és üzleti tanácsadó
                </p>
                <SectionHeading>Bakos Attila</SectionHeading>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="mt-6 space-y-5 text-[16px] leading-[1.8] text-[var(--text-secondary)]">
                  <p>
                    Bő tíz éve dolgozom digitális rendszerek tervezésével. Az
                    elmúlt évet AI-alapú automatizációs projektek
                    megvalósításával töltöttem magyar kkv-knál, és a cél mindig
                    ugyanaz volt: a meglévő folyamatokat kevesebb emberi
                    erőforrással, pontosabban működtetni.
                  </p>
                  <p>
                    <Em>
                      Nem demókat, hanem napi szinten használt, élesben futó
                      rendszereket.
                    </Em>
                  </p>
                  <p>
                    Ezt a munkamódszert <Em>nem tananyagnak találtam ki</Em>:
                    jelenleg is futó ügyfélprojekteken használom, és azokból
                    építettem fel. A 60 perces élő webináron látni fogod, amikor
                    elromlik valami, és azt is, hogyan javítom.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* 9. A gyakorlati adatok */}
      <section className="border-t border-[var(--border-hairline)] bg-[rgba(255,255,255,0.015)] py-28 lg:py-36">
        <Container>
          <div className="mx-auto max-w-2xl">
            <Reveal>
              <SectionLabel number="08" text="A GYAKORLATI ADATOK" />
              <SectionHeading>Amit tudnod kell a keretekről</SectionHeading>
            </Reveal>
            <Reveal delay={0.1}>
              <dl className="mt-8 overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.02)]">
                {DATA_ROWS.map((row) => (
                  <div
                    className="flex flex-col gap-1 border-b border-[rgba(255,255,255,0.06)] px-6 py-4 transition-colors last:border-b-0 hover:bg-[rgba(255,255,255,0.02)] sm:flex-row sm:items-center sm:gap-6"
                    key={row.label}
                  >
                    <dt className="font-mono text-[12px] uppercase tracking-[0.12em] text-[var(--text-tertiary)] sm:w-40 sm:shrink-0">
                      {row.label}
                    </dt>
                    <dd className="text-[15px] text-[var(--text-primary)]">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-12 space-y-8">
                <div>
                  <p className="font-display text-[20px] font-medium text-[var(--text-primary)]">
                    Amire szükséged van
                  </p>
                  <p className="mt-3 text-[18px] leading-[1.7] text-[var(--text-secondary)]">
                    Számítógép, internet, alapszintű angol olvasás.{" "}
                    <Em>Technikai előképzettség nem kell.</Em> Ami kell: a
                    tanulásra való hajlandóság. A képzés előtt van egy technikai
                    belépő: amíg a környezet nem működik nálad, addig azzal
                    foglalkozunk.
                  </p>
                </div>
                <div>
                  <p className="font-display text-[20px] font-medium text-[var(--text-primary)]">
                    További költségek
                  </p>
                  <p className="mt-3 text-[18px] leading-[1.7] text-[var(--text-secondary)]">
                    Két előfizetés (Claude és Cursor), és a saját domained.
                    Ezeket közvetlenül a szolgáltatóknak fizeted, a várható
                    összeget az első beszélgetésen átvesszük.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 11. Jelentkezés */}
      <section
        id="jelentkezes"
        className="scroll-mt-24 border-t border-[var(--border-hairline)] py-28 lg:py-36"
      >
        <Container>
          <div className="mx-auto max-w-2xl">
            <Reveal>
              <div className="text-center">
                <SectionLabel className="justify-center" number="09" text="JELENTKEZÉS" />
                <SectionHeading>Legfeljebb négy hely van</SectionHeading>
                <p className="mx-auto mt-6 max-w-xl text-[18px] leading-[1.75] text-[var(--text-secondary)]">
                  Heti nagyjából hat óra, a saját kezeddel. A jelentkezés nem
                  vásárlás: először néhány perces telefonbeszélgetésen
                  átbeszéljük a céljaidat, hogy mit tudok nyújtani, és a
                  kérdéseket, amik közben felmerülnek. Ha bármelyikünk úgy
                  látja, hogy nem illik, azt kimondjuk.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10">
                <PilotApplicationForm />
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 text-center text-[14px] leading-[1.7] text-[var(--text-tertiary)]">
                Jelentkezési határidő: 2026. október 6., kedd, 12:00. A VibeCoding
                1.0 2027-ben indul.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 12. Gyakori kérdések */}
      <section className="border-t border-[var(--border-hairline)] bg-[rgba(255,255,255,0.015)] py-28 lg:py-36">
        <Container>
          <div className="mx-auto max-w-2xl">
            <Reveal>
              <SectionLabel number="10" text="GYAKORI KÉRDÉSEK" />
              <SectionHeading>Amit gyakran megkérdeznek</SectionHeading>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10">
                <FaqAccordion items={FAQ_ITEMS} />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 13. Záró blokk */}
      <section className="border-t border-[var(--border-hairline)] py-28 lg:py-36">
        <Container>
          <div className="relative mx-auto max-w-2xl overflow-hidden rounded-[32px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-8 py-14 text-center sm:px-12 sm:py-16">
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-[-40px] z-0 h-[280px] w-[480px] -translate-x-1/2"
              style={{
                background:
                  "radial-gradient(ellipse, rgba(189,255,0,0.10) 0%, transparent 70%)",
                filter: "blur(60px)",
              }}
            />
            <div className="relative z-10">
              <Reveal>
                <p className="mb-4 font-mono text-[13px] uppercase tracking-[0.14em] text-[var(--text-tertiary)]">
                  Indulás október 8.
                </p>
                <h2
                  className="font-display font-medium text-[var(--text-primary)]"
                  style={{
                    fontSize: "clamp(28px, 3.5vw, 44px)",
                    letterSpacing: "-0.025em",
                    lineHeight: 1.1,
                  }}
                >
                  Október 8-án indulunk
                </h2>
                <p className="mx-auto mt-6 max-w-md text-[16px] leading-[1.7] text-[var(--text-secondary)]">
                  Legfeljebb négy hely van, és ez nem marketingfogás:{" "}
                  <Em>ennyi embernek tudok ebben a formában valódi figyelmet adni.</Em>
                </p>
                <div className="mt-10 flex justify-center">
                  <PrimaryCta label="Jelentkezem a beszélgetésre" />
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

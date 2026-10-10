import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  CalendarCheck,
  Check,
  CreditCard,
  Languages,
  PhoneCall,
  Quote,
  Search,
  ShieldCheck,
} from "lucide-react";

import { Reveal } from "@/components/animations/reveal";
import { CalEmbed, type CalTarget } from "@/components/CalEmbed";
import { HeroGrain } from "@/components/hero-grain";
import { heroLayers } from "@/components/hero-layers";
import { RevealLines } from "@/components/reveal-lines";
import { heroShimmerStartMs, revealLineFinishMs } from "@/components/reveal-lines-timing";
import { Shimmer } from "@/components/shimmer";
import { Container } from "@/components/ui/container";
import { MailtoLink } from "@/components/ui/MailtoLink";
import { SectionLabel } from "@/components/ui/section-label";
import { FaqAccordion, type FaqItem } from "../vibecoding-pilot/FaqAccordion";
import { LandingExamples } from "../vibecoding-pilot/LandingExamples";

import {
  BookingBonus,
  ClosingBonus,
  HeroBonus,
  HeroGreeting,
  OfferBar,
  OfferProvider,
  PersonalizedPlan,
  PriceBonus,
  StickyCta,
} from "./offer";

// Kampányoldal: csak az ajánlati levelekből érhető el, menüpont nincs,
// és nem versenyezhet a főoldallal a keresőben.
export const metadata: Metadata = {
  title: "ZynAI Induló csomag",
  description:
    "Az első weboldaluk gyorsan, rendesen, fölösleg nélkül: 14 napon belül kész, fix áron.",
  robots: { index: false, follow: false },
};

const BOOKING_EMAIL = "bakos.attila@zynai.hu";

const INDULO_CAL: CalTarget = {
  namespace: "indulo-webcsomag",
  link: "zynai/indulo-webcsomag",
  url: "https://cal.com/zynai/indulo-webcsomag",
  email: BOOKING_EMAIL,
};

const WHY_NOW: { icon: typeof Search; lead: string; text: string }[] = [
  { icon: Search, lead: "Megtalálják", text: "Alapszintű Google-beállításokkal indul." },
  {
    icon: PhoneCall,
    lead: "Elérik",
    text: "Kattintható telefonszám, e-mail és kapcsolati űrlap.",
  },
  {
    icon: ShieldCheck,
    lead: "Komolyan veszik",
    text: "Saját domain, mobilon is jól mutat, adatkezelési tájékoztatóval és sütibannerrel.",
  },
];

const PACKAGE: ReactNode[] = [
  <><Em>Mobilbarát, egyoldalas bemutatkozó oldal</Em> 5–6 szekcióval, az önöknek javasolt szerkezettel</>,
  <><Em>Szövegezés a cég adataiból:</Em> a szöveget mi írjuk, önöknek csak át kell nézniük, egy javítási körrel</>,
  <><Em>Kapcsolati űrlap</Em> és kattintható telefonszám, e-mail</>,
  <Em key="g">Google-megtalálhatósági alapbeállítások</Em>,
  <><Em>Tárhely és üzembe helyezés</Em> a saját domainjükön</>,
  <Em key="a">Adatkezelési tájékoztató és sütibanner</Em>,
];

const STEPS = [
  {
    n: "01",
    title: "20 perces telefonhívás",
    text: "Átbeszéljük, mivel foglalkoznak, mit szeretnének kiemelni, és kell-e bármi a csomagon túl. A végén pontosan tudják, mit kapnak és mennyiért.",
  },
  {
    n: "02",
    title: "Szerződés és első változat",
    text: "A szerződéskötéssel és az előleggel indul a 14 nap. Elkészítjük az oldalt a cég adataiból, önöknek csak át kell nézniük.",
  },
  {
    n: "03",
    title: "Javítás és átadás",
    text: "Egy javítási kör után az oldal él, a saját domainjükön.",
  },
];

const PRICE_TERMS: ReactNode[] = [
  <><Em>Fizetés:</Em> 50% a szerződéskötéskor, 50% az átadáskor.</>,
  <><Em>A domain az önöké.</Em> A cég nevére kerül, a díját önök fizetik közvetlenül a szolgáltatónak.</>,
  <><Em>Fix ár:</Em> ha a csomagon túli funkció kell, azt a hívás után írásban, előre megkapják.</>,
  <><Em>Karbantartás igény szerint:</Em> ha szeretnék, az ajándék időszak után is mi tartjuk karban az oldalt, hosszú távon is. Elköteleződés nélkül.</>,
];

const EXTRAS: { icon: typeof Bot; label: string }[] = [
  { icon: CalendarCheck, label: "Időpontfoglalás" },
  { icon: CreditCard, label: "Online fizetés" },
  { icon: Languages, label: "Több nyelv" },
  {
    icon: Bot,
    label: "Egyedi AI-megoldások, például automatikus ajánlatküldés vagy ügyfélkezelés",
  },
];

const PROMISES = [
  { lead: "Fix ár, írásban.", text: "A hívás után pontosan tudják, mit fizetnek." },
  { lead: "14 napos határidő.", text: "A szerződéstől számítva, írásban vállalva." },
  {
    lead: "Egy javítási kör benne van.",
    text: "Az oldal akkor megy élesbe, amikor jónak látják.",
  },
  { lead: "A domain az önöké.", text: "Akkor is, ha később máshová költöznének." },
  { lead: "Nem kötelez semmire a hívás.", text: "Ha nem kérik, annyi." },
];

const TESTIMONIALS = [
  {
    quote:
      "Kezdetleges formájában tízszeres elérést értünk el, ez fantasztikus eredmény. A weboldal nagyon profi, design fókuszú és stabil. Az egyik legjobb befektetésünk volt.",
    name: "Loddo Riccardo",
    site: "aedificium.design",
  },
  {
    quote:
      "Több éve együtt dolgozunk, a weboldalamat és a hirdetéseimet is Attila kezeli. A korábbi WordPress oldalam is jól teljesített, de a mostani javítások elképesztőek. Nagyon megérte, köszi!",
    name: "Dóczi László",
    site: "silverlimo.hu",
  },
];

const CASES = [
  {
    href: "/esettanulmanyok/aedificium-design",
    image: "/esettanulmanyok/aedificium_hero.png",
    alt: "Az Aedificium Design weboldala",
    label: "Esettanulmány · Aedificium Design",
    title: "Prémium weboldal, két hét alatt.",
    text: (
      <>
        A stúdió közösségimédia-elérése <Em>tízszeresére nőtt</Em>.
      </>
    ),
  },
  {
    href: "/esettanulmanyok/silverlimo",
    image: "/esettanulmanyok/silverlimo_hero.webp",
    alt: "A SilverLimo weboldala",
    label: "Esettanulmány · SilverLimo",
    title: "Lassú WordPress oldal helyett gyors, mérhető oldal.",
    text: (
      <>
        <Em>14× gyorsabb első tartalom</Em>, <Em>24× gyorsabb szerverválasz</Em>.
      </>
    ),
  },
];

const FAQ: FaqItem[] = [
  {
    question: "Mi készül pontosan? WordPress lesz?",
    answer: (
      <>
        <p>
          Nem WordPress. Az oldal Next.js-szel készül: ez egy modern webes
          keretrendszer, nagy nemzetközi cégek is használják, és ezen fut a
          zynai.hu is. Önöknek ebből ennyi számít:
        </p>
        <ul className="space-y-2">
          {[
            ["Gyors.", "Az oldal előre elkészített formában töltődik be, mobilon is pillanatok alatt. A Google a gyors oldalakat előrébb sorolja, a látogató pedig nem lép le, mielőtt betöltene."],
            ["Biztonságos.", "Nincs nyilvános adminfelület és nincsenek bővítmények, amiken keresztül a WordPress-oldalakat a leggyakrabban feltörik."],
            ["Stabil.", "Nem romlik el attól, hogy egy bővítmény frissül, vagy nem frissül."],
            ["Bővíthető.", "Az időpontfoglalás, az online fizetés vagy egy AI-megoldás ugyanabba az oldalba épül be, újrakezdés nélkül."],
          ].map(([lead, text]) => (
            <li className="flex items-start gap-2.5" key={lead}>
              <Check aria-hidden size={16} className="mt-1 shrink-0 text-[#BDFF00]" />
              <span>
                <Em>{lead}</Em> {text}
              </span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    question: "Mennyi idő alatt készül el?",
    answer:
      "14 nap alatt, a szerződéskötéstől és az előlegtől számítva, ha addigra megkapjuk a szükséges anyagokat (logó, ha van, elérhetőségek, pár mondat a cégről).",
  },
  {
    question: "Mit kell nekünk csinálni?",
    answer:
      "Nagyon keveset: a hívásban elmondják, mivel foglalkoznak, elküldik az anyagokat, és átnézik az első változatot. A szöveget mi írjuk.",
  },
  {
    question: "Miért állják az első 3 hónap üzemeltetését?",
    answer:
      "Mert sok magyar vállalkozás évekig weboldal nélkül működik, és közben elveszíti azokat az ügyfeleket, akik rákeresnek, de nem találnak semmit. Szeretnénk, ha egy új cégnél ez nem az első hónapok költségén múlna. Az induláskor minden kiadás számít, ezért az első negyedévet mi álljuk.",
  },
  {
    question: "Miért csak 14 napig érvényes az ajándék?",
    answer:
      "Mert az indulásnak szól. Az első hetekben számít a legtöbbet, hogy a cég megtalálható legyen, amikor az első partnerek és ügyfelek rákeresnek.",
  },
  {
    question: "Mi történik a határidő után?",
    answer:
      "A hívást ugyanúgy kérheti, és a csomag is ugyanannyiba kerül. Az első 3 hónap üzemeltetését viszont már nem tudjuk átvállalni.",
  },
  {
    question: "Kié lesz a domain?",
    answer:
      "Az önöké. A cég nevére regisztráljuk, a díját önök fizetik közvetlenül a szolgáltatónak.",
  },
  {
    question: "Mi van, ha később bővítenénk?",
    answer:
      "Az oldal úgy készül, hogy bővíthető legyen: időpontfoglalás, webshop, több nyelv vagy AI-megoldás később is hozzáadható.",
  },
  {
    question: "Kötelez a hívás bármire?",
    answer: "Nem. A hívás után eldöntik, kérik-e. Ha nem, annyi.",
  },
  {
    question: "Miért kaptam erről levelet?",
    answer:
      "Mert a cég elérhetősége új cégként megjelent a nyilvános cégjegyzékben. Ez egyszeri megkeresés: további levelet csak akkor küldünk, ha kifejezetten kéri.",
  },
];

function Em({ children }: { children: ReactNode }) {
  return <strong className="font-medium text-[var(--text-primary)]">{children}</strong>;
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2
      className="font-display font-medium text-[var(--text-primary)]"
      style={{ fontSize: "clamp(28px, 4vw, 44px)", letterSpacing: "-0.025em", lineHeight: 1.1 }}
    >
      {children}
    </h2>
  );
}

function PrimaryCta({ children, full }: { children: ReactNode; full?: boolean }) {
  return (
    <span
      className={`inline-flex rounded-full ${full ? "w-full" : ""}`}
      style={{ boxShadow: "0 0 40px rgba(189,255,0,0.3), 0 0 80px rgba(189,255,0,0.1)" }}
    >
      <a
        href="#idopont"
        className={`group relative inline-flex overflow-hidden rounded-full ${full ? "w-full" : ""}`}
      >
        <span className="flex flex-1 items-center justify-center bg-[#BDFF00] px-8 py-4 text-[15px] font-medium text-[#09090B]">
          {children}
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
    </span>
  );
}

function CheckIcon() {
  return (
    <span className="mt-0.5 flex size-[22px] shrink-0 items-center justify-center rounded-full bg-[rgba(189,255,0,0.12)]">
      <Check aria-hidden size={13} className="text-[#BDFF00]" />
    </span>
  );
}

export default function InduloWebcsomagPage() {
  return (
    <OfferProvider>
      <div className="pb-28 [&_section]:scroll-mt-24">
        <OfferBar />
        <StickyCta />

        {/* Hero */}
        <section className="relative pb-20 pt-14 sm:pt-16 lg:pb-24 lg:pt-20">
          <HeroGrain />
          <div
            aria-hidden
            className="hero-dot-grid pointer-events-none absolute inset-0"
            style={{ zIndex: heroLayers.grid }}
          />
          <Container className="relative" style={{ zIndex: heroLayers.content }}>
            <div className="mx-auto max-w-3xl text-center">
              <Reveal>
                <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-[rgba(189,255,0,0.3)] bg-[rgba(189,255,0,0.06)] px-4 py-1.5 text-center font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-[#BDFF00] sm:text-[11px] sm:tracking-[0.14em]">
                  <span className="relative flex size-2 shrink-0">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#BDFF00] opacity-60" />
                    <span className="relative inline-flex size-2 rounded-full bg-[#BDFF00]" />
                  </span>
                  ZynAI Induló csomag
                </span>
                <HeroGreeting />
              </Reveal>
              <Shimmer className="mt-7 block" delayMs={heroShimmerStartMs(1)}>
                <RevealLines
                  as="h1"
                  className="font-display font-medium text-[var(--text-primary)]"
                  style={{ fontSize: "clamp(36px, 6vw, 64px)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
                >
                  <span className="hero-laminate">Az első weboldaluk.</span>
                  <span>
                    <span className="hero-laminate">Gyorsan, rendesen, </span>
                    <span
                      className="hero-laminate hero-laminate--accent hero-draw-underline"
                      style={{ ["--hero-draw-delay" as string]: `${revealLineFinishMs(1)}ms` }}
                    >
                      fölösleg nélkül.
                    </span>
                  </span>
                </RevealLines>
              </Shimmer>
              <RevealLines delay={260}>
                <p className="mx-auto mt-7 max-w-xl text-[18px] leading-[1.7] text-[var(--text-secondary)] lg:text-[20px]">
                  Egy új cégnek nem nagy weboldal kell, hanem egy rendezett első
                  oldal, ahol megtalálják, és ahonnan el is érik önöket. A
                  szerződéstől számított 14 napon belül kész, fix áron.
                </p>
                <div>
                  <p
                    className="mt-8 font-display font-medium text-[var(--text-primary)]"
                    style={{ fontSize: "clamp(32px, 4vw, 44px)", letterSpacing: "-0.03em" }}
                  >
                    190.000 Ft <span className="text-[var(--text-tertiary)]">+ áfa</span>
                  </p>
                  <HeroBonus />
                </div>
                <div className="mt-10 flex flex-col items-center gap-5">
                  <PrimaryCta>Kérek egy 20 perces hívást</PrimaryCta>
                  <a
                    href="#javaslat"
                    className="text-[15px] text-[var(--text-secondary)] underline decoration-[rgba(255,255,255,0.2)] underline-offset-4 transition-colors hover:text-[var(--text-primary)]"
                  >
                    Nézze meg az önöknek javasolt oldalt ↓
                  </a>
                  <p className="text-[13px] text-[var(--text-tertiary)]">
                    Telefonhívás, nem online meeting. Nem kötelez semmire.
                  </p>
                </div>
              </RevealLines>
            </div>
          </Container>
        </section>

        {/* 01. Az önöknek javasolt oldal */}
        <section
          id="javaslat"
          className="border-t border-[var(--border-hairline)] py-28 lg:py-36"
        >
          <Container>
            <Reveal>
              <PersonalizedPlan
                fallback={
                  <div className="mx-auto max-w-3xl">
                    <SectionLabel number="01" text="AZ ÖNÖKNEK JAVASOLT OLDAL" />
                    <SectionHeading>Minden oldal a cég tevékenységére szabva készül</SectionHeading>
                    <p className="mt-6 text-[18px] leading-[1.75] text-[var(--text-secondary)]">
                      Egy étteremnek mást kell kiemelnie, mint egy könyvelőnek vagy
                      egy gépkölcsönzőnek. A hívásban átbeszéljük, mivel
                      foglalkoznak, és ehhez igazítom az oldal szerkezetét és
                      szövegét.
                    </p>
                  </div>
                }
              />
            </Reveal>
          </Container>
        </section>

        {/* 02. Miért most */}
        <section className="border-t border-[var(--border-hairline)] bg-[rgba(255,255,255,0.015)] py-28 lg:py-36">
          <Container>
            <div className="mx-auto max-w-5xl">
              <Reveal>
                <SectionLabel number="02" text="MIÉRT MOST" />
                <SectionHeading>Az első hetekben dől el, mit látnak önökről.</SectionHeading>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="mt-8 max-w-3xl space-y-5 text-[17px] leading-[1.8] text-[var(--text-secondary)]">
                  <p>
                    Bankszámla, könyvelő, bélyegző, szerződések: az indulás első
                    heteiben minden egyszerre jön. Közben az első partnerek,
                    ügyfelek és a bank is rákeres a cégre. Ha ilyenkor nincs
                    semmi, vagy csak egy félkész oldal, az kérdést hagy maga után.
                  </p>
                  <p>
                    Az Induló csomag ezt a kérdést zárja le:{" "}
                    <Em>
                      egy rendezett, hiteles első oldal, amit önöknek nem kell
                      megírniuk, megtervezniük vagy üzemeltetniük.
                    </Em>
                  </p>
                </div>
              </Reveal>
              <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {WHY_NOW.map(({ icon: Icon, lead, text }, i) => (
                  <Reveal delay={0.05 * i} key={lead}>
                    <div className="h-full rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] p-6">
                      <span className="flex size-11 items-center justify-center rounded-xl bg-[rgba(189,255,0,0.1)]">
                        <Icon aria-hidden size={20} className="text-[#BDFF00]" />
                      </span>
                      <p className="mt-4 font-display text-[17px] font-medium text-[var(--text-primary)]">
                        {lead}
                      </p>
                      <p className="mt-2 text-[14px] leading-[1.65] text-[var(--text-secondary)]">
                        {text}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* 03. A csomag */}
        <section className="border-t border-[var(--border-hairline)] py-28 lg:py-36">
          <Container>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
              <Reveal>
                <SectionLabel number="03" text="A CSOMAG" />
                <SectionHeading>Ami minden Induló oldalban benne van</SectionHeading>
                <p className="mt-6 text-[17px] leading-[1.75] text-[var(--text-secondary)]">
                  A fenti oldalszerkezet erre a vázra épül.
                </p>
                <p className="mt-6 rounded-2xl border border-[rgba(189,255,0,0.2)] bg-[rgba(189,255,0,0.05)] px-6 py-5 text-[15px] leading-[1.7] text-[var(--text-secondary)]">
                  <Em>Amit önöknek kell csinálni:</Em> egy 20 perces beszélgetés, a
                  szükséges anyagok elküldése (logó, ha van, elérhetőségek, pár
                  mondat a cégről) és az első változat átnézése.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <ul className="space-y-3">
                  {PACKAGE.map((item, i) => (
                    <li
                      className="flex items-start gap-3 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] px-5 py-4"
                      key={i}
                    >
                      <CheckIcon />
                      <span className="text-[15px] leading-[1.6] text-[var(--text-secondary)]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* 04. Így zajlik */}
        <section className="border-t border-[var(--border-hairline)] bg-[rgba(255,255,255,0.015)] py-28 lg:py-36">
          <Container>
            <div className="mx-auto max-w-5xl">
              <Reveal>
                <SectionLabel number="04" text="ÍGY ZAJLIK" />
                <SectionHeading>14 nap alatt kész, három lépésben</SectionHeading>
              </Reveal>
              <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
                {STEPS.map((step, i) => (
                  <Reveal delay={0.05 * i} key={step.n}>
                    <div className="flex h-full flex-col rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] p-6">
                      <span className="font-display text-[28px] font-medium text-[#BDFF00]">
                        {step.n}
                      </span>
                      <p className="mt-4 font-display text-[18px] font-medium text-[var(--text-primary)]">
                        {step.title}
                      </p>
                      <p className="mt-2 text-[15px] leading-[1.65] text-[var(--text-secondary)]">
                        {step.text}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* 05. Az ár */}
        <section className="border-t border-[var(--border-hairline)] py-28 lg:py-36">
          <Container>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 lg:grid-cols-[1fr_minmax(0,400px)] lg:gap-14">
              <Reveal>
                <SectionLabel number="05" text="AZ ÁR" />
                <SectionHeading>Egy ár, meglepetés nélkül</SectionHeading>
                <ul className="mt-8 space-y-4">
                  {PRICE_TERMS.map((item, i) => (
                    <li className="flex items-start gap-3" key={i}>
                      <CheckIcon />
                      <span className="text-[16px] leading-[1.7] text-[var(--text-secondary)]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="relative overflow-hidden rounded-3xl border border-[rgba(189,255,0,0.25)] bg-[rgba(189,255,0,0.03)] p-8">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute right-[-30px] top-[-30px] h-[160px] w-[160px]"
                    style={{
                      background: "radial-gradient(circle, rgba(189,255,0,0.16) 0%, transparent 70%)",
                      filter: "blur(20px)",
                    }}
                  />
                  <div className="relative z-10">
                    <span className="inline-flex rounded-full bg-[#BDFF00] px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-[#09090B]">
                      Induló csomag
                    </span>
                    <p
                      className="mt-5 font-display font-medium text-[var(--text-primary)]"
                      style={{ fontSize: "48px", letterSpacing: "-0.03em", lineHeight: 1 }}
                    >
                      190.000 Ft
                    </p>
                    <p className="mt-2 text-[13px] leading-[1.6] text-[var(--text-tertiary)]">
                      + áfa · egyszeri díj · a szerződéstől számított 14 napon belül kész
                    </p>
                    <PriceBonus />
                    <div className="mt-7">
                      <PrimaryCta full>Időpontot kérek</PrimaryCta>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* 06. Ha több kell */}
        <section className="border-t border-[var(--border-hairline)] bg-[rgba(255,255,255,0.015)] py-28 lg:py-36">
          <Container>
            <div className="mx-auto max-w-5xl">
              <Reveal>
                <SectionLabel number="06" text="HA TÖBB KELL" />
                <SectionHeading>Amit később, vagy rögtön, hozzá lehet tenni</SectionHeading>
                <p className="mt-6 text-[17px] leading-[1.75] text-[var(--text-secondary)]">
                  Az Induló csomag szándékosan egyszerű. Ha önöknél ennél több
                  kell, a hívásban előre beárazzuk:
                </p>
              </Reveal>
              <div className="mt-8 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
                {EXTRAS.map(({ icon: Icon, label }, i) => (
                  <Reveal delay={0.04 * i} key={label}>
                    <div className="flex h-full items-start gap-4 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] px-5 py-4">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[rgba(189,255,0,0.1)]">
                        <Icon aria-hidden size={18} className="text-[#BDFF00]" />
                      </span>
                      <span className="pt-2 text-[15px] leading-[1.5] text-[var(--text-secondary)]">
                        {label}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>
              <Reveal>
                <p className="mt-6 text-[16px] leading-[1.7] text-[var(--text-secondary)]">
                  <Em>Az oldal úgy készül, hogy ezek később is hozzáadhatók legyenek,</Em>{" "}
                  újrakezdés nélkül.
                </p>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* 07. Ki áll mögötte */}
        <section className="border-t border-[var(--border-hairline)] py-28 lg:py-36">
          <Container>
            <div className="mx-auto max-w-5xl">
              <Reveal>
                <SectionLabel number="07" text="KI ÁLL MÖGÖTTE" />
                <SectionHeading>ZynAI Development Kft.</SectionHeading>
              </Reveal>
              <div className="mt-10 grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_minmax(0,420px)] lg:gap-14">
                <Reveal delay={0.05}>
                  <div className="space-y-5 text-[17px] leading-[1.8] text-[var(--text-secondary)]">
                    <p>
                      Weboldalakat, AI-integrációt és automatizálást fejlesztünk
                      magyar kis- és középvállalkozásoknak. Nálunk a weboldal nem
                      cél, hanem eszköz: azt nézzük, hogy megtalálják-e önöket, és
                      el is érjék.
                    </p>
                    <p>
                      A cégünket 2026 októberében jegyezték be, úgyhogy közelről
                      ismerjük, mennyi minden jön egyszerre az első hetekben. A
                      weboldal ilyenkor inkább teher, mint öröm. Ezért állítottuk
                      össze az Induló csomagot:{" "}
                      <Em>
                        egy gyors, rendes kezdés, amit később bármikor tovább
                        lehet építeni.
                      </Em>
                    </p>
                    <p>
                      <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 font-medium text-[#BDFF00] hover:underline"
                      >
                        Bővebben rólunk
                        <ArrowUpRight aria-hidden size={15} />
                      </Link>
                    </p>
                  </div>
                </Reveal>
                <Reveal delay={0.12}>
                  <figure className="relative overflow-hidden rounded-3xl border border-[rgba(189,255,0,0.25)] bg-[rgba(189,255,0,0.03)] p-7">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute right-[-30px] top-[-30px] h-[160px] w-[160px]"
                      style={{
                        background: "radial-gradient(circle, rgba(189,255,0,0.14) 0%, transparent 70%)",
                        filter: "blur(20px)",
                      }}
                    />
                    <div className="relative z-10">
                      <div className="flex items-center gap-4">
                        <div className="relative size-16 shrink-0 overflow-hidden rounded-full border border-[var(--border-hairline)]">
                          <Image
                            alt="Bakos Attila, a ZynAI Development Kft. ügyvezetője"
                            className="object-cover object-top"
                            fill
                            sizes="64px"
                            src="/brand/attila/bakos_attila_portrait.webp"
                          />
                        </div>
                        <figcaption>
                          <p className="font-display text-[17px] font-medium text-[var(--text-primary)]">
                            Bakos Attila
                          </p>
                          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
                            Ügyvezető
                          </p>
                        </figcaption>
                      </div>
                      <blockquote className="mt-6 text-[16px] leading-[1.75] text-[var(--text-primary)]">
                        „A folyamatért és az eredmény minőségéért személyesen
                        felelek. Minden oldal átmegy a kezem alatt, mielőtt
                        élesbe kerül, és csak akkor adjuk át, ha úgy működik,
                        ahogy megbeszéltük.”
                      </blockquote>
                      <p className="mt-5 text-[14px] leading-[1.65] text-[var(--text-secondary)]">
                        Több mint tíz éve építek weboldalakat.
                      </p>
                    </div>
                  </figure>
                </Reveal>
              </div>
            </div>
          </Container>
        </section>

        {/* 08. Referenciák */}
        <section className="border-t border-[var(--border-hairline)] bg-[rgba(255,255,255,0.015)] py-28 lg:py-36">
          <Container>
            <div className="mx-auto max-w-5xl">
              <Reveal>
                <SectionLabel number="08" text="REFERENCIÁK" />
                <SectionHeading>Akiknek már dolgoztunk</SectionHeading>
              </Reveal>
              <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
                {CASES.map((c, i) => (
                  <Reveal delay={0.06 * i} key={c.href}>
                    <Link
                      href={c.href}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] transition-colors duration-300 hover:border-[rgba(189,255,0,0.3)]"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden border-b border-[var(--border-hairline)]">
                        <Image
                          alt={c.alt}
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                          fill
                          sizes="(max-width: 768px) 100vw, 480px"
                          src={c.image}
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-7">
                        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#BDFF00]">
                          {c.label}
                        </p>
                        <p className="mt-4 text-[16px] leading-[1.7] text-[var(--text-primary)]">
                          {c.title}
                        </p>
                        <p className="mt-2 text-[14px] leading-[1.65] text-[var(--text-secondary)]">
                          {c.text}
                        </p>
                        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[14px] font-medium text-[#BDFF00]">
                          Megnézem az esettanulmányt
                          <ArrowUpRight
                            aria-hidden
                            size={15}
                            className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          />
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                {TESTIMONIALS.map((t, i) => (
                  <Reveal delay={0.06 * i} key={t.name}>
                    <figure className="flex h-full flex-col rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] p-7">
                      <Quote aria-hidden size={22} className="text-[#BDFF00]" />
                      <blockquote className="mt-4 flex-1 text-[16px] leading-[1.75] text-[var(--text-primary)]">
                        „{t.quote}”
                      </blockquote>
                      <figcaption className="mt-6 text-[14px] text-[var(--text-secondary)]">
                        <Em>{t.name}</Em> · {t.site}
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            </div>
            <LandingExamples
              eyebrow="Ezekből a stílusokból indulhatunk ki"
              description="Néhány stílusirány, amiből a hívás után kiindulhatunk. Az önök oldala a saját tartalmukkal, a cég arculatára szabva készül."
            />
          </Container>
        </section>

        {/* 09. Amire számíthatnak */}
        <section className="border-t border-[var(--border-hairline)] py-28 lg:py-36">
          <Container>
            <div className="mx-auto max-w-5xl">
              <Reveal>
                <SectionLabel number="09" text="AMIRE SZÁMÍTHATNAK" />
                <SectionHeading>Amire számíthatnak</SectionHeading>
              </Reveal>
              <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {PROMISES.map((p, i) => (
                  <Reveal delay={0.04 * i} key={p.lead}>
                    <div className="flex h-full items-start gap-3 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] px-5 py-4">
                      <CheckIcon />
                      <span className="text-[15px] leading-[1.6] text-[var(--text-secondary)]">
                        <Em>{p.lead}</Em> {p.text}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* 10. Időpont */}
        <section
          id="idopont"
          className="border-t border-[var(--border-hairline)] bg-[rgba(255,255,255,0.015)] py-28 lg:py-36"
        >
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <Reveal>
                <SectionLabel className="justify-center" number="10" text="IDŐPONT" />
                <SectionHeading>Hívjam fel?</SectionHeading>
                <p className="mx-auto mt-6 max-w-xl text-[18px] leading-[1.75] text-[var(--text-secondary)]">
                  Válasszon egy időpontot, és a megadott számon felhívom. 20 perc,
                  nem kötelez semmire.
                </p>
                <BookingBonus />
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <div className="mx-auto mt-10 max-w-3xl">
                <CalEmbed formal layout="month_view" target={INDULO_CAL} />
              </div>
            </Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Reveal delay={0.1}>
                <p className="mt-8 text-[14px] leading-[1.7] text-[var(--text-tertiary)]">
                  Ha egyik időpont sem jó, írjon a{" "}
                  <MailtoLink
                    email={BOOKING_EMAIL}
                    className="text-[var(--text-primary)] underline underline-offset-2 hover:text-[#BDFF00]"
                  >
                    {BOOKING_EMAIL}
                  </MailtoLink>{" "}
                  címre.
                </p>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* 11. GYIK */}
        <section className="border-t border-[var(--border-hairline)] py-28 lg:py-36">
          <Container>
            <div className="mx-auto max-w-2xl">
              <Reveal>
                <SectionLabel number="11" text="GYAKORI KÉRDÉSEK" />
                <SectionHeading>Amit gyakran megkérdeznek</SectionHeading>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-10">
                  <FaqAccordion items={FAQ} />
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* Záró blokk */}
        <section className="border-t border-[var(--border-hairline)] py-28 lg:py-36">
          <Container>
            <div className="relative mx-auto max-w-2xl overflow-hidden rounded-[32px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-8 py-14 text-center sm:px-12 sm:py-16">
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-[-40px] z-0 h-[280px] w-[480px] -translate-x-1/2"
                style={{
                  background: "radial-gradient(ellipse, rgba(189,255,0,0.10) 0%, transparent 70%)",
                  filter: "blur(60px)",
                }}
              />
              <div className="relative z-10">
                <Reveal>
                  <h2
                    className="font-display font-medium text-[var(--text-primary)]"
                    style={{ fontSize: "clamp(28px, 3.5vw, 44px)", letterSpacing: "-0.025em", lineHeight: 1.1 }}
                  >
                    Az indulás így is elég munka. A weboldal legyen a kisebbik gond.
                  </h2>
                  <p className="mx-auto mt-6 max-w-md text-[16px] leading-[1.7] text-[var(--text-secondary)]">
                    20 perc telefon, és tudják, mit kapnak, mikorra és mennyiért.
                  </p>
                  <ClosingBonus />
                  <div className="mt-10 flex justify-center">
                    <PrimaryCta>Kérek egy 20 perces hívást</PrimaryCta>
                  </div>
                </Reveal>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </OfferProvider>
  );
}

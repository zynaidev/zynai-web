import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { MailtoLink } from "@/components/ui/MailtoLink";
import { SectionLabel } from "@/components/ui/section-label";
import { FaqAccordion, type FaqItem } from "../vibecoding-pilot/FaqAccordion";

import {
  BookingBonus,
  ClosingBonus,
  HeroBonus,
  HeroGreeting,
  OfferBar,
  OfferProvider,
  PersonalizedPlan,
  PriceBonus,
  PriceCtaLabel,
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

function Heading({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display text-[clamp(28px,4vw,44px)] font-medium leading-[1.1] tracking-[-0.025em] text-[var(--text-primary)]">
      {children}
    </h2>
  );
}

function Section({
  id,
  number,
  label,
  children,
}: {
  id?: string;
  number: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="border-t border-[var(--border-hairline)] py-16 lg:py-24">
      <Container>
        <div className="max-w-[760px] space-y-4 text-[17px] leading-[1.7] text-[var(--text-secondary)]">
          <SectionLabel number={number} text={label} className="mb-6" />
          {children}
        </div>
      </Container>
    </section>
  );
}

function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc space-y-2 pl-6 marker:text-[#BDFF00]">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

function Cta({ children }: { children: ReactNode }) {
  return (
    <a
      href="#idopont"
      className="inline-flex rounded-full bg-[#BDFF00] px-8 py-4 text-[15px] font-medium text-[#09090B] transition-transform duration-200 hover:scale-[1.02]"
    >
      {children}
    </a>
  );
}

function Strong({ children }: { children: ReactNode }) {
  return <strong className="font-medium text-[var(--text-primary)]">{children}</strong>;
}

const FAQ: FaqItem[] = [
  {
    question: "Mi készül pontosan? WordPress lesz?",
    answer:
      "Nem WordPress. Az oldal Next.js-szel készül: ez egy modern webes keretrendszer, nagy nemzetközi cégek is használják, és ezen fut a zynai.hu is. Önöknek ebből ennyi számít. Gyors: az oldal előre elkészített formában töltődik be, mobilon is pillanatok alatt; a Google a gyors oldalakat előrébb sorolja, a látogató pedig nem lép le, mielőtt betöltene. Biztonságos: nincs nyilvános adminfelület és nincsenek bővítmények, amiken keresztül a WordPress-oldalakat a leggyakrabban feltörik. Stabil: nem romlik el attól, hogy egy bővítmény frissül, vagy nem frissül. Bővíthető: az időpontfoglalás, az online fizetés vagy egy AI-megoldás ugyanabba az oldalba épül be, újrakezdés nélkül.",
  },
  {
    question: "Mennyi idő alatt készül el?",
    answer:
      "14 nap alatt, a szerződéskötéstől és az előlegtől számítva, ha addigra megkapom a szükséges anyagokat (logó, ha van, elérhetőségek, pár mondat a cégről).",
  },
  {
    question: "Mit kell nekünk csinálni?",
    answer:
      "Nagyon keveset: a hívásban elmondják, mivel foglalkoznak, elküldik az anyagokat, és átnézik az első változatot. A szöveget én írom.",
  },
  {
    question: "Miért állja az első 3 hónap üzemeltetését?",
    answer:
      "Mert sok magyar vállalkozás évekig weboldal nélkül működik, és közben elveszíti azokat az ügyfeleket, akik rákeresnek, de nem találnak semmit. Szeretném, ha egy új cégnél ez nem az első hónapok költségén múlna. Az induláskor minden kiadás számít, ezért az első negyedévet én állom.",
  },
  {
    question: "Miért csak 14 napig érvényes az ajándék?",
    answer:
      "Mert az indulásnak szól. Az első hetekben számít a legtöbbet, hogy a cég megtalálható legyen, amikor az első partnerek és ügyfelek rákeresnek.",
  },
  {
    question: "Mi történik a határidő után?",
    answer:
      "A hívást ugyanúgy kérheti, és a csomag is ugyanannyiba kerül. Az első 3 hónap üzemeltetését viszont már nem tudom átvállalni.",
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
      "Mert a cég elérhetősége új cégként megjelent a nyilvános cégjegyzékben. Ez egyszeri megkeresés: további levelet csak akkor küldök, ha kifejezetten kéri.",
  },
];

export default function InduloWebcsomagPage() {
  return (
    <OfferProvider>
      <div className="[&_section]:scroll-mt-24">
        <OfferBar />

        {/* Hero */}
        <section className="pb-16 pt-24 lg:pb-24 lg:pt-32">
          <Container>
            <div className="max-w-[860px]">
              <p className="type-label">ZYNAI INDULÓ CSOMAG</p>
              <HeroGreeting />
              <h1 className="mt-6 font-display text-[clamp(40px,6vw,72px)] font-medium leading-[1.05] tracking-[-0.03em] text-[var(--text-primary)]">
                Az első weboldaluk. Gyorsan, rendesen, fölösleg nélkül.
              </h1>
              <p className="mt-6 max-w-[640px] text-[18px] leading-[1.7] text-[var(--text-secondary)]">
                Egy új cégnek nem nagy weboldal kell, hanem egy rendezett első
                oldal, ahol megtalálják, és ahonnan el is érik önöket. A
                szerződéstől számított 14 napon belül kész, fix áron.
              </p>
              <p className="mt-8 font-display text-[32px] font-medium text-[var(--text-primary)]">
                190.000 Ft + áfa
              </p>
              <HeroBonus />
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <Cta>Kérek egy 20 perces hívást →</Cta>
                <a
                  href="#javaslat"
                  className="text-[15px] text-[var(--text-secondary)] underline underline-offset-4 hover:text-[var(--text-primary)]"
                >
                  Nézze meg az önöknek javasolt oldalt ↓
                </a>
              </div>
              <p className="mt-4 text-[14px] italic text-[var(--text-tertiary)]">
                Telefonhívás, nem online meeting. Nem kötelez semmire.
              </p>
            </div>
          </Container>
        </section>

        <Section id="javaslat" number="01" label="AZ ÖNÖKNEK JAVASOLT OLDAL">
          <PersonalizedPlan
            fallback={
              <>
                <Heading>Minden oldal a cég tevékenységére szabva készül</Heading>
                <p className="mt-6">
                  Egy étteremnek mást kell kiemelnie, mint egy könyvelőnek vagy
                  egy gépkölcsönzőnek. A hívásban átbeszéljük, mivel
                  foglalkoznak, és ehhez igazítom az oldal szerkezetét és
                  szövegét.
                </p>
              </>
            }
          />
        </Section>

        <Section number="02" label="MIÉRT MOST">
          <Heading>Az első hetekben dől el, mit látnak önökről.</Heading>
          <p>
            Bankszámla, könyvelő, bélyegző, szerződések: az indulás első
            heteiben minden egyszerre jön. Közben az első partnerek, ügyfelek
            és a bank is rákeres a cégre. Ha ilyenkor nincs semmi, vagy csak egy
            félkész oldal, az kérdést hagy maga után.
          </p>
          <p>
            Az Induló csomag ezt a kérdést zárja le: egy rendezett, hiteles első
            oldal, amit önöknek nem kell megírniuk, megtervezniük vagy
            üzemeltetniük.
          </p>
          <Bullets
            items={[
              <><Strong>Megtalálják:</Strong> alapszintű Google-beállításokkal indul.</>,
              <><Strong>Elérik:</Strong> kattintható telefonszám, e-mail és kapcsolati űrlap.</>,
              <><Strong>Komolyan veszik:</Strong> saját domain, mobilon is jól mutat, adatkezelési tájékoztatóval és sütibannerrel.</>,
            ]}
          />
        </Section>

        <Section number="03" label="A CSOMAG">
          <Heading>Ami minden Induló oldalban benne van</Heading>
          <p>A fenti oldalszerkezet erre a vázra épül:</p>
          <Bullets
            items={[
              <><Strong>Mobilbarát, egyoldalas bemutatkozó oldal</Strong> 5–6 szekcióval, az önöknek javasolt szerkezettel</>,
              <><Strong>Szövegezés a cég adataiból:</Strong> a szöveget én írom, önöknek csak át kell nézniük, egy javítási körrel</>,
              <><Strong>Kapcsolati űrlap</Strong> és kattintható telefonszám, e-mail</>,
              <Strong key="g">Google-megtalálhatósági alapbeállítások</Strong>,
              <><Strong>Tárhely és üzembe helyezés</Strong> a saját domainjükön</>,
              <Strong key="a">Adatkezelési tájékoztató és sütibanner</Strong>,
            ]}
          />
          <p>
            <Strong>Amit önöknek kell csinálni:</Strong> egy 20 perces
            beszélgetés, a szükséges anyagok elküldése (logó, ha van,
            elérhetőségek, pár mondat a cégről) és az első változat átnézése.
          </p>
        </Section>

        <Section number="04" label="ÍGY ZAJLIK">
          <Heading>14 nap alatt kész, három lépésben</Heading>
          <ol className="list-decimal space-y-3 pl-6">
            <li>
              <Strong>20 perces telefonhívás.</Strong> Átbeszéljük, mivel
              foglalkoznak, mit szeretnének kiemelni, és kell-e bármi a csomagon
              túl. A végén pontosan tudják, mit kapnak és mennyiért.
            </li>
            <li>
              <Strong>Szerződés és első változat.</Strong> A szerződéskötéssel és
              az előleggel indul a 14 nap. Elkészítem az oldalt a cég adataiból,
              önöknek csak át kell nézniük.
            </li>
            <li>
              <Strong>Javítás és átadás.</Strong> Egy javítási kör után az oldal
              él, a saját domainjükön.
            </li>
          </ol>
        </Section>

        <Section number="05" label="AZ ÁR">
          <Heading>Egy ár, meglepetés nélkül</Heading>
          <div className="mt-6 rounded-2xl border border-[var(--border-default)] p-6">
            <p className="type-label">Induló csomag</p>
            <p className="mt-2 font-display text-[36px] font-medium text-[var(--text-primary)]">
              190.000 Ft + áfa
            </p>
            <p className="text-[15px]">
              egyszeri díj · a szerződéstől számított 14 napon belül kész
            </p>
          </div>
          <PriceBonus />
          <Bullets
            items={[
              <><Strong>Fizetés:</Strong> 50% a szerződéskötéskor, 50% az átadáskor.</>,
              <><Strong>A domain az önöké.</Strong> A cég nevére kerül, a díját önök fizetik közvetlenül a szolgáltatónak.</>,
              <><Strong>Fix ár:</Strong> ha a csomagon túli funkció kell, azt a hívás után írásban, előre megkapják.</>,
              <><Strong>Karbantartás igény szerint:</Strong> ha szeretnék, az ajándék időszak után is én tartom karban az oldalt, hosszú távon is. Elköteleződés nélkül.</>,
            ]}
          />
          <div className="pt-4">
            <Cta>
              <PriceCtaLabel />
            </Cta>
          </div>
        </Section>

        <Section number="06" label="HA TÖBB KELL">
          <Heading>Amit később, vagy rögtön, hozzá lehet tenni</Heading>
          <p>
            Az Induló csomag szándékosan egyszerű. Ha önöknél ennél több kell, a
            hívásban előre beárazom:
          </p>
          <Bullets
            items={[
              "Időpontfoglalás",
              "Online fizetés",
              "Több nyelv",
              "Egyedi AI-megoldások, például automatikus ajánlatküldés vagy ügyfélkezelés",
            ]}
          />
          <p>
            Az oldal úgy készül, hogy ezek később is hozzáadhatók legyenek,
            újrakezdés nélkül.
          </p>
        </Section>

        <Section number="07" label="KI KÉSZÍTI">
          <Heading>Bakos Attila</Heading>
          <p className="italic">Ügyvezető, ZynAI Development Kft.</p>
          <p>
            Több mint tíz éve építek weboldalakat, ma pedig főleg azon dolgozom,
            hogy magyar kis- és középvállalkozások okosabban és kevesebb kézi
            munkával működjenek, AI-integrációval és automatizálással.
          </p>
          <p>
            A ZynAI Development Kft.-t 2026 októberében jegyezték be, úgyhogy
            pontosan tudom, mennyi minden jön egyszerre az első hetekben. A
            weboldal ilyenkor inkább teher, mint öröm. Ezért találtam ki ezt a
            csomagot: egy gyors, rendes kezdés, amit később bármikor tovább
            lehet építeni.
          </p>
          <p>
            <Strong>Önöknek egy ember felel az oldalért, az elejétől a végéig.</Strong>{" "}
            Nincs ügyintéző, nincs továbbadás.
          </p>
          <p>
            <Link
              href="/"
              className="text-[var(--text-primary)] underline underline-offset-4 hover:text-[#BDFF00]"
            >
              → Bővebben rólam és a ZynAI-ról
            </Link>
          </p>
        </Section>

        <Section number="08" label="REFERENCIÁK">
          <Heading>Akiknek már dolgoztam</Heading>
          <div className="grid gap-4 pt-4 sm:grid-cols-2">
            <Link
              href="/esettanulmanyok/aedificium-design"
              className="rounded-2xl border border-[var(--border-hairline)] p-6 hover:border-[var(--border-default)]"
            >
              <p className="type-label">Esettanulmány · Aedificium Design</p>
              <p className="mt-3 font-medium text-[var(--text-primary)]">
                Prémium weboldal, két hét alatt.
              </p>
              <p className="mt-2 text-[15px]">
                A stúdió közösségimédia-elérése tízszeresére nőtt.
              </p>
              <p className="mt-4 text-[15px] text-[#BDFF00]">
                → Megnézem az esettanulmányt
              </p>
            </Link>
            <Link
              href="/esettanulmanyok/silverlimo"
              className="rounded-2xl border border-[var(--border-hairline)] p-6 hover:border-[var(--border-default)]"
            >
              <p className="type-label">Esettanulmány · SilverLimo</p>
              <p className="mt-3 font-medium text-[var(--text-primary)]">
                Lassú WordPress oldal helyett gyors, mérhető oldal.
              </p>
              <p className="mt-2 text-[15px]">
                14× gyorsabb első tartalom, 24× gyorsabb szerverválasz.
              </p>
              <p className="mt-4 text-[15px] text-[#BDFF00]">
                → Megnézem az esettanulmányt
              </p>
            </Link>
          </div>
          <blockquote className="mt-8 border-l-2 border-[#BDFF00] pl-5">
            <p>
              „Kezdetleges formájában tízszeres elérést értünk el, ez
              fantasztikus eredmény. A weboldal nagyon profi, design fókuszú és
              stabil. Az egyik legjobb befektetésünk volt.”
            </p>
            <footer className="mt-2 text-[15px]">
              <Strong>Loddo Riccardo</Strong> · aedificium.design
            </footer>
          </blockquote>
          <blockquote className="mt-6 border-l-2 border-[#BDFF00] pl-5">
            <p>
              „Több éve együtt dolgozunk, a weboldalamat és a hirdetéseimet is
              Attila kezeli. A korábbi WordPress oldalam is jól teljesített, de a
              mostani javítások elképesztőek. Nagyon megérte, köszi!”
            </p>
            <footer className="mt-2 text-[15px]">
              <Strong>Dóczi László</Strong> · silverlimo.hu
            </footer>
          </blockquote>
          <h3 className="pt-8 font-display text-[22px] font-medium text-[var(--text-primary)]">
            Ezekből a stílusokból indulhatunk ki
          </h3>
          <p className="italic">
            Néhány stílusirány, amiből a hívás után kiindulhatunk. Az önök oldala
            a saját tartalmukkal, a cég arculatára szabva készül.
          </p>
        </Section>

        <Section number="09" label="AMIRE SZÁMÍTHATNAK">
          <Bullets
            items={[
              <><Strong>Fix ár, írásban.</Strong> A hívás után pontosan tudják, mit fizetnek.</>,
              <><Strong>14 napos határidő.</Strong> A szerződéstől számítva, írásban vállalva.</>,
              <><Strong>Egy javítási kör benne van.</Strong> Az oldal akkor megy élesbe, amikor jónak látják.</>,
              <><Strong>A domain az önöké.</Strong> Akkor is, ha később máshová költöznének.</>,
              <><Strong>Nem kötelez semmire a hívás.</Strong> Ha nem kérik, annyi.</>,
            ]}
          />
        </Section>

        <Section id="idopont" number="10" label="IDŐPONT">
          <Heading>Hívjam fel?</Heading>
          <p>
            Válasszon egy időpontot, és a megadott számon felhívom. 20 perc, nem
            kötelez semmire.
          </p>
          <BookingBonus />
          <p className="text-[15px] italic">
            Ha egyik időpont sem jó, írjon a{" "}
            <MailtoLink
              email={BOOKING_EMAIL}
              className="text-[var(--text-primary)] underline underline-offset-2 hover:text-[#BDFF00]"
            >
              {BOOKING_EMAIL}
            </MailtoLink>{" "}
            címre.
          </p>
        </Section>

        <Section number="11" label="GYAKORI KÉRDÉSEK">
          <Heading>Amit gyakran megkérdeznek</Heading>
          <div className="pt-4">
            <FaqAccordion items={FAQ} />
          </div>
        </Section>

        {/* Záró blokk */}
        <section className="border-t border-[var(--border-hairline)] py-20 lg:py-28">
          <Container>
            <div className="mx-auto max-w-[760px] text-center text-[17px] text-[var(--text-secondary)]">
              <Heading>
                Az indulás így is elég munka. A weboldal legyen a kisebbik gond.
              </Heading>
              <p className="mt-6">
                20 perc telefon, és tudják, mit kapnak, mikorra és mennyiért.
              </p>
              <ClosingBonus />
              <div className="mt-8">
                <Cta>Kérek egy 20 perces hívást →</Cta>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </OfferProvider>
  );
}

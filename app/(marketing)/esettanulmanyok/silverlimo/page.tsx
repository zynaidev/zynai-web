"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { SectionLabel } from "@/components/ui/section-label";

const STATS = [
  { label: "első tartalom megjelenése gyorsabb", suffix: "×", value: 14 },
  { label: "gyorsabb szerverválasz", suffix: "×", value: 24 },
  { label: "accessibility · best practices · seo", suffix: "/100", value: 100 },
] as const;

const COMPARISON_ROWS = [
  { label: "Teljesítmény", before: "47", after: "74" },
  { label: "Első tartalom megjelenése", before: "12,8 s", after: "0,9 s" },
  { label: "Szerverválasz", before: "1 340 ms", after: "55 ms" },
  { label: "Oldalsúly", before: "3,4 MB", after: "1,0 MB" },
  { label: "Akadálymentesség", before: "91", after: "100" },
  { label: "Bevált módszerek", before: "54", after: "100" },
  { label: "SEO", before: "100", after: "100" },
] as const;

const HERO_SRC = "/esettanulmanyok/silverlimo_hero.webp";

const quote: string | null = null;

function StatStrip() {
  return (
    <section className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
      {STATS.map((stat) => (
        <AnimatedStatCard
          key={stat.label}
          label={stat.label}
          suffix={stat.suffix}
          value={stat.value}
        />
      ))}
    </section>
  );
}

function AnimatedStatCard({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    margin: "-100px",
    once: true,
  });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1800;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] px-8 py-8 text-center"
    >
      <p
        className="font-display font-medium text-[#BDFF00]"
        style={{ fontSize: "48px" }}
      >
        {count}
        {suffix}
      </p>
      <p className="mt-2 font-mono text-[12px] uppercase tracking-wider text-[var(--text-tertiary)]">
        {label}
      </p>
    </div>
  );
}

function ComparisonTable() {
  return (
    <div className="mb-6">
      <div className="overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]">
        <div className="sm:hidden">
          {COMPARISON_ROWS.map((row) => (
            <div
              className="border-b border-[rgba(255,255,255,0.06)] last:border-b-0"
              key={row.label}
            >
              <p className="px-4 pt-4 text-[14px] leading-[1.4] text-[var(--text-secondary)]">
                {row.label}
              </p>
              <div className="grid grid-cols-2">
                <div className="px-4 py-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
                    WordPress
                  </p>
                  <p className="mt-1 text-[15px] text-[var(--text-secondary)]">
                    {row.before}
                  </p>
                </div>
                <div className="bg-[rgba(189,255,0,0.06)] px-4 py-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#BDFF00]">
                    Next.js
                  </p>
                  <p className="mt-1 text-[15px] font-medium text-[#BDFF00]">
                    {row.after}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="hidden sm:grid sm:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)_minmax(0,0.8fr)]">
          <div className="border-b border-r border-[rgba(255,255,255,0.06)] px-4 py-4 sm:px-6" />
          <div className="border-b border-r border-[rgba(255,255,255,0.06)] px-4 py-4 sm:px-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
              WordPress
            </p>
          </div>
          <div className="border-b border-[rgba(255,255,255,0.06)] bg-[rgba(189,255,0,0.06)] px-4 py-4 sm:px-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#BDFF00]">
              Next.js
            </p>
          </div>
          {COMPARISON_ROWS.map((row) => (
            <div className="contents" key={row.label}>
              <div className="border-b border-r border-[rgba(255,255,255,0.06)] px-4 py-4 sm:px-6">
                <p className="text-[14px] leading-[1.5] text-[var(--text-secondary)] sm:text-[15px]">
                  {row.label}
                </p>
              </div>
              <div className="border-b border-r border-[rgba(255,255,255,0.06)] px-4 py-4 sm:px-6">
                <p className="text-[14px] leading-[1.5] text-[var(--text-secondary)] sm:text-[15px]">
                  {row.before}
                </p>
              </div>
              <div className="border-b border-[rgba(255,255,255,0.06)] bg-[rgba(189,255,0,0.06)] px-4 py-4 sm:px-6">
                <p className="text-[14px] leading-[1.5] font-medium text-[#BDFF00] sm:text-[15px]">
                  {row.after}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-3 font-mono text-[11px] leading-relaxed text-[var(--text-tertiary)]">
        Google PageSpeed Insights, mobil mérés. A teljesítménypontszám maradék
        része a Google hirdetési és analitikai eszközeiből adódik — ezeket
        tudatosan megtartottuk, mert a konverziómérés fontosabb néhány extra
        pontnál.
      </p>
    </div>
  );
}

export default function SilverLimoCaseStudyPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-6 pb-24 pt-32 lg:px-12">
      <a
        className="mb-16 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--text-tertiary)] transition-colors duration-200 hover:text-[var(--text-primary)]"
        href="/esettanulmanyok"
      >
        <ArrowLeft aria-hidden size={14} />
        Vissza az esettanulmányokhoz
      </a>

      <header className="mb-16 max-w-3xl">
        <SectionLabel number="ESETTANULMÁNY" text="2026" />

        <div
          className="mb-6 mt-6 h-[2px] w-12 bg-[#BDFF00]"
          style={{ boxShadow: "0 0 8px rgba(189,255,0,0.6)" }}
          aria-hidden
        />

        <h1
          className="font-display font-medium text-[var(--text-primary)]"
          style={{
            fontSize: "clamp(28px, 4vw, 52px)",
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
          }}
        >
          Hogyan lett egy lassú WordPress oldalból 14× gyorsabb weboldal a
          SilverLimónál
        </h1>

        <p className="mt-6 text-[18px] leading-[1.65] text-[var(--text-secondary)]">
          WordPress-ről Next.js-re migráltunk egy budapesti limuzinbérlő céget —
          a Google Ads konverziómérés megszakítása nélkül, mérhető eredményekkel.
        </p>

        <div className="mt-10 mb-16 grid grid-cols-1 overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.03)] sm:grid-cols-3 sm:gap-0">
          <div className="border-b border-[rgba(255,255,255,0.07)] px-6 py-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
              Ügyfél
            </p>
            <p className="text-[14px] font-medium text-[var(--text-primary)]">
              Dóczi László, Silvermoving Kft.
            </p>
          </div>
          <div className="border-b border-[rgba(255,255,255,0.07)] px-6 py-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
              Weboldal
            </p>
            <p className="text-[14px] font-medium">
              <a
                className="text-[var(--text-primary)] transition-colors duration-200 hover:text-[#BDFF00]"
                href="https://silverlimo.hu"
                rel="noopener noreferrer"
                target="_blank"
              >
                silverlimo.hu
              </a>
            </p>
          </div>
          <div className="border-b border-[rgba(255,255,255,0.07)] px-6 py-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
              Időszak
            </p>
            <p className="text-[14px] font-medium text-[var(--text-primary)]">
              2026
            </p>
          </div>
        </div>
      </header>

      <StatStrip />

      <section className="mx-[-16px] mb-20 max-w-5xl sm:mx-auto">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--text-tertiary)]">
          A SilverLimo új weboldala
        </p>
        <div
          className="overflow-hidden rounded-none border border-[rgba(255,255,255,0.08)] sm:rounded-2xl"
          style={{
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.07), 0 40px 80px rgba(0,0,0,0.7), 0 0 80px rgba(189,255,0,0.05)",
          }}
        >
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{
              background:
                "linear-gradient(to right, rgba(255,255,255,0.04), rgba(255,255,255,0.06))",
            }}
          >
            <span
              aria-hidden
              className="size-2 shrink-0 rounded-full bg-[rgba(255,255,255,0.15)]"
            />
            <span
              aria-hidden
              className="size-2 shrink-0 rounded-full bg-[rgba(255,255,255,0.15)]"
            />
            <span
              aria-hidden
              className="size-2 shrink-0 rounded-full bg-[rgba(255,255,255,0.15)]"
            />
            <div className="ml-4 hidden flex-1 rounded-md bg-[rgba(255,255,255,0.06)] px-3 py-1 font-mono text-[11px] text-[var(--text-tertiary)] sm:block">
              silverlimo.hu
            </div>
          </div>
          <Image
            alt="SilverLimo weboldal"
            className="h-auto w-full object-cover object-top"
            height={820}
            priority
            src={HERO_SRC}
            width={1425}
          />
        </div>
      </section>

      <div className="mx-auto max-w-2xl">
        <CaseBlock
          paragraphs={[
            "A SilverLimo weboldala WordPressen, Elementorral futott — és mobilon gyakorlatilag használhatatlan volt. A látogató 12,8 másodpercig fehér képernyőt látott, mielőtt bármi megjelent. Ez azért fájt különösen, mert a forgalom 83%-a mobilról érkezik, nagyrészt fizetett Google Ads hirdetésekből.",
            "A háttérben rosszabb dolog is történt: a konverziómérés egy része már a migráció előtt sem működött. Négy mérőcímke — köztük mindkét közvetlen Google Ads konverziós címke — olyan oldalra volt kötve, amelyet a látogató soha nem töltött be.",
            "A feladat tehát nem egyszerű átépítés volt. Úgy kellett platformot cserélni, hogy a futó hirdetési kampány egyetlen napra se veszítse el a mérési alapját.",
          ]}
          title="A kihívás"
        />

        <CaseBlock
          paragraphs={[
            "Mielőtt egy sort írtunk volna, teljes leltárt készítettünk: minden URL, minden űrlapmező, minden mérőcímke és minden folyamat, amit egy foglalás elindít. Kiderült, hogy egyetlen űrlapbeküldés négy rendszert táplál — e-mail értesítés, köszönőoldal, Google Ads konverzió és az ügyfél belső riportolási adatbázisa.",
            "A Google Ads optimalizálás egyetlen eseményen állt, ami a régi űrlapbővítményhez volt kötve. Az új oldalon ezt pontosan ugyanazzal a névvel pótoltuk — így a hirdetési fiókban semmit nem kellett módosítani, és a kampány tanulási fázisa sem indult újra.",
          ]}
          title="1. lépés — Felmérés és konverziós lánc feltérképezése"
        />

        <CaseBlock
          paragraphs={[
            "Az oldal Next.js-ben készült újra, ugyanazokkal az URL-ekkel, hogy a Google-ben megszerzett helyezések ne sérüljenek. A képek automatikusan modern formátumra konvertálódnak, a betűtípusok helyben töltődnek, a szerver előre elkészített oldalakat szolgál ki.",
            "Közben kijavítottuk, ami eddig hiányzott: mérjük a telefonszámra kattintásokat, GDPR-kompatibilis cookie-kezelés került az oldalra, és a foglalási e-mailek hitelesített domainről, megbízhatóan érkeznek.",
          ]}
          title="2. lépés — Új weboldal modern alapokon"
        />

        <CaseBlock
          paragraphs={[
            "Élesítés után méréssorozattal optimalizáltunk tovább: kivettük a nem használt betűtípus-változatokat, rendbe tettük a betöltési sorrendet, és minden oldalt akadálymentességi szempontból is átnéztünk.",
            "Minden módosítás után újramértünk. Ami nem hozott javulást, azt visszavontuk.",
          ]}
          title="3. lépés — Finomhangolás mérés alapján"
        />

        <EditorialHeading title="Eredmények" />
        <ul className="mb-6 ml-4 space-y-2">
          <ResultItem>
            Az első tartalom <strong className="font-medium text-[var(--text-primary)]">12,8 s helyett 0,9 s</strong> alatt jelenik meg mobilon
          </ResultItem>
          <ResultItem>
            A szerver válaszideje <strong className="font-medium text-[var(--text-primary)]">1 340 ms-ról 55 ms-ra</strong> csökkent
          </ResultItem>
          <ResultItem>
            <strong className="font-medium text-[var(--text-primary)]">69%-kal könnyebb</strong> oldal — 3,4 MB helyett 1 MB
          </ResultItem>
          <ResultItem>
            <strong className="font-medium text-[var(--text-primary)]">100/100</strong> Accessibility, Best Practices és SEO pontszám
          </ResultItem>
          <ResultItem>
            Nulla elmozdulás betöltés közben — a tartalom nem ugrál
          </ResultItem>
          <ResultItem>
            A Google Ads konverziómérés <strong className="font-medium text-[var(--text-primary)]">megszakítás nélkül</strong> működött tovább
          </ResultItem>
        </ul>

        <ComparisonTable />

        {quote ? (
          <blockquote
            className="-mx-6 my-8 text-[var(--text-primary)] italic"
            style={{
              background: "rgba(189,255,0,0.04)",
              border: "none",
              borderLeft: "3px solid #BDFF00",
              borderRadius: "0 16px 16px 0",
              boxShadow:
                "inset 0 0 0 1px rgba(189,255,0,0.07), 0 0 40px rgba(189,255,0,0.04)",
              fontSize: "17px",
              lineHeight: 1.75,
              padding: "28px 32px",
            }}
          >
            {quote}
            <div className="mt-5 flex items-center gap-3 not-italic">
              <span aria-hidden className="h-px w-6 shrink-0 bg-[#BDFF00]" />
              <p className="font-mono text-[12px] text-[var(--text-tertiary)]">
                Dóczi László · Silvermoving Kft.
              </p>
            </div>
          </blockquote>
        ) : null}

        <EditorialHeading title="Következő lépések" />
        <ul className="mb-6 ml-4 space-y-2">
          <ResultItem>
            Alkalomspecifikus landing oldalak (esküvő, lánybúcsú, szülinap) — már most van rájuk keresési kereslet
          </ResultItem>
          <ResultItem>
            Google értékelések megjelenítése élő adatként az oldalon
          </ResultItem>
          <ResultItem>
            Az üzleti eredmények — hirdetési költség foglalásonként, keresési helyezések — mérése a következő hetekben
          </ResultItem>
        </ul>

        <footer className="relative mx-auto mt-24 max-w-2xl border-t border-[rgba(255,255,255,0.06)] pt-16 text-center">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[-60px] z-0"
            style={{
              background:
                "radial-gradient(ellipse, rgba(189,255,0,0.07) 0%, transparent 70%)",
              filter: "blur(60px)",
              height: "300px",
              transform: "translateX(-50%)",
              width: "500px",
            }}
          />
          <div className="relative z-[1]">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
              Következő lépés
            </p>
            <h2
              className="font-display mx-auto mb-4 max-w-[28ch] text-[var(--text-primary)]"
              style={{
                fontSize: "clamp(28px, 3.5vw, 42px)",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              Hasonló eredményeket szeretnél?
            </h2>
            <p className="mx-auto mb-10 max-w-[40ch] text-[16px] text-[var(--text-secondary)]">
              Nézzük meg, hol hozhat valódi eredményt az AI a te vállalkozásodban.
            </p>

            <div className="flex justify-center">
              <a
                className="relative inline-flex overflow-hidden rounded-full bg-[#BDFF00]"
                href="/kapcsolatfelvetel"
                style={{
                  boxShadow:
                    "0 0 40px rgba(189,255,0,0.3), 0 0 80px rgba(189,255,0,0.1)",
                }}
              >
                <span className="flex flex-1 items-center justify-center px-8 py-4 font-medium text-[15px] text-[#09090B]">
                  Kezdjük el
                </span>
                <span
                  aria-hidden
                  className="pointer-events-none w-px shrink-0 self-stretch bg-[rgba(9,9,11,0.15)]"
                />
                <span className="flex items-center px-5 py-4">
                  <ArrowRight aria-hidden size={16} className="text-[#09090B]" />
                </span>
              </a>
            </div>

            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
              Ingyenes · 30 perc · Nem kötelez el semmire
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

function ResultItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span
        aria-hidden
        className="mt-2 size-[4px] flex-shrink-0 rounded-[2px] bg-[#BDFF00]"
      />
      <span className="text-[16px] leading-[1.8] text-[var(--text-secondary)]">
        {children}
      </span>
    </li>
  );
}

function EditorialHeading({ title }: { title: string }) {
  return (
    <h2
      className="font-display mb-5 mt-14 text-[var(--text-primary)]"
      style={{ fontSize: "clamp(20px, 2vw, 26px)" }}
    >
      {title}
      <span className="text-[#BDFF00]" style={{ marginLeft: 4 }}>
        .
      </span>
    </h2>
  );
}

function CaseBlock({
  title,
  paragraphs,
}: {
  title: string;
  paragraphs: string[];
}) {
  return (
    <>
      <EditorialHeading title={title} />
      {paragraphs.map((text, paragraphIndex) => (
        <p
          className="mb-5 text-[16px] leading-[1.8] text-[var(--text-secondary)]"
          key={`${title}-${paragraphIndex}`}
        >
          {text}
        </p>
      ))}
    </>
  );
}

"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Gift, Timer } from "lucide-react";

/**
 * A levélből érkező, cégre szabott ajánlat adatai.
 *
 * Élesben ezt a levél tokenje (`?t=`) alapján az n8n `indulo-ajanlat`
 * végpontja adja (docs: átadás az n8n-agentnek). Amíg a végpont nincs kész,
 * nincs adat, és az oldal az általános változatot mutatja.
 * Fejlesztői módban alapból mintaadatokkal mutatja a teljes szöveget; a
 * `?elonezet=0` az általános (token nélküli) változatot mutatja.
 */
export type Offer = {
  cegnev: string;
  javasoltOldalak: string[];
  /** YYYY-MM-DD, a nap végéig (Europe/Budapest) érvényes. */
  kedvezmenyLejarat: string;
};

const PREVIEW_OFFER: Offer = {
  cegnev: "Minta Kft.",
  javasoltOldalak: [
    "Nyitó rész – mivel foglalkoznak, egy mondatban, telefonszámmal",
    "Szolgáltatások – a fő tevékenységek röviden, érthetően",
    "Rólunk – kik dolgoznak a cégnél, és miért bízhatnak bennük",
    "Gyakori kérdések – amit az új ügyfelek elsőre megkérdeznek",
    "Kapcsolat – űrlap, e-mail, telefon és nyitvatartás",
  ],
  kedvezmenyLejarat: "2026-10-24",
};

function readPreview(): boolean {
  if (process.env.NODE_ENV !== "development") return false;
  return new URLSearchParams(window.location.search).get("elonezet") !== "0";
}

function subscribeNever(): () => void {
  return () => {};
}

const OfferContext = createContext<Offer | null>(null);

export function OfferProvider({ children }: { children: ReactNode }) {
  const preview = useSyncExternalStore(subscribeNever, readPreview, () => false);
  return (
    <OfferContext.Provider value={preview ? PREVIEW_OFFER : null}>
      {children}
    </OfferContext.Provider>
  );
}

function useOffer(): Offer | null {
  return useContext(OfferContext);
}

/** A lejárat pillanata: a megadott nap 23:59:59-e budapesti idő szerint. */
function deadlineMs(date: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;
  const utcGuess = Date.parse(`${date}T23:59:59Z`);
  if (Number.isNaN(utcGuess)) return null;
  const offset = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Budapest",
    timeZoneName: "shortOffset",
  })
    .formatToParts(new Date(utcGuess))
    .find((p) => p.type === "timeZoneName")?.value;
  const match = offset?.match(/GMT([+-]\d+)/);
  const hours = match ? Number(match[1]) : 1;
  return utcGuess - hours * 60 * 60 * 1000;
}

// A nap sorszámnevének „-n” ragja: elsején, másodikán, negyedikén…
const ON_SUFFIX: Record<number, string> = {
  1: "jén", 2: "án", 3: "án", 4: "én", 5: "én", 6: "án", 7: "én", 8: "án",
  9: "én", 10: "én", 11: "én", 12: "én", 13: "án", 14: "én", 15: "én",
  16: "án", 17: "én", 18: "án", 19: "én", 20: "án", 21: "én", 22: "én",
  23: "án", 24: "én", 25: "én", 26: "án", 27: "én", 28: "án", 29: "én",
  30: "án", 31: "én",
};

/** "október 24-ig" és "október 24-én" a budapesti naptár szerint. */
function formatDate(date: string): { until: string; on: string } {
  const [, m, d] = date.split("-").map(Number);
  const month = new Intl.DateTimeFormat("hu-HU", { month: "long", timeZone: "UTC" }).format(
    new Date(Date.UTC(2000, m - 1, 1)),
  );
  return { until: `${month} ${d}-ig`, on: `${month} ${d}-${ON_SUFFIX[d] ?? "én"}` };
}

/** Másodpercenként frissülő „most”, csak a kliensen (szerveren null). */
function useNow(): number | null {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);
  return now;
}

type BonusState =
  | { kind: "none" }
  | {
      kind: "active";
      until: string;
      days: number;
      hours: number;
      minutes: number;
      seconds: number;
    }
  | { kind: "expired"; on: string };

function useBonus(): BonusState {
  const offer = useOffer();
  const now = useNow();
  if (!offer || now === null) return { kind: "none" };
  const end = deadlineMs(offer.kedvezmenyLejarat);
  if (end === null) return { kind: "none" };
  const { until, on } = formatDate(offer.kedvezmenyLejarat);
  const left = end - now;
  if (left <= 0) return { kind: "expired", on };
  const secondsTotal = Math.floor(left / 1000);
  const minutesTotal = Math.floor(secondsTotal / 60);
  return {
    kind: "active",
    until,
    days: Math.floor(minutesTotal / (60 * 24)),
    hours: Math.floor((minutesTotal % (60 * 24)) / 60),
    minutes: minutesTotal % 60,
    seconds: secondsTotal % 60,
  };
}

const lime = "text-[#BDFF00]";

export function OfferBar() {
  const bonus = useBonus();
  if (bonus.kind === "none") return null;
  return (
    <div className="relative z-30 border-b border-[rgba(189,255,0,0.18)] bg-[rgba(189,255,0,0.06)] px-4 py-2.5 text-center text-[13px] leading-[1.5] text-[var(--text-secondary)] sm:text-[14px]">
      {bonus.kind === "active" ? (
        <span className="flex flex-col items-center gap-0.5 sm:flex-row sm:justify-center sm:gap-2">
          <span className="inline-flex items-center gap-1.5">
            <Gift aria-hidden size={14} className={lime} />
            <strong className="font-medium text-[var(--text-primary)]">
              75.000 Ft értékű belépési ajándék
            </strong>
          </span>
          <span className="whitespace-nowrap">
            {bonus.until} · még {bonus.days} nap {bonus.hours} óra ·{" "}
            <a href="#idopont" className={`font-medium ${lime} hover:underline`}>
              Időpontot kérek →
            </a>
          </span>
        </span>
      ) : (
        <>
          A belépési ajándék {bonus.on} lejárt. Hívást továbbra is kérhet.{" "}
          <a href="#idopont" className={`whitespace-nowrap font-medium ${lime} hover:underline`}>
            Időpontot kérek →
          </a>
        </>
      )}
    </div>
  );
}

export function HeroGreeting() {
  const offer = useOffer();
  if (!offer) return null;
  return (
    <p className="mt-6 font-display text-[18px] text-[var(--text-primary)] sm:text-[20px]">
      {offer.cegnev}, gratulálok az induláshoz.
    </p>
  );
}

/** A hero ajándékkártyája az ár alatt: ajánlat + visszaszámláló. */
export function HeroBonus() {
  const bonus = useBonus();
  if (bonus.kind === "none") return null;
  if (bonus.kind === "expired") {
    return (
      <p className="mx-auto mt-5 max-w-md text-[14px] leading-[1.6] text-[var(--text-tertiary)]">
        A belépési ajándék {bonus.on} lejárt. A csomag ára változatlan.
      </p>
    );
  }
  return (
    <div className="mx-auto mt-6 max-w-md rounded-2xl border border-[rgba(189,255,0,0.3)] bg-[rgba(189,255,0,0.06)] px-5 py-5 text-left sm:px-6">
      <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[#BDFF00]">
        <Gift aria-hidden size={14} />
        Belépési ajándék · {bonus.until}
      </p>
      <p className="mt-3 text-[15px] leading-[1.6] text-[var(--text-secondary)]">
        Ha addig szerződünk, az első 3 hónap üzemeltetését mi álljuk: ez{" "}
        <strong className="font-medium text-[var(--text-primary)]">75.000 Ft + áfa</strong>,
        amit az induláskor nem kell kifizetniük.
      </p>
      <Countdown {...bonus} />
    </div>
  );
}

const headingStyle = {
  fontSize: "clamp(28px, 4vw, 44px)",
  letterSpacing: "-0.025em",
  lineHeight: 1.1,
} as const;

/** A levélben elküldött oldalszerkezet; ha nincs adat, a `fallback` jelenik meg. */
export function PersonalizedPlan({ fallback }: { fallback: ReactNode }) {
  const offer = useOffer();
  if (!offer) return <>{fallback}</>;
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
      <div>
        <p className="type-label flex items-center gap-3">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
          <span>01 — AZ ÖNÖKNEK JAVASOLT OLDAL</span>
        </p>
        <h2
          className="mt-4 font-display font-medium text-[var(--text-primary)]"
          style={headingStyle}
        >
          Ezt az oldalt javasoltam önöknek
        </h2>
        <p className="mt-6 text-[17px] leading-[1.75] text-[var(--text-secondary)]">
          A levélben leírt oldalszerkezet, a{" "}
          <strong className="font-medium text-[var(--text-primary)]">{offer.cegnev}</strong>{" "}
          tevékenységére szabva.
        </p>
        <p className="mt-4 text-[17px] leading-[1.75] text-[var(--text-secondary)]">
          Ez a javaslat kiindulópont. A hívásban átbeszéljük, mit tartanak meg,
          mit cserélünk, és mi kerüljön még rá.
        </p>
      </div>
      <ol className="space-y-3">
        {offer.javasoltOldalak.map((item, i) => {
          const [name, ...rest] = item.split(" – ");
          return (
            <li
              key={item}
              className="flex gap-4 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] px-5 py-4"
            >
              <span className="font-display text-[18px] font-medium text-[#BDFF00]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[15px] leading-[1.6] text-[var(--text-secondary)]">
                {rest.length > 0 ? (
                  <>
                    <strong className="font-medium text-[var(--text-primary)]">{name}</strong>
                    {" – "}
                    {rest.join(" – ")}
                  </>
                ) : (
                  item
                )}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function PriceBonus() {
  const bonus = useBonus();
  if (bonus.kind === "none") return null;
  if (bonus.kind === "expired") {
    return (
      <p className="mt-6 rounded-2xl border border-[var(--border-hairline)] px-5 py-4 text-[14px] leading-[1.6] text-[var(--text-tertiary)]">
        A belépési ajándék {bonus.on} lejárt. A csomag ára változatlan.
      </p>
    );
  }
  return (
    <div className="mt-6 rounded-2xl border border-[rgba(189,255,0,0.3)] bg-[rgba(189,255,0,0.06)] p-5">
      <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[#BDFF00]">
        <Gift aria-hidden size={14} />
        Belépési ajándék
      </p>
      <p className="mt-3 text-[14px] leading-[1.6] text-[var(--text-secondary)]">
        {bonus.until} szerződve az első 3 hónap üzemeltetése (tárhely és
        karbantartás) ingyenes.{" "}
        <strong className="font-medium text-[var(--text-primary)]">
          Ez 75.000 Ft + áfa megtakarítás.
        </strong>
      </p>
      <Countdown {...bonus} />
    </div>
  );
}

function Countdown({
  days,
  hours,
  minutes,
  seconds,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}) {
  const cells = [
    { value: days, label: "nap" },
    { value: hours, label: "óra" },
    { value: minutes, label: "perc" },
    { value: seconds, label: "mp" },
  ];
  return (
    // role="timer": a képernyőolvasó nem olvassa fel másodpercenként.
    <div
      role="timer"
      className="mt-4 flex items-center gap-2 sm:gap-3"
      aria-label={`Még ${days} nap ${hours} óra ${minutes} perc`}
    >
      <Timer aria-hidden size={16} className="shrink-0 text-[var(--text-tertiary)]" />
      {cells.map((c) => (
        <span
          aria-hidden
          key={c.label}
          className="flex min-w-[50px] flex-col items-center rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(9,9,11,0.5)] px-2 py-1.5 sm:min-w-[56px]"
        >
          <span className="font-display text-[20px] font-medium tabular-nums text-[var(--text-primary)]">
            {String(c.value).padStart(2, "0")}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
            {c.label}
          </span>
        </span>
      ))}
    </div>
  );
}

export function BookingBonus() {
  const bonus = useBonus();
  if (bonus.kind !== "active") return null;
  return (
    <p className="mx-auto mt-5 inline-flex items-start gap-2 rounded-2xl border border-[rgba(189,255,0,0.25)] bg-[rgba(189,255,0,0.05)] px-4 py-2.5 text-left text-[14px] leading-[1.5] text-[var(--text-secondary)] sm:items-center sm:rounded-full">
      <Gift aria-hidden size={15} className={`mt-0.5 shrink-0 sm:mt-0 ${lime}`} />
      Ha {bonus.until} szerződünk, az első 3 hónap üzemeltetése ajándék.
    </p>
  );
}

export function ClosingBonus() {
  const bonus = useBonus();
  if (bonus.kind !== "active") return null;
  return (
    <p className="mt-6 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.12em] text-[#BDFF00]">
      <Gift aria-hidden size={14} />
      75.000 Ft értékű belépési ajándék: még {bonus.days} nap {bonus.hours} óra
    </p>
  );
}

/** Alsó ragadós sáv: a hero után jelenik meg, a foglalásnál és a lap alján eltűnik. */
export function StickyCta() {
  const bonus = useBonus();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const booking = document.getElementById("idopont");
    const onScroll = () => {
      const pastHero = window.scrollY > 720;
      let bookingInView = false;
      if (booking) {
        const rect = booking.getBoundingClientRect();
        bookingInView = rect.top < window.innerHeight && rect.bottom > 0;
      }
      const nearBottom =
        window.innerHeight + window.scrollY > document.body.offsetHeight - 400;
      setVisible(pastHero && !bookingInView && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 sm:px-4 sm:pb-4"
        >
          <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(13,13,16,0.85)] px-4 py-3 shadow-[0_8px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:px-5">
            <div className="min-w-0">
              <p className="truncate font-display text-[14px] font-medium text-[var(--text-primary)] sm:text-[15px]">
                ZynAI Induló csomag
              </p>
              <p className="truncate font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
                {bonus.kind === "active" ? (
                  <>
                    <span className="text-[#BDFF00]">+75.000 Ft ajándék</span> · még{" "}
                    {bonus.days} nap
                  </>
                ) : (
                  "190.000 Ft + áfa · 14 nap alatt kész"
                )}
              </p>
            </div>
            <a
              href="#idopont"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-[#BDFF00] px-5 py-2.5 text-[14px] font-medium text-[#09090B] transition-transform duration-200 hover:scale-[1.03]"
              style={{ boxShadow: "0 0 28px rgba(189,255,0,0.35)" }}
            >
              Időpontot kérek
              <ArrowRight
                aria-hidden
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

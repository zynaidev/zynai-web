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
 * Fejlesztői módban a `?elonezet=1` mintaadatokkal mutatja a teljes szöveget.
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
  return new URLSearchParams(window.location.search).get("elonezet") === "1";
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

function formatDate(date: string): string {
  const ms = deadlineMs(date);
  if (ms === null) return date;
  return new Intl.DateTimeFormat("hu-HU", {
    timeZone: "Europe/Budapest",
    month: "long",
    day: "numeric",
  }).format(new Date(ms));
}

/** Percenként frissülő „most”, csak a kliensen (szerveren null). */
function useNow(): number | null {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 60_000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);
  return now;
}

type BonusState =
  | { kind: "none" }
  | { kind: "active"; date: string; days: number; hours: number; minutes: number }
  | { kind: "expired"; date: string };

function useBonus(): BonusState {
  const offer = useOffer();
  const now = useNow();
  if (!offer || now === null) return { kind: "none" };
  const end = deadlineMs(offer.kedvezmenyLejarat);
  if (end === null) return { kind: "none" };
  const date = formatDate(offer.kedvezmenyLejarat);
  const left = end - now;
  if (left <= 0) return { kind: "expired", date };
  const minutesTotal = Math.floor(left / 60_000);
  return {
    kind: "active",
    date,
    days: Math.floor(minutesTotal / (60 * 24)),
    hours: Math.floor((minutesTotal % (60 * 24)) / 60),
    minutes: minutesTotal % 60,
  };
}

const lime = "text-[#BDFF00]";

export function OfferBar() {
  const bonus = useBonus();
  if (bonus.kind === "none") return null;
  return (
    <div className="relative z-30 border-b border-[rgba(189,255,0,0.18)] bg-[rgba(189,255,0,0.06)] px-4 py-2.5 text-center text-[13px] leading-[1.5] text-[var(--text-secondary)] sm:text-[14px]">
      {bonus.kind === "active" ? (
        <>
          <Gift aria-hidden size={14} className={`mr-1.5 inline -translate-y-px ${lime}`} />
          <strong className="font-medium text-[var(--text-primary)]">
            75.000 Ft értékű belépési ajándék {bonus.date}-ig
          </strong>
          <span className="whitespace-nowrap">
            {" "}
            · még {bonus.days} nap {bonus.hours} óra ·{" "}
          </span>
          <a href="#idopont" className={`whitespace-nowrap font-medium ${lime} hover:underline`}>
            Időpontot kérek →
          </a>
        </>
      ) : (
        <>
          A belépési ajándék {bonus.date}-én lejárt. Hívást továbbra is kérhet.{" "}
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

export function HeroBonus() {
  const bonus = useBonus();
  if (bonus.kind !== "active") return null;
  return (
    <p className="mx-auto mt-4 flex max-w-lg items-start justify-center gap-2 text-left text-[15px] leading-[1.6] text-[var(--text-secondary)]">
      <Gift aria-hidden size={18} className={`mt-0.5 shrink-0 ${lime}`} />
      <span>
        {bonus.date}-ig szerződve az első 3 hónap üzemeltetését én állom: ez{" "}
        <strong className="font-medium text-[var(--text-primary)]">75.000 Ft + áfa</strong>,
        amit az induláskor nem kell kifizetniük.
      </span>
    </p>
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
        A belépési ajándék {bonus.date}-én lejárt. A csomag ára változatlan.
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
        {bonus.date}-ig szerződve az első 3 hónap üzemeltetése (tárhely és
        karbantartás) ingyenes.{" "}
        <strong className="font-medium text-[var(--text-primary)]">
          Ez 75.000 Ft + áfa megtakarítás.
        </strong>
      </p>
      <Countdown days={bonus.days} hours={bonus.hours} minutes={bonus.minutes} />
    </div>
  );
}

function Countdown({ days, hours, minutes }: { days: number; hours: number; minutes: number }) {
  const cells = [
    { value: days, label: "nap" },
    { value: hours, label: "óra" },
    { value: minutes, label: "perc" },
  ];
  return (
    <div className="mt-4 flex items-center gap-3" aria-label={`Még ${days} nap ${hours} óra ${minutes} perc`}>
      <Timer aria-hidden size={16} className="text-[var(--text-tertiary)]" />
      {cells.map((c) => (
        <span
          key={c.label}
          className="flex min-w-[56px] flex-col items-center rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(9,9,11,0.5)] px-2 py-1.5"
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

export function PriceCtaLabel() {
  const bonus = useBonus();
  return <>{bonus.kind === "active" ? "Időpontot kérek, amíg él az ajándék" : "Időpontot kérek"}</>;
}

export function BookingBonus() {
  const bonus = useBonus();
  if (bonus.kind !== "active") return null;
  return (
    <p className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full border border-[rgba(189,255,0,0.25)] bg-[rgba(189,255,0,0.05)] px-4 py-2 text-[14px] text-[var(--text-secondary)]">
      <Gift aria-hidden size={15} className={lime} />
      Ha {bonus.date}-ig szerződünk, az első 3 hónap üzemeltetése ajándék.
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

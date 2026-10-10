"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

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

const ctaLinkClass =
  "font-medium text-[#BDFF00] underline underline-offset-4 hover:text-[var(--text-primary)]";

export function OfferBar() {
  const bonus = useBonus();
  if (bonus.kind === "none") return null;
  return (
    <div className="border-b border-[rgba(189,255,0,0.2)] bg-[rgba(189,255,0,0.06)] px-6 py-3 text-center text-[14px] text-[var(--text-secondary)]">
      {bonus.kind === "active" ? (
        <>
          🎁{" "}
          <strong className="text-[var(--text-primary)]">
            75.000 Ft értékű belépési ajándék {bonus.date}-ig
          </strong>{" "}
          · még {bonus.days} nap {bonus.hours} óra ·{" "}
          <a href="#idopont" className={ctaLinkClass}>
            Időpontot kérek →
          </a>
        </>
      ) : (
        <>
          A belépési ajándék {bonus.date}-én lejárt. Hívást továbbra is kérhet.{" "}
          <a href="#idopont" className={ctaLinkClass}>
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
    <p className="mt-4 font-display text-[20px] text-[var(--text-primary)]">
      {offer.cegnev}, gratulálok az induláshoz.
    </p>
  );
}

export function HeroBonus() {
  const bonus = useBonus();
  if (bonus.kind !== "active") return null;
  return (
    <p className="mt-2 text-[15px] italic text-[var(--text-secondary)]">
      🎁 {bonus.date}-ig szerződve az első 3 hónap üzemeltetését én állom: ez
      75.000 Ft + áfa, amit az induláskor nem kell kifizetniük.
    </p>
  );
}

export function PersonalizedPlan({ fallback }: { fallback: ReactNode }) {
  const offer = useOffer();
  if (!offer) return <>{fallback}</>;
  return (
    <>
      <h2 className="font-display text-[clamp(28px,4vw,44px)] font-medium leading-[1.1] tracking-[-0.025em] text-[var(--text-primary)]">
        Ezt az oldalt javasoltam önöknek
      </h2>
      <p className="mt-6">
        A levélben leírt oldalszerkezet, a {offer.cegnev} tevékenységére szabva:
      </p>
      <ol className="mt-4 list-decimal space-y-2 pl-6">
        {offer.javasoltOldalak.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
      <p className="mt-6">
        Ez a javaslat kiindulópont. A hívásban átbeszéljük, mit tartanak meg,
        mit cserélünk, és mi kerüljön még rá.
      </p>
    </>
  );
}

export function PriceBonus() {
  const bonus = useBonus();
  if (bonus.kind === "none") return null;
  if (bonus.kind === "expired") {
    return (
      <p className="mt-6 rounded-2xl border border-[var(--border-hairline)] p-5">
        A belépési ajándék {bonus.date}-én lejárt. A csomag ára változatlan.
      </p>
    );
  }
  return (
    <div className="mt-6 rounded-2xl border border-[rgba(189,255,0,0.3)] bg-[rgba(189,255,0,0.05)] p-5">
      <p>
        🎁 <strong className="text-[var(--text-primary)]">Belépési ajándék:</strong>{" "}
        {bonus.date}-ig szerződve az első 3 hónap üzemeltetése (tárhely és
        karbantartás) ingyenes.{" "}
        <strong className="text-[var(--text-primary)]">
          Ez 75.000 Ft + áfa megtakarítás.
        </strong>
      </p>
      <p className="mt-2">
        ⏳ Még {bonus.days} nap {bonus.hours} óra {bonus.minutes} perc
      </p>
    </div>
  );
}

export function PriceCtaLabel() {
  const bonus = useBonus();
  return (
    <>{bonus.kind === "active" ? "Időpontot kérek, amíg él az ajándék →" : "Időpontot kérek →"}</>
  );
}

export function BookingBonus() {
  const bonus = useBonus();
  if (bonus.kind !== "active") return null;
  return (
    <p className="mt-4 italic">
      🎁 Ha {bonus.date}-ig szerződünk, az első 3 hónap üzemeltetése ajándék.
    </p>
  );
}

export function ClosingBonus() {
  const bonus = useBonus();
  if (bonus.kind !== "active") return null;
  return (
    <p className="mt-6 font-medium text-[var(--text-primary)]">
      🎁 75.000 Ft értékű belépési ajándék: még {bonus.days} nap {bonus.hours} óra
    </p>
  );
}

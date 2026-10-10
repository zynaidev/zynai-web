"use client";

import { useEffect, useRef, useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import type { PrefillAndIframeAttrsConfig } from "@calcom/embed-core";

import { CalendarDays } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { MailtoLink } from "@/components/ui/MailtoLink";
import { track } from "@/lib/analytics/track";
import { cn } from "@/lib/utils";

/** Melyik Cal.com eseményt ágyazzuk be, és hová írhat, ha nem tölt be. */
export type CalTarget = {
  namespace: string;
  link: string;
  url: string;
  email: string;
};

const FELMERES: CalTarget = {
  namespace: "felmeres",
  link: "zynai/felmeres",
  url: "https://cal.com/zynai/felmeres",
  email: "info@zynai.hu",
};

// A Cal.com script betöltésére adott várakozási idő, mielőtt hibaállapotba
// váltunk. Ha a getCalApi() nem fut le időben (hálózat, ad blocker, CSP),
// a látogató sosem maradhat üres felület előtt.
const LOAD_TIMEOUT_MS = 10_000;

// Egy foglalás (uid) csak egyszer számít konverziónak, akkor is, ha a
// beágyazás újramountol, vagy a Cal.com többször küldi az eseményt.
const trackedBookingUids = new Set<string>();

// A @calcom/embed-core publikus felületén nincs önállóan exportálva a
// BookerLayouts unió — a PrefillAndIframeAttrsConfig (a <Cal config={...}>
// prop valódi típusa) "layout" mezőjéből vezetjük le, hogy pontosan azt a
// három értéket ("month_view" | "week_view" | "column_view") fogadjuk el,
// amit a csomag ténylegesen ismer, string helyett.
type CalLayout = NonNullable<PrefillAndIframeAttrsConfig["layout"]>;

// A "column_view"/"week_view" napi oszlopokat jelenít meg egymás mellett,
// ezért érdemben magasabb helyet igényel, mint a kompaktabb "month_view" —
// enélkül a szűkebb (pl. kapcsolatfelvételi kártyában lévő) elhelyezés
// belső görgetésre kényszerülne.
const CAL_HEIGHT_CLASSES: Record<CalLayout, string> = {
  month_view: "h-[520px] sm:h-[600px] lg:h-[680px]",
  week_view: "h-[640px] sm:h-[780px] lg:h-[900px]",
  column_view: "h-[640px] sm:h-[780px] lg:h-[900px]",
};

type CalEmbedProps = {
  className?: string;
  layout?: CalLayout;
  /** Alapértelmezés: a 30 perces felmérés (zynai/felmeres). */
  target?: CalTarget;
  /** Magázó szövegek (például a kampányoldalon); alapértelmezés: tegező. */
  formal?: boolean;
};

/**
 * Egyetlen, megosztott Cal.com inline widget — a foglalási oldal és a
 * kapcsolatfelvételi űrlap sikeres beküldés utáni nézete is ezt használja,
 * hogy a téma/branding konfiguráció egy helyen éljen.
 *
 * A Cal.com csak gombnyomásra töltődik be (D4): addig a látogató böngészője
 * nem kér semmit a cal.com-tól. A doboz már előtte a beágyazás magasságát
 * foglalja el, hogy a betöltés ne ugrassza az oldalt.
 */
export function CalEmbed({
  className,
  layout = "column_view",
  target = FELMERES,
  formal = false,
}: CalEmbedProps) {
  const [open, setOpen] = useState(false);

  if (open) {
    return (
      <CalInline className={className} layout={layout} target={target} formal={formal} />
    );
  }

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center gap-5 rounded-2xl border border-border-hairline bg-bg-glass px-6 text-center",
        CAL_HEIGHT_CLASSES[layout],
        className,
      )}
    >
      <span className="flex size-14 items-center justify-center rounded-2xl bg-[rgba(189,255,0,0.1)]">
        <CalendarDays aria-hidden size={26} className="text-[#BDFF00]" />
      </span>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          buttonVariants({ variant: "primary" }),
          "min-h-11 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
        )}
      >
        Naptár megnyitása
      </button>
      <p className="max-w-sm text-[14px] leading-relaxed text-[var(--text-tertiary)]">
        A foglalási naptárat a Cal.com biztosítja. Megnyitáskor a Cal.com oldala
        töltődik be.
      </p>
      <a
        href={target.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-[var(--text-secondary)] underline underline-offset-2 hover:text-[var(--text-primary)]"
      >
        {formal
          ? "Vagy foglaljon közvetlenül a Cal.com oldalán"
          : "Vagy foglalj közvetlenül a Cal.com oldalán"}
      </a>
    </div>
  );
}

function CalInline({
  className,
  layout = "column_view",
  target = FELMERES,
  formal = false,
}: CalEmbedProps) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const settledRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    function settle(next: "ready" | "error") {
      if (cancelled || settledRef.current) return;
      settledRef.current = true;
      setStatus(next);
    }

    // Ha a script/iframe 10mp alatt sem jelez sem sikert, sem hibát
    // (pl. blokkolt kérés), mindenképp hibaállapotba váltunk — a látogató
    // sosem maradhat üres felület előtt.
    const timeoutId = setTimeout(() => settle("error"), LOAD_TIMEOUT_MS);

    (async function initCal() {
      try {
        const cal = await getCalApi({ namespace: target.namespace });

        // A getCalApi() feloldása csak azt jelenti, hogy a helyi
        // parancssor (queue) készen áll — NEM azt, hogy a naptár ténylegesen
        // betöltött. A valódi jelzés a Cal.com saját "linkReady"/
        // "linkFailed" eseménye, amit a beágyazott iframe küld.
        cal("on", { action: "linkReady", callback: () => settle("ready") });
        cal("on", { action: "linkFailed", callback: () => settle("error") });

        // Konverzió csak valódi foglalás után. A teszt módú foglalás külön
        // esemény (dryRunBookingSuccessfulV2), azt nem mérjük. A payloadból
        // semmi nem kerül az eseménybe (a title nevet tartalmazhat).
        cal("on", {
          action: "bookingSuccessfulV2",
          callback: (e) => {
            const uid = e.detail.data.uid;
            if (uid) {
              if (trackedBookingUids.has(uid)) return;
              trackedBookingUids.add(uid);
            }
            track("booking_complete", {});
          },
        });

        cal("ui", {
          theme: "dark",
          // A "30 perc, online..." bevezető szöveg és az oldal saját leírása
          // már elmondja, miről szól az egyeztetés — az esemény-részletek
          // panel csak duplikálná ugyanazt, ezért elrejtjük.
          hideEventTypeDetails: true,
          styles: {
            // A weboldal lime accent színe (--accent / --border-accent),
            // pontosan az app/globals.css-ben definiált érték.
            branding: { brandColor: "#bdff00" },
            // A widget saját iframe-je más origin-ről töltődik be, így a
            // --bg-base CSS változó nem érhető el benne — a pontos hex
            // értékét adjuk át szó szerint, hogy a háttér beleolvadjon.
            body: { background: "#09090b" },
          },
        });
      } catch {
        settle("error");
      }
    })();

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [target.namespace]);

  if (status === "error") {
    return <CalFallback className={className} target={target} formal={formal} />;
  }

  return (
    <div
      className={cn(
        "relative w-full",
        CAL_HEIGHT_CLASSES[layout],
        className,
      )}
    >
      {status === "loading" ? <CalSkeleton /> : null}
      <Cal
        namespace={target.namespace}
        calLink={target.link}
        config={{ theme: "dark", layout }}
        style={{ width: "100%", height: "100%", overflow: "auto" }}
        className={cn(
          "rounded-2xl transition-opacity duration-300",
          status === "loading" ? "opacity-0" : "opacity-100",
        )}
      />
    </div>
  );
}

function CalSkeleton() {
  return (
    <div
      className="absolute inset-0 flex animate-pulse flex-col items-center justify-center gap-3 rounded-2xl border border-border-hairline bg-bg-glass"
      aria-hidden
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-tertiary">
        Naptár betöltése…
      </p>
    </div>
  );
}

function CalFallback({
  className,
  target,
  formal,
}: {
  className?: string;
  target: CalTarget;
  formal: boolean;
}) {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center gap-4 rounded-2xl border border-border-hairline bg-bg-glass px-6 py-16 text-center",
        className,
      )}
    >
      <p className="max-w-sm text-[15px] leading-relaxed text-[var(--text-secondary)]">
        {formal
          ? "A naptár betöltése most nem sikerült. Foglaljon időpontot közvetlenül, vagy írjon e-mailt."
          : "A naptár betöltése most nem sikerült. Foglalj időpontot közvetlenül, vagy írj e-mailt."}
      </p>
      <a
        href={target.url}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-[#BDFF00] px-8 py-4 font-medium text-[#09090B]"
      >
        Foglalás megnyitása új lapon
      </a>
      <MailtoLink
        email={target.email}
        className="text-sm text-[var(--text-secondary)] underline underline-offset-2 hover:text-[var(--text-primary)]"
      >
        {target.email}
      </MailtoLink>
    </div>
  );
}

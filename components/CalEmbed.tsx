"use client";

import { useEffect, useRef, useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

import { cn } from "@/lib/utils";

const CAL_NAMESPACE = "felmeres";
const CAL_LINK = "zynai/felmeres";
const CAL_URL = "https://cal.com/zynai/felmeres";
const CAL_EMAIL = "info@zynai.hu";

// A Cal.com script betöltésére adott várakozási idő, mielőtt hibaállapotba
// váltunk. Ha a getCalApi() nem fut le időben (hálózat, ad blocker, CSP),
// a látogató sosem maradhat üres felület előtt.
const LOAD_TIMEOUT_MS = 10_000;

type CalEmbedProps = {
  className?: string;
};

/**
 * Egyetlen, megosztott Cal.com inline widget — a foglalási oldal és a
 * kapcsolatfelvételi űrlap sikeres beküldés utáni nézete is ezt használja,
 * hogy a téma/branding konfiguráció egy helyen éljen.
 */
export function CalEmbed({ className }: CalEmbedProps) {
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
        const cal = await getCalApi({ namespace: CAL_NAMESPACE });

        // A getCalApi() feloldása csak azt jelenti, hogy a helyi
        // parancssor (queue) készen áll — NEM azt, hogy a naptár ténylegesen
        // betöltött. A valódi jelzés a Cal.com saját "linkReady"/
        // "linkFailed" eseménye, amit a beágyazott iframe küld.
        cal("on", { action: "linkReady", callback: () => settle("ready") });
        cal("on", { action: "linkFailed", callback: () => settle("error") });

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
  }, []);

  if (status === "error") {
    return <CalFallback className={className} />;
  }

  return (
    <div
      className={cn(
        // A "column_view" elrendezés napi oszlopokat jelenít meg egymás
        // mellett, ezért érdemben magasabb (és szélesebb) helyet igényel,
        // mint a korábbi "month_view" — ami már önmagában is belső
        // görgetésre kényszerült a régi 520/600/680px-es magasságoknál.
        "relative h-[640px] w-full sm:h-[780px] lg:h-[900px]",
        className,
      )}
    >
      {status === "loading" ? <CalSkeleton /> : null}
      <Cal
        namespace={CAL_NAMESPACE}
        calLink={CAL_LINK}
        config={{ theme: "dark", layout: "column_view" }}
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

function CalFallback({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center gap-4 rounded-2xl border border-border-hairline bg-bg-glass px-6 py-16 text-center",
        className,
      )}
    >
      <p className="max-w-sm text-[15px] leading-relaxed text-[var(--text-secondary)]">
        A naptár betöltése most nem sikerült. Foglalj időpontot közvetlenül,
        vagy írj e-mailt.
      </p>
      <a
        href={CAL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-[#BDFF00] px-8 py-4 font-medium text-[#09090B]"
      >
        Foglalás megnyitása új lapon
      </a>
      <a
        href={`mailto:${CAL_EMAIL}`}
        className="text-sm text-[var(--text-secondary)] underline underline-offset-2 hover:text-[var(--text-primary)]"
      >
        {CAL_EMAIL}
      </a>
    </div>
  );
}

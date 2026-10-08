"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";

import { buttonVariants } from "@/components/ui/button";
import {
  CONSENT_STORAGE_KEY,
  OPEN_CONSENT_EVENT,
  readConsent,
  saveConsent,
  type ConsentChoice,
} from "@/lib/analytics/consent";
import { cn } from "@/lib/utils";

// Más fülön hozott döntés is frissítse a bannert.
function subscribeStorage(onChange: () => void): () => void {
  function handle(e: StorageEvent) {
    if (e.key === CONSENT_STORAGE_KEY) onChange();
  }
  window.addEventListener("storage", handle);
  return () => window.removeEventListener("storage", handle);
}

// A szerveren nem tudjuk, van-e döntés: ott a banner nem renderelődik,
// így nincs hidratálási eltérés, és a kliens a mount után dönt.
const SERVER_SNAPSHOT = "server" as const;

const buttonClass = cn(
  buttonVariants({ variant: "secondary" }),
  "min-h-11 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
);

/**
 * Sütibanner (Consent Mode v2). Nem modális: alul áll, a fókuszt nem
 * csapdázza. Nincs bezárás döntés nélkül; a két gomb egyenrangú.
 */
export function ConsentBanner() {
  const stored = useSyncExternalStore<ConsentChoice | null | typeof SERVER_SNAPSHOT>(
    subscribeStorage,
    readConsent,
    () => SERVER_SNAPSHOT,
  );
  const [decided, setDecided] = useState(false);
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    function handleOpen() {
      setReopened(true);
    }
    window.addEventListener(OPEN_CONSENT_EVENT, handleOpen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, handleOpen);
  }, []);

  const visible = reopened || (stored === null && !decided);
  if (!visible) return null;

  function choose(choice: ConsentChoice) {
    saveConsent(choice);
    setDecided(true);
    setReopened(false);
  }

  return (
    <div
      role="dialog"
      aria-labelledby="consent-banner-title"
      className="fixed inset-x-0 bottom-0 z-[90] px-4 pb-4 sm:px-6 sm:pb-6 animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="mx-auto flex max-w-[960px] flex-col gap-5 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5 shadow-[0_8px_40px_rgba(0,0,0,0.5)] sm:p-6 lg:flex-row lg:items-center lg:gap-8">
        <div className="flex-1">
          <h2
            id="consent-banner-title"
            className="font-display text-[17px] font-medium text-[var(--text-primary)]"
          >
            Sütik
          </h2>
          <p className="mt-2 text-[14px] leading-[1.6] text-[var(--text-secondary)]">
            Az oldal működéséhez szükséges sütiket mindig használunk. Ha
            elfogadod, a Google Analytics és a Google hirdetési eszközei
            segítségével mérjük, hogyan használják az oldalt. A döntésedet
            bármikor megváltoztathatod a lábléc „Süti-beállítások” linkjével.{" "}
            <Link
              href="/adatvedelem"
              className="text-[var(--text-primary)] underline underline-offset-2 hover:text-[var(--accent)]"
            >
              Részletek
            </Link>
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
          <button
            type="button"
            className={buttonClass}
            onClick={() => choose("granted")}
          >
            Elfogadom
          </button>
          <button
            type="button"
            className={buttonClass}
            onClick={() => choose("denied")}
          >
            Csak a szükségeseket
          </button>
        </div>
      </div>
    </div>
  );
}

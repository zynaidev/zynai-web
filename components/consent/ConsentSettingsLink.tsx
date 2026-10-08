"use client";

import { openConsentSettings } from "@/lib/analytics/consent";

/** A lábléc „Süti-beállítások” linkje: újra megnyitja a sütibannert. */
export function ConsentSettingsLink({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => openConsentSettings()}
    >
      Süti-beállítások
    </button>
  );
}

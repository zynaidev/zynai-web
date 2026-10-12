"use client";

import { useEffect, useState } from "react";
import { Check, Mail } from "lucide-react";

import { CalEmbed, type CalTarget } from "@/components/CalEmbed";
import { track } from "@/lib/analytics/track";

import { requestInfo } from "./offer-api";
import { useCompanyName, useLandingParams } from "./offer";

/**
 * A Cal.com foglalási kérdések azonosítói (nem a feliratok): a landing ezekbe
 * tölti elő a levél tokenjét és a cégnevet. Az eseményben (indulo-webcsomag)
 * két rejtett kérdésnek kell lennie pontosan ezekkel az azonosítókkal.
 */
const CAL_FIELD_TOKEN = "token";
const CAL_FIELD_COMPANY = "cegnev";

const BOOKING_THANKS_TITLE = "Köszönöm, a foglalás megvan!";
const BOOKING_THANKS_TEXT =
  "A visszaigazolást e-mailben is megkapja. A megadott időpontban hívom.";

const INFO_DONE_FALLBACK =
  "Köszönöm! A részleteket elküldtem, néhány percen belül megérkezik. Ha addig is beszélne velem, lent időpontot választhat.";
const INFO_FAILED_FALLBACK =
  "Nem sikerült elküldeni. Kérem, írjon a bakos.attila@zynai.hu címre.";

/** A levél „Több információt kérek” gombjáról érkezőknek (forras=info). */
export function InfoBar() {
  const { token, source } = useLandingParams();
  const [phase, setPhase] = useState<"idle" | "sending" | "done" | "failed">("idle");
  const [message, setMessage] = useState<string | null>(null);

  if (source !== "info" || !token) return null;

  async function send(t: string) {
    if (phase === "sending") return;
    setPhase("sending");
    track("indulo_info_keres", {});
    const result = await requestInfo(t);
    setMessage(result.message);
    setPhase(result.ok ? "done" : "failed");
  }

  return (
    <div className="border-b border-[rgba(189,255,0,0.18)] bg-[rgba(189,255,0,0.05)] px-4 py-6">
      <div className="mx-auto flex max-w-3xl flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        {phase === "done" ? (
          <p className="flex items-start gap-3 text-[15px] leading-[1.6] text-[var(--text-primary)]">
            <Check aria-hidden size={18} className="mt-1 shrink-0 text-[#BDFF00]" />
            <span role="status">{message ?? INFO_DONE_FALLBACK}</span>
          </p>
        ) : (
          <>
            <div>
              <p className="flex items-center gap-2 font-display text-[17px] font-medium text-[var(--text-primary)]">
                <Mail aria-hidden size={17} className="text-[#BDFF00]" />
                Kéri a részleteket e-mailben?
              </p>
              <p className="mt-2 max-w-xl text-[14px] leading-[1.6] text-[var(--text-secondary)]">
                Egy gombnyomás, és elküldöm, mit tartalmaz pontosan a csomag,
                hogyan zajlik a munka, és mennyibe kerül, a cégük tevékenységére
                szabva.
              </p>
              <p className="mt-2 max-w-xl text-[12px] leading-[1.6] text-[var(--text-tertiary)]">
                A gombbal hozzájárul, hogy a weboldal-ajánlatról legfeljebb 3
                e-mailt küldjek az ajánlatot fogadó címre. Bármikor
                leiratkozhat a levelek alján lévő linkkel.
              </p>
              {phase === "failed" ? (
                <p className="mt-3 text-[14px] text-[var(--text-primary)]" role="alert">
                  {message ?? INFO_FAILED_FALLBACK}
                </p>
              ) : null}
            </div>
            <button
              type="button"
              disabled={phase === "sending"}
              onClick={() => void send(token)}
              className="inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#BDFF00] px-6 py-3 text-[14px] font-medium text-[#09090B] transition-transform duration-200 hover:scale-[1.02] disabled:cursor-wait disabled:opacity-60"
            >
              {phase === "sending" ? "Küldés…" : "Kérem a részleteket"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/** A „Naptár megnyitása” szekció: előtöltött token és cégnév, foglalás utáni köszönet. */
export function BookingCalendar({ target }: { target: CalTarget }) {
  const { token } = useLandingParams();
  const company = useCompanyName();
  const [booked, setBooked] = useState(false);

  // A Cal.com rejtett kérdéseibe csak az érvényes token és a cégnév kerül.
  const prefill: Record<string, string> = {};
  if (token) prefill[CAL_FIELD_TOKEN] = token;
  if (company) prefill[CAL_FIELD_COMPANY] = company;

  return (
    <>
      <CalEmbed
        formal
        layout="month_view"
        target={target}
        prefill={prefill}
        onBooked={() => {
          setBooked(true);
          track("indulo_foglalas_kesz", {});
        }}
      />
      {booked ? (
        <div
          role="status"
          className="mx-auto mt-6 max-w-xl rounded-2xl border border-[rgba(189,255,0,0.3)] bg-[rgba(189,255,0,0.06)] px-6 py-5 text-center"
        >
          <p className="font-display text-[20px] font-medium text-[var(--text-primary)]">
            {BOOKING_THANKS_TITLE}
          </p>
          <p className="mt-2 text-[15px] leading-[1.6] text-[var(--text-secondary)]">
            {BOOKING_THANKS_TEXT}
          </p>
        </div>
      ) : null}
    </>
  );
}

/**
 * Minden „#idopont” felé mutató gomb kattintása egy `indulo_hivas_gomb`
 * esemény (felső sáv, hero, ár, ragadós sáv, záró blokk): a jelölés nem
 * változik, az esemény delegálva fut.
 */
export function CtaTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const link = (e.target as Element | null)?.closest?.('a[href="#idopont"]');
      if (link) track("indulo_hivas_gomb", {});
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}

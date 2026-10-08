"use client";

import { type FormEvent, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const inputClass =
  "w-full rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] px-5 py-4 text-[17px] text-[var(--text-primary)] outline-none transition-[border-color] duration-200 placeholder:text-[var(--text-tertiary)] focus:border-[rgba(255,255,255,0.35)]";

const labelClass = "mb-2 block text-[16px] text-[var(--text-primary)]";

type Fields = {
  name: string;
  email: string;
  phone: string;
  motivation: string;
  privacyAccepted: boolean;
};

const initialFields: Fields = {
  name: "",
  email: "",
  phone: "",
  motivation: "",
  privacyAccepted: false,
};

export function PilotApplicationForm() {
  const [fields, setFields] = useState<Fields>(initialFields);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;

    if (!fields.name.trim() || !fields.email.trim() || !fields.phone.trim()) {
      setStatus("error");
      setErrorMessage("Kérlek, add meg a neved, az e-mail címed és a telefonszámod.");
      return;
    }
    if (!fields.motivation.trim()) {
      setStatus("error");
      setErrorMessage("Írd le röviden, miért szeretnél részt venni.");
      return;
    }
    if (!fields.privacyAccepted) {
      setStatus("error");
      setErrorMessage("Az adatkezelési hozzájárulás elfogadása kötelező.");
      return;
    }

    setErrorMessage("");
    setStatus("loading");

    try {
      const res = await fetch("/api/pilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.name.trim(),
          email: fields.email.trim(),
          phone: fields.phone.trim(),
          motivation: fields.motivation.trim(),
          privacyAccepted: fields.privacyAccepted === true,
          zxCheck: honeypotRef.current?.value || undefined,
        }),
      });

      const data = (await res.json()) as { success?: boolean; error?: string };

      if (!res.ok || !data.success) {
        throw new Error(data.error ?? "Ismeretlen hiba történt.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Ismeretlen hiba történt.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="px-2 py-12 text-center">
        <h3 className="font-display text-[26px] text-[var(--text-primary)]">
          Megkaptam a jelentkezésed.
        </h3>
        <p className="mx-auto mt-4 max-w-md text-[18px] leading-relaxed text-[var(--text-secondary)]">
          Hamarosan írok egy időpontot a rövid beszélgetésre.
        </p>
      </div>
    );
  }

  return (
    <form className="relative" onSubmit={handleSubmit}>
      {/* Honeypot: embernek láthatatlan, a botok kitöltik. */}
      <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="pilot-zx">Ezt a mezőt hagyd üresen</label>
        <input
          id="pilot-zx"
          name="zxCheck"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          ref={honeypotRef}
          defaultValue=""
        />
      </div>
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label htmlFor="pilot-name" className={labelClass}>
            Név
          </label>
          <input
            id="pilot-name"
            name="name"
            type="text"
            autoComplete="name"
            value={fields.name}
            onChange={(e) => setFields((f) => ({ ...f, name: e.target.value }))}
            placeholder="Példa Péter"
            className={inputClass}
          />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="pilot-email" className={labelClass}>
              E-mail
            </label>
            <input
              id="pilot-email"
              name="email"
              type="email"
              autoComplete="email"
              value={fields.email}
              onChange={(e) =>
                setFields((f) => ({ ...f, email: e.target.value }))
              }
              placeholder="peter@vallalkozas.hu"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="pilot-phone" className={labelClass}>
              Telefonszám
            </label>
            <input
              id="pilot-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={fields.phone}
              onChange={(e) =>
                setFields((f) => ({ ...f, phone: e.target.value }))
              }
              placeholder="+36 30 123 4567"
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label htmlFor="pilot-motivation" className={labelClass}>
            Miért szeretnél részt venni a képzésen?
          </label>
          <textarea
            id="pilot-motivation"
            name="motivation"
            rows={4}
            value={fields.motivation}
            onChange={(e) =>
              setFields((f) => ({ ...f, motivation: e.target.value }))
            }
            placeholder="Néhány mondat a motivációdról."
            className={`${inputClass} resize-none`}
          />
        </div>
      </div>

      <div className="mt-6 flex items-start gap-3">
        <input
          id="pilot-privacy"
          name="privacyAccepted"
          type="checkbox"
          checked={fields.privacyAccepted}
          onChange={(e) =>
            setFields((f) => ({ ...f, privacyAccepted: e.target.checked }))
          }
          className="mt-1.5 h-4 w-4 shrink-0 rounded border border-[rgba(255,255,255,0.2)] accent-[#BDFF00]"
        />
        <label
          htmlFor="pilot-privacy"
          className="text-[16px] leading-relaxed text-[var(--text-secondary)]"
        >
          Elolvastam és elfogadom az{" "}
          <a
            href="/adatvedelem"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-[var(--text-primary)]"
          >
            adatkezelési tájékoztatót
          </a>
          .
        </label>
      </div>

      {status === "error" && errorMessage ? (
        <p className="mt-4 text-[16px] text-[#ff8a8a]" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <div className="mt-8">
        <button
          type="submit"
          disabled={status === "loading"}
          className="group relative inline-flex overflow-hidden rounded-full disabled:cursor-not-allowed disabled:opacity-60"
          style={{ boxShadow: "0 0 28px rgba(189,255,0,0.22)" }}
        >
          <span className="flex items-center justify-center bg-[#BDFF00] px-7 py-4 text-[16px] font-medium text-[#09090B]">
            {status === "loading" ? "Küldés…" : "Jelentkezem a beszélgetésre"}
          </span>
          <span
            className="pointer-events-none w-px shrink-0 self-stretch bg-[rgba(9,9,11,0.15)]"
            aria-hidden
          />
          <span className="flex items-center bg-[#BDFF00] px-5 py-4">
            <ArrowRight size={16} className="text-[#09090B]" aria-hidden />
          </span>
        </button>
      </div>
    </form>
  );
}

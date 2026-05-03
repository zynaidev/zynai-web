"use client";

import { type FormEvent, useState } from "react";

import { cn } from "@/lib/utils";

const TEAM_OPTIONS = ["1–5 fő", "6–20 fő", "20+ fő"] as const;
const AI_STAGE_OPTIONS = [
  "Még nem próbáltam",
  "Kísérletezem",
  "Már használom rendszerszinten",
] as const;
const AVAILABILITY_OPTIONS = [
  "Ezen a héten",
  "Jövő héten",
  "Rugalmas vagyok",
] as const;

const inputClass =
  "w-full rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-[var(--text-primary)]";

export default function IdopontfoglalasPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [teamSize, setTeamSize] = useState<string>("");
  const [aiStage, setAiStage] = useState<string>("");
  const [availability, setAvailability] = useState<string>("");
  const [biggestChallenge, setBiggestChallenge] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim() || undefined,
          teamSize: teamSize || undefined,
          aiStage: aiStage || undefined,
          availability: availability || undefined,
          biggestChallenge: biggestChallenge.trim(),
          privacyAccepted: privacyAccepted === true,
        }),
      });

      const data = (await res.json()) as { success?: boolean; error?: string };

      if (!res.ok) {
        throw new Error(data.error ?? "Ismeretlen hiba történt.");
      }

      if (!data.success) {
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
      <div
        className="mx-auto max-w-xl px-6 py-24"
        style={{ background: "var(--bg-base)" }}
      >
        <p className="text-center text-[var(--text-primary)] text-lg leading-relaxed">
          Megkaptam — hamarosan jelentkezem. Az első lépés mindig a legnehezebb,
          te már megtetted.
        </p>
      </div>
    );
  }

  return (
    <div
      className="mx-auto max-w-xl space-y-6 px-6 py-24"
      style={{ background: "var(--bg-base)" }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm text-[var(--text-secondary)]">
            Név<span className="text-[#BDFF00]">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            autoComplete="name"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm text-[var(--text-secondary)]">
            Email<span className="text-[#BDFF00]">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            autoComplete="email"
          />
        </div>

        <div>
          <label htmlFor="company" className="mb-2 block text-sm text-[var(--text-secondary)]">
            Cégnév
          </label>
          <input
            id="company"
            name="company"
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className={inputClass}
            autoComplete="organization"
          />
        </div>

        <div>
          <span className="mb-2 block text-sm text-[var(--text-secondary)]">
            Csapatméret
          </span>
          <div className="inline-flex flex-wrap gap-2">
            {TEAM_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setTeamSize(teamSize === opt ? "" : opt)}
                className={cn(
                  "cursor-pointer rounded-full border border-[rgba(255,255,255,0.1)] px-4 py-2 text-sm transition-colors",
                  teamSize === opt &&
                    "border-[#BDFF00] text-[#BDFF00]",
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="biggestChallenge"
            className="mb-2 block text-sm text-[var(--text-secondary)]"
          >
            Legnagyobb időrabló folyamat most?
            <span className="text-[#BDFF00]">*</span>
          </label>
          <textarea
            id="biggestChallenge"
            name="biggestChallenge"
            required
            rows={4}
            value={biggestChallenge}
            onChange={(e) => setBiggestChallenge(e.target.value)}
            placeholder="pl. ajánlatkészítés, ügyfél-kommunikáció, riportolás..."
            className={cn(inputClass, "min-h-[120px] resize-y")}
          />
        </div>

        <div>
          <span className="mb-2 block text-sm text-[var(--text-secondary)]">
            Hol tart az AI használatban?
          </span>
          <div className="inline-flex flex-wrap gap-2">
            {AI_STAGE_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setAiStage(aiStage === opt ? "" : opt)}
                className={cn(
                  "cursor-pointer rounded-full border border-[rgba(255,255,255,0.1)] px-4 py-2 text-sm transition-colors",
                  aiStage === opt &&
                    "border-[#BDFF00] text-[#BDFF00]",
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="mb-2 block text-sm text-[var(--text-secondary)]">
            Mikor ér rá?
          </span>
          <div className="inline-flex flex-wrap gap-2">
            {AVAILABILITY_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() =>
                  setAvailability(availability === opt ? "" : opt)
                }
                className={cn(
                  "cursor-pointer rounded-full border border-[rgba(255,255,255,0.1)] px-4 py-2 text-sm transition-colors",
                  availability === opt &&
                    "border-[#BDFF00] text-[#BDFF00]",
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-start gap-3">
          <input
            id="privacy"
            name="privacyAccepted"
            type="checkbox"
            required
            checked={privacyAccepted}
            onChange={(e) => setPrivacyAccepted(e.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 rounded border border-[rgba(255,255,255,0.2)]"
          />
          <label htmlFor="privacy" className="text-sm text-[var(--text-secondary)]">
            Elolvastam és elfogadom az{" "}
            <a
              href="/adatkezeles"
              className="text-[var(--text-primary)] underline underline-offset-2 hover:text-[#BDFF00]"
            >
              adatkezelési tájékoztatót
            </a>
            .
          </label>
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-full bg-[#BDFF00] px-8 py-4 font-medium text-[#09090B] disabled:opacity-60"
        >
          {status === "loading" ? "Küldés…" : "Küldés"}
        </button>

        {status === "error" && errorMessage ? (
          <p className="text-center text-sm text-red-400" role="alert">
            {errorMessage}
          </p>
        ) : null}
      </form>
    </div>
  );
}

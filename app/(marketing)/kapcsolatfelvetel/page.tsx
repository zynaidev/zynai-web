"use client";

import {
  type FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

const TOTAL_STEPS = 7;

const CONVERSATION_STEPS = [
  {
    question: "Szia! Hogy szólíthatlak?",
    subtext: "Kérlek add meg a teljes nevedet.",
    type: "text",
    field: "name",
    placeholder: "Példa Péter",
    required: true,
  },
  {
    question: "Mi az e-mail címed?",
    subtext:
      "Kérlek olyan e-mail címet adj meg amin fel tudom venni veled a kapcsolatot.",
    type: "email",
    field: "email",
    placeholder: "peter@vallalkozas.hu",
    required: true,
  },
  {
    question: "Céges adatok",
    subtext:
      "Ha van weboldalatok, azt is add meg, hogy fel tudjak készülni.",
    type: "double",
    fields: [
      {
        field: "company",
        placeholder: "pl. Kovács és Társa Kft.",
        type: "text",
        label: "Cégnév",
      },
      {
        field: "website",
        placeholder: "pl. https://kovacsestarsai.hu",
        type: "url",
        label: "Weboldal (opcionális)",
      },
    ],
    required: false,
  },
  {
    question: "Hány fő dolgozik a cégnél?",
    subtext: "Ez segít felmérni a folyamatok komplexitását.",
    type: "radio",
    field: "teamSize",
    options: ["1–5 fő", "6–20 fő", "20 fő felett"],
    required: false,
  },
  {
    question: "Mi veszi el a legtöbb időt a munkában?",
    subtext: "Leírhatod szabadon — nem kell tökéletesnek lennie.",
    type: "textarea",
    field: "biggestChallenge",
    placeholder:
      "pl. ajánlatkészítés, ügyfélkommunikáció, riportok összeállítása...",
    required: true,
  },
  {
    question: "Hol tartotok az AI használatában?",
    subtext: "Nincs rossz válasz — ez segít a felkészülésben.",
    type: "radio",
    field: "aiStage",
    options: [
      "Még nem próbáltuk",
      "Kísérletezünk vele",
      "Használjuk, de nem rendszerszinten",
    ],
    required: false,
  },
  {
    question: "Mikor lenne ideális neked a 30 perces audit?",
    subtext: "30 perc, díjmentes, nincs elköteleződés.",
    type: "radio",
    field: "availability",
    options: ["Ezen a héten", "Jövő héten", "Rugalmas vagyok"],
    required: false,
  },
] as const;

const AFTER_STEPS = [
  {
    title: "Feldolgozom a megküldött adatokat",
    desc: "Áttekintem a céged publikus információit és az űrlapon megosztott kihívásokat.",
  },
  {
    title: "Felveszem veled a kapcsolatot",
    desc: "Egyeztetünk egy 30 perces díjmentes AI auditon, ahol konkrét lehetőségeket nézünk át.",
  },
  {
    title: "Audit — elköteleződés nélkül",
    desc: "Díjmentes, kockázatmentes. Választ kapsz a kérdéseidre, konkrét képet a lehetőségekről.",
  },
] as const;

const inputClass =
  "w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-6 py-5 text-[17px] text-[var(--text-primary)] outline-none transition-[border-color,box-shadow] duration-200 focus:border-[rgba(189,255,0,0.5)] focus:shadow-[0_0_0_3px_rgba(189,255,0,0.08)]";

const pillBase =
  "cursor-pointer rounded-full border border-[rgba(255,255,255,0.08)] px-6 py-3 text-[15px] text-[var(--text-secondary)] transition-all duration-150";

const pillHoverUnselected =
  "hover:border-[rgba(255,255,255,0.2)]";

const pillSelected =
  "border-[#BDFF00] bg-[rgba(189,255,0,0.06)] text-[#BDFF00]";

const glassCardClass =
  "relative z-[1] overflow-hidden rounded-[28px] border border-[rgba(255,255,255,0.08)] bg-[rgba(10,10,14,0.55)] px-14 py-16 lg:px-20 lg:py-20";

const kaAuroraStyles = `
@keyframes ka-drift-1 {
  0%,100% { transform: translate(0%,0%) scale(1); }
  33% { transform: translate(15%,-20%) scale(1.1); }
  66% { transform: translate(-10%,15%) scale(0.95); }
}
@keyframes ka-drift-2 {
  0%,100% { transform: translate(0%,0%) scale(1); }
  40% { transform: translate(-20%,10%) scale(1.15); }
  75% { transform: translate(12%,-15%) scale(0.9); }
}
@keyframes ka-drift-3 {
  0%,100% { transform: translate(0%,0%) scale(1); }
  50% { transform: translate(10%,20%) scale(1.08); }
}
`;

function AuroraBox() {
  return (
    <>
      <style>{kaAuroraStyles}</style>
      <div
        className="pointer-events-none absolute z-0 overflow-visible"
        style={{ inset: -80 }}
        aria-hidden
      >
        <div
          className="absolute left-0 top-0 h-[80%] w-[65%] blur-[60px]"
          style={{
            background:
              "radial-gradient(circle, rgba(189,255,0,0.28) 0%, transparent 65%)",
            animation: "ka-drift-1 12s ease-in-out infinite",
          }}
        />
        <div
          className="absolute right-0 top-0 h-[65%] w-1/2 blur-[65px]"
          style={{
            background:
              "radial-gradient(circle, rgba(120,60,200,0.32) 0%, transparent 65%)",
            animation: "ka-drift-2 16s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-0 right-[15%] h-[55%] w-[45%] blur-[55px]"
          style={{
            background:
              "radial-gradient(circle, rgba(189,255,0,0.22) 0%, transparent 65%)",
            animation: "ka-drift-3 14s ease-in-out infinite",
          }}
        />
      </div>
    </>
  );
}

const splitSubmitButtonVariants = {
  idle: {
    boxShadow: "0 0 28px rgba(189,255,0,0.2)",
  },
  hover: {
    boxShadow:
      "0 0 32px rgba(189,255,0,0.45), 0 0 64px rgba(189,255,0,0.15)",
    transition: { duration: 0.25 },
  },
} as const;

const splitSubmitLeftVariants = {
  idle: { filter: "brightness(1)" },
  hover: {
    filter: "brightness(1.08)",
    transition: { duration: 0.2 },
  },
} as const;

type FieldsState = {
  name: string;
  email: string;
  company: string;
  website: string;
  teamSize: string;
  biggestChallenge: string;
  aiStage: string;
  availability: string;
  privacyAccepted: boolean;
};

const initialFields: FieldsState = {
  name: "",
  email: "",
  company: "",
  website: "",
  teamSize: "",
  biggestChallenge: "",
  aiStage: "",
  availability: "",
  privacyAccepted: false,
};

function stepSlideProps(direction: "forward" | "back") {
  const fwd = direction === "forward";
  return {
    initial: { opacity: 0, x: fwd ? 40 : -40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: fwd ? -40 : 40 },
    transition: { duration: 0.28, ease: "easeInOut" as const },
  };
}

export default function KapcsolatfelvetelPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [fields, setFields] = useState<FieldsState>(initialFields);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [stepError, setStepError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const advanceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const focusRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const clearAdvanceTimeout = useCallback(() => {
    if (advanceTimeoutRef.current) {
      clearTimeout(advanceTimeoutRef.current);
      advanceTimeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => clearAdvanceTimeout();
  }, [clearAdvanceTimeout]);

  useEffect(() => {
    clearAdvanceTimeout();
    setStepError("");
  }, [currentStep, clearAdvanceTimeout]);

  useEffect(() => {
    if (status === "success") return;
    const id = requestAnimationFrame(() => {
      focusRef.current?.focus();
    });
    return () => cancelAnimationFrame(id);
  }, [currentStep, status]);

  async function handleSubmit() {
    if (status === "loading") return;
    setErrorMessage("");
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.name.trim(),
          email: fields.email.trim(),
          company: fields.company.trim() || undefined,
          website: fields.website.trim() || undefined,
          teamSize: fields.teamSize || undefined,
          aiStage: fields.aiStage || undefined,
          availability: fields.availability || undefined,
          biggestChallenge: fields.biggestChallenge.trim(),
          privacyAccepted: fields.privacyAccepted === true,
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

  function validateCurrentStep(): boolean {
    const step = CONVERSATION_STEPS[currentStep];
    if (step.type === "text" && step.field === "name") {
      if (!fields.name.trim()) {
        setStepError("Kérlek, add meg a neved.");
        return false;
      }
      return true;
    }
    if (step.type === "email") {
      if (!fields.email.trim()) {
        setStepError("Kérlek, add meg az e-mail címed.");
        return false;
      }
      return true;
    }
    if (step.type === "double") {
      return true;
    }
    if (step.type === "radio") {
      return true;
    }
    if (step.type === "textarea") {
      if (!fields.biggestChallenge.trim()) {
        setStepError(
          "Kérlek, írd le, mi a legnagyobb időrabló folyamat a cégednél.",
        );
        return false;
      }
      return true;
    }
    return true;
  }

  function handleNext() {
    if (currentStep === 6) {
      setStepError("");
      if (!fields.privacyAccepted) {
        setStepError(
          "Az adatkezelési tájékoztató elfogadása kötelező a küldéshez.",
        );
        return;
      }
      void handleSubmit();
      return;
    }

    setStepError("");
    if (!validateCurrentStep()) return;

    setDirection("forward");
    setCurrentStep((prev) => prev + 1);
  }

  function handleBack() {
    if (currentStep <= 0) return;
    clearAdvanceTimeout();
    setDirection("back");
    setCurrentStep((prev) => prev - 1);
  }

  function handleRadioSelect(
    stepIndex: number,
    field: "teamSize" | "aiStage" | "availability",
    value: string,
  ) {
    clearAdvanceTimeout();
    setFields((f) => ({ ...f, [field]: value }));
    if (stepIndex !== 3 && stepIndex !== 5) return;

    advanceTimeoutRef.current = setTimeout(() => {
      advanceTimeoutRef.current = null;
      setDirection("forward");
      setCurrentStep((prev) =>
        prev === stepIndex ? Math.min(stepIndex + 1, TOTAL_STEPS - 1) : prev,
      );
    }, 400);
  }

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    const t = e.currentTarget.type;
    if (t === "text" || t === "email" || t === "url") {
      e.preventDefault();
      handleNext();
    }
  }

  function onGlassFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleNext();
  }

  const step = CONVERSATION_STEPS[currentStep];
  const progressPct = ((currentStep + 1) / TOTAL_STEPS) * 100;
  const stepCounter = `${String(currentStep + 1).padStart(2, "0")} / ${String(TOTAL_STEPS).padStart(2, "0")}`;
  const slide = stepSlideProps(direction);

  return (
    <div className="min-h-screen bg-[var(--bg-base)] pt-32 pb-24">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        <header className="mx-auto mb-16 text-center lg:mb-20">
          <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--text-tertiary)]">
            KAPCSOLATFELVÉTEL
          </p>
          <h1
            className="font-display mt-4 font-medium text-[var(--text-primary)]"
            style={{
              fontSize: "clamp(32px, 4vw, 52px)",
              lineHeight: "1.1",
              letterSpacing: "-0.025em",
            }}
          >
            Nézzük meg együtt, hol hozhat{" "}
            <span className="text-[#BDFF00]">valódi eredményt</span> az AI a
            vállalkozásodban.
          </h1>
          <p
            className="mx-auto mt-6 max-w-xl text-[var(--text-secondary)]"
            style={{
              fontSize: "clamp(15px, 1.2vw, 17px)",
              lineHeight: "1.65",
            }}
          >
            Töltsd ki az alábbi űrlapot — feldolgozom a megküldött információkat,
            áttekintem a céggel kapcsolatos publikus adatokat, majd felveszem
            veled a kapcsolatot egy díjmentes 30 perces AI audit egyeztetéséhez.
          </p>
        </header>

        <div className="relative z-0 mx-auto w-full max-w-[920px]">
          <AuroraBox />
          <div
            className={glassCardClass}
            style={{
              WebkitBackdropFilter: "blur(32px) saturate(180%)",
              backdropFilter: "blur(32px) saturate(180%)",
              boxShadow:
                "0 0 0 0.5px rgba(255,255,255,0.04) inset, 0 40px 100px rgba(0,0,0,0.4)",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] bg-[rgba(9,9,11,0.25)]"
            />
            <div className="relative z-[1] flex min-h-[560px] w-full flex-col justify-between">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success-pane"
                    className="flex flex-1 flex-col items-center justify-center py-6 text-center"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span
                      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#BDFF00] bg-[rgba(189,255,0,0.1)] text-[28px] font-medium text-[#BDFF00]"
                      aria-hidden
                    >
                      ✓
                    </span>
                    <h3 className="font-display mt-6 text-[22px] text-[var(--text-primary)]">
                      Megkaptam — hamarosan jelentkezem.
                    </h3>
                    <p className="mt-3 text-[15px] text-[var(--text-secondary)]">
                      Az első lépés mindig a legnehezebb, te már megtetted.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="wizard-pane"
                    className="flex min-h-[360px] flex-1 flex-col justify-between gap-8"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-full shrink-0">
                      <div className="mb-8 h-[2px] w-full rounded-full bg-[rgba(255,255,255,0.06)]">
                        <motion.div
                          className="h-[2px] rounded-full bg-[#BDFF00]"
                          style={{
                            boxShadow: "0 0 8px rgba(189,255,0,0.6)",
                          }}
                          initial={false}
                          animate={{ width: `${progressPct}%` }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        />
                      </div>

                      <p className="mb-6 font-mono text-[11px] tracking-[0.15em] text-[var(--text-tertiary)]">
                        {stepCounter}
                      </p>
                    </div>

                    <form
                      data-step-direction={direction}
                      onSubmit={onGlassFormSubmit}
                      className="flex flex-1 flex-col justify-between gap-8"
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                          key={currentStep}
                          {...slide}
                          className="flex flex-1 flex-col"
                        >
                          <motion.h3
                            className="font-display mb-2 font-medium text-[var(--text-primary)]"
                            style={{
                              fontSize: "clamp(26px, 3vw, 36px)",
                              lineHeight: "1.2",
                            }}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.26, ease: "easeOut", delay: 0.05 }}
                          >
                            {step.question}
                          </motion.h3>
                          <motion.p
                            className="mb-8 text-[14px] text-[var(--text-secondary)]"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.26, ease: "easeOut", delay: 0.1 }}
                          >
                            {step.subtext}
                          </motion.p>

                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.26, ease: "easeOut", delay: 0.15 }}
                          >
                            {step.type === "text" && (
                              <motion.input
                                ref={
                                  focusRef as React.RefObject<HTMLInputElement>
                                }
                                id="kf-step-name"
                                name="name"
                                type="text"
                                value={fields.name}
                                onChange={(e) =>
                                  setFields((f) => ({ ...f, name: e.target.value }))
                                }
                                onKeyDown={handleInputKeyDown}
                                placeholder={step.placeholder}
                                className={inputClass}
                                autoComplete="name"
                                aria-invalid={!!stepError}
                              />
                            )}

                            {step.type === "email" && (
                              <motion.input
                                ref={
                                  focusRef as React.RefObject<HTMLInputElement>
                                }
                                id="kf-step-email"
                                name="email"
                                type="email"
                                value={fields.email}
                                onChange={(e) =>
                                  setFields((f) => ({ ...f, email: e.target.value }))
                                }
                                onKeyDown={handleInputKeyDown}
                                placeholder={step.placeholder}
                                className={inputClass}
                                autoComplete="email"
                                aria-invalid={!!stepError}
                              />
                            )}

                            {step.type === "double" && (
                              <div className="space-y-4">
                                {step.fields.map((sub, idx) => (
                                  <div key={sub.field}>
                                    <label
                                      htmlFor={`kf-step-${sub.field}`}
                                      className="mb-2 block text-sm text-[var(--text-secondary)]"
                                    >
                                      {sub.label}
                                    </label>
                                    <input
                                      ref={
                                        idx === 0
                                          ? (focusRef as React.RefObject<HTMLInputElement>)
                                          : undefined
                                      }
                                      id={`kf-step-${sub.field}`}
                                      name={sub.field}
                                      type={sub.type}
                                      value={fields[sub.field]}
                                      onChange={(e) =>
                                        setFields((f) => ({
                                          ...f,
                                          [sub.field]: e.target.value,
                                        }))
                                      }
                                      onKeyDown={handleInputKeyDown}
                                      placeholder={sub.placeholder}
                                      className={inputClass}
                                      autoComplete={
                                        sub.field === "company"
                                          ? "organization"
                                          : "url"
                                      }
                                    />
                                  </div>
                                ))}
                              </div>
                            )}

                            {step.type === "radio" && step.field === "teamSize" && (
                              <div className="flex flex-wrap gap-3">
                                {step.options.map((opt) => {
                                  const sel = fields.teamSize === opt;
                                  return (
                                    <button
                                      key={opt}
                                      type="button"
                                      onClick={() =>
                                        handleRadioSelect(3, "teamSize", opt)
                                      }
                                      className={cn(
                                        pillBase,
                                        !sel && pillHoverUnselected,
                                        sel && pillSelected,
                                      )}
                                    >
                                      {opt}
                                    </button>
                                  );
                                })}
                              </div>
                            )}

                            {step.type === "radio" && step.field === "aiStage" && (
                              <div className="flex flex-wrap gap-3">
                                {step.options.map((opt) => {
                                  const sel = fields.aiStage === opt;
                                  return (
                                    <button
                                      key={opt}
                                      type="button"
                                      onClick={() =>
                                        handleRadioSelect(5, "aiStage", opt)
                                      }
                                      className={cn(
                                        pillBase,
                                        !sel && pillHoverUnselected,
                                        sel && pillSelected,
                                      )}
                                    >
                                      {opt}
                                    </button>
                                  );
                                })}
                              </div>
                            )}

                            {step.type === "radio" &&
                              step.field === "availability" && (
                                <div className="flex flex-wrap gap-3">
                                  {step.options.map((opt) => {
                                    const sel = fields.availability === opt;
                                    return (
                                      <button
                                        key={opt}
                                        type="button"
                                        onClick={() =>
                                          setFields((f) => ({
                                            ...f,
                                            availability: opt,
                                          }))
                                        }
                                        className={cn(
                                          pillBase,
                                          !sel && pillHoverUnselected,
                                          sel && pillSelected,
                                        )}
                                      >
                                        {opt}
                                      </button>
                                    );
                                  })}
                                </div>
                              )}

                            {step.type === "textarea" && (
                              <motion.textarea
                                ref={
                                  focusRef as React.RefObject<HTMLTextAreaElement>
                                }
                                id="kf-step-challenge"
                                name="biggestChallenge"
                                value={fields.biggestChallenge}
                                onChange={(e) =>
                                  setFields((f) => ({
                                    ...f,
                                    biggestChallenge: e.target.value,
                                  }))
                                }
                                placeholder={step.placeholder}
                                className={cn(
                                  inputClass,
                                  "min-h-[140px] resize-none",
                                )}
                                rows={4}
                                aria-invalid={!!stepError}
                              />
                            )}

                            {currentStep === 6 && (
                              <div className="mt-6 flex items-start gap-3">
                                <input
                                  id="kf-privacy"
                                  name="privacyAccepted"
                                  type="checkbox"
                                  checked={fields.privacyAccepted}
                                  onChange={(e) =>
                                    setFields((f) => ({
                                      ...f,
                                      privacyAccepted: e.target.checked,
                                    }))
                                  }
                                  className="mt-1 h-4 w-4 shrink-0 rounded border border-[rgba(255,255,255,0.2)]"
                                />
                                <label
                                  htmlFor="kf-privacy"
                                  className="text-sm text-[var(--text-secondary)]"
                                >
                                  Elolvastam és elfogadom az{" "}





                                                                    <a
                                    href="/adatvedelem"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline underline-offset-2"
                                  >
                                    adatkezelési tájékoztatót
                                  </a>
                                  .
                                </label>
                              </div>
                            )}

                            {stepError ? (
                              <p
                                className="mt-2 font-mono text-[12px] text-[#ff6b6b]"
                                role="alert"
                              >
                                {stepError}
                              </p>
                            ) : null}
                          </motion.div>
                        </motion.div>
                      </AnimatePresence>

                      <div className="mt-12 flex shrink-0 items-center justify-between gap-4">
                        {currentStep > 0 ? (
                          <button
                            type="button"
                            onClick={handleBack}
                            className="inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-wider text-[var(--text-tertiary)] transition-colors duration-200 hover:text-[var(--text-primary)]"
                          >
                            <ChevronLeft size={16} aria-hidden />
                            Vissza
                          </button>
                        ) : (
                          <span
                            className="inline-flex min-w-[5.5rem] select-none items-center gap-2 font-mono text-[13px] uppercase tracking-wider text-transparent"
                            aria-hidden
                          >
                            <ChevronLeft size={16} className="opacity-0" />
                            Vissza
                          </span>
                        )}

                        <motion.button
                          type="submit"
                          disabled={status === "loading"}
                          variants={splitSubmitButtonVariants}
                          initial="idle"
                          animate="idle"
                          whileHover={
                            status === "loading" ? undefined : "hover"
                          }
                          className="relative inline-flex overflow-hidden rounded-full disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <motion.span
                            variants={splitSubmitLeftVariants}
                            className="flex items-center justify-center bg-[#BDFF00] px-7 py-3 text-[14px] font-medium text-[#09090B]"
                          >
                            {currentStep < 6
                              ? "Következő"
                              : status === "loading"
                                ? "Küldés..."
                                : "Elküldöm"}
                          </motion.span>
                          <div
                            className="w-px shrink-0 self-stretch bg-[rgba(9,9,11,0.15)]"
                            aria-hidden
                          />
                          <span className="flex shrink-0 items-center justify-center bg-[#BDFF00] px-4 py-3 text-[#09090B]">
                            {currentStep < 6 ? (
                              <ChevronRight size={15} aria-hidden />
                            ) : (
                              <ArrowRight size={15} aria-hidden />
                            )}
                          </span>
                        </motion.button>
                      </div>

                      {status === "error" && errorMessage ? (
                        <p
                          className="text-center font-mono text-[12px] text-[#ff6b6b]"
                          role="alert"
                        >
                          {errorMessage}
                        </p>
                      ) : null}
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="mb-8 text-center font-display text-[18px] font-medium text-[var(--text-primary)]">
              Mi történik ezután?
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {AFTER_STEPS.map((s, i) => (
                <div
                  key={s.title}
                  className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] px-6 py-6"
                >
                  <div className="flex items-start gap-4">
                    <span
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#BDFF00] text-[11px] font-bold text-[#09090B]"
                      aria-hidden
                    >
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[14px] font-medium text-[var(--text-primary)]">
                        {s.title}
                      </p>
                      <p className="mt-1 text-[13px] leading-relaxed text-[var(--text-secondary)]">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-10 text-center font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
              INGYENES · 30 PERC · NEM KÖTELEZ EL SEMMIRE
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/#modszer", label: "Módszer" },
  { href: "/esettanulmanyok", label: "Esettanulmányok" },
  { href: "/ai-tartalmak", label: "AI tartalmak" },
  { href: "/claude-code", label: "Promptépítő" },
  { href: "/#rolam", label: "Rólam" },
];

const aiCategories = [
  { href: "/ai-tartalmak", label: "Összes cikk" },
  ...(
    [
      ["AI HÍREK", "AI hírek"],
      ["CLAUDE", "Claude"],
      ["ÜZLETI ELEMZÉS", "Üzleti elemzés"],
      ["AI PULZUS", "AI pulzus"],
    ] as const
  ).map(([tag, label]) => ({
    href: `/ai-tartalmak?kategoria=${encodeURIComponent(tag)}`,
    label,
  })),
];

const primaryCta = { href: "/vibecoding-pilot", label: "VibeCoding képzés" };
const secondaryCta = { href: "/kapcsolatfelvetel", label: "Kapcsolatfelvétel" };

const primaryCtaClass =
  "header-cta inline-flex items-center justify-center whitespace-nowrap rounded-full border border-transparent bg-accent px-5 py-2.5 font-sans text-sm font-semibold text-accent-on-light lg:px-4 lg:text-[13px] xl:px-5 xl:text-sm 2xl:px-6 2xl:text-[15px]";
const secondaryCtaClass =
  "inline-flex items-center justify-center whitespace-nowrap rounded-full border border-accent px-5 py-2.5 font-sans text-sm font-semibold text-accent transition-colors duration-200 hover:bg-accent/10 lg:px-4 lg:text-[13px] xl:px-5 xl:text-sm 2xl:px-6 2xl:text-[15px]";

const headerCtaCss = `
.header-cta {
  position: relative;
  overflow: hidden;
  animation: header-cta-pulse 3.5s ease-in-out infinite;
  transition: transform 200ms ease-out, box-shadow 200ms ease-out;
}
.header-cta::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.35) 50%, transparent 65%);
  transform: translateX(-120%);
  animation: header-cta-sheen 5s ease-in-out infinite;
}
.header-cta:hover {
  transform: translateY(-1px) scale(1.03);
  animation: none;
  box-shadow: 0 0 32px rgba(189,255,0,0.4);
}
.header-cta:hover::after {
  animation: header-cta-sheen-once 700ms ease-out 1 forwards;
}
.header-cta-panel {
  animation-name: header-cta-pulse-panel;
}
.header-cta-panel:hover {
  box-shadow: 0 0 16px rgba(189,255,0,0.35);
}
@keyframes header-cta-pulse-panel {
  0%, 100% { box-shadow: 0 0 6px rgba(189,255,0,0.12); }
  50% { box-shadow: 0 0 14px rgba(189,255,0,0.3); }
}
@keyframes header-cta-pulse {
  0%, 100% { box-shadow: 0 0 12px rgba(189,255,0,0.12); }
  50% { box-shadow: 0 0 26px rgba(189,255,0,0.3); }
}
@keyframes header-cta-sheen {
  0% { transform: translateX(-120%); }
  22%, 100% { transform: translateX(120%); }
}
@keyframes header-cta-sheen-once {
  from { transform: translateX(-120%); }
  to { transform: translateX(120%); }
}
@media (prefers-reduced-motion: reduce) {
  .header-cta {
    animation: none;
    transition: filter 200ms ease-out;
  }
  .header-cta::after { display: none; }
  .header-cta:hover {
    transform: none;
    box-shadow: none;
    filter: brightness(1.1);
  }
}
`;

function MobileMenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6 text-text-primary"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      {open ? (
        <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
      ) : (
        <>
          <path d="M4 8h16M4 12h16M4 16h16" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  return (
    <>
      <style>{headerCtaCss}</style>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-40 h-28 lg:hidden"
        style={{
          background:
            "linear-gradient(to bottom, rgba(9,9,11,0.92) 0%, rgba(9,9,11,0.72) 45%, rgba(9,9,11,0) 100%)",
        }}
      />

      {/* Mobile — static full-width bar; no pill width animation */}
      <header className="fixed inset-x-0 top-0 z-[70] border-b border-[rgba(255,255,255,0.08)] bg-[rgba(9,9,11,0.88)] backdrop-blur-xl lg:hidden">
        <div className="relative mx-auto flex h-16 w-full max-w-[var(--container-max)] items-center justify-between px-6 lg:px-12">
          <Link className="flex min-h-11 items-center" href="/">
            <Image
                src="/brand/ZynAI-Logo.svg"
                alt="ZynAI"
                width={120}
                height={32}
                className="h-8 w-auto object-contain"
                priority
              />
          </Link>

          <button
            type="button"
            className="-mr-2 inline-flex min-h-11 min-w-11 touch-manipulation items-center justify-center rounded-md text-text-primary transition-opacity hover:opacity-90"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            aria-label={mobileMenuOpen ? "Menü bezárása" : "Menü megnyitása"}
            onClick={() => setMobileMenuOpen((o) => !o)}
          >
            <MobileMenuIcon open={mobileMenuOpen} />
          </button>

          <div
            className={`absolute inset-x-0 top-full z-[80] border-b border-[var(--border-hairline)] bg-[rgba(9,9,11,0.96)] px-6 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-4 max-h-[calc(100dvh-65px)] overflow-y-auto overscroll-contain shadow-lg backdrop-blur-xl transition-all duration-200 ease-out ${
              mobileMenuOpen
                ? "pointer-events-auto translate-y-0 opacity-100"
                : "pointer-events-none -translate-y-1 opacity-0"
            }`}
            id="mobile-nav"
          >
              <nav className="flex flex-col gap-1 whitespace-nowrap font-sans text-sm font-normal text-text-secondary">
                {navItems.map((item) => (
                  <Link
                    className="rounded-md py-3 transition-colors duration-200 hover:text-text-primary"
                    href={item.href}
                    key={item.label}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <Link
                className={`header-cta-panel mt-3 min-h-11 w-full ${primaryCtaClass}`}
                href={primaryCta.href}
                onClick={() => setMobileMenuOpen(false)}
              >
                {primaryCta.label}
              </Link>
              <Link
                className={`mt-2 min-h-11 w-full ${secondaryCtaClass}`}
                href={secondaryCta.href}
                onClick={() => setMobileMenuOpen(false)}
              >
                {secondaryCta.label}
              </Link>
          </div>
        </div>
      </header>

      {/* Desktop — full-width fixed bar */}
      <header className="fixed inset-x-0 top-0 z-[70] hidden border-b border-[rgba(255,255,255,0.08)] bg-[rgba(9,9,11,0.88)] backdrop-blur-xl lg:block">
        <div className="mx-auto flex h-20 w-full max-w-[1760px] items-center px-8 xl:px-12 2xl:px-16">
          <Link className="shrink-0" href="/">
            <Image
                src="/brand/ZynAI-Logo.svg"
                alt="ZynAI"
                width={156}
                height={42}
                className="h-9 w-auto object-contain xl:h-[42px] 2xl:h-[46px]"
                priority
              />
          </Link>

          <nav className="flex h-full flex-1 items-center justify-center gap-0 whitespace-nowrap font-sans text-base font-normal text-text-secondary xl:gap-4 2xl:gap-6">
            {navItems.map((item) =>
              item.href === "/ai-tartalmak" ? (
                <div className="group relative flex h-full items-center px-1.5 xl:px-2" key={item.label}>
                  <Link
                    className="inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-text-primary group-hover:text-text-primary group-focus-within:text-text-primary"
                    href={item.href}
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden
                      size={16}
                      className="transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                    />
                  </Link>
                  <div className="invisible absolute left-1/2 top-full z-[80] w-64 -translate-x-1/2 translate-y-1 opacity-0 transition-all duration-200 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <div className="rounded-2xl border border-[rgba(255,255,255,0.09)] bg-[rgba(9,9,11,0.94)] p-2 shadow-[0_16px_48px_rgba(0,0,0,0.55)] backdrop-blur-xl">
                      <p className="px-3 pb-1.5 pt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-text-tertiary">
                        Kategóriák
                      </p>
                      {aiCategories.map((cat) => (
                        <Link
                          className="group/item flex items-center justify-between rounded-xl px-3 py-2.5 text-[15px] text-text-secondary transition-colors duration-150 hover:bg-[rgba(189,255,0,0.08)] hover:text-text-primary focus-visible:bg-[rgba(189,255,0,0.08)] focus-visible:text-text-primary focus-visible:outline-none"
                          href={cat.href}
                          key={cat.label}
                        >
                          {cat.label}
                          <ArrowRight
                            aria-hidden
                            size={14}
                            className="-translate-x-1 text-accent opacity-0 transition-all duration-150 group-hover/item:translate-x-0 group-hover/item:opacity-100 group-focus-visible/item:translate-x-0 group-focus-visible/item:opacity-100"
                          />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  className="px-1.5 transition-colors xl:px-2 duration-200 hover:text-text-primary"
                  href={item.href}
                  key={item.label}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-3 2xl:gap-4">
            <Link className={secondaryCtaClass} href={secondaryCta.href}>
              {secondaryCta.label}
            </Link>
            <Link className={primaryCtaClass} href={primaryCta.href}>
              {primaryCta.label}
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}

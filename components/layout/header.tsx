"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";

const navItems = [
  { href: "/#modszer", label: "Módszer" },
  { href: "/esettanulmanyok", label: "Esettanulmányok" },
  { href: "/ai-tartalmak", label: "AI tartalmak" },
  { href: "/#rolam", label: "Rólam" },
];

const FALLBACK_VIEWPORT_WIDTH = 1280;


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
  const [viewportWidth, setViewportWidth] = useState(FALLBACK_VIEWPORT_WIDTH);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const update = () => setViewportWidth(window.innerWidth);

    update();
    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

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
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-40 h-28"
        style={{
          background:
            "linear-gradient(to bottom, rgba(9,9,11,0.92) 0%, rgba(9,9,11,0.72) 45%, rgba(9,9,11,0) 100%)",
        }}
      />

      {/* Mobile — static full-width bar; no pill width animation */}
      <header className="fixed inset-x-0 top-0 z-[70] border-b border-[rgba(255,255,255,0.08)] bg-[rgba(9,9,11,0.88)] backdrop-blur-xl lg:hidden">
        <div className="relative mx-auto flex h-16 w-full max-w-[var(--container-max)] items-center justify-between px-6 lg:px-12">
          <Link href="/">
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
            className={`absolute inset-x-0 top-full z-[80] border-b border-[var(--border-hairline)] bg-[rgba(9,9,11,0.96)] px-6 py-4 shadow-lg backdrop-blur-xl transition-all duration-200 ease-out ${
              mobileMenuOpen
                ? "pointer-events-auto translate-y-0 opacity-100"
                : "pointer-events-none -translate-y-1 opacity-0"
            }`}
            id="mobile-nav"
          >
              <nav className="flex flex-col gap-1 font-sans text-sm font-normal text-text-secondary">
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
                className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-accent px-5 py-2.5 font-sans text-sm font-semibold text-accent-on-light transition-transform duration-200 hover:scale-[1.02]"
                href="/kapcsolatfelvetel"
                onClick={() => setMobileMenuOpen(false)}
              >
                Kapcsolatfelvétel
              </Link>
          </div>
        </div>
      </header>

      {/* Desktop — pill animation */}
      <header
        className="fixed left-1/2 z-[70] hidden -translate-x-1/2 border border-[rgba(255,255,255,0.09)] bg-[rgba(9,9,11,0.86)] backdrop-blur-xl lg:block"
        style={{
          borderRadius: 9999,
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.45), inset 0 0 0 0.5px rgba(255,255,255,0.06)",
          paddingBottom: 10,
          paddingTop: 10,
          top: 14,
          width: Math.max(720, Math.min(1100, viewportWidth * 0.6)),
        }}
      >
        <Container className="flex h-16 items-center justify-between">
          <Link href="/">
            <Image
                src="/brand/ZynAI-Logo.svg"
                alt="ZynAI"
                width={120}
                height={32}
                className="h-8 w-auto object-contain"
                priority
              />
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-12 font-sans text-sm font-normal text-text-secondary md:flex">
            {navItems.map((item) => (
              <Link
                className="transition-colors duration-200 hover:text-text-primary"
                href={item.href}
                key={item.label}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 font-sans text-sm font-semibold text-accent-on-light transition-transform duration-200 hover:scale-[1.02]"
            style={{ boxShadow: "0 0 18px rgba(189,255,0,0.22)" }}
            href="/kapcsolatfelvetel"
          >
            Kapcsolatfelvétel
          </Link>
        </Container>
      </header>
    </>
  );
}

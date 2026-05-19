"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import { Container } from "@/components/ui/container";

const navItems = [
  { href: "/#modszer", label: "Módszer" },
  { href: "/esettanulmanyok", label: "Esettanulmányok" },
  { href: "/ai-tartalmak", label: "AI tartalmak" },
  { href: "/#rolam", label: "Rólam" },
];

const SCROLL_START = 0;
const SCROLL_END = 100;
const PILL_MIN_WIDTH = 720;
const PILL_MAX_WIDTH = 1100;
const PILL_TARGET_RATIO = 0.6;
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
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const smoothScrollY = useSpring(scrollY, {
    damping: 60,
    restDelta: 1,
    stiffness: 200,
  });
  const scrollProgress = shouldReduceMotion ? scrollY : smoothScrollY;

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

  const pillWidth = Math.max(
    PILL_MIN_WIDTH,
    Math.min(PILL_MAX_WIDTH, viewportWidth * PILL_TARGET_RATIO),
  );

  const width = useTransform(
    scrollProgress,
    [SCROLL_START, SCROLL_END],
    [viewportWidth, pillWidth],
  );
  const top = useTransform(scrollProgress, [SCROLL_START, SCROLL_END], [0, 14]);
  const paddingY = useTransform(
    scrollProgress,
    [SCROLL_START, SCROLL_END],
    [20, 10],
  );
  const borderRadius = useTransform(
    scrollProgress,
    [SCROLL_START, SCROLL_END],
    [0, 9999],
  );
  const boxShadow = useTransform(
    scrollProgress,
    [SCROLL_START, SCROLL_END],
    ["0 0 0 rgba(0, 0, 0, 0)", "0 8px 32px rgba(0,0,0,0.4)"],
  );

  return (
    <>
      <div aria-hidden="true" className="h-20" />

      {/* Mobile — static full-width bar; no pill width animation */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border-hairline)] bg-[rgba(9,9,11,0.72)] backdrop-blur-xl lg:hidden">
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
            className="-mr-2 inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-text-primary transition-opacity hover:opacity-90"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            aria-label={mobileMenuOpen ? "Menü bezárása" : "Menü megnyitása"}
            onClick={() => setMobileMenuOpen((o) => !o)}
          >
            <MobileMenuIcon open={mobileMenuOpen} />
          </button>

          {mobileMenuOpen ? (
            <div
              className="absolute inset-x-0 top-full z-50 border-b border-[var(--border-hairline)] bg-[rgba(9,9,11,0.95)] px-6 py-4 shadow-lg backdrop-blur-xl"
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
          ) : null}
        </div>
      </header>

      {/* Desktop — pill animation */}
      <motion.header
        className="fixed left-1/2 z-50 hidden -translate-x-1/2 border-b border-[var(--border-hairline)] bg-[rgba(9,9,11,0.72)] backdrop-blur-xl lg:block"
        style={{
          borderRadius,
          boxShadow,
          paddingBottom: paddingY,
          paddingTop: paddingY,
          top,
          width,
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
            href="/kapcsolatfelvetel"
          >
            Kapcsolatfelvétel
          </Link>
        </Container>
      </motion.header>
    </>
  );
}

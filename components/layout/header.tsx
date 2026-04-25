"use client";

import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#modszer", label: "Módszer" },
  { href: "#munkak", label: "Munkáim" },
  { href: "#cikkek", label: "Cikkek" },
  { href: "#rolam", label: "Rólam" },
];

const SCROLL_START = 0;
const SCROLL_END = 100;

function ZynaiCubeIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 28 28"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 2.5 24 8.25v11.5L14 25.5 4 19.75V8.25L14 2.5Z"
        stroke="var(--accent)"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
      <path
        d="M4.5 8.5 14 14m0 0 9.5-5.5M14 14v11"
        stroke="var(--accent)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
      <path
        d="m9 11.25 5-2.9 5 2.9v5.5l-5 2.9-5-2.9v-5.5Z"
        fill="var(--accent)"
        fillOpacity="0.16"
        stroke="var(--accent)"
        strokeLinejoin="round"
        strokeWidth="1"
      />
    </svg>
  );
}

export function Header({ className }: { className?: string }) {
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const smoothScrollY = useSpring(scrollY, {
    damping: 40,
    restDelta: 0.5,
    stiffness: 300,
  });
  const scrollProgress = shouldReduceMotion ? scrollY : smoothScrollY;

  const maxWidth = useTransform(scrollProgress, [SCROLL_START, SCROLL_END], [
    "100%",
    "760px",
  ]);
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
  const backgroundColor = useTransform(
    scrollProgress,
    [SCROLL_START, SCROLL_END],
    ["rgba(9, 9, 11, 0)", "rgba(9, 9, 11, 0.72)"],
  );
  const borderColor = useTransform(
    scrollProgress,
    [SCROLL_START, SCROLL_END],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.10)"],
  );
  const backdropBlur = useTransform(
    scrollProgress,
    [SCROLL_START, SCROLL_END],
    [0, 20],
  );
  const backdropFilter = useTransform(
    backdropBlur,
    (value) => `blur(${value}px)`,
  );
  const boxShadow = useTransform(
    scrollProgress,
    [SCROLL_START, SCROLL_END],
    ["0 0 0 rgba(0,0,0,0)", "0 8px 32px rgba(0,0,0,0.4)"],
  );

  return (
    <>
      <div aria-hidden="true" className="h-20" />
      <motion.header
        className={cn("fixed left-1/2 z-50 w-full -translate-x-1/2 px-6", className)}
        style={{
          backdropFilter,
          backgroundColor,
          border: "1px solid",
          borderColor,
          borderRadius,
          boxShadow,
          maxWidth,
          paddingBottom: paddingY,
          paddingTop: paddingY,
          top,
          WebkitBackdropFilter: backdropFilter,
        }}
      >
        <Container className="flex h-16 items-center justify-between">
          <Link className="flex items-center gap-2.5" href="/">
            <ZynaiCubeIcon className="h-7 w-7" />
            <span className="font-display text-[18px] font-semibold text-text-primary">
              ZynAI
            </span>
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-7 font-sans text-sm font-normal text-text-secondary md:flex">
            {navItems.map((item) => (
              <Link
                className="transition-colors duration-200 hover:text-text-primary"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 font-sans text-sm font-semibold text-accent-on-light transition-transform duration-200 hover:scale-[1.02]"
            href="#kapcsolat"
          >
            Időpontfoglalás
          </Link>
        </Container>
      </motion.header>
    </>
  );
}

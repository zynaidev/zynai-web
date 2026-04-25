"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#modszer", label: "Módszer" },
  { href: "#munkak", label: "Munkáim" },
  { href: "#cikkek", label: "Cikkek" },
  { href: "#rolam", label: "Rólam" },
];

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
  const width = useTransform(scrollY, [0, 80], [
    "100%",
    "min(960px, calc(100% - 48px))",
  ]);
  const borderRadius = useTransform(scrollY, [0, 80], [0, 9999]);
  const y = useTransform(scrollY, [0, 80], [0, 16]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-20",
        className,
      )}
    >
      <motion.div
        className="mx-auto border-b border-border-hairline bg-bg-base/80 backdrop-blur-xl"
        style={{ borderRadius, width, y }}
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
      </motion.div>
    </header>
  );
}

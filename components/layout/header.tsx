"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";

import { ZynaiCubeIcon } from "@/components/brand/ZynaiCubeIcon";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Articles" },
  { href: "/style-guide", label: "Style guide" },
];

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") {
        return () => {};
      }

      const media = window.matchMedia(query);
      media.addEventListener("change", onStoreChange);

      return () => media.removeEventListener("change", onStoreChange);
    },
    () => (typeof window === "undefined" ? false : window.matchMedia(query).matches),
    () => false,
  );
}

export function Header({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const settledScrollY = useSpring(scrollY, {
    damping: 30,
    stiffness: 200,
  });
  const animatedScrollY = prefersReducedMotion ? scrollY : settledScrollY;

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 80);
  });

  const maxWidth = useTransform(animatedScrollY, [0, 100], ["100%", "760px"]);
  const top = useTransform(animatedScrollY, [0, 100], [0, 14]);
  const paddingY = useTransform(animatedScrollY, [0, 100], [20, 10]);
  const backgroundColor = useTransform(
    animatedScrollY,
    [0, 100],
    ["rgba(9, 9, 11, 0)", "rgba(9, 9, 11, 0.72)"],
  );
  const borderRadius = useTransform(animatedScrollY, [0, 100], [0, 9999]);
  const mobileBorderRadius = useTransform(animatedScrollY, [0, 100], [0, 24]);
  const borderColor = useTransform(
    animatedScrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "var(--border-default)"],
  );
  const boxShadow = useTransform(
    animatedScrollY,
    [0, 100],
    ["0 0 0 rgba(0, 0, 0, 0)", "0 8px 32px rgba(0, 0, 0, 0.4)"],
  );

  const reducedStyle = {
    backgroundColor: isScrolled ? "rgba(9, 9, 11, 0.72)" : "rgba(9, 9, 11, 0)",
    borderColor: isScrolled ? "var(--border-default)" : "rgba(255, 255, 255, 0)",
    borderRadius: isScrolled ? (isMobile ? 24 : 9999) : 0,
    boxShadow: isScrolled ? "0 8px 32px rgba(0, 0, 0, 0.4)" : "0 0 0 rgba(0, 0, 0, 0)",
    maxWidth: isScrolled && !isMobile ? "760px" : "100%",
    paddingBottom: isScrolled ? 10 : 20,
    paddingTop: isScrolled ? 10 : 20,
    top: isScrolled && !isMobile ? 14 : 0,
  };

  return (
    <motion.header
      className={cn(
        "fixed left-1/2 z-50 w-full -translate-x-1/2 border px-6 backdrop-blur-xl",
        className,
      )}
      style={
        prefersReducedMotion
          ? reducedStyle
          : {
              backgroundColor,
              borderColor,
              borderRadius: isMobile ? mobileBorderRadius : borderRadius,
              boxShadow,
              maxWidth: isMobile ? "100%" : maxWidth,
              paddingBottom: paddingY,
              paddingTop: paddingY,
              top: isMobile ? 0 : top,
            }
      }
    >
      <div className="mx-auto flex w-full items-center justify-between">
        <Link className="group flex items-center gap-2.5" href="/">
          <ZynaiCubeIcon className="h-7 w-7" />
          <span className="font-display text-[18px] font-semibold tracking-tight text-text-primary">
            ZynAI
          </span>
        </Link>
        <nav className="flex items-center gap-5 font-mono text-xs font-medium uppercase tracking-[0.12em] text-text-tertiary">
          {navItems.map((item) => (
            <Link
              className="transition-colors hover:text-text-primary"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}

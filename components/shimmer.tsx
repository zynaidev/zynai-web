"use client";

import type { CSSProperties, ReactNode } from "react";

type ShimmerProps = {
  children: ReactNode;
  delayMs: number;
  className?: string;
};

/**
 * A fény a betűk belsejében fut, nem egy téglalapon a cím mögött.
 * Reduced motion és 768 px alatt a CSS szilárd kitöltést hagy, animáció nélkül.
 */
export function Shimmer({ children, delayMs, className }: ShimmerProps) {
  return (
    <span
      className={`hero-shimmer ${className ?? ""}`}
      style={
        { ["--hero-shimmer-delay" as string]: `${delayMs}ms` } as CSSProperties
      }
    >
      {children}
    </span>
  );
}

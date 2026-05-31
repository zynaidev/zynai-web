"use client";

import type { ReactNode } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  // Keep native browser scrolling to avoid scroll-container desync with
  // sticky sections and GSAP/Framer scroll observers.
  return children;
}

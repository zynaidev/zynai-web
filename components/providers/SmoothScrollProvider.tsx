"use client";

import Lenis from "lenis";
import type { ReactNode } from "react";
import { useEffect } from "react";

import { gsap, ScrollTrigger, respectReducedMotion } from "@/lib/gsap";

type SmoothScrollProviderProps = {
  children: ReactNode;
};

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    if (respectReducedMotion()) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  return children;
}

export default SmoothScrollProvider;

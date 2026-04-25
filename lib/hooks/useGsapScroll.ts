"use client";

import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";
import type { RefObject } from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";

type GsapScrollCallback = (
  context: gsap.Context,
  scrollTrigger: typeof ScrollTrigger,
) => void | (() => void);

type UseGsapScrollOptions = {
  dependencies?: unknown[];
  scope?: RefObject<Element | null> | Element | string;
  revertOnUpdate?: boolean;
};

export function useGsapScroll(
  callback: GsapScrollCallback,
  {
    dependencies = [],
    scope,
    revertOnUpdate = true,
  }: UseGsapScrollOptions = {},
) {
  const prefersReduced = useReducedMotion();

  return useGSAP(
    (context) => {
      if (prefersReduced) {
        return;
      }

      return callback(context, ScrollTrigger);
    },
    {
      dependencies: [prefersReduced, ...dependencies],
      revertOnUpdate,
      scope,
    },
  );
}

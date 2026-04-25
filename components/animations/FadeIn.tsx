"use client";

import type { HTMLMotionProps } from "framer-motion";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type FadeInProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
};

export function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  y = 20,
  once = true,
  ...props
}: FadeInProps) {
  const prefersReduced = useReducedMotion();
  const animProps: HTMLMotionProps<"div"> = prefersReduced
    ? {}
    : {
        initial: { opacity: 0, y },
        whileInView: { opacity: 1, y: 0 },
        transition: { delay, duration, ease: "easeOut" as const },
        viewport: { once, amount: 0.2 },
      };

  return (
    <motion.div {...props} {...animProps}>
      {children}
    </motion.div>
  );
}

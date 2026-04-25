"use client";

import type { HTMLMotionProps } from "framer-motion";
import { motion, useReducedMotion } from "framer-motion";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

type MaskedRevealProps = ComponentPropsWithoutRef<"span"> & {
  children: ReactNode;
  childClassName?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
};

export function MaskedReveal({
  children,
  childClassName,
  className,
  delay = 0,
  duration = 0.7,
  once = true,
  ...props
}: MaskedRevealProps) {
  const prefersReduced = useReducedMotion();
  const animProps: HTMLMotionProps<"span"> = prefersReduced
    ? {}
    : {
        initial: { y: "100%" },
        whileInView: { y: "0%" },
        transition: { delay, duration, ease: [0.22, 1, 0.36, 1] as const },
        viewport: { once, amount: 0.5 },
      };

  return (
    <span className={cn("block overflow-hidden", className)} {...props}>
      <motion.span className={cn("block", childClassName)} {...animProps}>
        {children}
      </motion.span>
    </span>
  );
}

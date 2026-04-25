"use client";

import { animate, useInView, useMotionValue, useReducedMotion } from "framer-motion";
import type { ComponentPropsWithoutRef } from "react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type CountUpProps = ComponentPropsWithoutRef<"span"> & {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  decimals?: number;
};

function formatValue(value: number, decimals?: number) {
  if (typeof decimals === "number") {
    return value.toFixed(decimals);
  }

  return Math.round(value).toString();
}

export function CountUp({
  from = 0,
  to,
  duration = 2,
  suffix = "",
  decimals,
  className,
  ...props
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { amount: 0.4, once: true });
  const value = useMotionValue(from);
  const prefersReduced = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(() =>
    formatValue(prefersReduced ? to : from, decimals),
  );

  useEffect(() => {
    if (!isInView) {
      return;
    }

    if (prefersReduced) {
      return;
    }

    value.set(from);
    const unsubscribe = value.on("change", (latest) => {
      setDisplayValue(formatValue(latest, decimals));
    });
    const controls = animate(value, to, {
      duration,
      ease: "easeOut",
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [decimals, duration, from, isInView, prefersReduced, to, value]);

  const renderedValue = prefersReduced ? formatValue(to, decimals) : displayValue;

  return (
    <span className={cn("font-mono tabular-nums", className)} ref={ref} {...props}>
      {renderedValue}
      {suffix}
    </span>
  );
}

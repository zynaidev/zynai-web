"use client";

import { useEffect, useRef, useState } from "react";

import { useReducedMotion } from "framer-motion";

type CountUpProps = {
  from: number;
  to: number;
  suffix?: string;
  duration?: number;
};

export function CountUp({ from, to, suffix = "", duration = 1.5 }: CountUpProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<number | null>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const [value, setValue] = useState(from);
  const displayedValue = `${Math.round(shouldReduceMotion ? to : value)}`;
  const normalizedSuffix = suffix.startsWith(" ")
    ? `\u00A0${suffix.slice(1)}`
    : suffix;

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    const element = elementRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [shouldReduceMotion, to]);

  useEffect(() => {
    if (!hasEntered || shouldReduceMotion) {
      return;
    }

    const startTime = performance.now();
    const durationMs = duration * 1000;
    const difference = to - from;

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / durationMs, 1);
      const easedProgress = 1 - (1 - progress) ** 3;

      setValue(from + difference * easedProgress);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [duration, from, hasEntered, shouldReduceMotion, to]);

  return (
    <span ref={elementRef} style={{ whiteSpace: "nowrap" }}>
      {displayedValue + normalizedSuffix}
    </span>
  );
}

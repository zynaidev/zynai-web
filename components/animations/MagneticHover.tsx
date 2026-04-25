"use client";

import type { HTMLMotionProps } from "framer-motion";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import type { MouseEvent, ReactNode } from "react";

import { cn } from "@/lib/utils";

type MagneticHoverProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  maxTranslate?: number;
};

export function MagneticHover({
  children,
  className,
  maxTranslate = 8,
  style,
  ...props
}: MagneticHoverProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });
  const prefersReduced = useReducedMotion();

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const relativeX = event.clientX - rect.left - rect.width / 2;
    const relativeY = event.clientY - rect.top - rect.height / 2;

    x.set(Math.max(-maxTranslate, Math.min(maxTranslate, relativeX * 0.12)));
    y.set(Math.max(-maxTranslate, Math.min(maxTranslate, relativeY * 0.12)));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const animProps = prefersReduced
    ? {}
    : {
        onMouseLeave: handleMouseLeave,
        onMouseMove: handleMouseMove,
      };
  const magneticStyle = prefersReduced ? style : { ...style, x: springX, y: springY };

  return (
    <motion.div
      {...props}
      {...animProps}
      className={cn("inline-block", className)}
      style={magneticStyle}
    >
      {children}
    </motion.div>
  );
}

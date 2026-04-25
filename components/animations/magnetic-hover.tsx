"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { MouseEvent, ReactNode } from "react";

export function MagneticHover({ children }: { children: ReactNode }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    setOffset({ x: x * 0.18, y: y * 0.18 });
  }

  return (
    <motion.div
      animate={offset}
      className="inline-flex w-full sm:w-auto"
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      onMouseMove={handleMouseMove}
      transition={{ damping: 18, stiffness: 180, type: "spring" }}
    >
      {children}
    </motion.div>
  );
}

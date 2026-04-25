"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useEffect, useSyncExternalStore } from "react";

function usePointerFine() {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") {
        return () => {};
      }

      const media = window.matchMedia("(pointer: fine)");
      media.addEventListener("change", onStoreChange);

      return () => media.removeEventListener("change", onStoreChange);
    },
    () => (typeof window === "undefined" ? false : window.matchMedia("(pointer: fine)").matches),
    () => false,
  );
}

export function HeroBackground() {
  const prefersReducedMotion = useReducedMotion();
  const isFinePointer = usePointerFine();
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const glowX = useSpring(mouseX, { damping: 35, stiffness: 120 });
  const glowY = useSpring(mouseY, { damping: 35, stiffness: 120 });
  const shouldAnimate = !prefersReducedMotion;

  useEffect(() => {
    if (!isFinePointer || prefersReducedMotion) {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isFinePointer, mouseX, mouseY, prefersReducedMotion]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-bg-base">
      <div
        className="absolute inset-0 z-0 opacity-100"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(circle at center, black 0%, black 60%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 0%, black 60%, transparent 100%)",
        }}
      />

      <div className="absolute inset-0 z-[1]">
        <motion.div
          animate={shouldAnimate ? { x: [0, 70, 18, 0], y: [0, 28, 86, 0] } : undefined}
          className="absolute -right-64 top-[-18%] h-[700px] w-[700px] rounded-full bg-[rgba(189,255,0,0.13)] blur-[140px]"
          transition={{ duration: 22, ease: "easeInOut", repeat: Infinity }}
        />
        <motion.div
          animate={shouldAnimate ? { x: [0, 80, 28, 0], y: [0, -40, 54, 0] } : undefined}
          className="absolute -bottom-72 -left-64 h-[700px] w-[700px] rounded-full bg-[#3b1d70]/[0.09] blur-[140px]"
          transition={{ duration: 25, ease: "easeInOut", repeat: Infinity }}
        />
        <motion.div
          animate={shouldAnimate ? { x: [0, -48, 52, 0], y: [0, 64, -20, 0] } : undefined}
          className="absolute left-1/2 top-1/3 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-[rgba(45,212,191,0.06)] blur-[140px]"
          transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
        />
      </div>

      {isFinePointer && !prefersReducedMotion ? (
        <motion.div
          className="absolute z-[2] h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(189,255,0,0.06),transparent_68%)] blur-[80px]"
          style={{ left: glowX, top: glowY }}
        />
      ) : null}

      <div
        className="absolute inset-0 z-[3] opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.6'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}

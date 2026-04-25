"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import type { ReactNode } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function ScrollTriggerFade({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!scope.current) {
        return;
      }

      gsap.fromTo(
        scope.current,
        { autoAlpha: 0, y: 32 },
        {
          autoAlpha: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            start: "top 80%",
            trigger: scope.current,
          },
          y: 0,
        },
      );
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}

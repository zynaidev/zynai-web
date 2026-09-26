"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

const STATS: Stat[] = [
  { value: 6, suffix: " hét", label: "intenzív, mentorált munka" },
  { value: 12, suffix: "+1", label: "élő webinár, plusz a belépő" },
  { value: 4, prefix: "max. ", label: "fős kör — valódi figyelem" },
  { value: 30, prefix: "+", suffix: " nap", label: "utánkövetés a zárás után" },
];

function useCountUp(target: number, active: boolean, duration = 1100) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);

  return value;
}

function StatCell({ stat, active }: { stat: Stat; active: boolean }) {
  const count = useCountUp(stat.value, active);

  return (
    <div className="flex flex-col items-center px-5 py-8 text-center sm:px-8 sm:py-10">
      <div
        className="font-display font-medium tabular-nums text-[var(--text-primary)]"
        style={{ fontSize: "clamp(32px, 4.5vw, 48px)", letterSpacing: "-0.02em" }}
      >
        {stat.prefix}
        <span className="text-[#BDFF00]">{count}</span>
        {stat.suffix}
      </div>
      <p className="mt-3 max-w-[18rem] text-[14px] leading-[1.5] text-[var(--text-tertiary)] sm:text-[15px]">
        {stat.label}
      </p>
    </div>
  );
}

export function HeroStats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto mt-16 grid w-full grid-cols-2 divide-x divide-y divide-[rgba(255,255,255,0.06)] overflow-hidden rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] sm:grid-cols-4 sm:divide-y-0"
    >
      {STATS.map((stat) => (
        <StatCell key={stat.label} stat={stat} active={inView} />
      ))}
    </motion.div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function PilotStickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const form = document.getElementById("jelentkezes");

    const onScroll = () => {
      const pastHero = window.scrollY > 720;
      let formInView = false;
      if (form) {
        const rect = form.getBoundingClientRect();
        formInView = rect.top < window.innerHeight && rect.bottom > 0;
      }
      const nearBottom =
        window.innerHeight + window.scrollY >
        document.body.offsetHeight - 400;
      setVisible(pastHero && !formInView && !nearBottom);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 sm:px-4 sm:pb-4"
        >
          <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(13,13,16,0.85)] px-4 py-3 shadow-[0_8px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:px-5">
            <div className="min-w-0">
              <p className="truncate font-display text-[14px] font-medium text-[var(--text-primary)] sm:text-[15px]">
                VibeCoding 1.0 – Pilot
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
                <span className="sm:hidden">br. 49 000 Ft</span>
                <span className="hidden sm:inline">br. 49 000 Ft · max. 4 hely</span>
              </p>
            </div>
            <a
              href="#jelentkezes"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-[#BDFF00] px-5 py-2.5 text-[14px] font-medium text-[#09090B] transition-transform duration-200 hover:scale-[1.03]"
              style={{ boxShadow: "0 0 28px rgba(189,255,0,0.35)" }}
            >
              Jelentkezem
              <ArrowRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

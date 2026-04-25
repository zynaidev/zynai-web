"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";

import { MagneticHover } from "@/components/animations/magnetic-hover";
import { BackgroundGlow } from "@/components/ui/background-glow";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const headline =
  "A vállalkozások hatékonyabbak, ha az AI a folyamataik része — nem egy különálló eszköz.";

const words = headline.split(" ");

function scrollToAnchor(
  event: MouseEvent<HTMLButtonElement>,
  href: string,
) {
  event.preventDefault();
  const target = document.querySelector(href);

  target?.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.pushState(null, "", href);
}

export function Hero() {
  const [showScrollCue, setShowScrollCue] = useState(true);

  useEffect(() => {
    const handleScroll = () => setShowScrollCue(window.scrollY <= 100);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative isolate min-h-screen overflow-hidden">
      <BackgroundGlow className="opacity-100" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-16%] top-[7%] -z-10 h-[600px] w-[600px] rounded-full bg-[rgba(189,255,0,0.3)] blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-22%] left-[-14%] -z-10 h-[640px] w-[640px] rounded-full bg-[#4f46e5]/15 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.85) 1px, transparent 0)",
          backgroundSize: "18px 18px",
        }}
      />

      <Container className="flex min-h-screen flex-col pt-[25vh]">
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="type-label"
          initial={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          AI INTEGRÁCIÓ · ÜZLETI TANÁCSADÁS
        </motion.p>

        <motion.h1
          aria-label={headline}
          className="type-hero mt-5 max-w-full text-balance md:max-w-[16ch]"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.04,
              },
            },
          }}
        >
          {words.map((word, index) => (
            <motion.span
              aria-hidden="true"
              className="inline-block"
              key={`${word}-${index}`}
              variants={{
                hidden: { opacity: 0, y: 22 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            >
              {word}
              {index < words.length - 1 ? "\u00A0" : null}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 max-w-[56ch] font-sans text-base leading-[1.7] text-text-secondary sm:text-lg"
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Hanics Attila vagyok — üzleti folyamatokat vizsgálok meg és alakítok át
          AI integrációval. Ez az oldal bemutatja a módszertanomat, a
          megvalósított projektjeimet és azt, amit ma az AI-ról tényszerűen
          érdemes tudni.
        </motion.p>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
          initial={{ opacity: 0, y: 18 }}
          transition={{ delay: 0.52, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <MagneticHover>
            <Button
              className="w-full sm:w-auto"
              onClick={(event) => scrollToAnchor(event, "#munkak")}
              variant="primary"
            >
              Esettanulmányok
            </Button>
          </MagneticHover>
          <MagneticHover>
            <Button
              className="w-full sm:w-auto"
              onClick={(event) => scrollToAnchor(event, "#cikkek")}
              variant="secondary"
            >
              Szakmai cikkek
            </Button>
          </MagneticHover>
        </motion.div>
      </Container>

      <Container className="pointer-events-none absolute inset-x-0 bottom-12">
        <motion.div
          animate={{
            opacity: showScrollCue ? 1 : 0,
            y: showScrollCue ? [0, -4, 0] : 0,
          }}
          className="inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-text-tertiary"
          transition={{
            opacity: { duration: 0.2 },
            y: { duration: 1.5, ease: "easeInOut", repeat: Infinity },
          }}
        >
          <span>GÖRDÍTS</span>
          <ChevronDown aria-hidden="true" size={14} />
        </motion.div>
      </Container>
    </section>
  );
}

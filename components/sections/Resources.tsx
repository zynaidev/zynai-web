"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { useRef, useState } from "react";

import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

type ResourceCard = {
  id: string;
  badge: string;
  title: string;
  description: string;
  readingTime: string;
  resultHook?: string;
};

const cards: ResourceCard[] = [
  {
    id: "aedificium",
    badge: "ESETTANULMÁNY",
    title: "Aedificium Design — 10× elérés AI-vezérelt social mediával",
    description:
      "Napi AI posztjavaslat rendszer és prémium weboldal két hét alatt egy budapesti építész tervezőirodánál.",
    readingTime: "8 PERC OLVASÁS",
    resultHook: "10× ELÉRÉS · 2 HÉT",
  },
  {
    id: "self-hosted-vs-cloud",
    badge: "ÖSSZEHASONLÍTÁS",
    title: "Self-hosted vs. cloud LLM: melyiket válassza egy magyar KKV?",
    description:
      "Adatvédelmi, költséghatékonysági és üzemeltetési szempontok a két megközelítés között.",
    readingTime: "12 PERC OLVASÁS",
  },
  {
    id: "n8n-alapok",
    badge: "CIKK",
    title: "n8n alapok: az első automatizációd 30 perc alatt",
    description:
      "Lépésről lépésre útmutató a no-code automatizáció első workflow-jának létrehozásához.",
    readingTime: "6 PERC OLVASÁS",
  },
  {
    id: "ai-agens-vs-chatbot",
    badge: "CIKK",
    title: "Mi az AI ágens, és miben különbözik a chatbottól?",
    description:
      "A fogalmak tisztázása és gyakorlati példák a magyar vállalkozói környezetből.",
    readingTime: "7 PERC OLVASÁS",
  },
  {
    id: "validacio",
    badge: "CIKK",
    title: "Hogyan validáljuk, hogy egy folyamat valóban automatizálható?",
    description:
      "Döntési keret, amellyel a KKV vezetők eldönthetik, mibe érdemes AI-t bevezetni — és mibe nem.",
    readingTime: "9 PERC OLVASÁS",
  },
  {
    id: "claude-vs-gpt-vs-helyi",
    badge: "ÖSSZEHASONLÍTÁS",
    title: "Claude vs. GPT-4 vs. helyi modellek: üzleti automatizációhoz",
    description:
      "Pontosság, sebesség, költség és adatkezelés szempontjából a három fő opció elemzése.",
    readingTime: "10 PERC OLVASÁS",
  },
];

function ResourceCardArticle({ card }: { card: ResourceCard }) {
  return (
    <article className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-glass)] backdrop-blur-md transition-all duration-300 hover:border-[var(--border-default)] hover:bg-[var(--bg-glass-strong)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--bg-elevated)]">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
          }}
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        <div className="absolute left-4 top-4">
          <span className="rounded-full border border-[var(--border-hairline)] bg-[rgba(0,0,0,0.5)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--text-secondary)] backdrop-blur-md">
            {card.badge}
          </span>
        </div>

        {card.resultHook ? (
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--text-secondary)]">
              {card.resultHook}
            </span>
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="line-clamp-2 text-[18px] font-medium leading-[1.3] tracking-[-0.01em] text-[var(--text-primary)] lg:text-[20px]">
          {card.title}
        </h3>

        <p className="mt-3 line-clamp-2 text-[14px] leading-[1.6] text-[var(--text-secondary)]">
          {card.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
            {card.readingTime}
          </span>
          <ArrowUpRight
            className="text-[var(--text-tertiary)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
            size={16}
          />
        </div>
      </div>
    </article>
  );
}

export function Resources() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  const cardVariants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { duration: 0.6, ease: "easeOut" as const, delay },
    }),
  };

  function MagneticCard({
    children,
    delay,
  }: {
    children: ReactNode;
    delay: number;
  }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
      if (shouldReduceMotion) return;
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const x = (deltaX / rect.width) * 8;
      const y = (deltaY / rect.height) * 8;

      setTransform({ x, y });
    };

    const handleMouseLeave = () => {
      setTransform({ x: 0, y: 0 });
    };

    return (
      <motion.div
        animate={{
          x: transform.x,
          y: transform.y,
        }}
        className="h-full"
        custom={delay}
        initial="hidden"
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        ref={cardRef}
        transition={{
          x: { type: "spring", stiffness: 200, damping: 20 },
          y: { type: "spring", stiffness: 200, damping: 20 },
        }}
        variants={cardVariants}
        viewport={{ once: true, amount: 0.15 }}
        whileInView="visible"
      >
        {children}
      </motion.div>
    );
  }

  return (
    <section className="relative py-20 md:py-32" id="munkak">
      <span aria-hidden="true" className="absolute top-0" id="cikkek" />
      <Container>
        <SectionLabel number="05" text="ESETTANULMÁNYOK ÉS CIKKEK" />

        <h2
          className="mt-6 font-display font-medium leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] lg:max-w-[22ch]"
          style={{ fontSize: "clamp(32px, 4.5vw, 48px)" }}
        >
          Dokumentált projektek és szakmai anyagok.
        </h2>

        <p className="mt-6 max-w-[60ch] font-sans text-[16px] leading-[1.65] text-[var(--text-secondary)] lg:text-[18px]">
          Megvalósított rendszerek leírása, technológiai összehasonlítások és
          alkalmazási útmutatók — magyar vállalkozói kontextusban.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {cards.map((card, index) => (
            <MagneticCard delay={index * 0.08} key={card.id}>
              <ResourceCardArticle card={card} />
            </MagneticCard>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <a
            className="group flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.12em] text-[var(--text-secondary)] transition-colors duration-300 hover:text-[var(--text-primary)]"
            href="/cikkek"
          >
            Összes anyag megtekintése
            <ArrowRight
              className="transition-transform duration-300 group-hover:translate-x-1"
              size={14}
            />
          </a>
        </div>
      </Container>
    </section>
  );
}

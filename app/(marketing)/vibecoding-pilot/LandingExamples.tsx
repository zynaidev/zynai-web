"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const EXAMPLES = [
  {
    src: "/vibecoding/previews/architect.jpg",
    alt: "Építészstúdió bemutatkozó előlapja, teljes képernyős fotóval",
    label: "Építészstúdió",
    href: "https://v0.app/templates/YqU0WZeWjDF",
  },
  {
    src: "/vibecoding/previews/spaces.jpg",
    alt: "Tervezőstúdió előlapja, nagy címmel egy enteriőr felett",
    label: "Tervezőstúdió",
    href: "https://v0.app/templates/8o7jKw7qwlb",
  },
  {
    src: "/vibecoding/previews/studio.png",
    alt: "Designstúdió előlapja, szerkesztett tipográfiával és két gombbal",
    label: "Designstúdió",
    href: "https://v0.app/templates/LF91wBKXRSP",
  },
  {
    src: "/vibecoding/previews/agency.png",
    alt: "Ügynökségi előlap sötét háttérrel és két hívásgombbal",
    label: "Ügynökség",
    href: "https://v0.app/templates/cbQ1carSbPX",
  },
  {
    src: "/vibecoding/previews/club.png",
    alt: "Közösségi bemutatkozó oldal, teljes szélességű fotóval",
    label: "Közösség",
    href: "https://v0.app/templates/maaLWRPC8Cr",
  },
  {
    src: "/vibecoding/previews/photo.jpeg",
    alt: "Fotós portfólió három képpel",
    label: "Fotós portfólió",
    href: "https://v0.app/templates/P7AfLIeCuyn",
  },
  {
    src: "/vibecoding/previews/bistro.jpg",
    alt: "Étterem előlapja nagy címmel és ételfotóval",
    label: "Étterem",
    href: "https://v0.app/templates/SOOe8vhCgV0",
  },
  {
    src: "/vibecoding/previews/designer.jpg",
    alt: "Kreatív portfólió előlapja, címmel és három statisztikával",
    label: "Kreatív portfólió",
    href: "https://v0.app/templates/Hn7ixWukaVB",
  },
  {
    src: "/vibecoding/previews/fitness.jpeg",
    alt: "Fitneszstúdió előlapja edzésfotóval és szolgáltatásokkal",
    label: "Fitneszstúdió",
    href: "https://v0.app/templates/Zy7gYHBgrYn",
  },
  {
    src: "/vibecoding/previews/glass.jpg",
    alt: "Digitális stúdió sötét előlapja lila címmel",
    label: "Digitális stúdió",
    href: "https://v0.app/templates/giqITkce06I",
  },
  {
    src: "/vibecoding/previews/bakery.jpg",
    alt: "Pékség előlapja péksütemények feletti címmel",
    label: "Pékség",
    href: "https://v0.app/templates/uKrcvCYA32C",
  },
  {
    src: "/vibecoding/previews/animation.png",
    alt: "Animációs stúdió sötét előlapja telefonos munkákkal",
    label: "Animációs stúdió",
    href: "https://v0.app/templates/ezmvVsZJxz8",
  },
] as const;

const DEFAULT_EYEBROW = "Ilyen oldalakat építhetsz";
const DEFAULT_DESCRIPTION =
  "Bemutatkozó- és szolgáltatói oldalak, ezen a szinten: kattints a példákra. Ha van saját ötleted vagy vállalkozásod, azt viszed végig, ha nincs, vállalkozástípust választasz egy listából. A tiéd a saját briefedből készül, nem ezek másolata. A példák v0 sablonok.";

export function LandingExamples({
  eyebrow = DEFAULT_EYEBROW,
  description = DEFAULT_DESCRIPTION,
}: {
  eyebrow?: string;
  description?: string;
} = {}) {
  const scroller = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  const step = (direction: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const delta = (card?.offsetWidth ?? el.clientWidth * 0.8) + 16;
    const max = el.scrollWidth - el.clientWidth - 8;
    if (direction === 1 && el.scrollLeft >= max) {
      el.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }
    el.scrollBy({ left: direction * delta, behavior: "smooth" });
  };

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => {
      if (!paused) step(1);
    }, 4500);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <div
      className="mx-auto mt-16 max-w-5xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-[#BDFF00]">
            {eyebrow}
          </p>
          <p className="mt-3 max-w-2xl text-[16px] leading-[1.7] text-[var(--text-secondary)]">
            {description}
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            aria-label="Előző előlap"
            className="flex size-10 items-center justify-center rounded-full border border-[var(--border-hairline)] text-[var(--text-primary)] transition-colors hover:border-[rgba(189,255,0,0.4)]"
            onClick={() => step(-1)}
          >
            <ChevronLeft aria-hidden size={18} />
          </button>
          <button
            type="button"
            aria-label="Következő előlap"
            className="flex size-10 items-center justify-center rounded-full border border-[var(--border-hairline)] text-[var(--text-primary)] transition-colors hover:border-[rgba(189,255,0,0.4)]"
            onClick={() => step(1)}
          >
            <ChevronRight aria-hidden size={18} />
          </button>
        </div>
      </div>

      <div className="relative mt-8">
        <div
          ref={scroller}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Példa előlapok"
          role="region"
        >
          {EXAMPLES.map((item) => (
            <figure
              className="w-[min(82vw,460px)] shrink-0 snap-start"
              data-card
              key={item.src}
            >
              <figcaption className="mb-3 flex items-baseline justify-between gap-3">
                <span className="font-display text-[16px] font-medium text-[var(--text-primary)]">
                  {item.label}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
                  v0 sablon
                </span>
              </figcaption>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${item.label} sablon megnyitása`}
                className="block overflow-hidden rounded-2xl border border-[var(--border-hairline)] bg-[#101012] shadow-[0_20px_50px_rgba(0,0,0,0.35)] outline-none transition-colors hover:border-[rgba(189,255,0,0.45)] focus-visible:border-[#BDFF00]"
              >
                <div className="flex items-center gap-2 border-b border-[rgba(255,255,255,0.06)] px-3 py-2.5">
                  <span aria-hidden className="size-2 rounded-full bg-[rgba(255,255,255,0.18)]" />
                  <span aria-hidden className="size-2 rounded-full bg-[rgba(255,255,255,0.18)]" />
                  <span aria-hidden className="size-2 rounded-full bg-[rgba(255,255,255,0.18)]" />
                  <span className="ml-2 truncate font-mono text-[10px] text-[var(--text-tertiary)]">
                    {item.label.toLowerCase().replaceAll(" ", "")}.hu
                  </span>
                </div>
                <div className="relative aspect-[16/10]">
                  <Image
                    alt={item.alt}
                    className="object-cover object-top"
                    fill
                    sizes="460px"
                    src={item.src}
                  />
                </div>
              </a>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}

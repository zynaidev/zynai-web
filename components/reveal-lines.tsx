"use client";

import {
  Children,
  type CSSProperties,
  type ReactNode,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";

import {
  REVEAL_LINE_MS,
  REVEAL_LINE_STAGGER_MS,
} from "@/components/reveal-lines-timing";

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const STEM = "0.22em";
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReduced(onChange: () => void): () => void {
  const media = window.matchMedia(REDUCED_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function subscribeNever(): () => void {
  return () => {};
}

// SSR-en és hidratáláskor a szerver-érték él (nincs animáció, reduced),
// utána a kliens-érték, ugyanabban a renderben.
function useCanAnimate(): boolean {
  return useSyncExternalStore(subscribeNever, () => true, () => false);
}

function useReducedMotionNow(): boolean {
  return useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => true,
  );
}

type RevealTag = "div" | "h1" | "h2" | "h3" | "p";

type RevealLinesProps = {
  children: ReactNode;
  delay?: number;
  stagger?: number;
  as?: RevealTag;
  className?: string;
  style?: CSSProperties;
};

export function RevealLines({
  children,
  delay = 0,
  stagger = REVEAL_LINE_STAGGER_MS,
  as = "div",
  className,
  style,
}: RevealLinesProps) {
  const Tag = as;
  const LineTag: "span" | "div" =
    Tag === "h1" || Tag === "h2" || Tag === "h3" ? "span" : "div";
  const reduced = useReducedMotionNow();
  const canAnimate = useCanAnimate();
  const [entered, setEntered] = useState(false);

  // Reduced módban is beáll az entered, hogy egy későbbi beállításváltás
  // ne játssza le újra a belépést. Ilyenkor a shown már a reduced miatt igaz.
  useEffect(() => {
    if (!canAnimate) return;
    const id = window.requestAnimationFrame(() => setEntered(true));
    return () => window.cancelAnimationFrame(id);
  }, [canAnimate]);

  const shown = reduced || !canAnimate || entered;
  const moving = canAnimate && !reduced && entered;

  // SSR-en canAnimate false, a cím opacity 1 / translateY(0).
  // Így JS nélkül és az LCP-méréskor is olvasható.

  return (
    <Tag className={className} style={style}>
      {Children.map(children, (child, index) => {
        if (child == null || child === false) return child;
        const wait = delay + index * stagger;
        return (
          <LineTag
            className="block overflow-hidden"
            style={{ paddingBottom: STEM }}
          >
            <LineTag
              className="reveal-line__inner block"
              style={{
                marginBottom: `-${STEM}`,
                paddingBottom: STEM,
                opacity: shown ? 1 : 0,
                transform: shown ? "translateY(0)" : "translateY(110%)",
                transition: moving
                  ? `transform ${REVEAL_LINE_MS}ms ${EASE} ${wait}ms, opacity ${REVEAL_LINE_MS}ms ${EASE} ${wait}ms`
                  : "none",
              }}
            >
              {child}
            </LineTag>
          </LineTag>
        );
      })}
    </Tag>
  );
}

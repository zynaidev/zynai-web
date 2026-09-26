"use client";

import {
  Children,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
  useEffect,
  useState,
} from "react";

import { useReducedMotion } from "@/components/hooks/use-reduced-motion";
import {
  REVEAL_LINE_MS,
  REVEAL_LINE_STAGGER_MS,
} from "@/components/reveal-lines-timing";

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const STEM = "0.22em";

type RevealLinesProps<T extends ElementType = "div"> = {
  children: ReactNode;
  delay?: number;
  stagger?: number;
  as?: T;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children">;

export function RevealLines<T extends ElementType = "div">({
  children,
  delay = 0,
  stagger = REVEAL_LINE_STAGGER_MS,
  as,
  className,
  ...rest
}: RevealLinesProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  const LineTag =
    Tag === "h1" || Tag === "h2" || Tag === "h3" || Tag === "h4" ? "span" : "div";
  const reduced = useReducedMotion();
  const [canAnimate, setCanAnimate] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    setCanAnimate(true);
  }, []);

  useEffect(() => {
    if (!canAnimate) return;
    if (reduced) {
      setEntered(true);
      return;
    }
    const id = window.requestAnimationFrame(() => setEntered(true));
    return () => window.cancelAnimationFrame(id);
  }, [canAnimate, reduced]);

  const shown = reduced || !canAnimate || entered;
  const moving = canAnimate && !reduced && entered;

  // SSR-en canAnimate false, a cím opacity 1 / translateY(0).
  // Így JS nélkül és az LCP-méréskor is olvasható.

  return (
    <Tag className={className} {...rest}>
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

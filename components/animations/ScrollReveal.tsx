"use client";

import type { HTMLMotionProps, Variants } from "framer-motion";
import { motion, useReducedMotion } from "framer-motion";

type ScrollRevealProps = Omit<HTMLMotionProps<"span">, "children"> & {
  text: string;
  once?: boolean;
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export function ScrollReveal({ text, once = true, ...props }: ScrollRevealProps) {
  const prefersReduced = useReducedMotion();
  const animProps: HTMLMotionProps<"span"> = prefersReduced
    ? {}
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once, amount: 0.35 },
        variants: containerVariants,
      };

  if (prefersReduced) {
    return <motion.span {...props}>{text}</motion.span>;
  }

  return (
    <motion.span {...props} {...animProps} aria-label={text}>
      {text.split(" ").map((word, index, words) => (
        <motion.span
          aria-hidden="true"
          className="inline-block"
          key={`${word}-${index}`}
          variants={wordVariants}
        >
          {word}
          {index < words.length - 1 ? "\u00a0" : null}
        </motion.span>
      ))}
    </motion.span>
  );
}

export const REVEAL_LINE_MS = 700;
export const REVEAL_LINE_STAGGER_MS = 80;
export const REVEAL_UNDERLINE_MS = 520;
export const HERO_SHIMMER_GAP_MS = 400;

/** A sor belépésének vége: delay + index * stagger + 700 ms. */
export function revealLineFinishMs(
  lineIndex: number,
  delay = 0,
  stagger = REVEAL_LINE_STAGGER_MS,
) {
  return delay + lineIndex * stagger + REVEAL_LINE_MS;
}

/** Az aláhúzás kirajzolásának vége. */
export function underlineFinishMs(
  lineIndex = 1,
  delay = 0,
  stagger = REVEAL_LINE_STAGGER_MS,
) {
  return revealLineFinishMs(lineIndex, delay, stagger) + REVEAL_UNDERLINE_MS;
}

/**
 * A hero fénycsík első futása: aláhúzás vége + 400 ms szünet.
 * Így a vonal és a csík nem takarja egymást.
 */
export function heroShimmerStartMs(
  lastLineIndex = 1,
  delay = 0,
  stagger = REVEAL_LINE_STAGGER_MS,
) {
  return underlineFinishMs(lastLineIndex, delay, stagger) + HERO_SHIMMER_GAP_MS;
}


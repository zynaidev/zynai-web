"use client";

import { heroLayers } from "@/components/hero-layers";

/**
 * Egy lágy fényfolt és filmszemcse a hero hátterén.
 * A HeroAurorával kizárja egymást: vagy ez a háttér, vagy az
 * aurora, a kettő együtt nem. Az aurora fájl megmarad.
 *
 * Csak a transform mozog. A blur és a gradiens minden képkockán
 * újrarajzolást kényszerítene; a translate3d a már elmosott
 * foltot csúsztatja a kompozitoron.
 */

const STILUS = `
.hero-grain__anchor {
  position: absolute;
  top: 0;
  left: 0;
  width: 90%;
  height: 80%;
  transform: translate3d(-25%, -25%, 0);
  pointer-events: none;
}
.hero-grain__spot {
  width: 100%;
  height: 100%;
  border-radius: 9999px;
  background: radial-gradient(
    ellipse at center,
    color-mix(in srgb, var(--hero-accent) 20%, transparent) 0%,
    transparent 72%
  );
  filter: blur(110px);
  mix-blend-mode: screen;
  transform: translate3d(0, 0, 0) scale(1);
  animation: hero-grain-drift 26s ease-in-out infinite alternate;
  will-change: transform;
}
@keyframes hero-grain-drift {
  from { transform: translate3d(-6%, -6%, 0) scale(1); }
  to { transform: translate3d(6%, 6%, 0) scale(1.18); }
}
.hero-grain__cyan {
  position: absolute;
  right: -4%;
  bottom: -6%;
  width: 42%;
  height: 34%;
  border-radius: 9999px;
  opacity: 0.1;
  filter: blur(90px);
  mix-blend-mode: screen;
  pointer-events: none;
  background: radial-gradient(
    ellipse at center,
    var(--hero-cyan) 0%,
    transparent 70%
  );
}
.hero-grain__noise {
  position: absolute;
  inset: 0;
  opacity: var(--hero-grain-opacity);
  mix-blend-mode: overlay;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
.hero-grain__vignette {
  background: radial-gradient(
    ellipse 78% 68% at 50% 42%,
    transparent 0%,
    transparent 48%,
    color-mix(in srgb, var(--hero-bg) 35%, transparent) 78%,
    color-mix(in srgb, var(--hero-bg) 55%, transparent) 100%
  );
}
@media (max-width: 767px) {
  .hero-grain__spot { filter: blur(70px); }
  .hero-grain__cyan { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hero-grain__spot { animation: none; }
}
`;

export function HeroGrain() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ zIndex: heroLayers.background }}
      >
        <style>{STILUS}</style>
        <div className="hero-grain__anchor">
          <div className="hero-grain__spot" />
        </div>
        <div className="hero-grain__cyan" />
        <div className="hero-grain__noise" />
      </div>
      <div
        aria-hidden="true"
        className="hero-grain__vignette pointer-events-none absolute inset-0"
        style={{ zIndex: heroLayers.vignette }}
      />
    </>
  );
}

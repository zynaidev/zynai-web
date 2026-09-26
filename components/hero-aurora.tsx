"use client";

/**
 * Lassú fényfátyol a pontrács alatt. Csak CSS: nincs vászon,
 * nincs keretenként futó JavaScript. A méret és a blur a
 * stíluslapon dől el, a 768 px alatti nézet is.
 *
 * A HeroGrainnel kizárja egymást: a hero hátterén vagy ez
 * legyen, vagy a HeroGrain, a kettő együtt nem.
 *
 * A petrol, az indigó és a cián nincs a tokenkészletben.
 * A vignetta a --bg-base tokent használja. A lime folt
 * szándékosan a lágyabb rgb(190, 242, 100), nem a --accent
 * (#bdff00): az élénkebb token elnyomná a rács akcentusát.
 */

const STILUS = `
.hero-aurora__band {
  position: absolute;
  width: 140%;
  height: 55%;
  border-radius: 9999px;
  mix-blend-mode: screen;
  will-change: transform;
  pointer-events: none;
}

/* A forgatás a transform része, mert az animáció az egész
   transformot cseréli. Reduced motion mellett ez a nyugalmi kép. */
.hero-aurora__petrol {
  top: -8%;
  left: -28%;
  opacity: 0.34;
  filter: blur(110px);
  background: radial-gradient(ellipse at center, rgb(16, 148, 132) 0%, rgb(16, 148, 132) 32%, transparent 72%);
  transform: translate3d(0, 0, 0) rotate(-18deg) scale(1.04);
  animation: hero-aurora-petrol 42s ease-in-out infinite alternate;
}
.hero-aurora__indigo {
  top: 18%;
  left: -8%;
  opacity: 0.4;
  filter: blur(100px);
  background: radial-gradient(ellipse at center, rgb(98, 64, 196) 0%, rgb(98, 64, 196) 30%, transparent 70%);
  transform: translate3d(0, 0, 0) rotate(12deg) scale(1);
  animation: hero-aurora-indigo 36s ease-in-out -9s infinite alternate;
}
.hero-aurora__lime {
  top: -18%;
  left: -22%;
  width: 72%;
  height: 40%;
  opacity: 0.2;
  filter: blur(80px);
  background: radial-gradient(ellipse at center, rgb(190, 242, 100) 0%, rgb(190, 242, 100) 26%, transparent 68%);
  transform: translate3d(0, 0, 0) rotate(-6deg) scale(1);
  animation: hero-aurora-lime 45s ease-in-out -17s infinite alternate;
}
.hero-aurora__cyan {
  top: 46%;
  left: 18%;
  width: 100%;
  height: 46%;
  opacity: 0.22;
  filter: blur(110px);
  background: radial-gradient(ellipse at center, rgb(72, 214, 224) 0%, rgb(72, 214, 224) 28%, transparent 70%);
  transform: translate3d(0, 0, 0) rotate(8deg) scale(1);
  animation: hero-aurora-cyan 28s ease-in-out -25s infinite alternate;
}

/* Csak a transform mozog. A blur, a háttér és a méret drága
   újrarajzolás lenne minden képkockán; a translate3d és a scale
   a kompozitoron marad, a már elmosott réteget csúsztatja. */
@keyframes hero-aurora-petrol {
  from { transform: translate3d(-8%, -4%, 0) rotate(-18deg) scale(1); }
  to { transform: translate3d(6%, 5%, 0) rotate(-18deg) scale(1.12); }
}
@keyframes hero-aurora-indigo {
  from { transform: translate3d(7%, -5%, 0) rotate(12deg) scale(1.08); }
  to { transform: translate3d(-8%, 3%, 0) rotate(12deg) scale(1); }
}
@keyframes hero-aurora-lime {
  from { transform: translate3d(-4%, 2%, 0) rotate(-6deg) scale(1); }
  to { transform: translate3d(8%, -5%, 0) rotate(-6deg) scale(1.15); }
}
@keyframes hero-aurora-cyan {
  from { transform: translate3d(5%, 4%, 0) rotate(8deg) scale(1.06); }
  to { transform: translate3d(-7%, -3%, 0) rotate(8deg) scale(1); }
}

.hero-aurora__grain {
  position: absolute;
  inset: 0;
  opacity: 0.035;
  mix-blend-mode: overlay;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

.hero-aurora__vignette {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    ellipse 80% 70% at 50% 42%,
    transparent 0%,
    transparent 46%,
    color-mix(in srgb, var(--bg-base) 45%, transparent) 68%,
    var(--bg-base) 100%
  );
}

@media (max-width: 767px) {
  .hero-aurora__band { filter: blur(60px); }
  .hero-aurora__lime,
  .hero-aurora__cyan { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .hero-aurora__band { animation: none; }
}
`;

export function HeroAurora() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <style>{STILUS}</style>
      <div className="hero-aurora__band hero-aurora__petrol" />
      <div className="hero-aurora__band hero-aurora__indigo" />
      <div className="hero-aurora__band hero-aurora__lime" />
      <div className="hero-aurora__band hero-aurora__cyan" />
      <div className="hero-aurora__grain" />
      <div className="hero-aurora__vignette" />
    </div>
  );
}

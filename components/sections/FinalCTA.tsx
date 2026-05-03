"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type {
  MouseEvent as ReactMouseEvent,
  RefObject,
} from "react";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

const auroraStyles = `
  @keyframes aurora-drift-1 {
    0%, 100% { transform: translate(0%, 0%) scale(1); }
    20% { transform: translate(18%, -15%) scale(1.15); }
    45% { transform: translate(-12%, 8%) scale(0.92); }
    70% { transform: translate(10%, 16%) scale(1.1); }
    85% { transform: translate(-6%, -8%) scale(1.05); }
  }
  @keyframes aurora-drift-2 {
    0%, 100% { transform: translate(0%, 0%) scale(1); }
    25% { transform: translate(-22%, 12%) scale(1.18); }
    55% { transform: translate(16%, -18%) scale(0.88); }
    80% { transform: translate(-10%, 14%) scale(1.12); }
  }
  @keyframes aurora-drift-3 {
    0%, 100% { transform: translate(0%, 0%) scale(1); }
    30% { transform: translate(14%, 22%) scale(1.12); }
    60% { transform: translate(-18%, -12%) scale(0.88); }
    85% { transform: translate(8%, 6%) scale(1.08); }
  }
  @keyframes aurora-drift-4 {
    0%, 100% { transform: translate(0%, 0%) scale(0.95); }
    35% { transform: translate(-12%, -18%) scale(1.15); }
    65% { transform: translate(14%, 10%) scale(0.9); }
  }
  @media (prefers-reduced-motion: reduce) {
    [data-aurora-blob] { animation: none !important; }
  }
  @keyframes shimmer-sweep {
    from { left: -60%; }
    to { left: 160%; }
  }
  .btn-shimmer {
    position: absolute;
    top: 0;
    width: 40%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transform: skewX(-20deg);
    pointer-events: none;
  }
  .cta-group:hover .btn-shimmer {
    animation: shimmer-sweep 0.5s ease forwards;
  }
  .cta-sweep-fill {
    position: absolute;
    inset: 0;
    pointer-events: none;
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 0.35s ease-in-out;
    background: #09090B;
  }
  .cta-group:hover .cta-sweep-fill {
    transform: scaleX(1);
  }
  .cta-left-text {
    position: relative;
    z-index: 10;
    transition: color 0.35s ease-in-out;
  }
  .cta-group:hover .cta-left-text {
    color: #BDFF00;
  }
`;

type AuroraBackgroundProps = {
  enableCursorFx: boolean;
  spotlightVisible: boolean;
  blobXSpring: MotionValue<number>;
  blobYSpring: MotionValue<number>;
};

function AuroraBackground({
  enableCursorFx,
  spotlightVisible,
  blobXSpring,
  blobYSpring,
}: AuroraBackgroundProps) {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Base subtle dark gradient — slightly warmer than bg-base, gives the aurora something to glow against */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(20, 30, 40, 0.5) 0%, transparent 70%)",
        }}
      />

      {/* Blob 1 — Lime accent, top-left area, large */}
      <div
        data-aurora-blob
        className="absolute"
        style={{
          top: "0%",
          left: "15%",
          width: "60%",
          height: "75%",
          minWidth: "300px",
          minHeight: "300px",
          background:
            "radial-gradient(circle, rgba(189, 255, 0, 0.34) 0%, transparent 60%)",
          filter: "blur(70px)",
          animation: "aurora-drift-1 14s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Blob 2 — Deep violet, right side */}
      <div
        data-aurora-blob
        className="absolute"
        style={{
          top: "10%",
          right: "5%",
          width: "50%",
          height: "70%",
          minWidth: "300px",
          minHeight: "300px",
          background:
            "radial-gradient(circle, rgba(120, 60, 200, 0.42) 0%, transparent 60%)",
          filter: "blur(75px)",
          animation: "aurora-drift-2 18s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {enableCursorFx ? (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            width: "40%",
            height: "50%",
            left: 0,
            top: 0,
            background:
              "radial-gradient(circle, rgba(189,255,0,0.12) 0%, transparent 65%)",
            filter: "blur(80px)",
            x: blobXSpring,
            y: blobYSpring,
            translateX: "-50%",
            translateY: "-50%",
          }}
        />
      ) : null}

      {/* Blob 3 — Teal/cyan, bottom-left */}
      <div
        data-aurora-blob
        className="absolute"
        style={{
          bottom: "0%",
          left: "0%",
          width: "55%",
          height: "65%",
          minWidth: "300px",
          minHeight: "300px",
          background:
            "radial-gradient(circle, rgba(40, 180, 200, 0.28) 0%, transparent 60%)",
          filter: "blur(72px)",
          animation: "aurora-drift-3 20s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Blob 4 — Lime accent again, bottom-right (reinforces brand color) */}
      <div
        data-aurora-blob
        className="absolute"
        style={{
          bottom: "5%",
          right: "15%",
          width: "45%",
          height: "55%",
          minWidth: "300px",
          minHeight: "300px",
          background:
            "radial-gradient(circle, rgba(189, 255, 0, 0.24) 0%, transparent 60%)",
          filter: "blur(65px)",
          animation: "aurora-drift-4 16s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Subtle noise grain overlay for film-like texture */}
      <div
        className="absolute inset-0 mix-blend-overlay opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {enableCursorFx ? (
        <div
          className="pointer-events-none absolute inset-0 z-[10]"
          style={{
            opacity: spotlightVisible ? 1 : 0,
            transition: "opacity 500ms ease-out",
            background:
              "radial-gradient(600px circle at var(--mx) var(--my), rgba(189,255,0,0.07) 0%, transparent 60%)",
          }}
        />
      ) : null}

      {/* Top and bottom edge fade — softens the section's transition into adjacent sections */}
      <div
        className="absolute inset-0 z-[11]"
        style={{
          background:
            "linear-gradient(to bottom, var(--bg-base) 0%, transparent 12%, transparent 88%, var(--bg-base) 100%)",
        }}
      />

      {/* Left / right edge fade */}
      <div
        className="pointer-events-none absolute inset-0 z-[11] hidden sm:block"
        style={{
          background:
            "linear-gradient(to right, var(--bg-base) 0%, transparent 12%, transparent 88%, var(--bg-base) 100%)",
        }}
      />
    </div>
  );
}

function usePrefersReducedMotion(): boolean {
  const [prm, setPrm] = useState(false);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrm(mq.matches);
    const listener = () => setPrm(mq.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  return prm;
}

function MagneticSplitCta({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const btnX = useMotionValue(0);
  const btnY = useMotionValue(0);
  const btnSpringX = useSpring(btnX, { stiffness: 180, damping: 22 });
  const btnSpringY = useSpring(btnY, { stiffness: 180, damping: 22 });

  const handleBtnMove = useCallback(
    (e: ReactMouseEvent<HTMLAnchorElement>) => {
      if (prefersReducedMotion || !btnRef.current) return;
      const rect = btnRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = Math.max(-5, Math.min(5, e.clientX - cx));
      const dy = Math.max(-5, Math.min(5, e.clientY - cy));
      btnX.set(dx);
      btnY.set(dy);
    },
    [prefersReducedMotion, btnX, btnY],
  );

  const handleBtnLeave = useCallback(() => {
    btnX.set(0);
    btnY.set(0);
  }, [btnX, btnY]);

  return (
    <motion.a
      ref={btnRef}
      href="/idopontfoglalas"
      className="cta-group relative inline-flex overflow-hidden rounded-full"
      style={{
        boxShadow:
          "0 0 36px rgba(189,255,0,0.28), 0 0 72px rgba(189,255,0,0.10)",
        x: prefersReducedMotion ? 0 : btnSpringX,
        y: prefersReducedMotion ? 0 : btnSpringY,
      }}
      onMouseMove={handleBtnMove}
      onMouseLeave={handleBtnLeave}
    >
      <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-[#BDFF00] px-8 py-4">
        <span className="cta-sweep-fill z-[8]" aria-hidden />
        <span className="pointer-events-none absolute inset-0 z-[9] overflow-hidden">
          <span className="btn-shimmer absolute left-0 top-0" aria-hidden />
        </span>
        <span className="cta-left-text font-medium text-[15px] text-[#09090B]">
          Kezdjük el
        </span>
      </div>

      <div
        className="pointer-events-none w-px self-stretch shrink-0 bg-[rgba(9,9,11,0.15)]"
        aria-hidden
      />

      <div className="relative flex items-center bg-[#BDFF00] px-5 py-4">
        <ArrowRight size={16} className="text-[#09090B]" aria-hidden />
      </div>
    </motion.a>
  );
}

/** Midpoint quadratic spline sampler for trail drawing — returns dense points tail→head. */
function splineSamplesFromTrail(points: { x: number; y: number }[]): {
  x: number;
  y: number;
}[] {
  const n = points.length;
  if (n < 2) return [...points];

  type Pt = { x: number; y: number };

  function mid(a: Pt, b: Pt): Pt {
    return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  }

  function quadPoint(p0: Pt, cp: Pt, p1: Pt, t: number): Pt {
    const u = 1 - t;
    return {
      x: u * u * p0.x + 2 * u * t * cp.x + t * t * p1.x,
      y: u * u * p0.y + 2 * u * t * cp.y + t * t * p1.y,
    };
  }

  const STEP = 0.085;
  const out: Pt[] = [];

  /** Push Bézier quadratic samples excluding duplicate start (except very first quad). */
  function pushQuad(p0: Pt, cp: Pt, pEnd: Pt) {
    let t = STEP;
    while (t <= 1.000001) {
      out.push(quadPoint(p0, cp, pEnd, t));
      t += STEP;
    }
  }

  if (n === 2) {
    const p0 = points[0];
    const p1 = points[1];
    let t = 0;
    while (t <= 1.000001) {
      out.push({
        x: p0.x + (p1.x - p0.x) * t,
        y: p0.y + (p1.y - p0.y) * t,
      });
      t += STEP;
    }
    return out;
  }

  let current = points[0];

  for (let i = 1; i < n - 2; i++) {
    const xc = (points[i].x + points[i + 1].x) / 2;
    const yc = (points[i].y + points[i + 1].y) / 2;
    const endPt = { x: xc, y: yc };
    pushQuad(current, points[i], endPt);
    current = endPt;
  }

  pushQuad(current, points[n - 2], points[n - 1]);

  const last = points[n - 1];
  if (out.length) {
    const tail = out[out.length - 1];
    const lastDx = Math.abs(last.x - tail.x);
    const lastDy = Math.abs(last.y - tail.y);
    if (lastDx > 0.15 || lastDy > 0.15) out.push(last);
    else {
      out[out.length - 1] = last;
    }
  }

  return out;
}

/**
 * Neon trail canvas overlay — attaches to {@link sectionRef} surface.
 * Inert unless mounted on the client without reduced-motion / coarse-pointer.
 */
function NeonTrail({
  sectionRef,
}: {
  sectionRef: RefObject<HTMLElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<{ x: number; y: number }[]>([]);
  const trailOpacityRef = useRef(0);
  const drainingRef = useRef(false);
  const targetPointRef = useRef({ x: 0, y: 0 });
  const frameCounterRef = useRef(0);
  const targetSyncedRef = useRef(false);

  /** false until client knows we're allowed to paint (avoid SSR/hydration mismatch). */
  const [eligible, setEligible] = useState(false);

  useLayoutEffect(() => {
    setEligible(
      !(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        window.matchMedia("(pointer: coarse)").matches
      ),
    );
  }, []);

  useEffect(() => {
    if (!eligible) return;

    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const CAP = 28;
    const LERP = 0.18;
    let rafId = 0;

    const syncCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = section.clientWidth;
      const h = section.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const setTargetFromEvent = (clientX: number, clientY: number) => {
      const rect = section.getBoundingClientRect();
      targetPointRef.current = {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
      targetSyncedRef.current = true;
    };

    const onMove = (e: MouseEvent) => {
      drainingRef.current = false;
      trailOpacityRef.current = 1;
      setTargetFromEvent(e.clientX, e.clientY);
    };

    const onEnter = () => {
      drainingRef.current = false;
      trailOpacityRef.current = 1;
      targetSyncedRef.current = false;
    };

    const onLeave = () => {
      drainingRef.current = true;
    };

    const draw = () => {
      const cw = section.clientWidth;
      const ch = section.clientHeight;
      ctx.clearRect(0, 0, cw, ch);

      frameCounterRef.current += 1;
      const fc = frameCounterRef.current;
      const pts = pointsRef.current;

      if (pts.length > 0) {
        const accelDrain = drainingRef.current;
        if (accelDrain || fc % 2 === 0) {
          pts.shift();
        }
      }

      if (drainingRef.current && pts.length > 0) {
        trailOpacityRef.current *= 0.932;
      }

      /** Fade tail when draining with few points remaining. */
      if (drainingRef.current && pts.length === 0) {
        trailOpacityRef.current *= 0.9;
      }

      if (targetSyncedRef.current) {
        const target = targetPointRef.current;
        if (pts.length === 0) {
          pts.push({ x: target.x, y: target.y });
        } else {
          const last = pts[pts.length - 1];
          const smoothX = last.x + (target.x - last.x) * LERP;
          const smoothY = last.y + (target.y - last.y) * LERP;
          pts.push({ x: smoothX, y: smoothY });
        }
        while (pts.length > CAP) {
          pts.shift();
        }
      }

      const opacityTrail = trailOpacityRef.current;
      const ptsRaw = pointsRef.current;

      if (
        ptsRaw.length >= 2 &&
        opacityTrail >= 1e-3
      ) {
        const curvePts = splineSamplesFromTrail(ptsRaw);
        if (curvePts.length >= 2) {
          const m = curvePts.length - 1;

          ctx.lineCap = "round";
          ctx.lineJoin = "round";

          /** Per-segment u from 0 (tail) to 1 (head). */
          for (let s = 0; s < m; s++) {
            const ax = curvePts[s].x;
            const ay = curvePts[s].y;
            const bx = curvePts[s + 1].x;
            const by = curvePts[s + 1].y;
            const u = m > 0 ? s / m : 1;
            const thicknessScale = 1 + u * 4;
            const alphaAlong = Math.max(0, Math.min(1, u));
            const aGlobal = opacityTrail;

            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);

            ctx.shadowBlur = 0;

            ctx.lineWidth = 6 * thicknessScale;
            ctx.strokeStyle = `rgba(189,255,0,${
              0.15 * alphaAlong * aGlobal
            })`;
            ctx.shadowBlur = 40;
            ctx.shadowColor = "#BDFF00";
            ctx.stroke();

            ctx.shadowBlur = 0;

            ctx.lineWidth = 3 * thicknessScale;
            ctx.strokeStyle = `rgba(140,80,255,${
              0.25 * alphaAlong * aGlobal
            })`;
            ctx.shadowBlur = 20;
            ctx.stroke();

            ctx.shadowBlur = 0;

            ctx.lineWidth = Math.max(0.5, 0.8 * thicknessScale);
            ctx.strokeStyle = `rgba(189,255,0,${
              0.9 * alphaAlong * aGlobal
            })`;
            ctx.shadowBlur = 8;
            ctx.stroke();

            ctx.shadowBlur = 0;
          }
        }
      }

      rafId = requestAnimationFrame(draw);
    };

    syncCanvasSize();
    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseenter", onEnter);
    section.addEventListener("mouseleave", onLeave);

    const ro = new ResizeObserver(syncCanvasSize);
    ro.observe(section);

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseenter", onEnter);
      section.removeEventListener("mouseleave", onLeave);
      pointsRef.current = [];
      drainingRef.current = false;
      trailOpacityRef.current = 0;
      frameCounterRef.current = 0;
      targetSyncedRef.current = false;
    };
  }, [eligible, sectionRef]);

  if (!eligible) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-none"
      style={{
        zIndex: 5,
        borderRadius: "inherit",
      }}
      aria-hidden
    />
  );
}

export function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const glassBandRef = useRef<HTMLDivElement>(null);
  const pointerInsideRef = useRef(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const enableCursorFx = !prefersReducedMotion;

  const blobOriginX = useMotionValue(0);
  const blobOriginY = useMotionValue(0);
  const springConfig = { stiffness: 60, damping: 20, mass: 1.2 };
  const blobXSpring = useSpring(blobOriginX, springConfig);
  const blobYSpring = useSpring(blobOriginY, springConfig);

  const sectionMouseXNorm = useMotionValue(0);
  const sectionMouseYNorm = useMotionValue(0);
  const tiltSpring = { stiffness: 40, damping: 25, mass: 1.5 };
  const glassRotateXSpring = useSpring(
    useTransform(sectionMouseYNorm, [-0.5, 0.5], [-2, 2]),
    tiltSpring,
  );
  const glassRotateYSpring = useSpring(
    useTransform(sectionMouseXNorm, [-0.5, 0.5], [-3, 3]),
    tiltSpring,
  );

  const cardGlowPctXTarget = useMotionValue(50);
  const cardGlowPctYTarget = useMotionValue(50);
  const glowSpringCfg = { stiffness: 120, damping: 28 };
  const cardGlowPctX = useSpring(cardGlowPctXTarget, glowSpringCfg);
  const cardGlowPctY = useSpring(cardGlowPctYTarget, glowSpringCfg);

  const glassInnerSpotlight = useMotionTemplate`
    radial-gradient(480px circle at ${cardGlowPctX}% ${cardGlowPctY}%, rgba(189,255,0,0.05) 0%, transparent 70%)
  `;

  const [spotlightVisible, setSpotlightVisible] = useState(false);

  useEffect(() => {
    if (!enableCursorFx) return;

    const section = sectionRef.current;
    if (!section) return;

    function centerFromSectionRect() {
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.width / 2;
      const cy = r.height / 2;
      el.style.setProperty("--mx", `${cx}px`);
      el.style.setProperty("--my", `${cy}px`);
      blobOriginX.set(cx);
      blobOriginY.set(cy);
    }

    centerFromSectionRect();

    const onMouseMove = (evt: MouseEvent) => {
      const r = section.getBoundingClientRect();
      const x = evt.clientX - r.left;
      const y = evt.clientY - r.top;
      section.style.setProperty("--mx", `${x}px`);
      section.style.setProperty("--my", `${y}px`);
      blobOriginX.set(x);
      blobOriginY.set(y);

      if (!prefersReducedMotion) {
        sectionMouseXNorm.set(x / Math.max(r.width, 1) - 0.5);
        sectionMouseYNorm.set(y / Math.max(r.height, 1) - 0.5);
        const gb = glassBandRef.current;
        if (gb) {
          const c = gb.getBoundingClientRect();
          cardGlowPctXTarget.set(
            Math.max(
              0,
              Math.min(100, ((evt.clientX - c.left) / Math.max(c.width, 1)) * 100),
            ),
          );
          cardGlowPctYTarget.set(
            Math.max(
              0,
              Math.min(100, ((evt.clientY - c.top) / Math.max(c.height, 1)) * 100),
            ),
          );
        }
      }
    };

    const onMouseEnter = () => {
      pointerInsideRef.current = true;
      setSpotlightVisible(true);
    };

    const onMouseLeave = () => {
      pointerInsideRef.current = false;
      setSpotlightVisible(false);
      sectionMouseXNorm.set(0);
      sectionMouseYNorm.set(0);
      cardGlowPctXTarget.set(50);
      cardGlowPctYTarget.set(50);
      const r = section.getBoundingClientRect();
      const cx = r.width / 2;
      const cy = r.height / 2;
      blobOriginX.set(cx);
      blobOriginY.set(cy);
      section.style.setProperty("--mx", `${cx}px`);
      section.style.setProperty("--my", `${cy}px`);
    };

    const onResize = () => {
      if (!pointerInsideRef.current) {
        centerFromSectionRect();
      }
    };

    section.addEventListener("mousemove", onMouseMove);
    section.addEventListener("mouseenter", onMouseEnter);
    section.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", onResize);

    return () => {
      section.removeEventListener("mousemove", onMouseMove);
      section.removeEventListener("mouseenter", onMouseEnter);
      section.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [
    enableCursorFx,
    blobOriginX,
    blobOriginY,
    prefersReducedMotion,
    sectionMouseXNorm,
    sectionMouseYNorm,
    cardGlowPctXTarget,
    cardGlowPctYTarget,
  ]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: auroraStyles }} />
      <section
        ref={sectionRef}
        className="relative flex min-h-0 md:min-h-[90vh] items-center overflow-hidden bg-[var(--bg-base)] border-t border-[var(--border-hairline)] py-20 sm:py-24 lg:py-40"
      >
        <AuroraBackground
          enableCursorFx={enableCursorFx}
          spotlightVisible={spotlightVisible}
          blobXSpring={blobXSpring}
          blobYSpring={blobYSpring}
        />

        <NeonTrail sectionRef={sectionRef} />

        <div className="container relative z-10 mx-auto max-w-[1280px] px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              ref={glassBandRef}
              className="relative z-10 mx-auto max-w-2xl rounded-[32px] px-8 py-12 sm:px-10 sm:py-14 lg:px-12 lg:py-16 text-center"
              style={{
                ...(prefersReducedMotion
                  ? { rotateX: 0, rotateY: 0 }
                  : {
                      rotateX: glassRotateXSpring,
                      rotateY: glassRotateYSpring,
                    }),
                transformStyle: "preserve-3d",
                transformOrigin: "center center",
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(24px) saturate(160%)",
                WebkitBackdropFilter: "blur(24px) saturate(160%)",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow:
                  "0 0 0 0.5px rgba(255,255,255,0.04) inset, 0 40px 100px rgba(0,0,0,0.45)",
              }}
            >
              <motion.div
                className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[32px]"
                style={{ background: glassInnerSpotlight }}
              />

              <div className="relative z-10 flex flex-col items-center text-center">
                <h2
                  className="font-display font-medium text-[var(--text-primary)] text-center"
                  style={{
                    fontSize: "clamp(32px, 4.5vw, 52px)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.025em",
                    marginBottom: 48,
                  }}
                >
                  Beszéljünk arról, hol hozhat{" "}
                  <span style={{ color: "#BDFF00" }}>eredményt</span>
                  {" "}az{" "}
                  <span style={{ color: "#09090B" }}>AI</span>
                  {" "}a vállalkozásodban.
                </h2>

                <MagneticSplitCta
                  prefersReducedMotion={prefersReducedMotion}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

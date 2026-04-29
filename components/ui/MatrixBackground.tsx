"use client";

import { useEffect, useRef, useCallback } from "react";

const CHARS = "01FF4A0x7F{_}>><<10001101ABCDEF";

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  createdAt: number;
}

export function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const animFrameRef = useRef<number>(0);
  const lastDrawRef = useRef<number>(0);
  const FRAME_INTERVAL = 1000 / 10; // 10fps

  const handleClick = useCallback((e: MouseEvent) => {
    ripplesRef.current.push({
      x: e.clientX,
      y: e.clientY,
      radius: 0,
      maxRadius: 180,
      opacity: 1,
      createdAt: performance.now(),
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const FONT_SIZE = 13;
    let cols: number;
    let rows: number;
    let grid: string[][] = [];
    let charOpacities: number[][] = [];

    const initGrid = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.ceil(canvas.width / (FONT_SIZE * 1.6));
      rows = Math.ceil(canvas.height / (FONT_SIZE * 1.8));
      grid = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () =>
          CHARS[Math.floor(Math.random() * CHARS.length)]
        )
      );
      charOpacities = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => 0.012 + Math.random() * 0.016)
      );
    };

    const draw = (timestamp: number) => {
      animFrameRef.current = requestAnimationFrame(draw);
      if (timestamp - lastDrawRef.current < FRAME_INTERVAL) return;
      lastDrawRef.current = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${FONT_SIZE}px "Geist Mono", monospace`;
      ctx.textBaseline = "top";

      // Update ~2% of chars each frame
      const updateCount = Math.floor(cols * rows * 0.02);
      for (let i = 0; i < updateCount; i++) {
        const r = Math.floor(Math.random() * rows);
        const c = Math.floor(Math.random() * cols);
        grid[r][c] = CHARS[Math.floor(Math.random() * CHARS.length)];
      }

      // Update ripples
      const now = performance.now();
      ripplesRef.current = ripplesRef.current.filter(ripple => {
        const elapsed = now - ripple.createdAt;
        if (elapsed > 900) return false;
        const progress = elapsed / 900;
        ripple.radius = ripple.maxRadius * progress;
        ripple.opacity = 1 - progress;
        return true;
      });

      // Draw characters
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * FONT_SIZE * 1.6;
          const y = r * FONT_SIZE * 1.8;
          let opacity = charOpacities[r][c];
          let rippleBoost = 0;

          for (const ripple of ripplesRef.current) {
            const dist = Math.sqrt((x - ripple.x) ** 2 + (y - ripple.y) ** 2);
            const distToFront = Math.abs(dist - ripple.radius);
            if (distToFront < 40) {
              const boost = (1 - distToFront / 40) * ripple.opacity;
              rippleBoost = Math.max(rippleBoost, boost);
            }
          }

          const finalOpacity = opacity + rippleBoost * 0.45;
          ctx.fillStyle = rippleBoost > 0.1
            ? `rgba(189,255,0,${finalOpacity})`
            : `rgba(255,255,255,${finalOpacity})`;
          ctx.fillText(grid[r][c], x, y);
        }
      }
    };

    initGrid();
    animFrameRef.current = requestAnimationFrame(draw);
    window.addEventListener("click", handleClick, { passive: true });
    window.addEventListener("resize", () => initGrid(), { passive: true });

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("click", handleClick);
    };
  }, [handleClick, FRAME_INTERVAL]);

  return (
    <>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-matrix-canvas] { display: none !important; }
        }
      `}</style>
      <canvas
        ref={canvasRef}
        data-matrix-canvas
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      />
    </>
  );
}

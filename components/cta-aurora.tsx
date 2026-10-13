/**
 * Lassan mozgó aurora-háttér a záró CTA-szekciókhoz (főoldal, kampányoldalak).
 * Csak CSS: két elmosott fényfolt (lime és lila), finom szemcse, és a
 * szekció szélein elhalványítás, hogy simán olvadjon a szomszédos részekbe.
 * A szülőnek `relative overflow-hidden` kell.
 *
 * `variant="faded"` (alapértelmezés, főoldal): a szekció szélein elhalványul.
 * `variant="full"`: elhalványítás nélkül, nagyobb foltokkal a teljes hátteret
 * kitölti (kampányoldal záró blokkja).
 */

const STYLES = `
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
  @media (prefers-reduced-motion: reduce) {
    [data-aurora-blob] { animation: none !important; }
  }
`;

export function CtaAurora({ variant = "faded" }: { variant?: "faded" | "full" }) {
  const full = variant === "full";
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <style>{STYLES}</style>
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
          top: full ? "-25%" : "0%",
          left: full ? "-5%" : "15%",
          width: full ? "70%" : "60%",
          height: full ? "150%" : "75%",
          minWidth: "300px",
          minHeight: "300px",
          background:
            "radial-gradient(circle, rgba(189, 255, 0, 0.34) 0%, transparent 60%)",
          filter: "blur(70px)",
          animation: "aurora-drift-1 20s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Blob 2 — Deep violet, right side */}
      <div
        data-aurora-blob
        className="absolute"
        style={{
          top: full ? "-20%" : "10%",
          right: full ? "-5%" : "5%",
          width: full ? "65%" : "50%",
          height: full ? "145%" : "70%",
          minWidth: "300px",
          minHeight: "300px",
          background:
            "radial-gradient(circle, rgba(120, 60, 200, 0.42) 0%, transparent 60%)",
          filter: "blur(75px)",
          animation: "aurora-drift-2 20s ease-in-out infinite",
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

      {full ? null : (
        <>
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
        </>
      )}
    </div>
  );
}

"use client";

export function ProcessFlowSVG() {
  return (
    <div className="w-full h-full flex items-center justify-center" aria-hidden="true">
      <svg
        viewBox="0 0 280 320"
        width="100%"
        height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>{`
          @keyframes pulse-dot {
            0%, 100% { opacity: 0.7; r: 3; }
            50% { opacity: 1; r: 4; }
          }
          @keyframes fill-bar {
            0% { width: 0; }
            100% { width: 32; }
          }
          @keyframes fade-row {
            0%, 100% { opacity: 0.85; }
            50% { opacity: 1; }
          }
          @media (prefers-reduced-motion: reduce) {
            * { animation: none !important; }
          }
        `}</style>
        {/* Title label */}
        <text x="140" y="20" textAnchor="middle"
          fontFamily="Geist Mono, monospace" fontSize="9"
          fill="rgba(255,255,255,0.25)" letterSpacing="0.12em">
          FOLYAMATFELMÉRÉS
        </text>

        {/* 5 process rows */}
        {[
          { label: "Email kezelés", done: true, y: 50 },
          { label: "Adatbevitel", done: true, y: 98 },
          { label: "Riportálás", done: true, y: 146 },
          { label: "Ügyfélkom.", done: false, y: 194, active: true },
          { label: "Számlázás", done: false, y: 242 },
        ].map((item, i) => (
          <g
            key={i}
            style={
              item.active
                ? { animation: "fade-row 2s ease-in-out infinite" }
                : undefined
            }
          >
            {/* Row background */}
            <rect x="20" y={item.y - 14} width="240" height="36" rx="6"
              fill={item.active
                ? "rgba(189,255,0,0.05)"
                : item.done
                  ? "rgba(255,255,255,0.02)"
                  : "rgba(255,255,255,0.01)"}
              stroke={item.active
                ? "rgba(189,255,0,0.25)"
                : "rgba(255,255,255,0.07)"}
              strokeWidth="1" />

            {/* Status indicator */}
            {item.done ? (
              <>
                <circle cx="42" cy={item.y + 4} r="8"
                  fill="rgba(189,255,0,0.12)"
                  stroke="rgba(189,255,0,0.4)" strokeWidth="1" />
                <text x="42" y={item.y + 8} textAnchor="middle"
                  fontFamily="Geist Mono, monospace" fontSize="9"
                  fill="rgba(189,255,0,0.9)">✓</text>
              </>
            ) : item.active ? (
              <>
                <circle cx="42" cy={item.y + 4} r="8"
                  fill="rgba(189,255,0,0.06)"
                  stroke="rgba(189,255,0,0.5)" strokeWidth="1" />
                <circle cx="42" cy={item.y + 4} r="3"
                  fill="rgba(189,255,0,0.7)"
                  style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
                />
              </>
            ) : (
              <circle cx="42" cy={item.y + 4} r="8"
                fill="rgba(255,255,255,0.02)"
                stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            )}

            {/* Label */}
            <text x="60" y={item.y + 8}
              fontFamily="Geist Mono, monospace" fontSize="10"
              fill={item.done
                ? "rgba(255,255,255,0.5)"
                : item.active
                  ? "rgba(255,255,255,0.85)"
                  : "rgba(255,255,255,0.25)"}
              letterSpacing="0.04em">
              {item.label}
            </text>

            {/* Progress bar for done items */}
            {item.done && (
              <rect x="160" y={item.y} width="80" height="2" rx="1"
                fill="rgba(189,255,0,0.2)" />
            )}

            {/* Active item: partial progress bar */}
            {item.active && (
              <>
                <rect x="160" y={item.y} width="80" height="2" rx="1"
                  fill="rgba(255,255,255,0.06)" />
                <rect x="160" y={item.y} width="32" height="2" rx="1"
                  fill="rgba(189,255,0,0.5)"
                  style={{ animation: "fill-bar 3s ease-out forwards" }}
                />
              </>
            )}
          </g>
        ))}

        {/* Bottom label */}
        <text x="140" y="298" textAnchor="middle"
          fontFamily="Geist Mono, monospace" fontSize="8"
          fill="rgba(255,255,255,0.15)" letterSpacing="0.1em">
          3 / 5 ELEMZETT
        </text>
      </svg>
    </div>
  );
}

"use client";

export function ServerSVG() {
  return (
    <div className="w-full h-full flex items-center justify-center" aria-hidden="true">
      <svg viewBox="0 0 280 380" width="100%" height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes blink-led {
            0%, 90%, 100% { opacity: 0.9; }
            95% { opacity: 0.2; }
          }
          @keyframes blink-dim {
            0%, 100% { opacity: 0.25; }
            50% { opacity: 0.5; }
          }
          @keyframes flow-data {
            from { stroke-dashoffset: 0; }
            to { stroke-dashoffset: -28; }
          }
          @media (prefers-reduced-motion: reduce) {
            * { animation: none !important; }
          }
        `}</style>

        <defs>
          <marker id="arrowGreen" markerWidth="6" markerHeight="6"
            refX="3" refY="3" orient="auto">
            <path d="M 0 0 L 6 3 L 0 6 Z" fill="rgba(189,255,0,0.4)" />
          </marker>
        </defs>

        {/* Server rack outline */}
        <rect x="60" y="30" width="160" height="240" rx="8"
          stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"
          fill="rgba(255,255,255,0.02)" />

        {/* 4 server units */}
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x="72" y={50 + i * 52} width="136" height="36" rx="4"
              stroke="rgba(255,255,255,0.10)" strokeWidth="1"
              fill="rgba(255,255,255,0.03)" />
            {/* Status LED */}
            <circle cx="88" cy={68 + i * 52} r="3"
              fill={i === 0
                ? "rgba(189,255,0,0.9)"
                : "rgba(189,255,0,0.25)"}
              style={
                i === 0
                  ? { animation: "blink-led 4s ease-in-out infinite" }
                  : {
                      animation: "blink-dim 3s ease-in-out infinite",
                      animationDelay:
                        i === 1 ? "0.5s" : i === 2 ? "1s" : "1.5s",
                    }
              }
            />
            {/* Drive slots */}
            {[0, 1, 2, 3].map((j) => (
              <rect key={j}
                x={100 + j * 22} y={60 + i * 52}
                width="14" height="16" rx="2"
                stroke="rgba(255,255,255,0.08)" strokeWidth="1"
                fill="rgba(255,255,255,0.02)" />
            ))}
            {/* Unit label */}
            <text x="192" y={71 + i * 52}
              fontFamily="Geist Mono, monospace" fontSize="8"
              fill="rgba(255,255,255,0.25)" letterSpacing="0.05em">
              {`SRV-0${i + 1}`}
            </text>
          </g>
        ))}

        {/* Internal data flow */}
        <path d="M 140 86 L 140 138 L 140 190"
          stroke="rgba(189,255,0,0.3)" strokeWidth="1"
          strokeDasharray="3 4"
          markerEnd="url(#arrowGreen)"
          style={{ animation: "flow-data 1.5s linear infinite" }}
        />

        {/* Lock icon */}
        <rect x="118" y="295" width="44" height="36" rx="5"
          stroke="rgba(189,255,0,0.4)" strokeWidth="1.5"
          fill="rgba(189,255,0,0.05)" />
        <path d="M 128 295 L 128 288 C 128 280 152 280 152 288 L 152 295"
          stroke="rgba(189,255,0,0.4)" strokeWidth="1.5" fill="none" />
        <circle cx="140" cy="310" r="4" fill="rgba(189,255,0,0.6)" />
        <line x1="140" y1="314" x2="140" y2="320"
          stroke="rgba(189,255,0,0.6)" strokeWidth="1.5" />

        {/* Label */}
        <text x="140" y="358" textAnchor="middle"
          fontFamily="Geist Mono, monospace" fontSize="9"
          fill="rgba(189,255,0,0.4)" letterSpacing="0.1em">
          HELYI ADAT
        </text>
      </svg>
    </div>
  );
}

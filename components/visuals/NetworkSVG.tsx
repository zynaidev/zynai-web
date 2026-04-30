"use client";

export function NetworkSVG() {
  const hubX = 160;
  const hubY = 190;
  const radius = 115;

  const nodes = [
    { label: "CRM", angle: -90 },
    { label: "EMAIL", angle: -30 },
    { label: "SHEETS", angle: 30 },
    { label: "SLACK", angle: 90 },
    { label: "API", angle: 150 },
    { label: "ERP", angle: 210 },
  ];

  const lineDelays = ["0s", "0.3s", "0.6s", "0.9s", "1.2s", "1.5s"];

  return (
    <div className="w-full h-full flex items-center justify-center" aria-hidden="true">
      <svg viewBox="0 0 320 380" width="100%" height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes pulse-hub {
            0%, 100% { opacity: 0.30; r: 42; }
            50% { opacity: 0.15; r: 46; }
          }
          @keyframes dash-flow {
            from { stroke-dashoffset: 0; }
            to { stroke-dashoffset: -24; }
          }
          @media (prefers-reduced-motion: reduce) {
            * { animation: none !important; }
          }
        `}</style>

        {/* Connection lines */}
        {nodes.map((node, i) => {
          const angleRad = (node.angle * Math.PI) / 180;
          const nx = hubX + Math.cos(angleRad) * radius;
          const ny = hubY + Math.sin(angleRad) * radius;
          return (
            <line key={i}
              x1={nx} y1={ny} x2={hubX} y2={hubY}
              stroke="rgba(255,255,255,0.1)" strokeWidth="1"
              strokeDasharray="3 5"
              style={{
                animation: "dash-flow 2s linear infinite",
                animationDelay: lineDelays[i],
              }}
            />
          );
        })}

        {/* Hub glow rings */}
        <circle cx={hubX} cy={hubY} r="42"
          stroke="rgba(189,255,0,0.08)" strokeWidth="1" fill="none"
          style={{
            animation: "pulse-hub 3s ease-in-out infinite",
            transformOrigin: "160px 190px",
          }}
        />
        <circle cx={hubX} cy={hubY} r="30"
          stroke="rgba(189,255,0,0.30)" strokeWidth="1.5"
          fill="rgba(189,255,0,0.05)" />
        <text x={hubX} y={hubY + 5} textAnchor="middle"
          fontFamily="Geist Mono, monospace" fontSize="13"
          fontWeight="600" fill="rgba(189,255,0,0.9)"
          letterSpacing="0.05em">AI</text>

        {/* Outer nodes */}
        {nodes.map((node, i) => {
          const angleRad = (node.angle * Math.PI) / 180;
          const nx = hubX + Math.cos(angleRad) * radius;
          const ny = hubY + Math.sin(angleRad) * radius;
          return (
            <g key={i}>
              <circle cx={nx} cy={ny} r="22"
                stroke="rgba(255,255,255,0.14)" strokeWidth="1"
                fill="rgba(255,255,255,0.03)" />
              <text x={nx} y={ny + 4} textAnchor="middle"
                fontFamily="Geist Mono, monospace" fontSize="9"
                fill="rgba(255,255,255,0.45)" letterSpacing="0.06em">
                {node.label}
              </text>
            </g>
          );
        })}

        {/* Hub connection dots */}
        {nodes.map((node, i) => {
          const angleRad = (node.angle * Math.PI) / 180;
          const cx = hubX + Math.cos(angleRad) * 31;
          const cy = hubY + Math.sin(angleRad) * 31;
          return (
            <circle key={i} cx={cx} cy={cy} r="2"
              fill="rgba(189,255,0,0.4)" />
          );
        })}

        {/* Label */}
        <text x="160" y="358" textAnchor="middle"
          fontFamily="Geist Mono, monospace" fontSize="9"
          fill="rgba(255,255,255,0.2)" letterSpacing="0.1em">
          INTEGRÁLT RENDSZER
        </text>
      </svg>
    </div>
  );
}

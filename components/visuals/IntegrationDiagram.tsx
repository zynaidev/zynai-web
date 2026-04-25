"use client";

const inputNodes = [
  { cx: 80, cy: 120, label: "Email", icon: "email" },
  { cx: 80, cy: 240, label: "CRM", icon: "database" },
  { cx: 80, cy: 360, label: "Adatok", icon: "chart" },
];

const outputNodes = [
  { cx: 400, cy: 120, label: "Riport", icon: "chart" },
  { cx: 400, cy: 240, label: "Válasz", icon: "email" },
  { cx: 400, cy: 360, label: "Rendszer", icon: "database" },
];

const paths = [
  { d: "M102 120 Q170 120 196 220", delay: "0s" },
  { d: "M102 240 Q160 240 196 240", delay: "0.3s" },
  { d: "M102 360 Q170 360 196 260", delay: "0.6s" },
  { d: "M284 220 Q310 120 378 120", delay: "0.9s" },
  { d: "M284 240 Q320 240 378 240", delay: "1.2s" },
  { d: "M284 260 Q310 360 378 360", delay: "1.5s" },
];

function NodeIcon({ type, x, y }: { type: string; x: number; y: number }) {
  if (type === "email") {
    return (
      <g
        fill="none"
        stroke="var(--text-secondary)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        <rect height="10" rx="1.5" width="14" x={x - 7} y={y - 5} />
        <path d={`M${x - 7} ${y - 4} L${x} ${y + 1} L${x + 7} ${y - 4}`} />
      </g>
    );
  }

  if (type === "database") {
    return (
      <g
        fill="none"
        stroke="var(--text-secondary)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        <ellipse cx={x} cy={y - 5} rx="7" ry="3" />
        <path d={`M${x - 7} ${y - 5} V${y + 5} Q${x} ${y + 9} ${x + 7} ${y + 5} V${y - 5}`} />
        <path d={`M${x - 7} ${y} Q${x} ${y + 4} ${x + 7} ${y}`} />
      </g>
    );
  }

  return (
    <g
      fill="none"
      stroke="var(--text-secondary)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    >
      <path d={`M${x - 7} ${y + 6} H${x + 7}`} />
      <path d={`M${x - 5} ${y + 3} L${x - 1} ${y - 2} L${x + 2} ${y + 1} L${x + 6} ${y - 6}`} />
    </g>
  );
}

function DiagramNode({
  cx,
  cy,
  icon,
  label,
}: {
  cx: number;
  cy: number;
  icon: string;
  label: string;
}) {
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        fill="rgba(255,255,255,0.03)"
        r="22"
        stroke="var(--border-default)"
        strokeWidth="1.5"
      />
      <NodeIcon type={icon} x={cx} y={cy} />
      <text
        dominantBaseline="middle"
        fill="var(--text-tertiary)"
        fontFamily="var(--font-mono)"
        fontSize="11"
        letterSpacing="0.08em"
        style={{ textTransform: "uppercase" }}
        textAnchor="middle"
        x={cx}
        y={cy + 42}
      >
        {label}
      </text>
    </g>
  );
}

export function IntegrationDiagram() {
  return (
    <div
      aria-label="AI integration diagram showing data flowing from business systems through an AI hub to outputs"
      className="h-full w-full"
      role="img"
    >
      <svg
        aria-hidden="true"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 480 480"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>
          {`
            .integration-flow-line {
              animation: integrationDash 2s linear infinite;
            }

            .integration-hub-pulse {
              animation: integrationHubPulse 3s ease-in-out infinite;
              transform-box: fill-box;
              transform-origin: center;
            }

            @keyframes integrationDash {
              from { stroke-dashoffset: 0; }
              to { stroke-dashoffset: -24; }
            }

            @keyframes integrationHubPulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.04); }
            }

            @media (prefers-reduced-motion: reduce) {
              * { animation: none !important; }
              .integration-travel-dot { display: none; }
            }
          `}
        </style>
        <defs>
          <filter
            colorInterpolationFilters="sRGB"
            height="160%"
            id="hubGlow"
            width="160%"
            x="-30%"
            y="-30%"
          >
            <feGaussianBlur stdDeviation="8" />
          </filter>
          <filter
            colorInterpolationFilters="sRGB"
            height="400%"
            id="dotGlow"
            width="400%"
            x="-150%"
            y="-150%"
          >
            <feGaussianBlur result="blur" stdDeviation="3" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <path d={paths[0].d} id="activePathInput" />
          <path d={paths[4].d} id="activePathOutput" />
        </defs>

        {paths.map((path) => (
          <path
            className="integration-flow-line"
            d={path.d}
            fill="none"
            key={path.d}
            opacity="0.4"
            stroke="var(--border-default)"
            strokeDasharray="4 8"
            strokeLinecap="round"
            strokeWidth="1.5"
            style={{ animationDelay: path.delay }}
          />
        ))}

        <circle
          className="integration-travel-dot"
          fill="var(--accent)"
          filter="url(#dotGlow)"
          r="3"
        >
          <animateMotion dur="2.5s" repeatCount="indefinite">
            <mpath href="#activePathInput" />
          </animateMotion>
        </circle>
        <circle
          className="integration-travel-dot"
          fill="var(--accent)"
          filter="url(#dotGlow)"
          r="3"
        >
          <animateMotion begin="0.4s" dur="2.5s" repeatCount="indefinite">
            <mpath href="#activePathOutput" />
          </animateMotion>
        </circle>

        {inputNodes.map((node) => (
          <DiagramNode key={node.label} {...node} />
        ))}

        {outputNodes.map((node) => (
          <DiagramNode key={node.label} {...node} />
        ))}

        <g className="integration-hub-pulse">
          <circle
            cx="240"
            cy="240"
            fill="var(--accent)"
            filter="url(#hubGlow)"
            opacity="0.2"
            r="44"
          />
          <circle
            cx="240"
            cy="240"
            fill="rgba(189, 255, 0, 0.04)"
            r="44"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <text
            dominantBaseline="central"
            fill="var(--accent)"
            fontFamily="var(--font-display)"
            fontSize="18"
            fontWeight="600"
            textAnchor="middle"
            x="240"
            y="240"
          >
            AI
          </text>
        </g>
      </svg>
    </div>
  );
}

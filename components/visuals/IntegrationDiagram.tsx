"use client";

import { useEffect, useState } from "react";

type DiagramNodeConfig = {
  cx: number;
  cy: number;
  icon: "email" | "database" | "chart";
  label: string;
  labelY: number;
};

type DiagramPath = {
  d: string;
  delay: string;
};

const sharedSvgStyles = `
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
`;

function NodeIcon({
  type,
  x,
  y,
}: {
  type: DiagramNodeConfig["icon"];
  x: number;
  y: number;
}) {
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

function DiagramNode({ cx, cy, icon, label, labelY }: DiagramNodeConfig) {
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
        y={labelY}
      >
        {label}
      </text>
    </g>
  );
}

const desktopInputNodes: DiagramNodeConfig[] = [
  { cx: 80, cy: 120, label: "Email", icon: "email", labelY: 162 },
  { cx: 80, cy: 240, label: "CRM", icon: "database", labelY: 282 },
  { cx: 80, cy: 360, label: "Adatok", icon: "chart", labelY: 402 },
];

const desktopOutputNodes: DiagramNodeConfig[] = [
  { cx: 400, cy: 120, label: "Riport", icon: "chart", labelY: 162 },
  { cx: 400, cy: 240, label: "Válasz", icon: "email", labelY: 282 },
  { cx: 400, cy: 360, label: "Rendszer", icon: "database", labelY: 402 },
];

const desktopPaths: DiagramPath[] = [
  { d: "M102 120 Q170 120 196 220", delay: "0s" },
  { d: "M102 240 Q160 240 196 240", delay: "0.3s" },
  { d: "M102 360 Q170 360 196 260", delay: "0.6s" },
  { d: "M284 220 Q310 120 378 120", delay: "0.9s" },
  { d: "M284 240 Q320 240 378 240", delay: "1.2s" },
  { d: "M284 260 Q310 360 378 360", delay: "1.5s" },
];

const mobileInputNodes: DiagramNodeConfig[] = [
  { cx: 80, cy: 80, label: "Email", icon: "email", labelY: 50 },
  { cx: 180, cy: 80, label: "CRM", icon: "database", labelY: 50 },
  { cx: 280, cy: 80, label: "Adatok", icon: "chart", labelY: 50 },
];

const mobileOutputNodes: DiagramNodeConfig[] = [
  { cx: 80, cy: 520, label: "Riport", icon: "chart", labelY: 558 },
  { cx: 180, cy: 520, label: "Válasz", icon: "email", labelY: 558 },
  { cx: 280, cy: 520, label: "Rendszer", icon: "database", labelY: 558 },
];

const mobilePaths: DiagramPath[] = [
  { d: "M80 102 Q80 190 160 258", delay: "0s" },
  { d: "M180 102 Q180 180 180 256", delay: "0.3s" },
  { d: "M280 102 Q280 190 200 258", delay: "0.6s" },
  { d: "M160 342 Q80 410 80 498", delay: "0.9s" },
  { d: "M180 344 Q180 420 180 498", delay: "1.2s" },
  { d: "M200 342 Q280 410 280 498", delay: "1.5s" },
];

function DesktopDiagram() {
  return (
    <svg
      aria-hidden="true"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 480 480"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{sharedSvgStyles}</style>
      <defs>
        <filter
          colorInterpolationFilters="sRGB"
          height="160%"
          id="desktopHubGlow"
          width="160%"
          x="-30%"
          y="-30%"
        >
          <feGaussianBlur stdDeviation="8" />
        </filter>
        <filter
          colorInterpolationFilters="sRGB"
          height="400%"
          id="desktopDotGlow"
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
        <path d={desktopPaths[0].d} id="desktopActivePathInput" />
        <path d={desktopPaths[4].d} id="desktopActivePathOutput" />
      </defs>

      {desktopPaths.map((path) => (
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
        filter="url(#desktopDotGlow)"
        r="3"
      >
        <animateMotion dur="2.5s" repeatCount="indefinite">
          <mpath href="#desktopActivePathInput" />
        </animateMotion>
      </circle>
      <circle
        className="integration-travel-dot"
        fill="var(--accent)"
        filter="url(#desktopDotGlow)"
        r="3"
      >
        <animateMotion begin="0.4s" dur="2.5s" repeatCount="indefinite">
          <mpath href="#desktopActivePathOutput" />
        </animateMotion>
      </circle>

      {desktopInputNodes.map((node) => (
        <DiagramNode key={node.label} {...node} />
      ))}

      {desktopOutputNodes.map((node) => (
        <DiagramNode key={node.label} {...node} />
      ))}

      <g className="integration-hub-pulse">
        <circle
          cx="240"
          cy="240"
          fill="var(--accent)"
          filter="url(#desktopHubGlow)"
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
  );
}

function MobileDiagram() {
  return (
    <svg
      aria-hidden="true"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 360 600"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{sharedSvgStyles}</style>
      <defs>
        <filter
          colorInterpolationFilters="sRGB"
          height="160%"
          id="mobileHubGlow"
          width="160%"
          x="-30%"
          y="-30%"
        >
          <feGaussianBlur stdDeviation="8" />
        </filter>
        <filter
          colorInterpolationFilters="sRGB"
          height="400%"
          id="mobileDotGlow"
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
        <path d={mobilePaths[0].d} id="mobileActivePathInput" />
        <path d={mobilePaths[4].d} id="mobileActivePathOutput" />
      </defs>

      {mobilePaths.map((path) => (
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
        filter="url(#mobileDotGlow)"
        r="3"
      >
        <animateMotion dur="2.5s" repeatCount="indefinite">
          <mpath href="#mobileActivePathInput" />
        </animateMotion>
      </circle>
      <circle
        className="integration-travel-dot"
        fill="var(--accent)"
        filter="url(#mobileDotGlow)"
        r="3"
      >
        <animateMotion begin="0.4s" dur="2.5s" repeatCount="indefinite">
          <mpath href="#mobileActivePathOutput" />
        </animateMotion>
      </circle>

      {mobileInputNodes.map((node) => (
        <DiagramNode key={node.label} {...node} />
      ))}

      {mobileOutputNodes.map((node) => (
        <DiagramNode key={node.label} {...node} />
      ))}

      <g className="integration-hub-pulse">
        <circle
          cx="180"
          cy="300"
          fill="var(--accent)"
          filter="url(#mobileHubGlow)"
          opacity="0.2"
          r="44"
        />
        <circle
          cx="180"
          cy="300"
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
          x="180"
          y="300"
        >
          AI
        </text>
      </g>
    </svg>
  );
}

export function IntegrationDiagram() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div
      aria-label="AI integration diagram showing data flowing from business systems through an AI hub to outputs"
      className="h-full w-full"
      role="img"
    >
      {isMobile ? <MobileDiagram /> : <DesktopDiagram />}
    </div>
  );
}

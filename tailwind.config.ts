import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      backdropBlur: {
        glass: "20px",
      },
      colors: {
        accent: "var(--accent)",
        "accent-glow": "var(--accent-glow)",
        "accent-on-light": "var(--accent-on-light)",
        "accent-text": "var(--accent-text)",
        bg: {
          base: "var(--bg-base)",
          elevated: "var(--bg-elevated)",
          glass: "var(--bg-glass)",
          "glass-strong": "var(--bg-glass-strong)",
        },
        border: {
          accent: "var(--border-accent)",
          default: "var(--border-default)",
          hairline: "var(--border-hairline)",
        },
        text: {
          mono: "var(--text-mono)",
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          tertiary: "var(--text-tertiary)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        sans: ["var(--font-body)", "sans-serif"],
      },
      spacing: {
        "card-desktop": "var(--space-card-desktop)",
        "card-mobile": "var(--space-card-mobile)",
        "section-desktop": "var(--space-section-desktop)",
        "section-mobile": "var(--space-section-mobile)",
      },
    },
  },
};

export default config;

import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ZynAI — AI integráció magyar vállalkozásoknak";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#09090B",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Lime glow blob */}
        <div
          style={{
            position: "absolute",
            top: -100,
            left: -100,
            width: 600,
            height: 600,
            background:
              "radial-gradient(circle, rgba(189,255,0,0.15) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Top label */}
        <div
          style={{
            position: "absolute",
            top: 80,
            left: 80,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              background: "#BDFF00",
              borderRadius: "50%",
            }}
          />
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 14,
              color: "#BDFF00",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            ZYNAI
          </span>
        </div>

        {/* Main title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 500,
            color: "#FAFAFA",
            lineHeight: 1.1,
            marginBottom: 24,
            maxWidth: 800,
          }}
        >
          AI integráció magyar vállalkozásoknak.
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            color: "#A1A1AA",
            marginBottom: 48,
          }}
        >
          Bakos Attila — AI integrátor és üzleti tanácsadó
        </div>

        {/* Bottom CTA pill */}
        <div
          style={{
            background: "#BDFF00",
            color: "#09090B",
            padding: "14px 32px",
            borderRadius: 999,
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          zynai.hu
        </div>
      </div>
    ),
    { ...size },
  );
}

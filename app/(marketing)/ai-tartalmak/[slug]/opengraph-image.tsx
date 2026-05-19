import { ImageResponse } from "next/og";
import { getArticleBySlug } from "@/lib/article-loader";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  const title = article?.title ?? "AI tartalom";
  const tag = article?.tag ?? "ZYNAI";
  const excerpt = article?.excerpt
    ? article.excerpt.slice(0, 120) + (article.excerpt.length > 120 ? "…" : "")
    : "";

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
              "radial-gradient(circle, rgba(189,255,0,0.12) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Top label: ZYNAI dot + cikk tag */}
        <div
          style={{
            position: "absolute",
            top: 80,
            left: 80,
            display: "flex",
            alignItems: "center",
            gap: 16,
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
              fontSize: 13,
              color: "#BDFF00",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            ZYNAI · {tag}
          </span>
        </div>

        {/* Article title */}
        <div
          style={{
            fontSize: title.length > 60 ? 48 : 56,
            fontWeight: 600,
            color: "#FAFAFA",
            lineHeight: 1.15,
            marginBottom: 20,
            maxWidth: 900,
          }}
        >
          {title}
        </div>

        {/* Excerpt */}
        {excerpt && (
          <div
            style={{
              fontSize: 20,
              color: "#71717A",
              lineHeight: 1.5,
              marginBottom: 40,
              maxWidth: 850,
            }}
          >
            {excerpt}
          </div>
        )}

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              background: "#BDFF00",
              color: "#09090B",
              padding: "10px 24px",
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.05em",
            }}
          >
            zynai.hu
          </div>
          <span
            style={{
              fontSize: 14,
              color: "#52525B",
              fontFamily: "monospace",
            }}
          >
            /ai-tartalmak
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}

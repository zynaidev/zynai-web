import { ImageResponse } from "next/og";
import { getArticleBySlug } from "@/lib/article-loader";
import { getArticleOgImageUrl } from "@/lib/article-seo";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function TextOgCard({
  title,
  tag,
  excerpt,
}: {
  title: string;
  tag: string;
  excerpt: string;
}) {
  return (
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
  );
}

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
  const coverImageUrl = article ? getArticleOgImageUrl(article) : undefined;

  if (coverImageUrl) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            position: "relative",
            background: "#09090B",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={coverImageUrl}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(9,9,11,0.92) 0%, rgba(9,9,11,0.35) 45%, rgba(9,9,11,0.1) 100%)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "64px 72px",
            }}
          >
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 13,
                color: "#BDFF00",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              ZYNAI · {tag}
            </span>
            <div
              style={{
                fontSize: title.length > 70 ? 42 : 52,
                fontWeight: 600,
                color: "#FAFAFA",
                lineHeight: 1.15,
                maxWidth: 960,
              }}
            >
              {title}
            </div>
          </div>
        </div>
      ),
      { ...size },
    );
  }

  return new ImageResponse(
    <TextOgCard excerpt={excerpt} tag={tag} title={title} />,
    { ...size },
  );
}

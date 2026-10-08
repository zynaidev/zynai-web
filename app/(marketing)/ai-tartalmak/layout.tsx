import type { Metadata } from "next";
import type { ReactNode } from "react";

import { allArticles } from "@/lib/article-loader";
import {
  AI_TARTALMAK_ARCHIVE_DESCRIPTION,
  AI_TARTALMAK_ARCHIVE_URL,
  buildArchiveJsonLd,
} from "@/lib/article-seo";

export const metadata: Metadata = {
  title: "AI tartalmak",
  description: AI_TARTALMAK_ARCHIVE_DESCRIPTION,
  alternates: {
    canonical: AI_TARTALMAK_ARCHIVE_URL,
  },
  openGraph: {
    title: "AI tartalmak — ZynAI",
    description: AI_TARTALMAK_ARCHIVE_DESCRIPTION,
    url: AI_TARTALMAK_ARCHIVE_URL,
    siteName: "ZynAI",
    locale: "hu_HU",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "ZynAI — AI integráció magyar vállalkozásoknak",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI tartalmak — ZynAI",
    description: AI_TARTALMAK_ARCHIVE_DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

export default function AiTartalmakLayout({ children }: { children: ReactNode }) {
  const archiveJsonLd = buildArchiveJsonLd(allArticles);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(archiveJsonLd) }}
      />
      {children}
    </>
  );
}

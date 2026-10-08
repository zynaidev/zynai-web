import type { Article } from "./article-types";
import { COMPANY } from "./company";

const SITE_URL = "https://zynai.hu";

const PUBLISHED_AT_BY_SLUG: Record<string, string> = {
  "aedificium-design-esettanulmany": "2025-01-01",
  "ipar-5-0-miert-bukik-el-a-legtobb-vallalat-az-ai-transzformacioval": "2026-03-01",
  "chatgpt-rol-claude-ra-valtanak-a-felhasznalok-hogyan-csinald-te-is": "2026-03-04",
  "facebook-marketplace-ai-automatizalas-a-meta-mesterseges-intelligenciaja-mar-valaszol-a-vevoknek":
    "2026-03-13",
  "wordpress-ai-ugynokok-matol-gepek-irjhatjak-es-publikalhatjak-a-weboldalad-tartalmat":
    "2026-03-22",
};

export const AI_TARTALMAK_ARCHIVE_URL = `${SITE_URL}/ai-tartalmak`;

export const AI_TARTALMAK_ARCHIVE_DESCRIPTION =
  "Heti AI PULZUS összefoglalók, üzleti elemzések és gyakorlati AI-tartalmak magyar vállalkozásoknak.";

export function getArticleCanonicalUrl(slug: string): string {
  return `${SITE_URL}/ai-tartalmak/${slug}`;
}

export function getArticlePublishedAt(article: Article): string | undefined {
  if (article.publishedAt) return article.publishedAt;
  const fromSlug = article.slug.match(/(\d{4}-\d{2}-\d{2})/)?.[1];
  if (fromSlug) return fromSlug;
  return PUBLISHED_AT_BY_SLUG[article.slug];
}

export function getArticleOgImageUrl(article: Article): string | undefined {
  if (!article.coverImage) return undefined;
  return article.coverImage.startsWith("http")
    ? article.coverImage
    : `${SITE_URL}${article.coverImage}`;
}

export function getOgImageMimeType(imageUrl: string): string {
  if (imageUrl.endsWith(".png")) return "image/png";
  if (imageUrl.endsWith(".jpg") || imageUrl.endsWith(".jpeg")) return "image/jpeg";
  return "image/webp";
}

export function buildArticleJsonLd(article: Article) {
  const url = getArticleCanonicalUrl(article.slug);
  const datePublished = getArticlePublishedAt(article);
  const image = getArticleOgImageUrl(article);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    ...(datePublished && { datePublished, dateModified: datePublished }),
    author: {
      "@type": "Person",
      name: "Bakos Attila",
      url: "https://www.linkedin.com/in/attila-bakos-4ab0a2353/",
    },
    publisher: {
      "@type": "Organization",
      name: "ZynAI",
      legalName: COMPANY.name,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/ZynAI_favicon.png`,
      },
    },
    ...(image && { image: [image] }),
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    inLanguage: "hu-HU",
    articleSection: article.tag,
    keywords: article.tag,
  };
}

export function buildArchiveJsonLd(articles: Article[]) {
  const blogArticles = articles.filter(
    (article) => article.slug !== "aedificium-design-esettanulmany",
  );

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AI tartalmak — ZynAI",
    description: AI_TARTALMAK_ARCHIVE_DESCRIPTION,
    url: AI_TARTALMAK_ARCHIVE_URL,
    inLanguage: "hu-HU",
    isPartOf: {
      "@type": "WebSite",
      name: "ZynAI",
      url: SITE_URL,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: blogArticles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: getArticleCanonicalUrl(article.slug),
        name: article.title,
      })),
    },
  };
}

import type { Article, ArticleSection } from "./article-types";

import aiMunkaprofil from "@/content/articles/2026-10-07-ai-munkaprofil.json";
import claudeCodeVibecoding from "@/content/articles/2026-09-28-claude-code-vibecoding.json";
import aiPulzusW24 from "@/content/articles/2026-06-14-ai-pulzus-2026-06-14.json";
import aiPulzusW23 from "@/content/articles/2026-06-07-ai-pulzus.json";
import aiPulzusW22 from "@/content/articles/2026-05-31-ai-pulzus.json";
import aiPulzusW21 from "@/content/articles/2026-05-26-ai-pulzus.json";
import aiPulzusW20 from "@/content/articles/2026-05-18-ai-pulzus.json";
import wordpress from "@/content/articles/2026-03-22-wordpress-ai-ugynokok-matol-gepek-irjhatjak-es-publikalhatjak-a-weboldalad-tartalmat.json";
import facebook from "@/content/articles/2026-03-13-facebook-marketplace-ai-automatizalas-a-meta-mesterseges-intelligenciaja-mar-valaszol-a-vevoknek.json";
import chatgpt from "@/content/articles/2026-03-04-chatgpt-rol-claude-ra-valtanak-a-felhasznalok-hogyan-csinald-te-is.json";
import ipar from "@/content/articles/2026-03-01-ipar-5-0-miert-bukik-el-a-legtobb-vallalat-az-ai-transzformacioval.json";
import aedificium from "@/content/articles/2025-01-01-aedificium-design-esettanulmany.json";

export type { Article, ArticleSection };

export const allArticles: Article[] = [
  aiMunkaprofil,
  claudeCodeVibecoding,
  aiPulzusW24,
  aiPulzusW23,
  aiPulzusW22,
  aiPulzusW21,
  aiPulzusW20,
  wordpress,
  facebook,
  chatgpt,
  ipar,
  aedificium,
] as Article[];

export function getArticleBySlug(slug: string): Article | undefined {
  return allArticles.find((a) => a.slug === slug);
}

export function getNextArticle(currentSlug: string): Article | undefined {
  const index = allArticles.findIndex((a) => a.slug === currentSlug);
  if (index === -1 || index === allArticles.length - 1) return undefined;
  return allArticles[index + 1];
}

/**
 * Explicit hero-card pick for the /ai-tartalmak listing. Among the articles
 * marked `featured`, the most recent one by `publishedAt` wins (missing
 * `publishedAt` sorts as oldest); ties keep the first one encountered.
 * Returns undefined when nothing is marked, so callers can fall back to
 * their previous "first in the list" behaviour.
 */
export function getFeaturedArticle(articles: Article[]): Article | undefined {
  const candidates = articles.filter((a) => a.featured);
  if (candidates.length === 0) return undefined;
  return candidates.reduce((latest, a) =>
    (a.publishedAt ?? "") > (latest.publishedAt ?? "") ? a : latest,
  );
}

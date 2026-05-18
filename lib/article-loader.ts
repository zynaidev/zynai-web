import type { Article, ArticleSection } from "./article-types";

import aiPulzus0518 from "@/content/articles/2026-05-18-ai-pulzus-2026-05-18.json";
import aiPulzus from "@/content/articles/2026-05-11-ai-pulzus-2026-05-12.json";
import wordpress from "@/content/articles/2026-03-22-wordpress-ai-ugynokok-matol-gepek-irjhatjak-es-publikalhatjak-a-weboldalad-tartalmat.json";
import facebook from "@/content/articles/2026-03-13-facebook-marketplace-ai-automatizalas-a-meta-mesterseges-intelligenciaja-mar-valaszol-a-vevoknek.json";
import chatgpt from "@/content/articles/2026-03-04-chatgpt-rol-claude-ra-valtanak-a-felhasznalok-hogyan-csinald-te-is.json";
import ipar from "@/content/articles/2026-03-01-ipar-5-0-miert-bukik-el-a-legtobb-vallalat-az-ai-transzformacioval.json";
import aedificium from "@/content/articles/2025-01-01-aedificium-design-esettanulmany.json";

export type { Article, ArticleSection };

export const allArticles: Article[] = [
  aiPulzus0518,
  aiPulzus,
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

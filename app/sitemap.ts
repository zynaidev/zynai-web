import { MetadataRoute } from "next";
import { allArticles } from "@/lib/article-loader";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://zynai.hu";
  const now = new Date();
  const articleUrls = allArticles.map((article) => ({
    url: `${base}/ai-tartalmak/${article.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: article.isWeekly ? 0.75 : 0.7,
  }));

  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${base}/kapcsolatfelvetel`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/esettanulmanyok`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/esettanulmanyok/aedificium-design`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/ai-tartalmak`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...articleUrls,
  ];
}

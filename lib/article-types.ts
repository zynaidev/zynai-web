export type ArticleSection =
  | { type: "lead" | "h2" | "h3" | "paragraph" | "quote" | "list"; text?: string; items?: string[] }
  | { type: "divider"; label?: string; text?: string; items?: string[] }
  | { type: "summary"; label?: string; items: string[]; text?: string }
  | { type: "conclusion"; label?: string; text: string; items?: string[] }
  | { type: "image"; src: string; alt?: string; caption?: string }
  | { type: "sources"; label?: string; items: { title: string; url: string }[] }
  | { type: "code"; code: string; language?: string }
  | { type: "table"; headers: string[]; rows: string[][]; caption?: string };

/**
 * A content/articles/*.json fájlokban ténylegesen előforduló `tag` értékek —
 * egyetlen forrás, amiből a listaoldal kategória-szűrője is épül.
 */
export const ARTICLE_TAGS = [
  "AI HÍREK",
  "ÜZLETI ELEMZÉS",
  "AI PULZUS",
  "ESETTANULMÁNY",
] as const;

export type ArticleTag = (typeof ARTICLE_TAGS)[number];

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  tag: ArticleTag;
  date: string;
  /** ISO 8601 date (YYYY-MM-DD) for SEO and structured data */
  publishedAt?: string;
  readingTime?: string;
  coverImage?: string;
  isWeekly?: boolean;
  content: ArticleSection[];
};

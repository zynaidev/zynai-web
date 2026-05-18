export type ArticleSection =
  | { type: "lead" | "h2" | "h3" | "paragraph" | "quote" | "list"; text?: string; items?: string[] }
  | { type: "divider"; label?: string; text?: string; items?: string[] }
  | { type: "summary"; label?: string; items: string[]; text?: string }
  | { type: "conclusion"; label?: string; text: string; items?: string[] }
  | { type: "image"; src: string; alt?: string; caption?: string }
  | { type: "sources"; label?: string; items: { title: string; url: string }[] };

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  date: string;
  readingTime?: string;
  coverImage?: string;
  isWeekly?: boolean;
  content: ArticleSection[];
};

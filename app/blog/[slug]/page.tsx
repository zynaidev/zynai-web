import type { Metadata } from "next";
import { notFound } from "next/navigation";

const articles = {
  "brand-foundation": {
    body: "This placeholder article marks the content route for the upcoming CMS integration.",
    title: "Brand foundation",
  },
  "motion-and-depth": {
    body: "This placeholder article marks where motion and 3D implementation notes will live.",
    title: "Motion and depth",
  },
} satisfies Record<string, { body: string; title: string }>;

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles[slug as keyof typeof articles];

  if (!article) {
    return {
      title: "Article not found · Zynai",
    };
  }

  return {
    title: `${article.title} · Zynai`,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = articles[slug as keyof typeof articles];

  if (!article) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-24">
      <p className="font-mono text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
        Article
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
        {article.title}
      </h1>
      <p className="mt-8 text-lg leading-8 text-muted-foreground">{article.body}</p>
    </main>
  );
}

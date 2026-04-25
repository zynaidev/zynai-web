import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

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
    <main>
      <section className="py-section-mobile lg:py-section-desktop">
        <Container className="max-w-3xl">
          <SectionLabel number="01" text="ARTICLE" />
          <h1 className="type-hero mt-5">{article.title}</h1>
          <p className="type-body-large mt-8">{article.body}</p>
        </Container>
      </section>
    </main>
  );
}

import { ArrowLink } from "@/components/ui/arrow-link";
import { Container } from "@/components/ui/container";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionLabel } from "@/components/ui/section-label";

const articles = [
  {
    excerpt: "Notes on shaping the Zynai brand system, motion language, and AI product narrative.",
    slug: "brand-foundation",
    title: "Brand foundation",
  },
  {
    excerpt: "How ambient 3D and scroll choreography can support a premium marketing experience.",
    slug: "motion-and-depth",
    title: "Motion and depth",
  },
];

export default function BlogIndexPage() {
  return (
    <main>
      <section className="py-section-mobile lg:py-section-desktop">
        <Container>
          <SectionLabel number="01" text="ARTICLES" />
          <SectionHeading>Ideas, releases, and field notes.</SectionHeading>
          <div className="mt-12 grid gap-4">
            {articles.map((article) => (
              <GlassCard
                className="transition-colors hover:border-border-default hover:bg-bg-glass-strong"
                key={article.slug}
              >
                <h2 className="type-card-heading">{article.title}</h2>
                <p className="type-body mt-3 max-w-2xl">{article.excerpt}</p>
                <ArrowLink
                  className="mt-6"
                  href={`/blog/${article.slug}`}
                  text="Read article"
                />
              </GlassCard>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}

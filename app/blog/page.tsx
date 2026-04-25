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
    <main className="mx-auto w-full max-w-5xl px-6 py-24">
      <p className="font-mono text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
        Articles
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
        Ideas, releases, and field notes.
      </h1>
      <div className="mt-12 grid gap-4">
        {articles.map((article) => (
          <a
            className="rounded-3xl border border-border bg-card p-6 transition-colors hover:bg-accent"
            href={`/blog/${article.slug}`}
            key={article.slug}
          >
            <h2 className="text-2xl font-semibold tracking-tight">{article.title}</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">{article.excerpt}</p>
          </a>
        ))}
      </div>
    </main>
  );
}

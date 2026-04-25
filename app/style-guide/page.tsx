import { Button } from "@/components/ui/button";

const swatches = [
  { className: "bg-background", label: "background" },
  { className: "bg-foreground", label: "foreground" },
  { className: "bg-card", label: "card" },
  { className: "bg-primary", label: "primary" },
  { className: "bg-secondary", label: "secondary" },
  { className: "bg-accent", label: "accent" },
  { className: "bg-muted", label: "muted" },
  { className: "bg-border", label: "border" },
];

export default function StyleGuidePage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-24">
      <p className="font-mono text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
        Internal reference
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
        Zynai design system baseline.
      </h1>
      <section className="mt-12 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card p-6">
          <h2 className="text-2xl font-semibold tracking-tight">Typography</h2>
          <p className="mt-4 font-heading text-3xl font-semibold">Instrument Sans display</p>
          <p className="mt-2 text-muted-foreground">Inter body text for readable product copy.</p>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
            Geist Mono labels
          </p>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6">
          <h2 className="text-2xl font-semibold tracking-tight">Components</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button>Primary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </div>
      </section>
      <section className="mt-4 grid gap-4 md:grid-cols-4">
        {swatches.map((swatch) => (
          <div className="rounded-3xl border border-border bg-card p-4" key={swatch.label}>
            <div className={`h-24 rounded-2xl ${swatch.className}`} />
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {swatch.label}
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}

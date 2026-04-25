import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Zynai. All rights reserved.</p>
        <div className="flex gap-4">
          <Link className="transition-colors hover:text-foreground" href="/blog">
            Blog
          </Link>
          <Link className="transition-colors hover:text-foreground" href="/style-guide">
            Style guide
          </Link>
        </div>
      </div>
    </footer>
  );
}

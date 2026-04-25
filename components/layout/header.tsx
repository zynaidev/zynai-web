import Link from "next/link";

import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Articles" },
  { href: "/style-guide", label: "Style guide" },
];

export function Header({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl",
        className,
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
        <Link className="font-heading text-lg font-semibold tracking-tight" href="/">
          Zynai
        </Link>
        <nav className="flex items-center gap-5 font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {navItems.map((item) => (
            <Link
              className="transition-colors hover:text-foreground"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

import Link from "next/link";

import { Container } from "@/components/ui/container";
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
        "sticky top-0 z-50 border-b border-border-hairline bg-bg-base/80 backdrop-blur-xl",
        className,
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link className="font-heading text-lg font-semibold tracking-tight" href="/">
          Zynai
        </Link>
        <nav className="flex items-center gap-5 font-mono text-xs font-medium uppercase tracking-[0.12em] text-text-tertiary">
          {navItems.map((item) => (
            <Link
              className="transition-colors hover:text-text-primary"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}

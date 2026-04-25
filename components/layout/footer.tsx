import Link from "next/link";

import { Container } from "@/components/ui/container";

export function Footer() {
  return (
    <footer className="border-t border-border-hairline">
      <Container className="flex flex-col gap-4 py-10 text-sm text-text-tertiary sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Zynai. All rights reserved.</p>
        <div className="flex gap-4">
          <Link className="transition-colors hover:text-text-primary" href="/blog">
            Blog
          </Link>
          <Link className="transition-colors hover:text-text-primary" href="/style-guide">
            Style guide
          </Link>
        </div>
      </Container>
    </footer>
  );
}

import Link from "next/link";

import { ZynaiCubeIcon } from "@/components/brand/ZynaiCubeIcon";
import { Container } from "@/components/ui/container";

export function Footer() {
  return (
    <footer className="border-t border-border-hairline">
      <Container className="flex flex-col gap-4 py-10 text-sm text-text-tertiary sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3">
          <Link className="group flex items-center gap-2.5" href="/">
            <ZynaiCubeIcon className="h-7 w-7" />
            <span className="font-display text-[24px] font-semibold tracking-tight text-text-primary">
              ZynAI
            </span>
          </Link>
          <p>© {new Date().getFullYear()} Zynai. All rights reserved.</p>
        </div>
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

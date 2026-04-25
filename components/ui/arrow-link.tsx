import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

type ArrowLinkProps = {
  className?: string;
  href: string;
  text: string;
};

export function ArrowLink({ className, href, text }: ArrowLinkProps) {
  return (
    <Link
      className={cn(
        "group inline-flex items-center gap-2 text-sm font-medium text-text-primary transition-colors hover:text-accent",
        className,
      )}
      href={href}
    >
      {text}
      <ArrowRight
        aria-hidden="true"
        className="transition-transform duration-300 group-hover:translate-x-1"
        size={16}
      />
    </Link>
  );
}

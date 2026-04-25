import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

export function PillBadge({
  className,
  ...props
}: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border border-border-hairline bg-bg-glass px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-text-mono",
        className,
      )}
      {...props}
    />
  );
}

import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

export function GlassCard({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border-hairline bg-bg-glass p-6 backdrop-blur-glass lg:p-10",
        className,
      )}
      {...props}
    />
  );
}

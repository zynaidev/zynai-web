import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

export function SectionHeading({
  className,
  ...props
}: ComponentPropsWithoutRef<"h2">) {
  return <h2 className={cn("type-section-heading mt-5 max-w-4xl", className)} {...props} />;
}

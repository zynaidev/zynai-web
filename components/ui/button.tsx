import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full font-sans text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50",
  {
    defaultVariants: {
      size: "default",
      variant: "primary",
    },
    variants: {
      size: {
        default: "px-6 py-3",
        sm: "px-4 py-2 text-xs",
      },
      variant: {
        ghost:
          "relative text-text-primary after:absolute after:bottom-1.5 after:left-4 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:text-accent hover:after:w-[calc(100%-2rem)]",
        primary:
          "bg-accent text-accent-on-light hover:scale-[1.02] hover:shadow-[0_0_32px_var(--accent-glow)]",
        secondary:
          "border border-border-default bg-transparent text-text-primary hover:bg-bg-glass-strong",
      },
    },
  },
);

export function Button({
  className,
  size,
  variant,
  ...props
}: ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return (
    <button
      className={cn(buttonVariants({ className, size, variant }))}
      data-slot="button"
      {...props}
    />
  );
}

export { buttonVariants };

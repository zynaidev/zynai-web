import { cn } from "@/lib/utils";

type SectionLabelProps = {
  className?: string;
  number: string;
  text: string;
};

export function SectionLabel({ className, number, text }: SectionLabelProps) {
  return (
    <p className={cn("type-label flex items-center gap-3", className)}>
      <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
      <span>
        {number} — {text}
      </span>
    </p>
  );
}

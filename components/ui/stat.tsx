import { cn } from "@/lib/utils";

type StatProps = {
  className?: string;
  label: string;
  source: string;
  value: string;
};

export function Stat({ className, label, source, value }: StatProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <p className="type-stat">{value}</p>
      <p className="type-body max-w-sm">{label}</p>
      <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-tertiary">
        {source}
      </p>
    </div>
  );
}

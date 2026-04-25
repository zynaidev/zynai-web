import { cn } from "@/lib/utils";

export function BackgroundGlow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
    >
      <div className="absolute -right-32 top-0 h-80 w-80 rounded-full bg-accent-glow opacity-40 blur-[120px]" />
      <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-[#3b1d70]/[0.08] opacity-40 blur-[120px]" />
      <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-white/[0.03] opacity-30 blur-[120px]" />
    </div>
  );
}

import { cn } from "@/lib/utils";

export function BackgroundGlow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
    >
      <div className="absolute -right-72 -top-64 h-[900px] w-[900px] rounded-full bg-[rgba(189,255,0,0.25)] blur-[140px]" />
      <div className="absolute -bottom-80 -left-72 h-[1000px] w-[1000px] rounded-full bg-[#3b1d70]/15 blur-[140px]" />
      <div className="absolute left-1/2 top-1/4 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-white/[0.035] opacity-40 blur-[140px]" />
    </div>
  );
}

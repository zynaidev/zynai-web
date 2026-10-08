import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Az oldal nem található",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center bg-[var(--bg-base)] px-6 py-24">
      <div className="mx-auto w-full max-w-[640px] text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#BDFF00]">
          404 — Az oldal nem található
        </p>
        <h1
          className="mt-6 font-display font-medium text-[var(--text-primary)]"
          style={{
            fontSize: "clamp(32px, 5vw, 52px)",
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
          }}
        >
          Ez az oldal nem létezik, vagy elköltözött.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-[17px] leading-[1.7] text-[var(--text-secondary)]">
          Ellenőrizd a címet, vagy indulj tovább a főoldalról vagy a szakmai
          cikkek közül.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[#09090B] transition-[filter] duration-200 hover:brightness-110"
            href="/"
          >
            Vissza a főoldalra
          </Link>
          <Link
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent)] transition-colors duration-200 hover:bg-[rgba(189,255,0,0.1)]"
            href="/ai-tartalmak"
          >
            AI tartalmak
          </Link>
        </div>
      </div>
    </main>
  );
}

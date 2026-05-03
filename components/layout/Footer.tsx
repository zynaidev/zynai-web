"use client";

function ZynaiCubeIconSmall() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <polygon points="14,2 26,9 26,19 14,26 2,19 2,9" fill="#0d1a0d" stroke="#BDFF00" strokeWidth="1.5" />
      <polygon points="14,2 26,9 14,16 2,9" fill="#1a2e1a" stroke="#BDFF00" strokeWidth="0.5" />
      <polygon points="14,16 26,9 26,19 14,26" fill="#0a1a0a" stroke="#BDFF00" strokeWidth="0.5" />
      <polygon points="14,16 2,9 2,19 14,26" fill="#112211" stroke="#BDFF00" strokeWidth="0.5" />
    </svg>
  );
}

function LinkedinIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    </svg>
  );
}

function GithubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--border-hairline)] bg-[var(--bg-elevated)]">
      <div className="container mx-auto max-w-[1280px] px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1 — Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <ZynaiCubeIconSmall />
              <span className="font-display font-semibold text-[18px] tracking-tight text-[var(--text-primary)]">
                ZynAI
              </span>
            </div>
            <p className="mt-4 text-[14px] leading-[1.6] text-[var(--text-secondary)] max-w-[28ch]">
              AI integráció és üzleti tanácsadás magyar vállalkozásoknak.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/attila-bakos-4ab0a2353/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-glass)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:border-[var(--border-default)] transition-all duration-300"
              >
                <LinkedinIcon size={15} />
              </a>
              <a
                href="#"
                aria-label="X (Twitter)"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-glass)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:border-[var(--border-default)] transition-all duration-300"
              >
                <TwitterIcon size={15} />
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-glass)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:border-[var(--border-default)] transition-all duration-300"
              >
                <GithubIcon size={15} />
              </a>
            </div>
          </div>

          {/* Column 2 — Tartalom */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-tertiary)] mb-5">TARTALOM</p>
            <ul className="space-y-3">
              {[
                { label: "Mi az AI integráció?", href: "#modszer" },
                { label: "Hogyan dolgozom?", href: "#hogyan" },
                { label: "Alkalmazási területek", href: "#alkalmazas" },
                { label: "Rólam", href: "#rolam" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Anyagok */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-tertiary)] mb-5">ANYAGOK</p>
            <ul className="space-y-3">
              {[
                { label: "Esettanulmányok", href: "/esettanulmanyok" },
                { label: "AI tartalmak", href: "/ai-tartalmak" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Kapcsolat */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-tertiary)] mb-5">KAPCSOLAT</p>
            <ul className="space-y-3">
              {[
                { label: "Időpontfoglalás", href: "/kapcsolatfelvetel" },
                { label: "info@zynai.hu", href: "mailto:info@zynai.hu" },
                { label: "Adatvédelem", href: "/adatvedelem" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-16 lg:mt-20 pt-8 border-t border-[var(--border-hairline)]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
              © 2026 ZYNAI · BAKOS ATTILA
            </p>
            <div className="flex items-center gap-2">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-[var(--accent)] opacity-60 animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-[var(--accent)]" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
                MŰKÖDIK · ALL SYSTEMS OPERATIONAL
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

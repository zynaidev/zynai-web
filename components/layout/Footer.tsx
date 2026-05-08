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

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
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
                className="text-[var(--text-tertiary)] hover:text-[#BDFF00] transition-colors duration-200"
              >
                <LinkedinIcon />
              </a>
              <a
                href="https://www.facebook.com/zynai.hu"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-[var(--text-tertiary)] hover:text-[#BDFF00] transition-colors duration-200"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://github.com/zynaidev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-[var(--text-tertiary)] hover:text-[#BDFF00] transition-colors duration-200"
              >
                <GithubIcon />
              </a>
            </div>
          </div>

          {/* Column 2 — Tartalom */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-tertiary)] mb-5">TARTALOM</p>
            <ul className="space-y-3">
                            {[
                { label: "Mi az AI integráció?", href: "/#modszer" },
                { label: "Hogyan dolgozom?", href: "/#hogyan" },
                { label: "Alkalmazási területek", href: "/#alkalmazas" },
                { label: "Rólam", href: "/#rolam" },
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
                        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
                © 2026 ZynAI · Minden jog fenntartva
              </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

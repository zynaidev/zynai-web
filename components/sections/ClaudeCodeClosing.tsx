import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/container";

export function ClaudeCodeClosing() {
  return (
    <section className="border-t border-border-hairline py-section-mobile lg:py-section-desktop">
      <Container>
        <div className="relative mx-auto max-w-2xl overflow-hidden rounded-4xl border border-border-hairline bg-bg-elevated px-8 py-14 text-center sm:px-12 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-glow blur-3xl"
          />
          <div className="relative">
            <h2 className="type-section-heading">
              Ez egy kivonat egy nagyobb rendszerből
            </h2>
            <p className="type-body mx-auto mt-6 max-w-xl">
              Ezek a sablonok egy munkamódszer részei, ami valódi
              ügyfélprojekteken állt össze. A teljes rendszerben van
              specifikációs sablon, projektszabályok, élesítés előtti
              ellenőrzőlista és menetrend arra az esetre, ha elakadsz.
            </p>
            <p className="type-body mx-auto mt-5 max-w-xl">
              A VibeCoding képzésen ezt tanítom: nem a kódolást, hanem a
              döntéseket. Mit építs, milyen sorrendben, és honnan tudod, hogy
              kész van.
            </p>
            <div className="mt-8 flex justify-center">
              <span className="inline-flex rounded-full shadow-[0_0_40px_var(--accent-glow)]">
                <Link
                  className="group inline-flex overflow-hidden rounded-full"
                  href="/vibecoding-pilot"
                >
                  <span className="flex items-center bg-accent px-8 py-4 text-[15px] font-medium text-accent-on-light">
                    Megnézem a képzést
                  </span>
                  <span
                    aria-hidden="true"
                    className="w-px shrink-0 self-stretch bg-accent-on-light/15"
                  />
                  <span className="flex items-center bg-accent px-5 py-4">
                    <ArrowRight
                      aria-hidden="true"
                      className="text-accent-on-light"
                      size={16}
                    />
                  </span>
                </Link>
              </span>
            </div>
            <a
              className="mt-5 inline-block text-sm text-text-secondary underline underline-offset-2 hover:text-text-primary"
              href="https://www.facebook.com/groups/1355789193061643"
              rel="noopener noreferrer"
              target="_blank"
            >
              Csatlakozom a Facebook-csoporthoz
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

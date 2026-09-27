import { tipEntries } from "@/content/claude-code/tippek";
import { Container } from "@/components/ui/container";

export function ClaudeCodeTips() {
  return (
    <section className="border-t border-border-hairline bg-bg-elevated py-section-mobile lg:py-section-desktop">
      <Container>
        <h2 className="type-section-heading">Tippek és trükkök</h2>
        <p className="type-body mt-4">
          Ez a rész változik, ahogy a modellek változnak. Minden bejegyzés
          dátumozva van — ha régi, kezeld fenntartással.
        </p>
        <ul className="mt-8 flex flex-col">
          {tipEntries.map((entry) => (
            <li
              className="border-t border-border-hairline py-6 first:border-t-0 first:pt-0"
              key={entry.title}
            >
              <h3>
                <span className="block font-mono text-xs uppercase tracking-[0.12em] text-text-tertiary">
                  {entry.date}
                </span>
                <span className="type-card-heading mt-1 block">
                  — {entry.title}
                </span>
              </h3>
              <p className="type-body mt-3">{entry.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

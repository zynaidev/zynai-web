import { HeroSection } from "@/components/sections/hero-section";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

const placeholderSections = [
  {
    id: "modszer",
    number: "01",
    text: "MI AZ AI INTEGRÁCIÓ?",
    heading: "A módszertanról szóló rész következik.",
  },
  {
    id: "hogyan",
    number: "02",
    text: "HOGYAN DOLGOZOM?",
    heading: "A folyamat lépéseinek bemutatása következik.",
  },
  {
    number: "03",
    text: "ALKALMAZÁSI TERÜLETEK",
    heading: "Az alkalmazási területek listája következik.",
  },
  {
    id: "rolam",
    number: "04",
    text: "RÓLAM",
    heading: "A bemutatkozás következik.",
  },
  {
    id: "munkak",
    anchorId: "cikkek",
    number: "05",
    text: "ESETTANULMÁNYOK ÉS CIKKEK",
    heading: "A dokumentált projektek és cikkek listája következik.",
  },
];

export default function MarketingHomePage() {
  return (
    <>
      <HeroSection />
      {placeholderSections.map((section) => (
        <section
          className="relative py-20 md:py-32"
          id={section.id}
          key={section.number}
        >
          {section.anchorId ? (
            <span
              aria-hidden="true"
              className="absolute top-0"
              id={section.anchorId}
            />
          ) : null}
          <Container>
            <SectionLabel number={section.number} text={section.text} />
            <h2 className="mt-6 max-w-3xl font-display text-[32px] font-medium leading-tight text-text-secondary">
              {section.heading}
            </h2>
            <p className="mt-5 font-mono text-xs font-medium uppercase tracking-[0.12em] text-text-tertiary">
              {"// Tartalom hamarosan"}
            </p>
          </Container>
        </section>
      ))}
    </>
  );
}

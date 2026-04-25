import { Hero } from "@/components/sections/Hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionLabel } from "@/components/ui/section-label";

export default function MarketingHomePage() {
  return (
    <>
      <Hero />

      <section
        className="scroll-mt-24 py-section-mobile lg:py-section-desktop"
        id="modszer"
      >
        <Container>
          <SectionLabel number="02" text="HOGYAN DOLGOZOM" />
          <SectionHeading>Az AI integráció üzleti folyamattal kezdődik.</SectionHeading>
          <p className="type-body-large mt-6 max-w-3xl">
            Feltérképezem a jelenlegi működést, megkeresem a mérhető
            beavatkozási pontokat, majd olyan automatizált rendszereket építek,
            amelyek a napi munka részévé válnak.
          </p>
        </Container>
      </section>

      <section
        className="scroll-mt-24 py-section-mobile lg:py-section-desktop"
        id="rolam"
      >
        <Container>
          <SectionLabel number="04" text="RÓLAM" />
          <SectionHeading>Üzleti gondolkodás, technológiai megvalósítás.</SectionHeading>
          <p className="type-body-large mt-6 max-w-3xl">
            A fókuszom az, hogy az AI ne látványos demó legyen, hanem stabil,
            érthető és fenntartható működési előny.
          </p>
        </Container>
      </section>

      <section
        className="scroll-mt-24 py-section-mobile lg:py-section-desktop"
        id="munkak"
      >
        <Container>
          <SectionLabel number="05" text="ESETTANULMÁNYOK" />
          <SectionHeading>Megvalósított AI rendszerek és folyamatfejlesztések.</SectionHeading>
          <p className="type-body-large mt-6 max-w-3xl">
            Itt kapnak helyet azok a projektek, ahol az automatizáció, az
            adatalapú döntéstámogatás és az AI eszközök kézzelfogható üzleti
            eredménnyé álltak össze.
          </p>
        </Container>
      </section>

      <section
        className="scroll-mt-24 py-section-mobile lg:py-section-desktop"
        id="cikkek"
      >
        <Container>
          <SectionLabel number="06" text="CIKKEK" />
          <SectionHeading>Tényszerű gondolatok AI-ról, üzletről és rendszerekről.</SectionHeading>
          <p className="type-body-large mt-6 max-w-3xl">
            A szakmai cikkek az AI bevezetésének üzleti oldalát, döntési
            szempontjait és gyakorlati tanulságait mutatják be.
          </p>
        </Container>
      </section>
    </>
  );
}

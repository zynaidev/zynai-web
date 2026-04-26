import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

export function HowIWork() {
  return (
    <section className="relative py-20 md:py-32 lg:py-40" id="hogyan">
      <Container>
        <SectionLabel number="02" text="HOGYAN DOLGOZOM?" />
        <h2 className="type-section-heading mt-6 lg:max-w-[16ch]">
          Folyamatfelmérés. Diagnózis. Megvalósítás.
        </h2>

        <div className="mt-10 max-w-[60ch]">
          <p className="type-body-large">
            Minden projekt egy strukturált folyamatfelméréssel kezdődik.
            Megvizsgálom a vállalkozás jelenlegi működését — az ismétlődő
            feladatokat, az emberi szűk keresztmetszeteket, az adatáramlást a
            rendszerek között. Ebből kiderül, hol van valódi lehetőség az AI
            bevezetésére, és hol nincs.
          </p>
          <p className="type-body-large mt-5">
            Az eredmény nem egy prezentáció. Egy konkrét kép arról, mit érdemes
            megvalósítani, milyen sorrendben, és milyen várható hatással.
          </p>
          <p className="mt-5 font-sans leading-[1.65] text-text-primary [font-size:clamp(16px,1.2vw,18px)]">
            A megvalósítást is én végzem — a diagnózistól az éles rendszerig.
          </p>
        </div>

        {/* Cards will be added in the next prompt */}
      </Container>
    </section>
  );
}

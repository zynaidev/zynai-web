import { About } from "@/components/sections/About";
import { Applications } from "@/components/sections/Applications";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { HeroSection } from "@/components/sections/hero-section";
import { HowIWork } from "@/components/sections/HowIWork";
import { IntegrationStack } from "@/components/sections/IntegrationStack";
import { Resources } from "@/components/sections/Resources";
import { Testimonial } from "@/components/sections/Testimonial";
import WhatIsAI from "@/components/sections/WhatIsAI";

export default function MarketingHomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "ZynAI",
            description:
              "AI integráció és üzleti automatizáció magyar kis- és középvállalkozásoknak.",
            url: "https://zynai.hu",
            founder: {
              "@type": "Person",
              name: "Bakos Attila",
              jobTitle: "AI integrátor és üzleti tanácsadó",
              sameAs: "https://www.linkedin.com/in/attila-bakos-4ab0a2353/",
            },
            areaServed: {
              "@type": "Country",
              name: "Hungary",
            },
            inLanguage: "hu",
            email: "info@zynai.hu",
            sameAs: ["https://www.linkedin.com/in/attila-bakos-4ab0a2353/"],
          }),
        }}
      />
      <HeroSection />
      <WhatIsAI />
      <HowIWork />
      <Applications />
      <About />
      <Resources />
      <Testimonial />
      <IntegrationStack />
      <FinalCTA />
    </>
  );
}

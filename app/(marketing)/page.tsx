import dynamic from "next/dynamic";

import { HeroSection } from "@/components/sections/hero-section";

const WhatIsAI = dynamic(
  () => import("@/components/sections/WhatIsAI"),
  {
    loading: () => <div style={{ minHeight: "700px" }} />,
    ssr: true,
  }
);

const HowIWork = dynamic(
  () => import("@/components/sections/HowIWork").then((mod) => mod.HowIWork),
  {
    loading: () => <div style={{ minHeight: "1200px" }} />,
    ssr: true,
  }
);

const Applications = dynamic(
  () => import("@/components/sections/Applications").then((mod) => mod.Applications),
  {
    loading: () => <div style={{ minHeight: "800px" }} />,
    ssr: true,
  }
);

const About = dynamic(
  () => import("@/components/sections/About").then((mod) => mod.About),
  {
    loading: () => <div style={{ minHeight: "700px" }} />,
    ssr: true,
  }
);

const Resources = dynamic(
  () => import("@/components/sections/Resources").then((mod) => mod.Resources),
  {
    loading: () => <div style={{ minHeight: "600px" }} />,
    ssr: true,
  }
);

const Testimonial = dynamic(
  () => import("@/components/sections/Testimonial").then((mod) => mod.Testimonial),
  {
    loading: () => <div style={{ minHeight: "400px" }} />,
    ssr: true,
  }
);

const IntegrationStack = dynamic(
  () => import("@/components/sections/IntegrationStack").then((mod) => mod.IntegrationStack),
  {
    loading: () => <div style={{ minHeight: "500px" }} />,
    ssr: true,
  }
);

const FinalCTA = dynamic(
  () => import("@/components/sections/FinalCTA").then((mod) => mod.FinalCTA),
  {
    loading: () => <div style={{ minHeight: "600px" }} />,
    ssr: true,
  }
);

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

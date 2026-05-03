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

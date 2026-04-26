import { About } from "@/components/sections/About";
import { Applications } from "@/components/sections/Applications";
import { HeroSection } from "@/components/sections/hero-section";
import { HowIWork } from "@/components/sections/HowIWork";
import { Resources } from "@/components/sections/Resources";
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
    </>
  );
}

import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Aedificium Design esettanulmány: tízszeres elérés",
  description:
    "AI-vezérelt social media automatizáció és prémium weboldal az Aedificium Designnál, mérhető eredményekkel, töredék idő alatt.",
  alternates: {
    canonical: "/esettanulmanyok/aedificium-design",
  },
  openGraph: {
    title: "Aedificium Design esettanulmány: tízszeres elérés — ZynAI",
    description:
      "AI-vezérelt social media automatizáció és prémium weboldal az Aedificium Designnál, mérhető eredményekkel, töredék idő alatt.",
    url: "/esettanulmanyok/aedificium-design",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "ZynAI — AI integráció magyar vállalkozásoknak",
      },
    ],
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

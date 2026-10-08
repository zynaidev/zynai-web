import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "SilverLimo esettanulmány: 14× gyorsabb weboldal",
  description:
    "WordPress-ről Next.js-re migráltunk egy budapesti limuzinbérlő céget, a Google Ads konverziómérés megszakítása nélkül, mérhető eredményekkel.",
  alternates: {
    canonical: "/esettanulmanyok/silverlimo",
  },
  openGraph: {
    title: "SilverLimo esettanulmány: 14× gyorsabb weboldal — ZynAI",
    description:
      "WordPress-ről Next.js-re migráltunk egy budapesti limuzinbérlő céget, a Google Ads konverziómérés megszakítása nélkül, mérhető eredményekkel.",
    url: "/esettanulmanyok/silverlimo",
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

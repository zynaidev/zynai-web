import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Kapcsolatfelvétel – díjmentes 30 perces átbeszélés",
  description:
    "Írd le, hol veszít időt a vállalkozásod, és egy díjmentes 30 perces átbeszélésen megnézzük, hol hozhat valódi eredményt az AI.",
  alternates: {
    canonical: "/kapcsolatfelvetel",
  },
  openGraph: {
    title: "Kapcsolatfelvétel – díjmentes 30 perces átbeszélés — ZynAI",
    description:
      "Írd le, hol veszít időt a vállalkozásod, és egy díjmentes 30 perces átbeszélésen megnézzük, hol hozhat valódi eredményt az AI.",
    url: "/kapcsolatfelvetel",
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

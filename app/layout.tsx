import type { Metadata } from "next";
import { Geist_Mono, Instrument_Sans, Inter } from "next/font/google";
import "./globals.css";

const display = Instrument_Sans({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
});

const body = Inter({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

const geistMono = Geist_Mono({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zynai.hu"),
  title: {
    default: "ZynAI — AI integráció magyar vállalkozásoknak",
    template: "%s — ZynAI",
  },
  description:
    "Bakos Attila AI integrátor. Automatizáció, folyamatfejlesztés és AI bevezetés magyar kis- és középvállalkozásoknak. Díjmentes audit.",
  keywords: [
    "AI integráció",
    "mesterséges intelligencia",
    "KKV automatizáció",
    "n8n",
    "folyamatautomatizálás",
    "magyar vállalkozás",
    "Bakos Attila",
  ],
  authors: [
    {
      name: "Bakos Attila",
      url: "https://www.linkedin.com/in/attila-bakos-4ab0a2353/",
    },
  ],
  creator: "Bakos Attila",
  openGraph: {
    type: "website",
    locale: "hu_HU",
    url: "https://zynai.hu",
    siteName: "ZynAI",
    title: "ZynAI — AI integráció magyar vállalkozásoknak",
    description:
      "Automatizáció, folyamatfejlesztés és AI bevezetés magyar KKV-knak. Díjmentes 30 perces audit.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ZynAI — AI integráció magyar vállalkozásoknak",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZynAI — AI integráció magyar vállalkozásoknak",
    description: "Automatizáció és AI bevezetés magyar KKV-knak.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  alternates: {
    canonical: "https://zynai.hu",
  },
  icons: {
    icon: "/ZynAI_favicon.png",
    shortcut: "/ZynAI_favicon.png",
    apple: "/ZynAI_favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="hu"
      className={`${display.variable} ${body.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full bg-bg-base font-sans text-text-secondary">
        {children}
      </body>
    </html>
  );
}

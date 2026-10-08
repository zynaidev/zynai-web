import type { Metadata } from "next";
import { Geist_Mono, Instrument_Sans, Inter } from "next/font/google";
import Script from "next/script";

import { ConsentBanner } from "@/components/consent/ConsentBanner";
import { consentDefaultScript } from "@/lib/analytics/consent";
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
  },
  twitter: {
    card: "summary_large_image",
    title: "ZynAI — AI integráció magyar vállalkozásoknak",
    description: "Automatizáció és AI bevezetés magyar KKV-knak.",
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
  category: "technology",
  icons: {
    icon: "/ZynAI_favicon.png",
    shortcut: "/ZynAI_favicon.png",
    apple: "/ZynAI_favicon.png",
  },
  manifest: "/manifest.webmanifest",
};

// A GTM-tároló azonosítója build-időben kerül a kódba (élesben Docker
// build-argumentum). Ha üres, se consent szkript, se GTM nem renderelődik.
const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

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
      <head>
        {gtmId ? (
          // Consent Mode v2 default: mindennek a GTM előtt kell lefutnia.
          <script
            dangerouslySetInnerHTML={{ __html: consentDefaultScript() }}
          />
        ) : null}
      </head>
      <body className="min-h-full bg-bg-base font-sans text-text-secondary">
        {gtmId ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        ) : null}
        {children}
        {gtmId ? <ConsentBanner /> : null}
        {gtmId ? (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer',${JSON.stringify(gtmId)});`}
          </Script>
        ) : null}
      </body>
    </html>
  );
}

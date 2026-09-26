"use client";

import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

import { SmoothScroll } from "@/components/animations/smooth-scroll";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/header";

const MatrixBackground = dynamic(
  () => import("@/components/ui/MatrixBackground").then(mod => mod.MatrixBackground),
  { ssr: false }
);

export default function MarketingLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const pathname = usePathname();
  const hideHeader = pathname === "/vibecoding-pilot";

  return (
    <SmoothScroll>
      <div className="flex min-h-screen flex-col">
        <MatrixBackground />
        {hideHeader ? null : <Header />}
        <main className="relative z-10 flex-1">{children}</main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}

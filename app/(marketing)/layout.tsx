"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

const SmoothScrollProvider = dynamic(
  () => import("@/components/providers/SmoothScrollProvider"),
  { ssr: false },
);

export default function MarketingLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <SmoothScrollProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}

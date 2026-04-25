"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#modszer", label: "Módszer" },
  { href: "#munkak", label: "Munkáim" },
  { href: "#cikkek", label: "Cikkek" },
  { href: "#rolam", label: "Rólam" },
];

function scrollToAnchor(
  event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  href: string,
  onComplete?: () => void,
) {
  event.preventDefault();

  const target = document.querySelector(href);

  if (!target) {
    window.location.href = `/${href}`;
    return;
  }

  target.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.pushState(null, "", href);
  onComplete?.();
}

export function Header({ className }: { className?: string }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-50 w-full border-b transition-colors duration-300",
          isScrolled
            ? "border-border-hairline bg-[rgba(9,9,11,0.7)] backdrop-blur-[20px]"
            : "border-transparent bg-transparent",
          className,
        )}
      >
        <Container className="relative flex h-16 items-center justify-between md:h-[72px]">
          <Link
            className="flex items-center gap-3 font-display text-lg font-medium tracking-[-0.01em] text-text-primary"
            href="/"
          >
            <Image
              alt=""
              className="h-8 w-8"
              height={32}
              src="/brand/zynai-logo.svg"
              width={32}
            />
            <span>ZynAI</span>
          </Link>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 text-sm font-medium text-text-secondary md:flex">
            {navItems.map((item) => (
              <a
                className="transition-colors duration-200 hover:text-text-primary"
                href={item.href}
                key={item.href}
                onClick={(event) => scrollToAnchor(event, item.href)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <Button
            className="hidden md:inline-flex"
            onClick={(event) => scrollToAnchor(event, "#rolam")}
            size="sm"
            variant="primary"
          >
            Időpontfoglalás
          </Button>

          <button
            aria-label="Menü megnyitása"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-hairline bg-white/[0.03] text-text-primary md:hidden"
            onClick={() => setIsMenuOpen(true)}
            type="button"
          >
            <Menu aria-hidden="true" size={20} />
          </button>
        </Container>
      </header>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="fixed inset-0 z-[60] bg-bg-base/95 backdrop-blur-[20px] md:hidden"
            exit={{ opacity: 0, y: -24 }}
            initial={{ opacity: 0, y: -32 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <Container className="flex h-16 items-center justify-between">
              <Link
                className="flex items-center gap-3 font-display text-lg font-medium text-text-primary"
                href="/"
                onClick={() => setIsMenuOpen(false)}
              >
                <Image
                  alt=""
                  className="h-8 w-8"
                  height={32}
                  src="/brand/zynai-logo.svg"
                  width={32}
                />
                <span>ZynAI</span>
              </Link>
              <button
                aria-label="Menü bezárása"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-hairline bg-white/[0.03] text-text-primary"
                onClick={() => setIsMenuOpen(false)}
                type="button"
              >
                <X aria-hidden="true" size={20} />
              </button>
            </Container>

            <Container className="flex min-h-[calc(100vh-64px)] flex-col justify-center gap-10 pb-16">
              <nav className="flex flex-col gap-6 font-display text-4xl font-medium tracking-[-0.03em] text-text-primary">
                {navItems.map((item) => (
                  <a
                    href={item.href}
                    key={item.href}
                    onClick={(event) =>
                      scrollToAnchor(event, item.href, () => setIsMenuOpen(false))
                    }
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <Button
                className="w-full"
                onClick={(event) =>
                  scrollToAnchor(event, "#rolam", () => setIsMenuOpen(false))
                }
                variant="primary"
              >
                Időpontfoglalás
              </Button>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

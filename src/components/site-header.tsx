"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import HamburgerNavigation from "@/components/hamburger-navigation";

const HEADER_LINKS = [
  { label: "Home", href: "/" },
  { label: "My Story", href: "/my-story" },
  { label: "Projects", href: "/projects" },
  { label: "Achievements", href: "/achievements" },
  { label: "Social Impact", href: "/social-work" },
];

// Fixed bar on every page. The blur sits on a child layer: a backdrop-filter
// on the header itself would trap the menu's full-screen overlay inside it.
export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <>
      <header className="site-header fixed inset-x-0 top-0 z-[60]">
        <div aria-hidden="true" className="site-header-bg absolute inset-0" />
        <div className="relative flex h-[var(--site-header-h)] items-center">
          {/* Menu button pinned to the far-left edge, outside the centred content. */}
          <div className="shrink-0 pl-3 sm:pl-4">
            <HamburgerNavigation />
          </div>
          <div className="mx-auto flex w-full min-w-0 max-w-6xl items-center gap-3 px-3 sm:gap-4 sm:px-6">
          <nav aria-label="Primary" className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-1">
              {HEADER_LINKS.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className="site-header-link"
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <Link href="/contact" className="site-header-cta ml-auto hidden sm:inline-flex lg:ml-2">
            Let&apos;s talk
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
          </div>
        </div>
      </header>
      {/* Holds the header's space in the page flow. */}
      <div aria-hidden="true" className="site-header-spacer h-[var(--site-header-h)]" />
    </>
  );
}

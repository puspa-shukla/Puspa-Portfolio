"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import HamburgerNavigation from "@/components/hamburger-navigation";
import { DATA } from "@/data/resume";

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
        <div className="relative mx-auto flex h-[var(--site-header-h)] w-full max-w-6xl items-center gap-3 px-4 sm:gap-4 sm:px-6">
          <HamburgerNavigation />
          <Link href="/" className="site-header-brand group" aria-label={`${DATA.name}, home`}>
            <span aria-hidden="true" className="site-header-badge">
              {DATA.initials}
            </span>
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="truncate text-[0.95rem] font-semibold tracking-tight">
                {DATA.name}
              </span>
              <span className="site-header-tagline hidden truncate text-xs sm:block">
                BCA Student · Kathmandu, Nepal
              </span>
            </span>
          </Link>

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
      </header>
      {/* Holds the header's space in the page flow. */}
      <div aria-hidden="true" className="h-[var(--site-header-h)]" />
    </>
  );
}

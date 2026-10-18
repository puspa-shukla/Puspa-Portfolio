"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const navigationItems = [
  {
    label: "Home",
    description: "Your first impression and what makes you unique.",
    href: "/#hero",
  },
  {
    label: "My Story",
    description: "Your journey, values, ambitions, and what drives you.",
    href: "/#about",
  },
  {
    label: "Portfolio",
    description: "AI projects, coding, technical skills, and work samples.",
    href: "/projects",
  },
  {
    label: "Achievements",
    description: "Milestones, certifications, recognition, and accomplishments.",
    href: "/achievements",
  },
  {
    label: "Social Impact",
    description: "Disaster relief, blood donation, volunteering, and community service.",
    href: "/social-work",
  },
  {
    label: "U-GO AI",
    description: "Your AI leadership, scholar community, and collaborative work.",
    href: "/blog",
  },
  {
    label: "Insights",
    description: "Your blog, lessons learned, opinions, and ideas about technology.",
    href: "/content-creation",
  },
  {
    label: "Contact",
    description: "Connect with you for jobs, collaborations, and opportunities.",
    href: "/#contact",
  },
];

export default function HamburgerNavigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [activeHref, setActiveHref] = useState("/#hero");
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLElement>(null);
  const closeMenu = useCallback(() => {
    setClosing(true);
    window.setTimeout(() => {
      setMenuOpen(false);
      setClosing(false);
    }, 180);
  }, []);

  useEffect(() => {
    const updateActiveHref = () => {
      setActiveHref(
        pathname === "/"
          ? `/${window.location.hash || "#hero"}`
          : pathname,
      );
    };

    updateActiveHref();
    window.addEventListener("hashchange", updateActiveHref);
    return () => window.removeEventListener("hashchange", updateActiveHref);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const menuButton = menuButtonRef.current;
    document.body.style.overflow = "hidden";
    menuPanelRef.current
      ?.querySelector<HTMLElement>("[data-menu-close]")
      ?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        return;
      }

      if (event.key !== "Tab" || !menuPanelRef.current) {
        return;
      }

      const focusableElements =
        menuPanelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) {
        return;
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      menuButton?.focus();
    };
  }, [closeMenu, menuOpen]);

  return (
    <>
      <button
        ref={menuButtonRef}
        type="button"
        aria-label="Open navigation menu"
        aria-haspopup="dialog"
        aria-expanded={menuOpen}
        aria-controls="site-navigation-menu"
        onClick={() => {
          setClosing(false);
          setMenuOpen(true);
        }}
        className="fixed left-4 top-4 z-[60] inline-flex size-11 items-center justify-center rounded-full border border-border bg-card/90 text-foreground shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:hover:border-blue-400/60 dark:hover:text-blue-300 sm:left-6 sm:top-6"
      >
        <Menu aria-hidden="true" className="size-5" />
      </button>

      {menuOpen && (
        <div
          className={`fixed inset-0 z-[70] overflow-y-auto bg-[#050606] text-[#f5f7f6] motion-reduce:animate-none ${
            closing
              ? "animate-out fade-out duration-150"
              : "animate-in fade-in-0 duration-200"
          }`}
        >
          <aside
            id="site-navigation-menu"
            ref={menuPanelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="site-navigation-title"
            className={`relative flex min-h-dvh w-full flex-col border-t border-white/10 bg-[#050606] px-2.5 pb-5 pt-2.5 sm:px-4 motion-reduce:animate-none ${
              closing
                ? "animate-out slide-out-to-left-4 duration-150"
                : "animate-in fade-in-0 duration-200"
            }`}
          >
            <div className="flex min-h-9 justify-end">
              <h2 id="site-navigation-title" className="sr-only">
                Main navigation
              </h2>
              <button
                type="button"
                data-menu-close
                aria-label="Close navigation menu"
                onClick={closeMenu}
                className="inline-flex size-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5b9aaa] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050606]"
              >
                <X aria-hidden="true" className="size-5" />
              </button>
            </div>
            <nav aria-label="Main navigation" className="min-h-0 flex-1">
              <ul className="space-y-0.5">
                {navigationItems.map((item, index) => {
                  const targetPath = item.href.split("#")[0] || "/";
                  const isActive = activeHref === item.href ||
                    (targetPath !== "/" && pathname === targetPath);

                  return (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        aria-current={isActive ? "page" : undefined}
                        aria-describedby={`navigation-description-${index + 1}`}
                        onClick={closeMenu}
                        className={`group grid min-h-[4.75rem] grid-cols-[2.5rem_minmax(0,1fr)_1.25rem] items-center gap-2 rounded-xl px-2.5 py-2.5 text-left transition-colors duration-200 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5b9aaa] ${
                          isActive
                            ? "bg-[#1f5f6b]/20 text-white"
                            : "text-[#f5f7f6]"
                        }`}
                      >
                        <span
                          className={`text-base tabular-nums ${
                            isActive ? "text-[#5b9aaa]" : "text-[#c3c9c8]"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0">
                          <span className="block text-base font-semibold leading-6">
                            {item.label}
                          </span>
                          <span
                            id={`navigation-description-${index + 1}`}
                            className="mt-0.5 block text-sm leading-5 text-[#b8c0be] sm:text-base sm:leading-6"
                          >
                            {item.description}
                          </span>
                        </span>
                        <ArrowUpRight
                          aria-hidden="true"
                          className={`size-4 transition-opacity ${
                            isActive
                              ? "text-[#5b9aaa] opacity-100"
                              : "text-[#5b9aaa] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                          }`}
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}

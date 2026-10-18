"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const navigationItems = [
  { label: "Home", href: "/#hero" },
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/projects" },
  { label: "Achievements", href: "/achievements" },
  { label: "Social Work", href: "/social-work" },
  { label: "U-GO AI", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

export default function HamburgerNavigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [closing, setClosing] = useState(false);
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
          className={`fixed inset-0 z-[70] motion-reduce:animate-none ${
            closing
              ? "animate-out fade-out duration-150"
              : "animate-in fade-in-0 duration-200"
          }`}
        >
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={closeMenu}
            className="absolute inset-0 cursor-default bg-black/30 backdrop-blur-[2px]"
          />
          <aside
            id="site-navigation-menu"
            ref={menuPanelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="site-navigation-title"
            className={`relative flex h-dvh w-[min(88vw,22rem)] flex-col border-r border-border bg-card p-6 text-card-foreground shadow-2xl motion-reduce:animate-none sm:p-8 ${
              closing
                ? "animate-out slide-out-to-left-4 duration-150"
                : "animate-in slide-in-from-left-4 duration-200"
            }`}
          >
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2
                  id="site-navigation-title"
                  className="text-xl font-semibold tracking-tight"
                >
                  Explore
                </h2>
              </div>
              <button
                type="button"
                data-menu-close
                aria-label="Close navigation menu"
                onClick={closeMenu}
                className="inline-flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <X aria-hidden="true" className="size-5" />
              </button>
            </div>
            <nav aria-label="Main navigation" className="overflow-y-auto">
              <ul className="space-y-1">
                {navigationItems.map((item, index) => {
                  const targetPath = item.href.split("#")[0] || "/";
                  const isActive =
                    pathname === targetPath &&
                    (!item.href.includes("#") || item.href === "/#hero");

                  return (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        aria-current={isActive ? "page" : undefined}
                        onClick={closeMenu}
                        className={`group flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200 hover:translate-x-1 hover:bg-blue-50 hover:text-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:bg-blue-500/10 dark:hover:text-blue-200 ${
                          isActive
                            ? "bg-blue-50 text-blue-800 dark:bg-blue-500/10 dark:text-blue-200"
                            : "text-foreground"
                        }`}
                      >
                      <span className="w-6 shrink-0 text-xs tabular-nums text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{item.label}</span>
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

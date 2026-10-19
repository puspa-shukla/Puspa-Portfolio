"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const navigationItems = [
  { label: "Home", href: "/#hero" },
  { label: "My Story", href: "/#about" },
  { label: "Portfolio", href: "/projects" },
  { label: "Achievements", href: "/achievements" },
  { label: "Social Impact", href: "/social-work" },
  { label: "U-GO AI", href: "/blog" },
  { label: "Insights", href: "/content-creation" },
  { label: "Contact", href: "/#contact" },
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
      setActiveHref(pathname === "/" ? `/${window.location.hash || "#hero"}` : pathname);
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
        className="btn-3d group fixed left-4 top-4 z-[60] inline-flex size-11 items-center justify-center rounded-full text-[#17343a] hover:text-[#1f5f6b] dark:text-[#e6f0f2] dark:hover:text-[#ffb300] sm:left-6 sm:top-6"
      >
        <Menu aria-hidden="true" className="size-5 transition-transform duration-200 group-hover:scale-110" />
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
              <h2
                id="site-navigation-title"
                className="text-xl font-semibold tracking-tight"
              >
                Explore
              </h2>
              <button
                type="button"
                data-menu-close
                aria-label="Close navigation menu"
                onClick={closeMenu}
                className="btn-3d group inline-flex size-10 items-center justify-center rounded-full text-muted-foreground hover:text-foreground"
              >
                <X aria-hidden="true" className="size-5 transition-transform duration-300 group-hover:rotate-90" />
              </button>
            </div>
            <nav aria-label="Main navigation" className="overflow-y-auto">
              <ul className="space-y-1">
                {navigationItems.map((item, index) => {
                  const targetPath = item.href.split("#")[0] || "/";
                  const isActive = activeHref === item.href ||
                    (targetPath !== "/" && pathname === targetPath);

                  return (
                    <li
                      key={item.label}
                      className="animate-in fade-in-0 slide-in-from-left-3 duration-300 motion-reduce:animate-none"
                      style={{ animationDelay: `${60 + index * 35}ms`, animationFillMode: "both" }}
                    >
                      <a
                        href={item.href}
                        aria-current={isActive ? "page" : undefined}
                        onClick={closeMenu}
                        className={`group flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200 hover:translate-x-1 hover:bg-[#e6f0f2] hover:text-[#1f5f6b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5b9aaa] ${
                          isActive
                            ? "bg-[#e6f0f2] text-[#1f5f6b]"
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

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const navigationItems = [
  { label: "Home", href: "/#hero", hint: "Back to the start" },
  { label: "My Story", href: "/#about", hint: "Who I am and what drives me" },
  { label: "Portfolio", href: "/projects", hint: "Projects I've built" },
  { label: "Achievements", href: "/achievements", hint: "Recognition and milestones" },
  { label: "Social Impact", href: "/social-work", hint: "Community and volunteer work" },
  { label: "U-GO AI", href: "/blog", hint: "My AI learning and leadership story" },
  { label: "Insights", href: "/content-creation", hint: "Writing and content" },
  { label: "Contact", href: "/#contact", hint: "Get in touch" },
];

// Per visit (tab session): until the menu is opened once, the button keeps
// an amber dot and a periodic pulse, and a hint bubble shows on arrival.
const EXPLORED_KEY = "nav-explored";

export default function HamburgerNavigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [activeHref, setActiveHref] = useState("/#hero");
  const [showHint, setShowHint] = useState(false);
  const [explored, setExplored] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(EXPLORED_KEY) === "1";
    } catch {}
    if (seen) return;
    setExplored(false);

    const showTimer = window.setTimeout(() => setShowHint(true), 1200);
    const hideTimer = window.setTimeout(() => setShowHint(false), 11000);
    const onScroll = () => {
      if (window.scrollY > 500) setShowHint(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const markExplored = () => {
    setShowHint(false);
    setExplored(true);
    try {
      window.sessionStorage.setItem(EXPLORED_KEY, "1");
    } catch {}
  };
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
          markExplored();
          setClosing(false);
          setMenuOpen(true);
        }}
        data-unexplored={!explored ? "true" : undefined}
        className="menu-trigger btn-3d group fixed left-4 top-4 z-[60] inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-full px-3 text-[#17343a] hover:text-[#1f5f6b] dark:text-[#e6f0f2] dark:hover:text-[#ffb300] sm:left-6 sm:top-6 sm:px-4"
      >
        <Menu aria-hidden="true" className="size-5 transition-transform duration-200 group-hover:scale-110" />
        <span className="hidden text-sm font-semibold sm:inline">Explore</span>
        {!explored && <span aria-hidden="true" className="menu-dot" />}
      </button>

      {showHint && !menuOpen && (
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => {
            markExplored();
            setClosing(false);
            setMenuOpen(true);
          }}
          className="menu-hint fixed left-[4.25rem] top-[1.15rem] z-[60] inline-flex items-center gap-2 rounded-full bg-[#17343a] px-3.5 py-2 text-xs font-semibold text-white shadow-[0_12px_28px_-12px_rgba(23,52,58,0.6)] sm:left-[9.25rem] sm:top-[1.65rem] dark:bg-[#ffb300] dark:text-[#17343a]"
        >
          <span aria-hidden="true">←</span>
          Explore my portfolio
        </button>
      )}

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
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2
                  id="site-navigation-title"
                  className="text-xl font-semibold tracking-tight"
                >
                  Explore
                </h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Jump to any part of my portfolio
                </p>
              </div>
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
                        data-active={isActive ? "true" : undefined}
                        className="menu-item group flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-sm font-medium text-foreground focus-visible:outline-none"
                      >
                        <span className="w-6 shrink-0 text-xs tabular-nums text-muted-foreground">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="flex min-w-0 flex-col">
                          <span>{item.label}</span>
                          <span className="menu-item-hint text-xs font-normal text-muted-foreground">
                            {item.hint}
                          </span>
                        </span>
                        <span aria-hidden="true" className="menu-item-arrow ml-auto text-base">
                          →
                        </span>
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

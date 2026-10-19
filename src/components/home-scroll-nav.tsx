"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero", label: "Intro" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "hackathons", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

export default function HomeScrollNav() {
  const reduceMotion = useReducedMotion();
  const [current, setCurrent] = useState("hero");
  const [showTop, setShowTop] = useState(false);

  // Highlight the section that crosses the middle of the viewport.
  useEffect(() => {
    const elements = SECTIONS.map(({ id }) => document.getElementById(id)).filter(
      (element): element is HTMLElement => Boolean(element),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setCurrent(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
    // Move keyboard focus to the section so Tab continues from there.
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  };

  return (
    <>
      <nav aria-label="Page sections" className="section-rail">
        {SECTIONS.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={goTo(id)}
            aria-current={current === id ? "true" : undefined}
          >
            <span className="section-rail-label">{label}</span>
            <span aria-hidden="true" className="section-rail-dot" />
          </a>
        ))}
      </nav>

      <AnimatePresence>
        {showTop && (
          <motion.a
            href="#hero"
            onClick={goTo("hero")}
            aria-label="Back to top"
            className="btn-3d group fixed bottom-5 right-4 z-40 inline-flex size-11 items-center justify-center rounded-full text-[#17343a] hover:text-[#1f5f6b] dark:text-[#e6f0f2] dark:hover:text-[#ffb300] sm:bottom-6 sm:right-6"
            initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.9 }}
            transition={{ duration: 0.25 }}
          >
            <ArrowUp aria-hidden="true" className="size-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </motion.a>
        )}
      </AnimatePresence>
    </>
  );
}

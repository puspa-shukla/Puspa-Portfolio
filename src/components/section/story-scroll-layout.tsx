"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

export type StoryChapter = {
  id: string;
  label: string;
  image: string;
  imageAlt: string;
};

type StoryScrollLayoutProps = {
  chapters: StoryChapter[];
  children: ReactNode;
};

export default function StoryScrollLayout({
  chapters,
  children,
}: StoryScrollLayoutProps) {
  const layoutRef = useRef<HTMLDivElement>(null);
  const [activeChapter, setActiveChapter] = useState(chapters[0]);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const root = layoutRef.current;
    if (!root) return;

    const headings = chapters
      .map((chapter) => root.querySelector<HTMLElement>(`#${chapter.id}`))
      .filter((heading): heading is HTMLElement => heading !== null);
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleHeadings = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              first.boundingClientRect.top - second.boundingClientRect.top,
          );
        const heading = visibleHeadings[0]?.target;
        if (!heading) return;

        const chapter = chapters.find((item) => item.id === heading.id);
        if (chapter) setActiveChapter(chapter);
      },
      {
        rootMargin: `-${Math.round(window.innerHeight * 0.08)}px 0px -${Math.round(window.innerHeight * 0.6)}px 0px`,
        threshold: 0,
      },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [chapters]);

  return (
    <div
      ref={layoutRef}
      className="grid items-start gap-10 lg:grid-cols-[minmax(17rem,0.78fr)_minmax(0,1.22fr)] lg:gap-14"
    >
      <aside
        aria-label="Story highlights"
        className="hidden lg:sticky lg:top-20 lg:block"
      >
        <div className="overflow-hidden rounded-[14px] border border-[#c9d6d9] bg-white shadow-sm">
          <div className="relative aspect-[3/2] overflow-hidden bg-[#e6f0f2]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeChapter.image}
                className="absolute inset-0"
                initial={shouldReduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Image
                  src={activeChapter.image}
                  alt={activeChapter.imageAlt}
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 0px, 35vw"
                  className="object-contain"
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="space-y-4 p-5">
            <div className="space-y-2">
              <p className="mb-0 text-xs font-bold uppercase tracking-[0.2em] text-[#9a6a00]">
                The story, in motion
              </p>
              <p
                aria-live="polite"
                className="mb-0 text-xl font-semibold tracking-tight text-[#17343a]"
              >
                {activeChapter.label}
              </p>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Student. AI educator. IT support practitioner. I turn initiative
              into practical outcomes for people and teams.
            </p>
            <div className="flex flex-wrap gap-2">
              {["AI education", "IT support", "Community leadership"].map(
                (skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-[#c9d6d9] bg-[#e6f0f2] px-3 py-1 text-xs font-medium text-[#17343a]"
                  >
                    {skill}
                  </span>
                ),
              )}
            </div>
            <div className="flex items-center gap-4 border-t border-border pt-4 text-sm font-semibold">
              <Link
                href="/resume"
                className="underline decoration-[#699b8a] decoration-2 underline-offset-4 transition-colors hover:text-[#477a6c]"
              >
                View resume
              </Link>
              <a
                href="mailto:puspashukla321@gmail.com"
                className="underline decoration-[#d8a745] decoration-2 underline-offset-4 transition-colors hover:text-[#a8781c]"
              >
                Contact me
              </a>
            </div>
          </div>
        </div>
        <div className="mt-5 flex gap-2" aria-hidden="true">
          {chapters.map((chapter) => (
            <span
              key={chapter.id}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                chapter.id === activeChapter.id
                  ? "bg-[#1f5f6b]"
                  : "bg-[#c9d6d9]"
              }`}
            />
          ))}
        </div>
      </aside>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

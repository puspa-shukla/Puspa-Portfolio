"use client";

import { useEffect, useState } from "react";

type StoryCategory = {
  label: string;
  href: string;
  target: string;
};

const blogCategories: StoryCategory[] = [
  { label: "My Journey", href: "#story", target: "story" },
  {
    label: "AI and Tech",
    href: "#first-to-finish",
    target: "first-to-finish",
  },
  { label: "Impact", href: "#impact", target: "impact" },
  {
    label: "Insights",
    href: "#story-lessons",
    target: "story-lessons",
  },
];

const defaultAllStories = {
  label: "All Stories",
  href: "#all-stories",
  target: "all-stories",
};

export default function StoryCategoryRibbon({
  categories = blogCategories,
  allStories = defaultAllStories,
}: {
  categories?: StoryCategory[];
  allStories?: StoryCategory | null;
}) {
  const initialTarget = allStories?.target ?? categories[0]?.target ?? "";
  const [activeTarget, setActiveTarget] = useState(initialTarget);

  useEffect(() => {
    let frame = 0;
    const updateActiveCategory = () => {
      frame = 0;
      const activationLine = window.scrollY + window.innerHeight * 0.3;
      const targets = [...(allStories ? [allStories] : []), ...categories]
        .flatMap((category) => {
          const element = document.getElementById(category.target);
          return element ? [{ ...category, element }] : [];
        })
        .filter(
          ({ element }) =>
            element.getBoundingClientRect().top + window.scrollY <= activationLine,
        );

      setActiveTarget(targets.at(-1)?.target ?? initialTarget);
    };
    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveCategory);
    };

    updateActiveCategory();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [allStories, categories, initialTarget]);

  const linkClass = (target: string) =>
    `inline-flex min-h-11 shrink-0 items-center gap-2.5 rounded-xl border px-4 py-2 text-sm font-semibold tracking-[0.01em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f5f6b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#e6f0f2] ${
      activeTarget === target
        ? "border-[#17343a] bg-[#17343a] text-white shadow-sm shadow-[#17343a]/15"
        : "border-[#c9d6d9] bg-white text-[#33525a] hover:border-[#5b9aaa] hover:bg-[#f7fbfc] hover:text-[#17343a]"
    }`;

  return (
    <nav
      aria-label="Story categories"
      className="story-category-ribbon fixed inset-x-0 top-0 z-[55] border-b border-[#c9d6d9] bg-[#e6f0f2]/95 shadow-sm shadow-[#17343a]/10 backdrop-blur-md"
    >
      <div className="mx-auto flex min-h-[4.5rem] w-full max-w-[100rem] items-center gap-2.5 overflow-x-auto py-2 pl-[4.5rem] pr-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-4 sm:pl-[9.5rem] sm:pr-8 lg:px-[9.5rem] [&>a:first-child]:ml-auto [&>a:last-child]:mr-auto">
        {allStories && (
          <a
            href={allStories.href}
            aria-current={activeTarget === allStories.target ? "location" : undefined}
            className={linkClass(allStories.target)}
          >
            {allStories.label}
          </a>
        )}
        {categories.map((category) => (
          <a
            key={category.target}
            href={category.href}
            aria-current={activeTarget === category.target ? "location" : undefined}
            className={linkClass(category.target)}
          >
            {category.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

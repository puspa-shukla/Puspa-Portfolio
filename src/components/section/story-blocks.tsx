import type { ReactNode } from "react";
import StoryPhoto from "@/components/section/story-photo";

// Shared building blocks for the long-form story pages (My Story, U-GO AI).

// A photo paired with the paragraphs it belongs to: two columns side by side
// on wider screens (photo on the given side), stacked on phones. The text
// never wraps under the photo, so no stray lines are left behind.
export function PhotoBlock({
  src,
  alt,
  width,
  height,
  caption,
  side,
  children,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  side: "left" | "right";
  children: ReactNode;
}) {
  const portrait = height > width;
  return (
    <div
      className={`my-8 grid items-center gap-6 sm:gap-8 ${
        portrait
          ? side === "right"
            ? "sm:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]"
            : "sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]"
          : "sm:grid-cols-2"
      }`}
    >
      <StoryPhoto
        src={src}
        alt={alt}
        width={width}
        height={height}
        caption={caption}
        className={side === "right" ? "sm:order-2" : ""}
      />
      <div className="[&>:first-child]:mt-0 [&>:last-child]:mb-0">{children}</div>
    </div>
  );
}

export function ChapterHeading({ part, id, title }: { part: string; id: string; title: string }) {
  return (
    <div className="not-prose mb-6 mt-12 border-t border-[#c9d6d9] pt-8 dark:border-white/12">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-[#1f5f6b] dark:text-[#8ed7bc]">
        Part {part}
      </p>
      <h2 id={id} className="scroll-mt-24 text-3xl tracking-tight sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}

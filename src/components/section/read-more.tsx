"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

// Folds long story content behind a "Read more" button. The content is
// rendered on the server (so it stays in the page for search and links),
// it just slides closed until the visitor asks for it.
export default function ReadMore({
  children,
  moreLabel = "Read more",
  lessLabel = "Show less",
}: {
  children: ReactNode;
  moreLabel?: string;
  lessLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggle = () => {
    const closing = open;
    setOpen(!open);
    // Folding a long essay from the bottom would leave the reader far down
    // the page, so bring the button back into view.
    if (closing) {
      window.requestAnimationFrame(() =>
        buttonRef.current?.scrollIntoView({
          block: "center",
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        }),
      );
    }
  };

  return (
    <div>
      <div id={panelId} data-open={open ? "true" : undefined} inert={!open} className="read-more-panel grid">
        <div className="min-h-0 overflow-hidden">{children}</div>
      </div>
      <div className="not-prose mt-6 flex justify-center">
        <button
          ref={buttonRef}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={toggle}
          className="read-more-button group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
        >
          {open ? lessLabel : moreLabel}
          <ChevronDown
            aria-hidden="true"
            className={`size-4 transition-transform duration-300 motion-reduce:transition-none ${
              open ? "rotate-180" : "group-hover:translate-y-0.5"
            }`}
          />
        </button>
      </div>
    </div>
  );
}

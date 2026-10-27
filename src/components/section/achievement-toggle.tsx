"use client";

import { useId, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

// A 3D card heading that tilts toward the pointer and folds its section open
// on click. Like ReadMore, the content is rendered on the server and only
// slides closed, so it stays in the page for search and links.
export default function AchievementToggle({
  id,
  title,
  eyebrow,
  icon,
  as: Heading = "h2",
  defaultOpen = false,
  children,
}: {
  id: string;
  title: string;
  eyebrow: string;
  icon: ReactNode;
  as?: "h2" | "h3";
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  const cardRef = useRef<HTMLButtonElement>(null);

  const tilt = (event: PointerEvent<HTMLButtonElement>) => {
    const card = cardRef.current;
    if (!card || event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    card.style.setProperty("--rx", `${(0.5 - y) * 14}deg`);
    card.style.setProperty("--ry", `${(x - 0.5) * 18}deg`);
    card.style.setProperty("--mx", `${x * 100}%`);
    card.style.setProperty("--my", `${y * 100}%`);
  };

  const resetTilt = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  };

  return (
    <div id={id} className="achievement-toggle scroll-mt-24">
      <Heading className="m-0">
        <button
          ref={cardRef}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen(!open)}
          onPointerMove={tilt}
          onPointerLeave={resetTilt}
          data-open={open ? "true" : undefined}
          className="achievement-toggle-card group flex w-full items-center gap-4 rounded-2xl px-5 py-5 text-left sm:gap-5 sm:px-7 sm:py-6"
        >
          <span aria-hidden="true" className="achievement-toggle-icon grid size-12 shrink-0 place-items-center rounded-xl sm:size-14">
            {icon}
          </span>
          <span className="achievement-toggle-text flex min-w-0 flex-1 flex-col">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] opacity-80">{eyebrow}</span>
            <span className="mt-1 text-xl font-bold leading-tight tracking-tight sm:text-2xl">{title}</span>
          </span>
          <span aria-hidden="true" className="achievement-toggle-chevron grid size-10 shrink-0 place-items-center rounded-full">
            <ChevronDown
              className={`size-5 transition-transform duration-300 motion-reduce:transition-none ${
                open ? "rotate-180" : "group-hover:translate-y-0.5"
              }`}
            />
          </span>
        </button>
      </Heading>
      <div id={panelId} data-open={open ? "true" : undefined} inert={!open} className="read-more-panel grid">
        <div className="min-h-0 overflow-hidden">
          <div className="pt-6">{children}</div>
        </div>
      </div>
    </div>
  );
}

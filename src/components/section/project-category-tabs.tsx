"use client";

import {
  useRef,
  useSyncExternalStore,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import {
  ArrowDown,
  ArrowLeft,
  Blocks,
  Brain,
  ChevronRight,
  Code2,
  Play,
  type LucideIcon,
} from "lucide-react";

export type ProjectCategoryPanel = {
  id: string;
  label: string;
  count: number;
  content: ReactNode;
};

// Each tone (green / blue / purple) colours the category's icon tile in globals.css.
const CATEGORY_ICONS: Record<string, { icon: LucideIcon; tone: string }> = {
  "build-as-i-learn": { icon: Blocks, tone: "green" },
  "web-development": { icon: Code2, tone: "blue" },
  "ai-python": { icon: Brain, tone: "purple" },
};

const CATEGORY_TAGLINES: Record<string, string> = {
  "build-as-i-learn": "Small builds from every new thing I learn",
  "web-development": "Live sites, games and tools built with JavaScript",
  "ai-python": "Experiments with Python and practical AI",
};

// The open category lives in the URL hash, so links like
// /projects#web-development open the matching panel.
const subscribeToHash = (onChange: () => void) => {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
};
const getHash = () => window.location.hash.slice(1);
const getServerHash = () => "";

// Tilts a topic tile a few degrees toward the pointer (mouse/pen only).
const tiltTile = (event: PointerEvent<HTMLDivElement>) => {
  if (event.pointerType === "touch") return;
  const rect = event.currentTarget.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;
  event.currentTarget.style.setProperty("--tx", `${x * 12}deg`);
  event.currentTarget.style.setProperty("--ty", `${-y * 10}deg`);
};

const resetTile = (event: PointerEvent<HTMLDivElement>) => {
  event.currentTarget.style.setProperty("--tx", "0deg");
  event.currentTarget.style.setProperty("--ty", "0deg");
};

export default function ProjectCategoryTabs({
  panels,
}: {
  panels: ProjectCategoryPanel[];
}) {
  const hash = useSyncExternalStore(subscribeToHash, getHash, getServerHash);
  // No category in the hash means the overview: all three buttons, no panel.
  const activeId = panels.some((panel) => panel.id === hash) ? hash : null;
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (id: string) => {
    if (id === activeId) return;
    // replaceState keeps the page from jumping; the event re-reads the hash.
    window.history.replaceState(null, "", `#${id}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  };

  // Slide-to-open: drag the play orb along its button. --drag (px) moves the
  // orb and grows the fill; --progress (0-1) fades the label and hint and
  // drives the topic tile below. Both are set on the slot so button and tile share them.
  const swipe = useRef<{ button: HTMLButtonElement; startX: number; max: number; dx: number } | null>(null);
  const suppressClick = useRef(false);

  const setSwipe = (button: HTMLButtonElement, dx: number, max: number) => {
    const slot = button.parentElement ?? button;
    slot.style.setProperty("--drag", `${dx}px`);
    slot.style.setProperty("--progress", `${max > 0 ? dx / max : 0}`);
  };

  const setDragging = (button: HTMLButtonElement, dragging: boolean) => {
    for (const element of [button, button.parentElement]) {
      if (!element) continue;
      if (dragging) element.dataset.dragging = "true";
      else delete element.dataset.dragging;
    }
  };

  const startSwipe = (event: PointerEvent<HTMLSpanElement>, index: number) => {
    const button = buttonRefs.current[index];
    if (!button || event.button !== 0) return;
    const orb = event.currentTarget;
    suppressClick.current = false;
    orb.setPointerCapture(event.pointerId);
    setDragging(button, true);
    swipe.current = {
      button,
      startX: event.clientX,
      max: button.clientWidth - orb.offsetLeft * 2 - orb.offsetWidth,
      dx: 0,
    };
  };

  const moveSwipe = (event: PointerEvent<HTMLSpanElement>) => {
    const current = swipe.current;
    if (!current) return;
    current.dx = Math.min(Math.max(event.clientX - current.startX, 0), current.max);
    if (current.dx > 4) suppressClick.current = true;
    setSwipe(current.button, current.dx, current.max);
  };

  const endSwipe = (event: PointerEvent<HTMLSpanElement>, id: string | null) => {
    const current = swipe.current;
    if (!current) return;
    swipe.current = null;
    setDragging(current.button, false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (id && current.dx >= current.max * 0.6) {
      // Snap to the end, then open the category.
      setSwipe(current.button, current.max, current.max);
      const slot = current.button.parentElement;
      if (slot) slot.dataset.complete = "true";
      navigator.vibrate?.(12);
      window.setTimeout(() => {
        select(id);
        setSwipe(current.button, 0, current.max);
        if (slot) delete slot.dataset.complete;
      }, 260);
    } else {
      // Not far enough: spring back (the CSS transition does the motion).
      setSwipe(current.button, 0, current.max);
    }
  };

  const showAll = () => {
    const previousIndex = panels.findIndex((panel) => panel.id === activeId);
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    buttonRefs.current[Math.max(previousIndex, 0)]?.focus({ preventScroll: true });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const step =
      event.key === "ArrowRight" || event.key === "ArrowDown" ? 1
        : event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1
          : 0;
    if (!step) return;
    event.preventDefault();
    const nextIndex = (index + step + panels.length) % panels.length;
    select(panels[nextIndex].id);
    // Hidden buttons are inert until the re-render shows the newly selected one.
    window.requestAnimationFrame(() => buttonRefs.current[nextIndex]?.focus());
  };

  return (
    <div className="mx-auto flex w-full max-w-[800px] flex-col gap-y-4">
      <div
        data-show={activeId ? "true" : undefined}
        inert={!activeId}
        className="project-back grid"
      >
        <div className="min-h-0 overflow-hidden px-1 py-1">
          <button
            type="button"
            onClick={showAll}
            className="project-back-button group inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
          >
            <ArrowLeft aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:-translate-x-1" />
            All categories
          </button>
        </div>
      </div>

      <div className="-m-2 flex flex-col sm:flex-row">
        {panels.map((panel, index) => {
          const isActive = panel.id === activeId;
          const isHidden = activeId !== null && !isActive;
          const { icon: Icon, tone } = CATEGORY_ICONS[panel.id] ?? { icon: Play, tone: "blue" };
          const countLabel = panel.count > 0
            ? `${panel.count} project${panel.count === 1 ? "" : "s"}`
            : "Coming soon";

          return (
            <div
              key={panel.id}
              data-hidden={isHidden ? "true" : undefined}
              data-tone={tone}
              inert={isHidden}
              className="project-tab-slot"
            >
              <button
                ref={(node) => {
                  buttonRefs.current[index] = node;
                }}
                id={panel.id}
                type="button"
                aria-expanded={isActive}
                aria-controls={`${panel.id}-panel`}
                onClick={() => {
                  // A finished or abandoned swipe already handled this press.
                  if (suppressClick.current) {
                    suppressClick.current = false;
                    return;
                  }
                  select(panel.id);
                }}
                onKeyDown={(event) => handleKeyDown(event, index)}
                data-active={isActive ? "true" : undefined}
                className="project-tab flex w-full scroll-mt-24 items-center gap-3.5 text-left"
              >
                <span aria-hidden="true" className="project-tab-ring" />
                {!isActive && <span aria-hidden="true" className="project-tab-fill" />}
                <span
                  aria-hidden="true"
                  className="project-orb"
                  onPointerDown={isActive ? undefined : (event) => startSwipe(event, index)}
                  onPointerMove={isActive ? undefined : moveSwipe}
                  onPointerUp={isActive ? undefined : (event) => endSwipe(event, panel.id)}
                  onPointerCancel={isActive ? undefined : (event) => endSwipe(event, null)}
                >
                  {isActive ? (
                    <Icon className="size-5" />
                  ) : (
                    <Play className="ml-0.5 size-4 fill-current" />
                  )}
                </span>

                <span className="project-tab-text flex min-w-0 flex-1 flex-col">
                  <span className="project-tab-label">{panel.label}</span>
                  {isActive && (
                    <span className="project-tab-tagline">{CATEGORY_TAGLINES[panel.id]}</span>
                  )}
                  <span className="project-tab-meta">
                    {isActive ? countLabel : "Swipe to open"}
                    {!isActive && (
                      <span aria-hidden="true" className="project-tab-hint">
                        <ChevronRight className="size-4" strokeWidth={3} />
                        <ChevronRight className="size-4" strokeWidth={3} />
                        <ChevronRight className="size-4" strokeWidth={3} />
                      </span>
                    )}
                  </span>
                </span>

                {isActive && panel.count > 0 && (
                  <span aria-hidden="true" className="project-tab-cta">
                    View projects
                    <ArrowDown className="size-4" />
                  </span>
                )}
              </button>

              {/* Big topic tile under each button in the overview; decorative only,
                  the button above is the one control that opens the category. */}
              {activeId === null && (
                <div
                  aria-hidden="true"
                  data-tone={tone}
                  onPointerMove={tiltTile}
                  onPointerLeave={resetTile}
                  className="project-tile"
                >
                  <span className="project-tile-fill" />
                  <span className="project-tile-shadow" />
                  <span className="project-tile-float">
                    <span className="project-tile-plate">
                      <Icon className="project-tile-icon" strokeWidth={2.75} />
                    </span>
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {panels.map((panel) => {
        const isActive = panel.id === activeId;

        return (
          <div
            key={panel.id}
            id={`${panel.id}-panel`}
            role="region"
            aria-label={panel.label}
            data-open={isActive ? "true" : undefined}
            inert={!isActive}
            className="project-panel grid"
          >
            <div className="min-h-0 overflow-hidden">{panel.content}</div>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import { useRef, useSyncExternalStore, type PointerEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";

const noopSubscribe = () => () => {};

const TEXT = "p, h2, h3, li, blockquote";

// Swaps the mouse cursor for a small glowing red arrow, but only while it is
// over the story text itself. Everywhere else (margins, photos, links) the
// normal cursor shows, and touch screens never see the dot.
export default function LaserPointer({ children }: { children: ReactNode }) {
  const dotRef = useRef<HTMLDivElement>(null);
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const dot = dotRef.current;
    if (!dot) return;
    const target = event.target as HTMLElement;
    const overText = target.closest(TEXT) && !target.closest("a, button, figure");
    if (event.pointerType !== "mouse" || !overText) {
      dot.style.opacity = "0";
      return;
    }
    dot.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    dot.style.opacity = "1";
  };

  const hideDot = () => {
    if (dotRef.current) dotRef.current.style.opacity = "0";
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={hideDot}
      className="[@media(pointer:fine)]:[&_:is(p,h2,h3,li,blockquote)]:cursor-none [&_a]:cursor-pointer [&_figure_*]:cursor-auto"
    >
      {children}
      {mounted &&
        createPortal(
          <div
            ref={dotRef}
            aria-hidden="true"
            className="pointer-events-none fixed left-0 top-0 z-[85] opacity-0 transition-opacity duration-150"
          >
            <svg
              viewBox="0 0 16 16"
              className="absolute -left-[2px] -top-[2px] size-4 [filter:drop-shadow(0_0_3px_rgba(255,45,45,0.9))_drop-shadow(0_0_7px_rgba(255,45,45,0.45))]"
            >
              <path
                d="M2 2 L14 8.4 L8.7 9.6 L6.2 14.6 Z"
                fill="#ff2d2d"
                stroke="#ffffff"
                strokeWidth="1"
                strokeLinejoin="round"
              />
            </svg>
          </div>,
          document.body,
        )}
    </div>
  );
}

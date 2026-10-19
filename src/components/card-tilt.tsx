"use client";

import { useEffect } from "react";

// Cards that respond to hover and tap with a 3D tilt. The innermost match
// under the pointer wins, so an achievement card tilts on its own rather
// than together with the section around it.
const TARGETS = [
  { selector: "#hackathons .rounded-2xl.bg-card", maxTilt: 6 },
  { selector: ".home-page > .home-section, .home-page > #skills", maxTilt: 2.5 },
];
const COMBINED = TARGETS.map((target) => target.selector).join(", ");

function maxTiltFor(element: Element) {
  return TARGETS.find((target) => element.matches(target.selector))?.maxTilt ?? 0;
}

export default function CardTilt() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let current: HTMLElement | null = null;
    let pressed = false;
    let frame = 0;

    const reset = (element: HTMLElement | null) => {
      if (!element) return;
      element.removeAttribute("data-tilting");
      element.removeAttribute("data-pressed");
      element.style.removeProperty("--tilt-x");
      element.style.removeProperty("--tilt-y");
    };

    const apply = (element: HTMLElement, clientX: number, clientY: number) => {
      const box = element.getBoundingClientRect();
      const px = Math.min(Math.max((clientX - box.left) / box.width, 0), 1);
      const py = Math.min(Math.max((clientY - box.top) / box.height, 0), 1);
      const max = maxTiltFor(element);
      element.style.setProperty("--tilt-x", `${((0.5 - py) * 2 * max).toFixed(2)}deg`);
      element.style.setProperty("--tilt-y", `${((px - 0.5) * 2 * max).toFixed(2)}deg`);
      element.style.setProperty("--glare-x", `${(px * 100).toFixed(1)}%`);
      element.style.setProperty("--glare-y", `${(py * 100).toFixed(1)}%`);
      element.setAttribute("data-tilting", "true");
    };

    const track = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>(COMBINED) ?? null;
      if (target !== current) {
        reset(current);
        current = target;
        if (current && pressed) current.setAttribute("data-pressed", "true");
      }
      if (!current) return;
      const element = current;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => apply(element, event.clientX, event.clientY));
    };

    const onPointerMove = (event: PointerEvent) => {
      // Touch only tilts while the finger is down.
      if (event.pointerType === "touch" && !pressed) return;
      track(event);
    };
    const onPointerDown = (event: PointerEvent) => {
      pressed = true;
      track(event);
      current?.setAttribute("data-pressed", "true");
    };
    const onPointerUp = (event: PointerEvent) => {
      pressed = false;
      current?.removeAttribute("data-pressed");
      if (event.pointerType === "touch") {
        reset(current);
        current = null;
      }
    };
    const onLeave = () => {
      pressed = false;
      reset(current);
      current = null;
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("pointerup", onPointerUp, { passive: true });
    document.addEventListener("pointercancel", onLeave, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      reset(current);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("pointercancel", onLeave);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return null;
}

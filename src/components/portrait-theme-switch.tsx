"use client";

import { animate, motion, useMotionValue, useReducedMotion } from "motion/react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TRACK_PADDING = 6;

export default function PortraitThemeSwitch({ initials }: { initials: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLButtonElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [travel, setTravel] = useState(0);
  const dragged = useRef(false);
  const x = useMotionValue(0);

  const isDark = mounted && resolvedTheme === "dark";

  useEffect(() => setMounted(true), []);

  // Measure how far the photo can slide inside the pill.
  useLayoutEffect(() => {
    const track = trackRef.current;
    const knob = knobRef.current;
    if (!track || !knob) return;
    const measure = () =>
      setTravel(Math.max(0, track.clientWidth - knob.offsetWidth - TRACK_PADDING * 2));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  // Keep the knob in sync with the theme, including changes from the dock toggle.
  useEffect(() => {
    const target = isDark ? travel : 0;
    if (reduceMotion) {
      x.set(target);
      return;
    }
    const controls = animate(x, target, { type: "spring", stiffness: 380, damping: 34 });
    return () => controls.stop();
  }, [isDark, travel, reduceMotion, x]);

  const applyTheme = (dark: boolean) => setTheme(dark ? "dark" : "light");

  return (
    <button
      ref={trackRef}
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => {
        if (dragged.current) {
          dragged.current = false;
          return;
        }
        applyTheme(!isDark);
      }}
      className="home-theme-switch group"
      data-state={isDark ? "dark" : "light"}
      style={{ padding: TRACK_PADDING }}
    >
      <span aria-hidden="true" className="home-theme-switch-label home-theme-switch-label--light">
        <MoonIcon className="size-4" />
        Slide for dark
      </span>
      <span aria-hidden="true" className="home-theme-switch-label home-theme-switch-label--dark">
        <SunIcon className="size-4" />
        Slide for light
      </span>

      <motion.div
        ref={knobRef}
        className="home-theme-switch-knob"
        style={{ x }}
        drag={travel > 0 ? "x" : false}
        dragConstraints={{ left: 0, right: travel }}
        dragElastic={0.04}
        dragMomentum={false}
        onDragStart={() => {
          dragged.current = true;
        }}
        onDragEnd={() => {
          const dark = x.get() > travel / 2;
          if (dark === isDark) {
            animate(x, dark ? travel : 0, { type: "spring", stiffness: 380, damping: 34 });
          }
          applyTheme(dark);
        }}
      >
        <Avatar className="home-profile-photo size-full rounded-full border-4">
          <AvatarImage
            src="/puspa-profile-circle.jpeg"
            alt="Puspa"
            draggable={false}
            className="h-full w-full select-none object-cover"
          />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </motion.div>
    </button>
  );
}

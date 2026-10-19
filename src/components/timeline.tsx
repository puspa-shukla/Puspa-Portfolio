"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ReactNode, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Orientation = "vertical" | "horizontal";

export interface TimelineItemProps {
  children: ReactNode;
  className?: string;
}

export interface TimelineProps {
  children: ReactNode;
  className?: string;
  orientation?: Orientation;
}

export interface TimelineConnectItemProps {
  children: ReactNode;
  className?: string;
}

// A node counts as reached once it is above 55% of the viewport height,
// including after it scrolls off the top (hence the very tall top margin).
const ARRIVAL_LINE = "100000px 0px -45% 0px";

export function TimelineConnectItem({
  children,
  className,
}: TimelineConnectItemProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const reached = useInView(nodeRef, { margin: ARRIVAL_LINE });
  const active = reduceMotion || reached;

  return (
    <div
      className={cn(
        "relative flex shrink-0 justify-center items-center self-stretch",
        className
      )}
    >
      <div
        ref={nodeRef}
        data-timeline-node
        data-active={active ? "true" : "false"}
        className="timeline-node relative z-20 shrink-0"
      >
        <span aria-hidden="true" className="timeline-node-halo" />
        {children}
      </div>
    </div>
  );
}

export function TimelineItem({ children, className }: TimelineItemProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("relative", className)}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Timeline({
  children,
  className,
  orientation = "vertical",
}: TimelineProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [rail, setRail] = useState({ top: 0, height: 0, left: 0 });

  // The rail runs from the first node's centre to the end of the list.
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list || orientation !== "vertical") return;

    const measure = () => {
      const first = list.querySelector<HTMLElement>("[data-timeline-node]");
      if (!first) return;
      const listBox = list.getBoundingClientRect();
      const node = first.getBoundingClientRect();
      const top = node.top - listBox.top + node.height / 2;
      setRail({
        top,
        height: listBox.height - top,
        left: node.left - listBox.left + node.width / 2,
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [orientation]);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 55%", "end 85%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });
  const headY = useTransform(progress, (value) => value * rail.height);

  return (
    <div
      data-orientation={orientation}
      className={cn(
        "group relative [--timeline-gap:2rem]",
        orientation === "vertical" && "flex flex-col gap-4 p-4 w-full",
        orientation === "horizontal" && "flex flex-row gap-4 p-4 h-full",
        className
      )}
    >
      <div
        ref={listRef}
        className={cn(
          "relative",
          orientation === "vertical" && "space-y-8 w-full",
          orientation === "horizontal" && "flex flex-row gap-8 h-full"
        )}
      >
        {orientation === "vertical" && rail.height > 0 && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute z-10 -translate-x-1/2"
            style={{ top: rail.top, left: rail.left, height: rail.height }}
          >
            <div className="timeline-rail-track absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 rounded-full" />
            <motion.div
              className="timeline-rail-fill absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 origin-top rounded-full"
              style={{ scaleY: reduceMotion ? 1 : progress }}
            />
            {!reduceMotion && (
              <motion.div
                className="timeline-rail-head absolute left-1/2 top-0"
                style={{ y: headY }}
              />
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

const impactStats = [
  {
    value: 3000,
    suffix: "+",
    label: "U-GO scholars equipped with practical AI skills",
  },
  {
    value: 97,
    suffix: "%",
    label: "course completion rate among U-GO Nepal scholars",
  },
  {
    value: 9,
    suffix: "",
    label: "countries learning and growing together",
  },
];

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = countRef.current;

    if (!element) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    if (mediaQuery.matches) {
      frame = window.requestAnimationFrame(() => setCount(value));
      return () => window.cancelAnimationFrame(frame);
    }

    const animateCount = () => {
      const start = performance.now();
      const duration = 1500;

      const updateCount = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const easedProgress = 1 - (1 - progress) ** 4;
        setCount(Math.round(value * easedProgress));

        if (progress < 1) {
          frame = window.requestAnimationFrame(updateCount);
        }
      };

      frame = window.requestAnimationFrame(updateCount);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          animateCount();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [value]);

  const formattedCount = new Intl.NumberFormat("en-US").format(count);

  return (
    <span
      ref={countRef}
      aria-label={`${new Intl.NumberFormat("en-US").format(value)}${suffix}`}
      className="block text-5xl font-extrabold leading-none tracking-tight tabular-nums sm:text-6xl"
    >
      <span aria-hidden="true">
        {formattedCount}
        {suffix}
      </span>
    </span>
  );
}

export default function BlogImpactStats() {
  return (
    <section
      aria-label="The impact of the U-GO AI program"
      className="not-prose my-12 grid overflow-hidden rounded-3xl border border-[#173b3d]/10 bg-[#f2f2ec] text-[#173b3d] sm:grid-cols-3"
    >
      {impactStats.map((stat, index) => (
        <div
          key={stat.label}
          className={`flex flex-col justify-center gap-4 px-6 py-8 sm:px-7 sm:py-9 ${
            index < impactStats.length - 1
              ? "border-b border-[#173b3d]/15 sm:border-b-0 sm:border-r"
              : ""
          }`}
        >
          <CountUp value={stat.value} suffix={stat.suffix} />
          <p className="m-0 max-w-48 text-base leading-relaxed text-[#344d4e] sm:text-[15px]">
            {stat.label}
          </p>
        </div>
      ))}
    </section>
  );
}

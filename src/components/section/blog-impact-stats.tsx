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

const impactWords = [
  { label: "Learn it", dot: "bg-[#94b2ff]" },
  { label: "Teach it", dot: "bg-[#ffa3e5]" },
  { label: "Pass it on", dot: "bg-[#80deba]" },
  { label: "Make AI work", dot: "bg-[#ffba29]" },
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
      className="block text-6xl font-extrabold leading-none tracking-tight text-[#1f5f6b] tabular-nums sm:text-7xl lg:text-[7rem]"
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
    <div className="relative left-1/2 my-12 w-screen -translate-x-1/2 max-w-none">
      <section
        id="impact"
        aria-label="The impact of the U-GO AI program"
        className="not-prose m-0 grid w-full overflow-hidden border-y border-[#d9dedb] bg-white text-[#17343a] sm:grid-cols-3"
      >
        {impactStats.map((stat, index) => (
          <div
            key={stat.label}
            className={`flex min-h-56 flex-col justify-center gap-5 px-8 py-10 sm:px-10 sm:py-12 lg:px-16 ${
              index < impactStats.length - 1
                ? "border-b border-[#d9dedb] sm:border-b-0 sm:border-r"
                : ""
            }`}
          >
            <CountUp value={stat.value} suffix={stat.suffix} />
            <p className="m-0 max-w-sm text-lg leading-relaxed text-[#344d4e] sm:text-xl">
              {stat.label}
            </p>
          </div>
        ))}
      </section>
      <div className="blog-impact-marquee overflow-hidden bg-[#f0f1ed] py-5 text-[#1c3b40]">
        <p className="sr-only">Learn it, Teach it, Pass it on, Make AI work</p>
        <div className="blog-impact-marquee-track flex w-max" aria-hidden="true">
          {[0, 1].map((copy) => (
            <span
              key={copy}
              className="flex shrink-0 items-center gap-12 pr-12 sm:gap-16 sm:pr-16"
            >
              {impactWords.map((word) => (
                <span
                  key={word.label}
                  className="flex shrink-0 items-center gap-8 font-mono text-base font-black uppercase tracking-[0.16em] sm:gap-12 sm:text-lg"
                >
                  {word.label}
                  <i className={`size-3 rounded-full ${word.dot}`} />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

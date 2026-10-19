"use client";

import { useInView } from "motion/react";
import { Fragment, useRef } from "react";

// Key facts in the summary that get an animated underline.
const KEY_PHRASES = [
  "CAMAD College",
  "Pokhara University",
  "U-GO",
  "97% course completion rate",
  "3,000 scholars",
  "women find opportunities in technology",
];

function splitByPhrases(text: string) {
  const pattern = new RegExp(
    `(${KEY_PHRASES.map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "g",
  );
  return text.split(pattern).filter(Boolean);
}

export default function AboutSummary({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  let markIndex = 0;

  return (
    <p ref={ref} className="about-summary m-0" data-in-view={inView ? "true" : "false"}>
      {splitByPhrases(text).map((part, index) => {
        if (!KEY_PHRASES.includes(part)) return <Fragment key={index}>{part}</Fragment>;
        const delay = markIndex++ * 140;
        return (
          <mark key={index} className="about-key" style={{ transitionDelay: `${delay}ms` }}>
            {part}
          </mark>
        );
      })}
    </p>
  );
}

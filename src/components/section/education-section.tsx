/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DATA } from "@/data/resume";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

function LogoImage({
  src,
  alt,
  initials,
}: {
  src: string;
  alt: string;
  initials: string;
}) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <span className="grid size-9 shrink-0 place-items-center rounded-full border border-border bg-muted text-xs font-bold text-foreground md:size-11">
        {initials}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="size-9 shrink-0 rounded-full object-contain md:size-11"
      onError={() => setImageError(true)}
    />
  );
}

function PointList({
  items,
  accentClassName,
}: {
  items: readonly string[];
  accentClassName: string;
}) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            className={cn(
              "mt-2 block h-1.5 w-1.5 shrink-0 rounded-full",
              accentClassName,
            )}
          />
          <span className="leading-relaxed text-muted-foreground">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function EducationSection() {
  return (
    <Accordion type="single" collapsible className="w-full grid gap-6">
      {DATA.education.map((education) => (
        <AccordionItem
          key={education.school}
          value={education.school}
          className="pop-card group w-full grid gap-2 rounded-xl border border-border bg-card p-4 shadow-sm"
        >
          <div className="group/education flex w-full items-center justify-between gap-3 text-left">
            <div className="flex min-w-0 flex-1 items-center gap-x-4">
              <a
                href={education.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${education.school} website`}
                className="grid size-14 shrink-0 place-items-center rounded-full border-4 border-muted-foreground/20 bg-background p-1 shadow-sm ring-2 ring-border/70 transition hover:scale-105 hover:border-muted-foreground/35 hover:ring-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:size-16"
              >
                <LogoImage
                  src={education.logoUrl}
                  alt={`${education.school} logo`}
                  initials={education.school === "CAMAD College" ? "CC" : "EF"}
                />
              </a>
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="truncate text-base font-semibold leading-tight text-foreground">
                  {education.school}
                </span>
                <div className="font-sans text-base text-muted-foreground sm:text-lg">
                  {education.program} - {education.specialization}
                </div>
                <AccordionTrigger
                  aria-label={`Toggle education details for ${education.school}`}
                  className="mt-1.5 w-fit flex-none p-0 [-webkit-tap-highlight-color:transparent] hover:no-underline focus-visible:outline-none [&>svg]:hidden"
                >
                  <span className="pill-3d inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-semibold sm:text-xs">
                    <span className="group-data-[state=open]:hidden">View details</span>
                    <span className="hidden group-data-[state=open]:inline">Hide details</span>
                    <ChevronDown
                      className="size-3.5 transition-transform group-data-[state=open]:rotate-180"
                      aria-hidden="true"
                    />
                  </span>
                </AccordionTrigger>
              </div>
            </div>
            <div className="shrink-0 text-right text-xs tabular-nums text-muted-foreground">
              {education.start} - {education.end}
            </div>
          </div>
          <AccordionContent className="reveal-list mt-2 space-y-4 text-sm text-muted-foreground">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="font-semibold text-foreground">Education Details</h3>
              </div>
              <PointList
                items={education.details}
                accentClassName="bg-foreground/80"
              />
            </div>

            {"highlights" in education && education.highlights.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Highlights</h3>
                <PointList
                  items={education.highlights}
                  accentClassName="bg-foreground"
                />
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

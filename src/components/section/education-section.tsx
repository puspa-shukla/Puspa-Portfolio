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
import { ChevronDown, ChevronRight } from "lucide-react";
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
          className="w-full border-b-0 grid gap-2"
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
                <div className="flex min-w-0 items-center gap-2">
                  <span className="truncate text-base font-semibold leading-tight text-foreground">
                    {education.school}
                  </span>
                  <AccordionTrigger
                    aria-label={`Toggle education details for ${education.school}`}
                    className="group relative inline-flex size-5 w-5 flex-none items-center justify-center text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&>svg]:hidden"
                  >
                    <span className="relative inline-flex size-5 items-center justify-center">
                      <ChevronRight
                        className={cn(
                          "absolute size-3.5 stroke-2 transition-all duration-300 ease-out",
                          "translate-x-0 opacity-0",
                          "group-hover/education:translate-x-1 group-hover/education:opacity-100",
                          "group-focus-visible:translate-x-1 group-focus-visible:opacity-100",
                          "group-data-[state=open]:translate-x-0 group-data-[state=open]:opacity-0",
                        )}
                        aria-hidden="true"
                      />
                      <ChevronDown
                        className={cn(
                          "absolute size-3.5 stroke-2 transition-all duration-200",
                          "rotate-0 opacity-0",
                          "group-data-[state=open]:rotate-180 group-data-[state=open]:opacity-100",
                        )}
                        aria-hidden="true"
                      />
                    </span>
                  </AccordionTrigger>
                </div>
                <div className="font-sans text-base text-muted-foreground sm:text-lg">
                  {education.program} - {education.specialization}
                </div>
              </div>
            </div>
            <div className="shrink-0 text-right text-xs tabular-nums text-muted-foreground">
              {education.start} - {education.end}
            </div>
          </div>
          <AccordionContent className="mt-4 space-y-4 text-sm text-muted-foreground">
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

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
import { Icons } from "@/components/icons";
import { ChevronDown, Globe, Github, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const toolIconByName = Object.fromEntries(
  DATA.skills.map((skill) => [skill.name, skill.icon]),
);

const fallbackToolIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  GitHub: Icons.github,
  Nodemailer: Icons.email,
};

function LogoImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border bg-muted flex-none" />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain flex-none"
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

export default function WorkSection() {
  return (
    <div className="space-y-4">
      <Accordion
        type="single"
        collapsible
        className="flex w-full flex-col gap-4"
      >
        {DATA.work.map((work) => (
          <AccordionItem
            key={work.company}
            value={work.company}
            className="pop-card group grid w-full min-w-0 gap-2 rounded-xl border border-border bg-card p-4 shadow-sm"
          >
            <div className="flex w-full items-center gap-3">
              <a
                href={work.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${work.company} website`}
                className="grid size-14 shrink-0 place-items-center rounded-full border-4 border-muted-foreground/20 bg-background p-1 shadow-sm ring-2 ring-border/70 transition hover:scale-105 hover:border-muted-foreground/35 hover:ring-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:size-16"
              >
                <LogoImage src={work.logoUrl} alt={`${work.company} logo`} />
              </a>
              <AccordionTrigger className="group/trigger w-full min-w-0 flex-1 cursor-pointer rounded-lg p-2 text-left [-webkit-tap-highlight-color:transparent] hover:no-underline focus-visible:outline-none [&>svg]:hidden">
                <div className="flex w-full items-center justify-between gap-x-4 text-left">
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <div className="truncate font-semibold leading-tight">
                      {work.company}
                    </div>
                    <div className="font-sans text-sm text-muted-foreground">
                      {work.title}
                    </div>
                  </div>
                  {(work.start || work.end) && (
                    <div className="flex shrink-0 items-center gap-1 text-right text-xs tabular-nums text-muted-foreground">
                      <span>
                        {work.start}{work.start && work.end ? " - " : ""}{work.end}
                      </span>
                    </div>
                  )}
                  <span className="pill-3d ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-semibold sm:text-xs">
                    <span className="group-data-[state=open]:hidden">View responsibilities &amp; tools</span>
                    <span className="hidden group-data-[state=open]:inline">Hide details</span>
                    <ChevronDown className="size-3.5 transition-transform group-data-[state=open]:rotate-180" aria-hidden="true" />
                  </span>
                </div>
              </AccordionTrigger>
            </div>
            <AccordionContent className="reveal-list mt-2 space-y-4 px-2 pb-2 text-sm text-muted-foreground">
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">What I Did</h3>
              <PointList items={work.work} accentClassName="bg-foreground/80" />
            </div>

            {work.impact && work.impact.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Impact & Results</h3>
         
                  <PointList
                    items={work.impact}
                    accentClassName="bg-foreground"
                  />
         
              </div>
            )}

            {work.tools && work.tools.length > 0 ? (
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Tools Used</h3>
                <div className="flex flex-wrap gap-2">
                  {work.tools.map((tool) => {
                    const Icon =
                      toolIconByName[tool] ?? fallbackToolIcons[tool] ?? Sparkles;

                    return (
                      <div
                        key={tool}
                        className="tool-chip inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground"
                      >
                        <Icon className="size-3.5 shrink-0" />
                        <span>{tool}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {work.urls && work.urls.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Proof of Work</h3>
                <div className="flex flex-wrap gap-3">
                  {work.urls.map((url) => {
                    const isGithub = url.href.includes("github.com");
                    return (
                      <Link
                        key={url.href}
                        href={url.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-border bg-muted/60 px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                      >
                        {isGithub ? (
                          <Icons.github className="w-4 h-4" />
                        ) : (
                          <Icons.globe className="w-4 h-4" />
                        )}
                        <span>{url.label}</span>

                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

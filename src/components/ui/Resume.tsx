"use client";

import { FileText } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { DATA } from "@/data/resume";

const PANEL_WIDTH = 352; // 22rem
const GAP = 12;

type Position = { top: number; left: number; height: number };

// The preview is portalled to <body> so the hero card's overflow can't clip it.
const Resume = () => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<Position | null>(null);

  const place = useCallback(() => {
    const link = linkRef.current;
    if (!link) return;
    const rect = link.getBoundingClientRect();
    const width = Math.min(PANEL_WIDTH, window.innerWidth - 32);
    const left = Math.min(Math.max(16, rect.left), window.innerWidth - width - 16);
    const top = rect.bottom + GAP;
    const height = Math.max(220, Math.min(544, window.innerHeight - top - 16));
    setPosition({ top, left, height });
  }, []);

  useEffect(() => {
    if (!open) return;
    place();
    window.addEventListener("scroll", place, { passive: true });
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("scroll", place);
      window.removeEventListener("resize", place);
    };
  }, [open, place]);

  return (
    <div className="relative inline-flex w-fit">
      <a
        ref={linkRef}
        href="/api/resume"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="inline-flex items-center rounded-sm px-1 py-1 text-sm font-medium text-foreground underline underline-offset-4 decoration-1 transition-all hover:text-foreground/80 hover:decoration-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Download Resume PDF
      </a>
      {open &&
        position &&
        createPortal(
          <div
            aria-hidden="true"
            className="resume-preview pointer-events-none fixed z-[80] flex flex-col overflow-hidden rounded-xl border border-[#c9d6d9] bg-white shadow-[0_24px_60px_-24px_rgba(23,52,58,0.45)]"
            style={{
              top: position.top,
              left: position.left,
              width: Math.min(PANEL_WIDTH, window.innerWidth - 32),
              height: position.height,
            }}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-[#c9d6d9] bg-[#e6f0f2] px-3 py-2 text-xs font-semibold text-[#17343a]">
              <span className="inline-flex items-center gap-1.5">
                <FileText className="size-3.5" aria-hidden="true" />
                Resume preview
              </span>
              <span className="rounded-full bg-[#1f5f6b] px-2 py-0.5 text-[10px] font-bold text-white">
                PDF
              </span>
            </div>
            <div className="relative min-h-0 flex-1 overflow-hidden">
              <ResumeSheet />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
            </div>
            <div className="shrink-0 border-t border-[#c9d6d9] bg-white px-3 py-2 text-center text-[11px] font-medium text-[#33525a]">
              Click to download the full PDF
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};

function ResumeSheet() {
  return (
    <div className="w-[200%] origin-top-left scale-50 bg-white p-5 text-left text-neutral-900">
      <div className="border-b border-neutral-800 pb-3 text-center">
        <h2 className="text-lg font-bold uppercase">{DATA.name}</h2>
        <p className="mt-1 text-[10px] leading-relaxed text-neutral-700">
          {DATA.location} | {DATA.contact.email} | {DATA.contact.tel}
        </p>
        <div className="mt-1 flex justify-center gap-3 text-[10px]">
          {Object.entries(DATA.contact.social)
            .filter(([name]) => name !== "email")
            .map(([name]) => (
              <span key={name} className="underline underline-offset-2">
                {name}
              </span>
            ))}
        </div>
      </div>

      <PreviewSection title="Professional Summary">
        <p>{DATA.professionalSummary}</p>
      </PreviewSection>

      <PreviewSection title="Skills">
        {DATA.skillGroups.map((group) => (
          <p key={group.label} className="mb-1">
            <strong>{group.label}:</strong> {group.items}
          </p>
        ))}
      </PreviewSection>

      <PreviewSection title="Work Experience">
        <ul className="list-disc space-y-1 pl-4">
          {DATA.work.map((role) => (
            <li key={role.company}>
              <strong>{role.company} — {role.title}:</strong>
              <ul className="list-disc space-y-1 pl-4">
                {role.work.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </li>
          ))}
        </ul>
      </PreviewSection>

      <PreviewSection title="Projects">
        {DATA.projects.map((project) => (
          <p key={project.title} className="mb-1">
            <strong>{project.title}:</strong> {project.description}
          </p>
        ))}
      </PreviewSection>

      <PreviewSection title="Education">
        {DATA.education.map((education) => (
          <p key={education.school} className="mb-1">
            <strong>{education.school}</strong> | {education.program} ({education.specialization}) | {education.start}-{education.end}
          </p>
        ))}
      </PreviewSection>
    </div>
  );
}

function PreviewSection({
  title,
  children,
}: Readonly<{ title: string; children: React.ReactNode }>) {
  return (
    <section className="mt-3 text-[10px] leading-relaxed">
      <h3 className="mb-1 border-b border-neutral-400 pb-0.5 text-[11px] font-bold uppercase">
        {title}
      </h3>
      {children}
    </section>
  );
}

export default Resume;

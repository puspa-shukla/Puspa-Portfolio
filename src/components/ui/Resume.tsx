"use client";

import { DATA } from "@/data/resume";

const Resume = () => {
  return (
    <div className="relative inline-flex w-fit group z-50">
      <a
        href="/api/resume"
        className="inline-flex items-center rounded-sm px-1 py-1 text-sm font-medium text-foreground underline underline-offset-4 decoration-1 transition-all hover:text-foreground/80 hover:decoration-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Download Resume PDF
      </a>
      <div
        aria-hidden="true"
        className="invisible absolute left-0 top-full z-[60] mt-3 h-[min(65vh,34rem)] w-[min(85vw,22rem)] origin-top-left translate-y-2 overflow-hidden rounded-xl border border-neutral-200 bg-white opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100"
      >
        <div className="w-[200%] origin-top-left scale-50 bg-white p-5 text-left text-neutral-900">
        <div className="border-b border-neutral-800 pb-3 text-center">
          <h2 className="text-lg font-bold uppercase">{DATA.name}</h2>
          <p className="mt-1 text-[10px] leading-relaxed text-neutral-700">
            {DATA.location} | {DATA.contact.email} | {DATA.contact.tel}
          </p>
          <div className="mt-1 flex justify-center gap-3 text-[10px]">
            {Object.entries(DATA.contact.social)
              .filter(([name]) => name !== "email")
              .map(([name, profile]) => (
                <a
                  key={name}
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                  onClick={(event) => event.stopPropagation()}
                >
                  {name}
                </a>
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
      </div>
    </div>
  );
};

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

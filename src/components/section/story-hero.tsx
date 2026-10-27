import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type StoryHeroLink = { id: string; title: string; icon: LucideIcon };

// The banner shared by every story page: eyebrow, serif title, subtitle and
// byline on the left, quick links to the page's sections on the right.
export default function StoryHero({
  id = "all-stories",
  eyebrow,
  title,
  subtitle,
  byline,
  links,
}: {
  id?: string;
  eyebrow: ReactNode;
  title: ReactNode;
  subtitle: ReactNode;
  byline: ReactNode;
  links: StoryHeroLink[];
}) {
  return (
    <header
      id={id}
      className="relative grid overflow-hidden rounded-[14px] bg-[#17343a] text-white shadow-xl shadow-[#17343a]/10 dark:bg-[#132c31] dark:shadow-black/30 dark:ring-1 dark:ring-white/10 lg:min-h-[24rem] lg:grid-cols-[minmax(0,1fr)_minmax(17rem,0.45fr)]"
    >
      <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10 lg:p-12">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#8ed7bc]">
          {eyebrow}
        </p>
        <h1 className="mb-0 max-w-4xl font-serif text-[clamp(2.25rem,4.4vw,4.25rem)] font-semibold leading-[1.02] tracking-tight text-white">
          {title}
        </h1>
        <p className="mt-6 max-w-3xl font-serif text-lg leading-relaxed text-white/85 sm:text-xl">
          {subtitle}
        </p>
        <p className="mt-6 text-sm font-medium text-white/70">{byline}</p>
      </div>
      <div className="relative flex min-h-64 items-center justify-center overflow-hidden bg-[#e6f0e9] p-8 text-[#17343a] dark:bg-[#1f3f45] dark:text-[#eef5f6] sm:min-h-72 lg:min-h-full">
        <div
          aria-hidden="true"
          className="absolute -right-10 -top-16 size-64 rounded-full border border-[#1f5f6b]/15 dark:border-white/10 sm:size-80"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-24 -left-8 size-64 rounded-full border border-[#1f5f6b]/15 dark:border-white/10 sm:size-80"
        />
        <ul className="relative z-10 grid w-full max-w-sm gap-2">
          {links.map(({ id: target, title: label, icon: Icon }) => (
            <li key={target}>
              <a
                href={`#${target}`}
                className="flex items-center gap-3 rounded-2xl border border-[#c9d6d9] bg-white/90 px-4 py-3 text-sm font-semibold shadow-sm transition-colors hover:border-[#5b9aaa] hover:bg-white dark:border-white/12 dark:bg-[#132c31]/90 dark:hover:border-[#8ed7bc] dark:hover:bg-[#17343a]"
              >
                <Icon aria-hidden="true" className="size-5 shrink-0 text-[#1f5f6b] dark:text-[#8ed7bc]" />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

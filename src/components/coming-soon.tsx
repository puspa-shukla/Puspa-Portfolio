import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Shared layout for sections that are still being written. Their pages are
// marked noindex so thin placeholder content stays out of search results.
export default function ComingSoon({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <main className="mx-auto flex min-h-[60dvh] w-full max-w-2xl flex-col justify-center gap-6 pt-[4.5rem]">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
        {eyebrow}
      </p>
      <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        {title}
      </h1>
      <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
        {description}
      </p>
      <div className="flex flex-wrap gap-3 pt-2">
        <Link
          href="/projects"
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          See my projects
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
        <Link
          href="/contact"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-5 text-sm font-semibold text-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Get in touch
        </Link>
      </div>
    </main>
  );
}

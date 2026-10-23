import type { CSSProperties } from "react";
import { HelpCircle, Lightbulb, Sparkles } from "lucide-react";
import LaserPointer from "@/components/section/laser-pointer";
import StoryCategoryRibbon from "@/components/section/story-category-ribbon";
import { ChapterHeading } from "@/components/section/story-blocks";
import { DATA } from "@/data/resume";

const opening =
  "A place for what I am noticing, learning, and still trying to understand, about technology, leadership, and the world around me.";

const insightCategories = [
  { label: "AI and Girls in Tech", href: "#ai-and-girls-in-tech", target: "ai-and-girls-in-tech" },
  { label: "Ideas That Matter", href: "#ideas-that-matter", target: "ideas-that-matter" },
  { label: "Things Worth Questioning", href: "#things-worth-questioning", target: "things-worth-questioning" },
];

const insightSections = [
  {
    id: "ai-and-girls-in-tech",
    title: "AI and Girls in Tech",
    icon: Sparkles,
    intro:
      "What I am learning about artificial intelligence and how it is changing the way we study and work, alongside notes on being a young woman learning technology: the doubts, the small wins, and the people who make the path easier for those who come next.",
  },
  {
    id: "ideas-that-matter",
    title: "Ideas That Matter",
    icon: Lightbulb,
    intro:
      "Thoughts on the ideas, books, and conversations that have shaped how I see technology, community, and growth.",
  },
  {
    id: "things-worth-questioning",
    title: "Things Worth Questioning",
    icon: HelpCircle,
    intro:
      "Open questions I keep returning to, about education, technology, and the assumptions we rarely stop to examine.",
  },
];

// Staggers the header's rise-in animation (same as My Story and U-GO AI).
const riseDelay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export default function InsightsStory() {
  return (
    <div className="blog-story-page flex min-h-0 flex-col gap-y-8 pt-[4.5rem] text-[#17343a] dark:text-[#eef5f6] sm:gap-y-12">
      <StoryCategoryRibbon categories={insightCategories} allStories={null} />

      {/* Same opening layout as the My Story and U-GO AI pages */}
      <header id="all-stories" className="mx-auto w-full max-w-3xl scroll-mt-20 pt-6 sm:pt-10">
        <p
          className="contact-rise m-0 inline-flex items-center gap-2 rounded-full border border-[#c9d6d9] bg-white py-1.5 pl-3 pr-4 text-[0.8125rem] font-semibold tracking-[0.02em] text-[#33525a] dark:border-white/12 dark:bg-[#132c31] dark:text-[#b5cbd0]"
          style={riseDelay(0)}
        >
          <span
            aria-hidden="true"
            className="size-2 rounded-full bg-[#3fb28a] shadow-[0_0_0_3px_rgba(63,178,138,0.18)]"
          />
          Insights
        </p>
        <h1
          className="contact-rise mb-0 mt-6 text-[clamp(1.9rem,6vw,3rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-[#17343a] dark:text-[#eef5f6]"
          style={riseDelay(90)}
        >
          <span className="block">Thinking out loud</span>
          <span className="block text-[#1f5f6b] dark:text-[#8ed7bc]">as I learn.</span>
        </h1>
        <p
          className="contact-rise mb-0 mt-6 max-w-2xl text-base leading-relaxed text-[#33525a] dark:text-[#b5cbd0] sm:text-lg"
          style={riseDelay(180)}
        >
          {opening}
        </p>
        <ul
          className="contact-rise m-0 mt-6 flex list-none flex-row flex-wrap items-center gap-2 p-0 text-xs font-semibold sm:text-sm"
          style={riseDelay(240)}
        >
          {insightSections.map(({ id, title, icon: Icon }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#c9d6d9] bg-white px-3 py-1.5 text-[#17343a] transition-colors hover:border-[#1f5f6b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffb300] dark:border-white/12 dark:bg-[#132c31] dark:text-[#eef5f6] dark:hover:border-[#8ed7bc]"
              >
                <Icon aria-hidden="true" className="size-3.5 shrink-0 text-[#1f5f6b] dark:text-[#8ed7bc]" />
                {title}
              </a>
            </li>
          ))}
        </ul>
        <p
          className="contact-rise mb-0 mt-5 text-sm font-medium text-[#33525a]/80 dark:text-[#b5cbd0]/80"
          style={riseDelay(300)}
        >
          {DATA.name} · {DATA.location}
        </p>
      </header>

      <LaserPointer>
      <article className="blog-story-copy my-story-copy prose prose-neutral mx-auto w-full max-w-3xl text-pretty dark:prose-invert prose-p:leading-relaxed prose-headings:scroll-mt-24">
        {insightSections.map(({ id, title, intro }, index) => (
          <section key={id}>
            <ChapterHeading part={String(index + 1).padStart(2, "0")} id={id} title={title} />
            <p>{intro}</p>
            <p>
              <em>Essays in this series are on their way.</em>
            </p>
          </section>
        ))}
      </article>
      </LaserPointer>
    </div>
  );
}

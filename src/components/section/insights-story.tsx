import { HelpCircle, Lightbulb, Sparkles } from "lucide-react";
import StoryCategoryRibbon from "@/components/section/story-category-ribbon";

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

export default function InsightsStory() {
  return (
    <div className="blog-story-page flex min-h-0 flex-col gap-y-8 pt-[4.5rem] text-[#17343a] dark:text-[#eef5f6] sm:gap-y-12">
      <StoryCategoryRibbon categories={insightCategories} allStories={null} />

      <header
        id="all-stories"
        className="relative grid overflow-hidden rounded-[14px] bg-[#17343a] text-white shadow-xl shadow-[#17343a]/10 dark:bg-[#132c31] dark:shadow-black/30 dark:ring-1 dark:ring-white/10 lg:min-h-[24rem] lg:grid-cols-[minmax(0,1fr)_minmax(17rem,0.45fr)]"
      >
        <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10 lg:p-12">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#8ed7bc]">
            Insights · Reflections · Questions
          </p>
          <h1 className="mb-0 max-w-4xl font-serif text-[clamp(2.25rem,4.4vw,4.25rem)] font-semibold leading-[1.02] tracking-tight text-white">
            Insights: Thinking Out Loud as I Learn
          </h1>
          <p className="mt-6 max-w-3xl font-serif text-lg leading-relaxed text-white/85 sm:text-xl">
            A place for what I am noticing, learning, and still trying to
            understand, about technology, leadership, and the world around me.
          </p>
          <p className="mt-6 text-sm font-medium text-white/70">By Puspa Shukla</p>
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
            {insightSections.map(({ id, title, icon: Icon }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="flex items-center gap-3 rounded-2xl border border-[#c9d6d9] bg-white/90 px-4 py-3 text-sm font-semibold shadow-sm transition-colors hover:border-[#5b9aaa] hover:bg-white dark:border-white/12 dark:bg-[#132c31]/90 dark:hover:border-[#8ed7bc] dark:hover:bg-[#17343a]"
                >
                  <Icon aria-hidden="true" className="size-5 shrink-0 text-[#1f5f6b] dark:text-[#8ed7bc]" />
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <article className="blog-story-copy prose prose-neutral mx-auto w-full max-w-3xl text-pretty dark:prose-invert prose-p:leading-8 prose-headings:scroll-mt-24">
        {insightSections.map(({ id, title, intro }) => (
          <section key={id}>
            <h2 id={id}>{title}</h2>
            <p>{intro}</p>
            <p>
              <em>Essays in this series are on their way.</em>
            </p>
          </section>
        ))}
      </article>
    </div>
  );
}

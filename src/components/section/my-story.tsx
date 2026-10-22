import { Compass, Flag, Footprints } from "lucide-react";
import StoryCategoryRibbon from "@/components/section/story-category-ribbon";
import { DATA } from "@/data/resume";

const storyCategories = [
  { label: "Where I Began", href: "#where-i-began", target: "where-i-began" },
  { label: "What I’m Exploring", href: "#what-im-exploring", target: "what-im-exploring" },
  { label: "Where I’m Heading", href: "#where-im-heading", target: "where-im-heading" },
];

const storySections = [
  { id: "where-i-began", title: "Where I Began", icon: Footprints },
  { id: "what-im-exploring", title: "What I’m Exploring", icon: Compass },
  { id: "where-im-heading", title: "Where I’m Heading", icon: Flag },
];

export default function MyStory() {
  return (
    <div className="blog-story-page flex min-h-0 flex-col gap-y-8 pt-[4.5rem] text-[#17343a] dark:text-[#eef5f6] sm:gap-y-12">
      <StoryCategoryRibbon categories={storyCategories} allStories={null} />

      <header
        id="all-stories"
        className="relative grid overflow-hidden rounded-[14px] bg-[#17343a] text-white shadow-xl shadow-[#17343a]/10 dark:bg-[#132c31] dark:shadow-black/30 dark:ring-1 dark:ring-white/10 lg:min-h-[24rem] lg:grid-cols-[minmax(0,1fr)_minmax(17rem,0.45fr)]"
      >
        <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10 lg:p-12">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#8ed7bc]">
            {DATA.role}
          </p>
          <h1 className="mb-0 max-w-4xl font-serif text-[clamp(2.25rem,4.4vw,4.25rem)] font-semibold leading-[1.02] tracking-tight text-white">
            My Story
          </h1>
          <p className="mt-6 max-w-3xl font-serif text-lg leading-relaxed text-white/85 sm:text-xl">
            {DATA.headline}
          </p>
          <p className="mt-6 text-sm font-medium text-white/70">
            {DATA.name} · {DATA.location}
          </p>
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
            {storySections.map(({ id, title, icon: Icon }) => (
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
        <section>
          <h2 id="where-i-began">Where I Began</h2>
          <p>{DATA.professionalSummary}</p>
          {DATA.education.map((school) => (
            <div key={school.school}>
              <h3>
                {school.program}, {school.school}
              </h3>
              <p>
                <em>
                  {school.specialization} · {school.start} – {school.end}
                </em>
              </p>
              <ul>
                {[...school.details, ...("highlights" in school ? school.highlights : [])].map(
                  (detail) => (
                    <li key={detail}>{detail}</li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2 id="what-im-exploring">What I’m Exploring</h2>
          {DATA.work.map((job) => (
            <div key={job.company}>
              <h3>{job.company}</h3>
              <p>
                <em>{job.title}</em>
              </p>
              <ul>
                {job.work.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2 id="where-im-heading">Where I’m Heading</h2>
          <p>
            <em>This part of my story is on its way.</em>
          </p>
        </section>
      </article>
    </div>
  );
}

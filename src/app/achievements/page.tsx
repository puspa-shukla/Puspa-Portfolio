import type { CSSProperties } from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import type { Metadata } from "next";
import JsonLd from "@/components/json-ld";
import StoryCategoryRibbon from "@/components/section/story-category-ribbon";
import { DATA } from "@/data/resume";
import { articleNode, graph } from "@/lib/structured-data";

// Staggers the header's rise-in animation (same as My Story and U-GO AI).
const riseDelay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const pillClass =
  "rounded-full border border-[#c9d6d9] bg-white px-3 py-1.5 dark:border-white/12 dark:bg-[#132c31]";

const title = "Top 6 Out of 2,000+: The Story Behind the Result";
const description =
  "The story behind Puspa's top-six result in a competitive tech skills scholarship: five months of setbacks, persistence, and growth.";

const achievementCategories = [
  { label: "Scholarships", href: "#scholarships", target: "scholarships" },
  {
    label: "Global Representation",
    href: "#global-representation",
    target: "global-representation",
  },
  { label: "Leadership", href: "#leadership", target: "leadership" },
];

const story = `Imagine working hard for five months and still coming last. Again. And again. And again.

Imagine asking yourself every single day: *"Should I continue?"*

That was me. When I was selected in the top 6 out of more than 2,000 applicants in a competitive tech skills scholarship program, it looked like a perfect success story. But it is not. The real story starts with failure.

Most success stories start at the finish line. This one starts earlier, in the dark, quiet part where nobody claps and quitting feels easy. If you are in that place right now, this story is for you.

## The Room Full of Talent

For five months, I sat in a room with some of the most talented people I had ever met. And every day I thought the same thing: *"Everyone here is better than me."*

They understood faster. They solved faster. Some had already won ten competitions. And me? I was sitting near the bottom of the leaderboard, watching other names go up while mine stayed down.

Every result felt like a message: *you don't belong here.* Some days I cried. Some days I doubted myself. I even wondered if technology was really meant for someone like me. And yes, some people told me this field might not be for me.

The worst part? A small voice inside me almost agreed.

## Two Choices

Let me ask you something. Have you ever been told you are not good enough? Have you ever wanted to give up because everyone else seemed ahead?

If yes, this story is for you.

Every time I fell behind, I had only two choices. Quit. Or learn.

Quitting was easy. Learning was hard, slow and lonely. But I chose to learn. Again and again.

- I stayed longer.
- I practiced more.
- I asked more questions.
- I failed more, and I learned from every failure.

I was behind. But I never left.

## Then Something Changed

Not my ranking. Not my results. Me.

I became stronger. I became more confident. I became someone who could take a bad result, breathe, and try again. And slowly, I built real skills:

- Cybersecurity
- IT Support
- Data Analytics
- Networking
- Communication and Teamwork
- Customer Service and Problem Solving

But my biggest skill was not technical. It was believing in myself when I had no proof that I could.

## The Result

Out of more than 2,000 applicants, I was selected in the top 6.

Read that again. More than 2,000 people. Only six made the top. And I was one of them.

The girl who kept finishing last is now standing among the best.

Not because I was the smartest. Not because I was the most talented. Because I stayed. Quitting would have been easier. But quitting would never have brought me here.

## Let This Sink In

Your ranking today does not decide your future. Your consistency does.

Being behind does not mean you are not able. A slow start is still a start.

And to every girl reading this, especially the one who thinks tech is not for her, listen carefully.

You do not need permission to belong in tech. Your voice belongs here. Your ideas belong here. Your future belongs here.

## This Is Just the Beginning

If anyone tells you that girls cannot succeed in tech, smile. Keep learning. Keep building. Let your success answer for you.

This achievement is not my destination. It is my starting point.

I am just getting started, and I am looking for a team that values hard work, growth and never giving up. If that sounds like yours, I would love to be part of it.

Trust me, I will see you at the top.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://www.puspashukla.com.np/achievements" },
  authors: [{ name: "Puspa Shukla" }],
  openGraph: {
    type: "article",
    title,
    description,
    url: "https://www.puspashukla.com.np/achievements",
    siteName: "Puspa Shukla",
  },
};

export default function AchievementArticlePage() {
  return (
    <div className="story-page blog-page-shell mx-auto w-full max-w-none px-4 pb-24 pt-0 sm:px-8 lg:px-12">
    <div className="blog-story-page flex min-h-0 flex-col gap-y-8 pt-[4.5rem] text-[#17343a] dark:text-[#eef5f6] sm:gap-y-12">
      <JsonLd
        data={graph(
          articleNode({
            path: "/achievements",
            headline: title,
            description,
            image: "/techskills-working.jpg",
          }),
        )}
      />
      <StoryCategoryRibbon categories={achievementCategories} allStories={null} />
      {/* Same opening layout as the My Story and U-GO AI pages */}
      <header id="scholarships" className="mx-auto w-full max-w-3xl scroll-mt-20 pt-6 sm:pt-10">
        <p
          className="contact-rise m-0 inline-flex items-center gap-2 rounded-full border border-[#c9d6d9] bg-white py-1.5 pl-3 pr-4 text-[0.8125rem] font-semibold tracking-[0.02em] text-[#33525a] dark:border-white/12 dark:bg-[#132c31] dark:text-[#b5cbd0]"
          style={riseDelay(0)}
        >
          <span
            aria-hidden="true"
            className="size-2 rounded-full bg-[#3fb28a] shadow-[0_0_0_3px_rgba(63,178,138,0.18)]"
          />
          Achievements
        </p>
        <h1
          className="contact-rise mb-0 mt-6 text-[clamp(1.9rem,6vw,3rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-[#17343a] dark:text-[#eef5f6]"
          style={riseDelay(90)}
        >
          <span className="block">Top 6 out of 2,000+:</span>
          <span className="block text-[#1f5f6b] dark:text-[#8ed7bc]">the story behind the result.</span>
        </h1>
        <p
          className="contact-rise mb-0 mt-6 max-w-2xl text-base leading-relaxed text-[#33525a] dark:text-[#b5cbd0] sm:text-lg"
          style={riseDelay(180)}
        >
          Five months near the bottom of the leaderboard, then a place in the
          top 6. “I was behind. But I never left.”
        </p>
        <div
          className="contact-rise mt-6 flex flex-row flex-wrap items-center gap-2 text-xs font-semibold text-[#17343a] dark:text-[#eef5f6] sm:text-sm"
          style={riseDelay(240)}
        >
          <span className={pillClass}>Top 6 finalists</span>
          <span className={pillClass}>2,000+ applicants</span>
          <span className="rounded-full border border-[#1f5f6b] bg-[#1f5f6b] px-3 py-1.5 text-white dark:border-[#8ed7bc] dark:bg-[#8ed7bc] dark:text-[#0d2125]">
            TechSkills Nepal IT Scholarship Program
          </span>
        </div>
        <p
          className="contact-rise mb-0 mt-5 text-sm font-medium text-[#33525a]/80 dark:text-[#b5cbd0]/80"
          style={riseDelay(300)}
        >
          {DATA.name} · {DATA.location}
        </p>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-col gap-10 sm:gap-14">
        <section id="story" className="scroll-mt-24">
          <article className="blog-story-copy prose prose-neutral mx-auto max-w-3xl text-pretty dark:prose-invert prose-p:leading-8 prose-headings:scroll-mt-24">
            <ReactMarkdown>{story}</ReactMarkdown>
          </article>
        </section>

        <section id="global-representation" className="scroll-mt-24">
          <h2 className="mb-6 font-serif text-3xl font-semibold tracking-tight text-[#17343a] dark:text-[#eef5f6] sm:text-4xl">
            Global Representation
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {DATA.hackathonsAndEvents
              .filter((item) =>
                ["U-GO Nepal Representative", "The Ripple Effect: U-GO Global Publication"].includes(item.title),
              )
              .map((item) => (
                <article
                  key={item.title}
                  className="overflow-hidden rounded-2xl border border-[#c9d6d9] bg-white shadow-sm dark:border-white/12 dark:bg-[#132c31] dark:shadow-none"
                >
                  {item.image && (
                    <div className="relative h-48 bg-[#edf2ee] dark:bg-[#1f3f45]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(min-width: 640px) 360px, 100vw"
                        className="object-contain p-3"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#1f5f6b] dark:text-[#8ed7bc]">
                      {item.dates} <span aria-hidden="true">&middot;</span> {item.location}
                    </p>
                    <h3 className="mt-2 text-xl font-bold text-[#17343a] dark:text-[#eef5f6]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#33525a] dark:text-[#b5cbd0]">
                      {item.description}
                    </p>
                    {item.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex text-sm font-semibold text-[#1f5f6b] underline underline-offset-4 dark:text-[#8ed7bc]"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </article>
              ))}
          </div>
        </section>

        <section id="leadership" className="scroll-mt-24 pb-8">
          <h2 className="mb-6 font-serif text-3xl font-semibold tracking-tight text-[#17343a] dark:text-[#eef5f6] sm:text-4xl">
            Leadership
          </h2>
          {DATA.hackathonsAndEvents
            .filter((item) => item.title === "U-GO AI Workshops & Advanced Courses")
            .map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-[#c9d6d9] bg-white p-6 shadow-sm dark:border-white/12 dark:bg-[#132c31] dark:shadow-none sm:p-8"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-[#1f5f6b] dark:text-[#8ed7bc]">
                  AI learning and mentorship
                </p>
                <h3 className="mt-2 text-xl font-bold text-[#17343a] dark:text-[#eef5f6] sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-2xl leading-relaxed text-[#33525a] dark:text-[#b5cbd0]">
                  {item.description}
                </p>
              </article>
            ))}
        </section>
      </main>
    </div>
    </div>
  );
}

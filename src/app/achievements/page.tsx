import ReactMarkdown from "react-markdown";
import Image from "next/image";
import type { Metadata } from "next";
import StoryCategoryRibbon from "@/components/section/story-category-ribbon";
import { DATA } from "@/data/resume";

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
    <>
      <StoryCategoryRibbon categories={achievementCategories} allStories={null} />
      <main className="blog-story-page mx-auto flex w-full max-w-3xl flex-col gap-10 px-1 pt-[5.5rem] text-[#17343a] sm:gap-14 sm:px-0">
        <section id="scholarships" className="scroll-mt-24">
          <header className="rounded-[14px] bg-[#17343a] p-6 text-white shadow-xl shadow-[#17343a]/10 sm:p-9">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#ffb300]">
              Scholarships
            </p>
            <h1 className="font-serif text-[clamp(2.1rem,5vw,3.75rem)] font-semibold leading-[1.08] tracking-tight">
              {title}
            </h1>
            <p className="mt-5 text-sm font-medium text-white/75">
              Oct 18, 2026 <span aria-hidden="true">&middot;</span> @puspa
            </p>
          </header>

          <article className="blog-story-copy prose prose-neutral mt-8 max-w-none text-pretty dark:prose-invert prose-p:leading-8 prose-headings:scroll-mt-24">
            <ReactMarkdown>{story}</ReactMarkdown>
          </article>
        </section>

        <section id="global-representation" className="scroll-mt-24">
          <h2 className="mb-6 font-sans text-2xl font-bold text-[#17343a] sm:text-3xl">
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
                  className="overflow-hidden rounded-2xl border border-[#c9d6d9] bg-white shadow-sm"
                >
                  {item.image && (
                    <div className="relative h-48 bg-[#edf2ee]">
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
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#1f5f6b]">
                      {item.dates} <span aria-hidden="true">&middot;</span> {item.location}
                    </p>
                    <h3 className="mt-2 text-xl font-bold text-[#17343a]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#33525a]">
                      {item.description}
                    </p>
                    {item.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex text-sm font-semibold text-[#1f5f6b] underline underline-offset-4"
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
          <h2 className="mb-6 font-sans text-2xl font-bold text-[#17343a] sm:text-3xl">
            Leadership
          </h2>
          {DATA.hackathonsAndEvents
            .filter((item) => item.title === "U-GO AI Workshops & Advanced Courses")
            .map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-[#c9d6d9] bg-white p-6 shadow-sm sm:p-8"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-[#1f5f6b]">
                  AI learning and mentorship
                </p>
                <h3 className="mt-2 text-xl font-bold text-[#17343a] sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-2xl leading-relaxed text-[#33525a]">
                  {item.description}
                </p>
              </article>
            ))}
        </section>
      </main>
    </>
  );
}

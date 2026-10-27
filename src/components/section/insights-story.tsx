import type { CSSProperties } from "react";
import { HelpCircle, Lightbulb, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import LaserPointer from "@/components/section/laser-pointer";
import ReadMore from "@/components/section/read-more";
import StoryCategoryRibbon from "@/components/section/story-category-ribbon";
import { ChapterHeading } from "@/components/section/story-blocks";
import { DATA } from "@/data/resume";

const opening =
  "A place for what I am noticing, learning, and still trying to understand, about technology, leadership, and the world around me.";

// Essay in Part 01. The preview is always shown; the rest sits behind
// "Read the full essay". Headings are shifted down a level (# → ###, ## → ####)
// so they nest under the Part heading.
const girlsInTechEssayPreview = `### Girls in AI & Tech: The Future Needs Her Voice, Too

*She doesn't need to know everything to begin. She needs the opportunity to try.*

Imagine a girl sitting in a classroom, curious about how an app works or how artificial intelligence answers questions. She wants to learn coding, build something of her own, or solve a problem in her community. But before she even begins, she wonders: *Am I smart enough? Is this field for someone like me? What if I fail?*

Sometimes, the biggest barrier is not a lack of talent. It is the belief that we do not belong before we have even given ourselves a chance.`;

const girlsInTechEssayRest = `#### The gap is real, but so is the opportunity

Technology is shaping almost every part of our lives. Artificial intelligence is changing how we study, work, communicate, and solve problems. Yet women remain underrepresented in the fields building these technologies.

According to UNESCO, women make up only **35% of STEM graduates worldwide**, a figure that has remained largely unchanged over the past decade. In February 2026, the United Nations reported that women represented just **26% of the workforce in data and artificial intelligence**. [Sources: UNESCO](https://www.unesco.org/en/gender-equality/education/stem) and [United Nations](https://www.un.org/en/node/239706).

These numbers tell us something important: progress in technology does not automatically mean equal opportunity.

Behind the statistics are questions worth asking. Who gets access to a computer? Who has someone to guide them when learning becomes difficult? Who is encouraged to experiment, and who is made to feel that one mistake proves they are not capable?

For many girls, especially those from rural communities or families with limited resources, the journey into technology can involve challenges that have little to do with their ability to learn.

**Talent is everywhere, but opportunity is not.**

#### You don't have to be an expert to begin

One of the biggest misconceptions about technology is that you must be exceptionally intelligent, highly experienced, or naturally gifted at mathematics to succeed.

You don't.

You can start with the basics. Learn a little Python. Build a simple website. Experiment with an AI tool. Make mistakes, search for answers, and try again.

Your first project does not have to change the world. It might simply help someone calculate a budget, learn a new concept, or complete a task more easily. What matters is that you move from consuming technology to understanding and creating with it.

You will encounter confusing errors, difficult concepts, and moments when everyone else seems to be moving faster. That does not mean you are not meant for this field. It means you are learning something new.

**Confidence is not always what comes before the first step. Sometimes, it is what grows because you took it.**

#### Why girls belong in the age of AI

Artificial intelligence is not just about writing code or building advanced systems. It is also about deciding which problems deserve attention, whose needs are considered, and how technology affects real lives.

Imagine an AI learning tool designed for students who cannot afford private tutoring. Imagine technology that helps women access financial information or helps people in remote communities find essential services.

These are possibilities worth exploring.

But technology does not automatically become fair simply because it is advanced. AI systems learn from data created by people and societies. If that data contains gaps or reflects existing stereotypes, the systems can reproduce those problems. Research and policy discussions highlighted by UN Women show why gender representation matters in the development and use of AI.

This is why girls and women should not be limited to using technology built by others. They should have opportunities to question it, test it, design it, and help decide how it should be used.

We need women as programmers, researchers, engineers, founders, decision-makers, and ethical voices in technology.

**The goal is not simply to put more women into technology. It is to ensure they have a meaningful role in shaping what technology becomes.**

#### From waiting for permission to creating possibilities

Sometimes, girls are encouraged to choose safe paths, avoid mistakes, or wait until they feel completely prepared. But innovation requires curiosity, experimentation, and the willingness to be a beginner.

You do not need to know your entire career path today. You do not need the perfect laptop, an expensive course, or a room full of experts to take your first step.

Start with the resources you have. Ask questions. Find a learning community. Share what you discover. Build small projects. Seek mentors who challenge you to grow. And when you gain experience, help another girl take her first step, too.

We also need to look beyond individual motivation. Families can encourage curiosity, schools can provide practical opportunities, organizations can invest in mentorship, and technology companies can build fairer environments where women can learn, contribute, and lead.

Inclusion is not a favour granted to girls. It is an investment in human potential.

#### When one girl grows, the possibilities grow

A girl who learns to code may build an application that solves a local problem. Another may become an AI researcher. Someone else may teach technology to students who have never imagined themselves in this field.

Their journeys will be different, and not every girl needs to choose a career in technology. The real goal is to ensure that those who want to explore it have a fair chance to do so.

And for girls already learning, building, and struggling through their first projects: your beginning does not have to look impressive to anyone else. It only has to be real.

Learn even when progress feels slow. Ask questions even when you feel shy. Apply even when you are unsure. Share your ideas even when your voice shakes.

You belong in the conversation, not because you have mastered everything, but because you have something to learn, something to contribute, and the right to explore what is possible.

#### The future should not be built with half the world's potential left unheard

We often speak about the future of AI as if it is something waiting to happen. But the future is being shaped right now—in classrooms, research laboratories, startups, homes, and communities around the world.

The question is not whether girls are capable of contributing. The question is whether we will create the conditions that allow them to participate fully.

Every girl deserves the chance to discover what she can do before the world decides what she cannot.

So, if you are a girl who is curious about technology, begin. You can learn the skills. You can build the project. You can make mistakes and try again.

And if you are someone who can open a door for another girl, do it. Share your knowledge. Offer guidance. Make room at the table.

**Don't wait for a future where girls are included in technology. Help build one where their ideas are impossible to ignore.**`;

const insightCategories = [
  { label: "AI and Girls in Tech", href: "#ai-and-girls-in-tech", target: "ai-and-girls-in-tech" },
  { label: "Ideas That Matter", href: "#ideas-that-matter", target: "ideas-that-matter" },
  { label: "Things Worth Questioning", href: "#things-worth-questioning", target: "things-worth-questioning" },
];

type InsightSection = {
  id: string;
  title: string;
  icon: typeof Sparkles;
  intro: string;
  body?: string;
  essay?: { preview: string; rest: string };
};

const insightSections: InsightSection[] = [
  {
    id: "ai-and-girls-in-tech",
    title: "AI and Girls in Tech",
    icon: Sparkles,
    intro:
      "What I am learning about artificial intelligence and how it is changing the way we study and work, alongside notes on being a young woman learning technology: the doubts, the small wins, and the people who make the path easier for those who come next.",
    body: `### Girls in AI & Tech

You don't need to know everything to belong in tech. You just need the courage to begin, the patience to learn, and the confidence to keep going when things feel difficult.

Too many girls grow up questioning whether they are capable before they even get the chance to try. I believe the future of technology should be shaped by girls from every background, not just those who had the easiest start.

**You don't have to wait until you feel ready to build something that matters. Start where you are. Learn as you go. Make room for others along the way.**`,
    essay: { preview: girlsInTechEssayPreview, rest: girlsInTechEssayRest },
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
      <article className="blog-story-copy my-story-copy prose prose-neutral mx-auto w-full max-w-3xl text-pretty dark:prose-invert prose-p:leading-relaxed prose-headings:scroll-mt-24 [&_h3]:mb-4 [&_h3]:mt-10 [&_h3]:border-l-4 [&_h3]:border-[#1f5f6b] dark:[&_h3]:border-[#8ed7bc] [&_h3]:pl-3 [&_h3]:text-xl sm:[&_h3]:text-2xl [&_h4]:mb-3 [&_h4]:mt-8 [&_h4]:text-lg sm:[&_h4]:text-xl">
        {insightSections.map(({ id, title, intro, body, essay }, index) => (
          <section key={id}>
            <ChapterHeading part={String(index + 1).padStart(2, "0")} id={id} title={title} />
            <p>{intro}</p>
            {body && <ReactMarkdown>{body}</ReactMarkdown>}
            {essay ? (
              <>
                <ReactMarkdown>{essay.preview}</ReactMarkdown>
                <ReadMore moreLabel="Read the full essay" lessLabel="Show less">
                  <ReactMarkdown>{essay.rest}</ReactMarkdown>
                </ReadMore>
              </>
            ) : (
              <p>
                <em>Essays in this series are on their way.</em>
              </p>
            )}
          </section>
        ))}
      </article>
      </LaserPointer>
    </div>
  );
}

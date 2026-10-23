import type { CSSProperties } from "react";
import ReactMarkdown from "react-markdown";
import BlogImpactStats from "@/components/section/blog-impact-stats";
import LaserPointer from "@/components/section/laser-pointer";
import StoryCategoryRibbon from "@/components/section/story-category-ribbon";
import { ChapterHeading, PhotoBlock } from "@/components/section/story-blocks";
import { DATA } from "@/data/resume";

const opening =
  "Nobody handed me a title. I finished the U-GO AI course first, then helped 3,000+ scholars across nine countries build skills with AI. This is how I learned that leadership begins before anyone asks.";

// Part 01: Learning First
const walkedThrough = `Nobody handed me a title. Nobody put me on a stage or asked me to lead. I was a second-year computer applications student at Pokhara University in Nepal, focused on AI, when U-GO launched its AI training program.

In front of me was a course and a choice. I could wait and watch how it went for others, or I could walk through the door first.

I walked through first.`;

const firstToFinish = `### The first to finish

Some people think leadership begins when someone hands you authority. I learned that it begins the moment you decide that *somebody has to go first*, and that it might as well be you.`;

const everyLesson = `From my first day in the U-GO AI community, I treated every lesson as if the future of my fellow scholars depended on it. I didn't skim. I went deep into prompt engineering and learned to use AI tools as real, working skills. **I became the first U-GO scholar to complete the entire U-GO AI course.**

That was the moment the scholars and the directors of U-GO Nepal began to notice me. But I understood something right away: finishing first means nothing if you're the only one standing at the finish line.`;

const openDoor = `### The door that was always open

So I made myself available, with no schedule and no office hours. **Whenever a scholar needed help with anything, I was there.**`;

const stepByStep = `When a scholar couldn't figure out how to write a professional email, I opened a video call and walked her through it, step by step. When another was lost in Google Sheets, I shared my screen and we built it together, cell by cell. When one was nervous about Zoom, I recorded a short video she could replay as many times as she wanted. When someone's internet was too weak for a call, I sent audio messages. When a scholar just needed a quick answer, I wrote back within minutes.`;

const smallThings = `I taught scholars to feel at home with Google Meet and Zoom, to build LinkedIn profiles that told their stories, and to write resumes line by line until they could finally see their own worth on paper.

These looked like small things. They weren't. For a young woman who had never had these tools explained to her, "how do I attach a file?" was the question standing between her and her future. I knew that, because not long before, I had been sitting in the same seat.

I answered every time, and I never made anyone feel small for asking.`;

// Part 02: Leading Without a Title
const unseenWork = `### The work nobody saw

This is the work that never showed up in a report. *I wasn't paid, praised, or recognized locally.* There were no certificates for late-night calls or applause for the hundredth screen-share. Some days I wondered if anyone noticed, but I kept answering messages, joining calls, and helping scholars finish their resumes, even when I was tired and no one said thank you.

I made myself a promise: *do the work because it's right, not because it's rewarded.* I never kept score or waited for a reward. I kept showing up, one scholar at a time, because impact doesn't need an audience, and opening a door for someone matters more than applause.

I believed that when you give with an honest heart, it finds its way back to you. Later, the quiet work returned as recognition on a global stage.

> **What goes around comes around.**`;

const beyondBorders = `### Beyond the borders

Once the scholars in Nepal were moving, the next question came naturally: *why stop here?*`;

const sameEnergy = `I carried the same energy to scholars in Nepal, India, Bangladesh, Pakistan, Indonesia, the Philippines, Cambodia, Vietnam, and Tanzania. They spoke different languages, lived in different time zones, and came from different cultures, but they had the same hunger to rise. And they all found the same open door: *ask me anything, anytime.*`;

const nineCountries = `Today the U-GO AI program runs in **nine countries**: Nepal, India, Bangladesh, Pakistan, Indonesia, the Philippines, Cambodia, Vietnam, and Tanzania. It has equipped **more than 3,000 U-GO scholars with AI skills**. The **U-GO AI Tips for Scholars** community has grown past a thousand members, with women from around the world learning from one another and lifting one another up.

I did all of this while still a university student, with my own exams, assignments, and deadlines. I didn't wait until I felt ready. I grew into leadership by practicing it.`;

// Part 03: The Impact
const worldNoticed = `### Then the world noticed

And then, at the **U-GO Global Summit in Cambodia**, it happened.`;

const cameBack = `The work that went unrecognized at home was recognized on a global stage. The unpaid hours, the quiet effort, and the thousands of answered messages all came back at once. In that moment, an old saying stopped being a saying and became a lesson I had lived: **what goes around, comes around.**

I never helped anyone to get something back. But the help I gave came back to me, bigger than I could have planned.`;

const kerrIntro = `Stuart Kerr, Global Director of U-GO AI at U-GO University, said this about my work:`;

const afterQuote = `I read those words more than once. They were a gift, and I treat them as a promise. I went right back to work, because recognition isn't a finish line. It's a reason to keep going.`;

const rippleEffect = `### The ripple effect

U-GO doesn't require its scholars to give back, but it encourages us to pay it forward, to lift our families, our communities, and other young women pursuing education. I decided that would be how I live.

> **One woman who learns a skill is a story. One woman who teaches that skill is a movement.**

When I teach ten scholars and each of them teaches ten more, I'm no longer just a student with a laptop in Pokhara. I'm the first stone dropped in the water, and the ripples travel to places I will never see.`;

const lessons = `### What my story taught me

- **Don't wait to be asked.** The people who change things begin before the invitation comes.
- **Be available.** Answer the message, take the call, share the screen. Leadership is built from small, repeated acts of showing up.
- **Do it when no one is watching.** The work done without applause is the work that builds character.
- **Don't expect anything back.** Give freely and generously, then watch what happens.
- **Remember that what goes around comes around.** It may take months or years, but effort and kindness find their way home.`;

const fiveYears = `### And five years from now?

If I could do all this in my second year, with no title, no budget, and no payment, what happens when I have a degree, experience, a network, and five more years of momentum?

I picture myself building programs that reach hundreds of thousands of women instead of thousands. I picture myself leading teams across continents, shaping how the next generation learns AI and stays safe in a digital world, and opening doors that were once locked. And I'll bring the same open door with me.`;

const workWithMe = `### Work with me

If you're a founder, a program director, an educator, or a team that needs someone who shows up before being asked, who serves without being told, who brings people together across borders, and who delivers when it counts, I would love to hear from you.

> **I was the first to finish. I was never the last to help.**

**Let's work together: [${DATA.contact.email}](mailto:${DATA.contact.email})**`;

const ugoCategories = [
  { label: "Learning First", href: "#learning-first", target: "learning-first" },
  { label: "Leading Without a Title", href: "#leading-without-a-title", target: "leading-without-a-title" },
  { label: "The Impact", href: "#the-impact", target: "the-impact" },
];

// Staggers the header's rise-in animation (same as the My Story page).
const riseDelay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export default function BlogSection() {
  return (
    <div className="blog-story-page flex min-h-0 flex-col gap-y-8 pt-[4.5rem] text-[#17343a] dark:text-[#eef5f6] sm:gap-y-12">
      <StoryCategoryRibbon categories={ugoCategories} allStories={null} />

      {/* Same opening layout as the My Story page */}
      <header id="all-stories" className="mx-auto w-full max-w-3xl scroll-mt-20 pt-6 sm:pt-10">
        <p
          className="contact-rise m-0 inline-flex items-center gap-2 rounded-full border border-[#c9d6d9] bg-white py-1.5 pl-3 pr-4 text-[0.8125rem] font-semibold tracking-[0.02em] text-[#33525a] dark:border-white/12 dark:bg-[#132c31] dark:text-[#b5cbd0]"
          style={riseDelay(0)}
        >
          <span
            aria-hidden="true"
            className="size-2 rounded-full bg-[#3fb28a] shadow-[0_0_0_3px_rgba(63,178,138,0.18)]"
          />
          U-GO AI
        </p>
        <h1
          className="contact-rise mb-0 mt-6 text-[clamp(1.9rem,6vw,3rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-[#17343a] dark:text-[#eef5f6]"
          style={riseDelay(90)}
        >
          <span className="block">The girl who</span>
          <span className="block text-[#1f5f6b] dark:text-[#8ed7bc]">did not wait to be asked.</span>
        </h1>
        <p
          className="contact-rise mb-0 mt-6 max-w-2xl text-base leading-relaxed text-[#33525a] dark:text-[#b5cbd0] sm:text-lg"
          style={riseDelay(180)}
        >
          {opening}
        </p>
        <div
          className="contact-rise relative z-10 mt-6 flex flex-row flex-wrap items-center gap-2 text-xs font-semibold text-[#17343a] dark:text-[#eef5f6] sm:text-sm"
          style={riseDelay(240)}
        >
          <span className="rounded-full border border-[#c9d6d9] bg-white px-3 py-1.5 dark:border-white/12 dark:bg-[#132c31]">
            3,000+ scholars reached
          </span>
          <details className="relative">
            <summary className="cursor-pointer list-none rounded-full border border-[#c9d6d9] bg-white px-3 py-1.5 transition-colors hover:border-[#1f5f6b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffb300] dark:border-white/12 dark:bg-[#132c31] dark:hover:border-[#8ed7bc]">
              9 countries <span aria-hidden="true">▾</span>
            </summary>
            <ul className="absolute left-0 top-full z-20 mt-2 min-w-44 list-none rounded-xl border border-[#c9d6d9] bg-white p-3 text-[#17343a] shadow-xl dark:border-white/12 dark:bg-[#132c31] dark:text-[#eef5f6]">
              {["Nepal", "India", "Bangladesh", "Pakistan", "Indonesia", "Philippines", "Cambodia", "Vietnam", "Tanzania"].map((country) => (
                <li key={country} className="px-2 py-1">{country}</li>
              ))}
            </ul>
          </details>
          <a
            href="https://ugoai.org/"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[#1f5f6b] bg-[#1f5f6b] px-3 py-1.5 text-white transition-colors hover:bg-[#17343a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffb300] dark:border-[#8ed7bc] dark:bg-[#8ed7bc] dark:text-[#0d2125] dark:hover:bg-[#a9e3cd]"
          >
            AI learning and community leadership
          </a>
        </div>
        <p
          className="contact-rise mb-0 mt-5 text-sm font-medium text-[#33525a]/80 dark:text-[#b5cbd0]/80"
          style={riseDelay(300)}
        >
          {DATA.name} · {DATA.location}
        </p>
      </header>

      <LaserPointer>
      <article
        id="story"
        className="blog-story-copy my-story-copy prose prose-neutral mx-auto w-full max-w-3xl text-pretty dark:prose-invert prose-p:leading-relaxed prose-headings:scroll-mt-24 [&_h3]:mb-4 [&_h3]:mt-10 [&_h3]:border-l-4 [&_h3]:border-[#1f5f6b] dark:[&_h3]:border-[#8ed7bc] [&_h3]:pl-3 [&_h3]:text-xl sm:[&_h3]:text-2xl"
      >
        <section>
          <ChapterHeading part="01" id="learning-first" title="Learning First" />
          <ReactMarkdown>{walkedThrough}</ReactMarkdown>
          <ReactMarkdown>{firstToFinish}</ReactMarkdown>
          <PhotoBlock
            side="right"
            src="/ugo-peer-learning.png"
            alt="Puspa discussing a lesson with fellow U-GO Nepal scholars around a table of notebooks"
            width={1080}
            height={720}
            caption="Learning together with fellow U-GO Nepal scholars."
          >
            <ReactMarkdown>{everyLesson}</ReactMarkdown>
          </PhotoBlock>
          <ReactMarkdown>{openDoor}</ReactMarkdown>
          <PhotoBlock
            side="left"
            src="/ugo/online-learning-session.png"
            alt="A video call grid of U-GO scholars learning together online, captioned Learning + Sharing = Happy me!"
            width={1080}
            height={768}
            caption="An online session with U-GO scholars: learning + sharing."
          >
            <ReactMarkdown>{stepByStep}</ReactMarkdown>
          </PhotoBlock>
          <ReactMarkdown>{smallThings}</ReactMarkdown>
        </section>

        <section>
          <ChapterHeading part="02" id="leading-without-a-title" title="Leading Without a Title" />
          <ReactMarkdown>{unseenWork}</ReactMarkdown>
          <ReactMarkdown>{beyondBorders}</ReactMarkdown>
          <ReactMarkdown>{sameEnergy}</ReactMarkdown>
          <ReactMarkdown>{nineCountries}</ReactMarkdown>
          <BlogImpactStats />
        </section>

        <section>
          <ChapterHeading part="03" id="the-impact" title="The Impact" />
          <ReactMarkdown>{worldNoticed}</ReactMarkdown>
          <PhotoBlock
            side="right"
            src="/ugo/call-with-stuart-kerr.png"
            alt="Puspa on a video call with Stuart Kerr, Global Director of U-GO AI"
            width={1080}
            height={546}
            caption="On a video call with Stuart Kerr, Global Director of U-GO AI."
          >
            <ReactMarkdown>{cameBack}</ReactMarkdown>
          </PhotoBlock>
          <ReactMarkdown>{kerrIntro}</ReactMarkdown>
          {/* Same quote card as the page's other highlighted lines, plus who said it. */}
          <blockquote className="story-quote-wash">
            <p>
              &ldquo;Puspa Shukla is one of the core reasons why the U-GO AI program
              has expanded on a global basis and has reached thousands of women
              scholars in nine different countries. She is a force of nature and
              a phenomenal person to have on your team.&rdquo;
            </p>
            <footer className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-sm font-normal not-italic text-[#33525a] dark:text-[#b5cbd0]">
              <span>
                <span className="font-semibold text-[#17343a] dark:text-[#eef5f6]">Stuart Kerr</span>
                , Global Director of U-GO AI, U-GO University
              </span>
              <a href="https://ugoai.org/" target="_blank" rel="noreferrer" className="shrink-0 font-semibold">
                Visit U-GO AI <span aria-hidden="true">↗</span>
              </a>
            </footer>
          </blockquote>
          <ReactMarkdown>{afterQuote}</ReactMarkdown>
          <ReactMarkdown>{rippleEffect}</ReactMarkdown>
          <ReactMarkdown>{lessons}</ReactMarkdown>
          <ReactMarkdown>{fiveYears}</ReactMarkdown>
          <ReactMarkdown>{workWithMe}</ReactMarkdown>
        </section>
      </article>
      </LaserPointer>
    </div>
  );
}

import { DATA } from "@/data/resume";
import Image from "next/image";
import BlogImpactStats from "@/components/section/blog-impact-stats";
import StoryScrollLayout, {
  type StoryChapter,
} from "@/components/section/story-scroll-layout";
import StoryCategoryRibbon from "@/components/section/story-category-ribbon";

const chapters: StoryChapter[] = [
  {
    id: "first-to-finish",
    label: "Learn it. Then lead with it.",
    image: "/ugo-peer-learning.png",
    imageAlt: "Puspa discussing a lesson with fellow U-GO scholars",
  },
  {
    id: "open-door",
    label: "Make the next step easier for someone else.",
    image: "/ugo-ai-session.png",
    imageAlt: "Puspa and U-GO scholars sharing an online learning session",
  },
  {
    id: "unseen-work",
    label: "Do the work before anyone is watching.",
    image: "/techskills-working.jpg",
    imageAlt: "Puspa working at a computer during hands-on IT training",
  },
  {
    id: "what-goes-around",
    label: "Keep showing up. Let impact travel.",
    image: "/ugo-ai-session.png",
    imageAlt: "Scholars joining a U-GO AI online session",
  },
  {
    id: "beyond-borders",
    label: "One open door can cross borders.",
    image: "/ugo-nepal-vietnam.jpg",
    imageAlt: "Puspa with fellow U-GO scholars at a global summit",
  },
  {
    id: "world-noticed",
    label: "Quiet work can create global impact.",
    image: "/ugo-nepal-vietnam.jpg",
    imageAlt: "Puspa and the U-GO community at a global summit",
  },
  {
    id: "ripple-effect",
    label: "Teach one. Empower many.",
    image: "/ugo-ai-session.png",
    imageAlt: "Women scholars learning together through U-GO AI",
  },
  {
    id: "story-lessons",
    label: "Show up. Share what you learn.",
    image: "/techskills-working.jpg",
    imageAlt: "Puspa applying her skills during practical IT training",
  },
  {
    id: "five-years",
    label: "Building toward a wider reach.",
    image: "/techskills-working.jpg",
    imageAlt: "Puspa working at a computer during hands-on IT training",
  },
  {
    id: "work-together",
    label: "Ready to make a difference together?",
    image: "/ugo-nepal-vietnam.jpg",
    imageAlt: "Puspa standing with her U-GO community",
  },
];

export default function BlogSection() {
  return (
    <div className="blog-story-page flex min-h-0 flex-col gap-y-8 pt-[4.5rem] text-[#17343a] sm:gap-y-12">
      <StoryCategoryRibbon />
      <header
        id="all-stories"
        className="grid scroll-mt-20 overflow-hidden rounded-[14px] bg-[#17343a] text-white shadow-xl shadow-[#17343a]/10 lg:min-h-[24rem] lg:grid-cols-[minmax(0,1fr)_minmax(17rem,0.45fr)]"
      >
        <div className="flex flex-col justify-center p-5 sm:p-7 md:p-9 lg:p-10">
          <div className="mb-5 max-w-4xl">
            <h1 className="mb-0 font-serif text-[clamp(2.25rem,4.4vw,4.25rem)] font-semibold leading-[1.02] tracking-tight text-white">
              The Girl Who{" "}
              <span className="text-[#ffb300] underline decoration-[#ffb300]/90 decoration-2 underline-offset-[0.18em]">
                Did Not Wait to Be Asked
              </span>
            </h1>
          </div>
          <div className="flex flex-wrap items-start gap-2 text-xs font-semibold text-[#17343a] sm:text-sm">
            <span className="rounded-full border border-white/80 bg-[#fbf8f2] px-3 py-1.5 shadow-sm">
              3,000+ scholars reached
            </span>
            <span className="max-w-full rounded-xl border border-white/80 bg-[#fbf8f2] px-4 py-2 leading-relaxed shadow-sm">
              9 countries: Nepal, India, Bangladesh, Pakistan, Indonesia, Philippines, Cambodia, Vietnam, Tanzania
            </span>
            <a
              href="https://ugoai.org/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[#ffb300] bg-[#ffb300] px-3 py-1.5 text-[#17343a] shadow-sm transition-colors hover:bg-[#ffd05a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              AI learning and community leadership
            </a>
          </div>
        </div>
        <div className="relative min-h-[22rem] bg-[#edf2ee] sm:min-h-[26rem] lg:min-h-[24rem]">
          <Image
            src="/ugo-scholar-presentation.jpg"
            alt="Two U-GO scholars presenting together; one speaks while holding her notes"
            fill
            priority
            unoptimized
            sizes="(min-width: 1024px) 38vw, 100vw"
            className="object-contain"
          />
        </div>
      </header>

      <StoryScrollLayout chapters={chapters}>
      <article
        id="story"
        className="blog-story-copy prose prose-neutral max-w-none text-pretty dark:prose-invert prose-p:leading-8 prose-headings:scroll-mt-24"
      >
        <p className="lead">By Puspa Shukla</p>
        <p>
          Nobody handed me a title. Nobody put me on a stage or asked me to
          lead. I was a second-year computer applications student at Pokhara
          University in Nepal, focused on AI, when U-GO
          launched its AI training program.
        </p>
        <p>
          In front of me was a course and a choice. I could wait and watch how
          it went for others, or I could walk through the door first.
        </p>
        <p>I walked through first.</p>
        <h2 id="first-to-finish">The first to finish</h2>
        <p>
          Some people think leadership begins when someone hands you authority.
          I learned that it begins the moment you decide that{" "}
          <em>somebody has to go first</em>, and that it might as well be you.
        </p>
        <p>
          From my first day in the U-GO AI community, I treated every lesson as
          if the future of my fellow scholars depended on it. I didn't skim. I
          went deep into prompt engineering and learned to use AI tools as real,
          working skills.{" "}
          <strong>
            I became the first U-GO scholar to complete the entire U-GO AI
            course.
          </strong>
        </p>
        <p>
          That was the moment the scholars and the directors of U-GO Nepal
          began to notice me. But I understood something right away: finishing
          first means nothing if you're the only one standing at the finish
          line.
        </p>
        <BlogImpactStats />

        <h2 id="open-door">The door that was always open</h2>
        <p>
          So I made myself available, with no schedule and no office hours.{" "}
          <strong>
            Whenever a scholar needed help with anything, I was
            there.
          </strong>
        </p>
        <p>
          When a scholar couldn't figure out how to write a professional email,
          I opened a video call and walked her through it, step by step. When
          another was lost in Google Sheets, I shared my screen and we built it
          together, cell by cell. When one was nervous about Zoom, I recorded a
          short video she could replay as many times as she wanted. When
          someone's internet was too weak for a call, I sent audio messages.
          When a scholar just needed a quick answer, I wrote back within
          minutes.
        </p>
        <p>
          I taught scholars to feel at home with Google Meet and Zoom, to build
          LinkedIn profiles that told their stories, and to write resumes line
          by line until they could finally see their own worth on paper.
        </p>
        <p>
          These looked like small things. They weren't. For a young woman who
          had never had these tools explained to her, "how do I attach a file?"
          was the question standing between her and her future. I knew that,
          because not long before, I had been sitting in the same seat.
        </p>
        <p>I answered every time, and I never made anyone feel small for asking.</p>

        <h2 id="unseen-work">The work nobody saw</h2>
        <p>
          This is the part of the story that never shows up in a report.
        </p>
        <p>
          <em>
            I wasn't paid. I wasn't praised. At the local level, my work wasn't
            even recognized.
          </em>
        </p>
        <p>
          There were no certificates for the late-night calls and no applause
          for the hundredth screen-share. Some days I wondered whether anyone
          noticed, or whether it mattered at all.
        </p>
        <p>
          But I had made myself a promise:{" "}
          <em>do the work because it's right, not because it's rewarded.</em> I
          believed that impact doesn't need an audience. A scholar who sends
          her first professional email isn't thinking about who is clapping.
          She's busy walking through a door that just opened.
        </p>

        <h2 id="what-goes-around">What Goes Around Comes Around</h2>
        <p>
          Nobody paid me for this. Nobody clapped. For a long time, almost
          nobody even noticed.
        </p>
        <p>I kept going anyway.</p>
        <p>
          I kept answering the messages. I kept joining the calls. I kept
          sharing my screen, recording my videos, and sitting with scholars
          until their resumes were finished and their confidence had returned.
          I kept doing it on the days I was tired, on the days no one said thank
          you, and on the days it felt like my effort was disappearing into
          silence.
        </p>
        <p>
          I never kept score, and I never waited for a reward. I just kept
          doing the work, one scholar at a time, because I believed that if you
          give with an honest heart, it will find its way back to you.
        </p>

        <h2 id="beyond-borders">Beyond the borders</h2>
        <p>
          Once the scholars in Nepal were moving, the next question came
          naturally: <em>why stop here?</em>
        </p>
        <p>
          I carried the same energy to scholars in Nepal, India, Bangladesh,
          Pakistan, Indonesia, the Philippines, Cambodia, Vietnam, and Tanzania.
          They spoke different languages, lived in different time zones, and
          came from different cultures, but they had the same hunger to rise.
          And they all found the same open door: <em>ask me anything, anytime.</em>
        </p>
        <p>
          Today the U-GO AI program runs in <strong>nine countries</strong>:
          Nepal, India, Bangladesh, Pakistan, Indonesia, the Philippines,
          Cambodia, Vietnam, and Tanzania. It has equipped{" "}
          <strong>more than 3,000 U-GO scholars with AI skills</strong>.
          The <strong>U-GO AI Tips for Scholars</strong> community has grown
          past a thousand members, with women from around the world learning
          from one another and lifting one another up.
        </p>
        <p>
          I did all of this while still a university student, with my own
          exams, assignments, and deadlines. I didn't wait until I felt ready.
          I grew into leadership by practicing it.
        </p>

        <h2 id="world-noticed">Then the world noticed</h2>
        <p>
          And then, at the <strong>U-GO Global Summit in Cambodia</strong>, it
          happened.
        </p>
        <p>
          The work that went unrecognized at home was recognized on a global
          stage. The unpaid hours, the quiet effort, and the thousands of
          answered messages all came back at once. In that moment, an old
          saying stopped being a saying and became a lesson I had lived:
        </p>
        <p>
          <strong>What goes around, comes around.</strong>
        </p>
        <p>
          I never helped anyone to get something back. But the help I gave
          came back to me, bigger than I could have planned.
        </p>
        <p>
          Stuart Kerr, Global Director of U-GO AI at U-GO University, said this
          about my work:
        </p>
        <figure className="not-prose my-12 overflow-hidden rounded-3xl bg-[#173b3d] px-6 py-8 text-white shadow-lg shadow-[#173b3d]/10 sm:px-10 sm:py-10">
          <figcaption className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-[#f5c75e]">
            Stuart Kerr on U-GO AI community leadership
          </figcaption>
          <blockquote className="m-0 border-0 p-0 font-serif text-2xl leading-snug text-white sm:text-3xl">
            "Puspa Shukla is one of the core reasons why the U-GO AI program
            has expanded on a global basis and has reached thousands of women
            scholars in nine different countries. She is a force of nature and
            a phenomenal person to have on your team."
          </blockquote>
          <figcaption className="mt-6 text-sm text-white/70">
            Stuart Kerr - Global Director of U-GO AI, U-GO University
          </figcaption>
          <a href="https://ugoai.org/" target="_blank" rel="noreferrer" className="mt-5 inline-flex font-semibold text-[#f5c75e] underline underline-offset-4">
            Visit U-GO AI
          </a>
        </figure>
        <p>
          I read those words more than once. They were a gift, and I treat
          them as a promise. I went right back to work, because recognition
          isn't a finish line. It's a reason to keep going.
        </p>

        <h2 id="ripple-effect">The ripple effect</h2>
        <p>
          U-GO doesn't require its scholars to give back, but it encourages us
          to pay it forward, to lift our families, our communities, and other
          young women pursuing education. I decided that would be how I live.
        </p>
        <p>
          <strong>
            One woman who learns a skill is a story. One woman who teaches
            that skill is a movement.
          </strong>{" "}
          When I teach ten scholars and each of them teaches ten more, I'm no
          longer just a student with a laptop in Pokhara. I'm the first stone
          dropped in the water, and the ripples travel to places I will never
          see.
        </p>

        <h2 id="story-lessons">What my story taught me</h2>
        <ul>
          <li>
            <strong>Don't wait to be asked.</strong> The people who change
            things begin before the invitation comes.
          </li>
          <li>
            <strong>Be available.</strong> Answer the message, take the call,
            share the screen. Leadership is built from small, repeated acts of
            showing up.
          </li>
          <li>
            <strong>Do it when no one is watching.</strong> The work done
            without applause is the work that builds character.
          </li>
          <li>
            <strong>Don't expect anything back.</strong> Give freely and
            generously, then watch what happens.
          </li>
          <li>
            <strong>Remember that what goes around comes around.</strong> It
            may take months or years, but effort and kindness find their way
            home.
          </li>
        </ul>

        <h2 id="five-years">And five years from now?</h2>
        <p>
          If I could do all this in my second year, with no title, no budget,
          and no payment, what happens when I have a degree, experience, a
          network, and five more years of momentum?
        </p>
        <p>
          I picture myself building programs that reach hundreds of thousands
          of women instead of thousands. I picture myself leading teams across
          continents, shaping how the next generation learns AI and stays safe
          in a digital world, and opening doors that were once locked. And I'll
          bring the same open door with me.
        </p>

        <h2 id="work-together">Work with me</h2>
        <p>
          If you're a founder, a program director, an educator, or a team that
          needs someone who shows up before being asked, who serves without
          being told, who brings people together across borders, and who
          delivers when it counts, I would love to hear from you.
        </p>
        <p>I was the first to finish. I was never the last to help.</p>
        <p>
          <strong>
            Let's work together.{" "}
            <a href={`mailto:${DATA.contact.email}`}>{DATA.contact.email}</a>
          </strong>
        </p>
      </article>
      </StoryScrollLayout>
    </div>
  );
}

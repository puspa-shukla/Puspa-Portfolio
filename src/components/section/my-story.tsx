import type { CSSProperties, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import LaserPointer from "@/components/section/laser-pointer";
import StoryCategoryRibbon from "@/components/section/story-category-ribbon";
import StoryPhoto from "@/components/section/story-photo";
import { DATA } from "@/data/resume";

const opening =
  "I once couldn't afford a 250-rupee college hiking trip. At 20, I stood on an international platform in Vietnam, representing Nepal as a U-GO Ambassador. My circumstances changed, my dream grew, and my story was only beginning.";

// Part 01: Where I Began
const villageAndFamily = `I come from a remote village in Nepal's Madhesh community, where I grew up watching my family fight battles that most people never see. I lost my father when I was three. He was a teacher who educated hundreds of students in our village, and I grew up carrying his legacy long before I fully understood what it meant.

My mother raised five children with very limited resources. Yet the hardest part was not always the lack of money; it was hearing people tell her to stop dreaming beyond survival. I still remember the message behind their words: *Be grateful that your five children have food to eat. Don't think beyond that. Educating them is beyond your dreams.*`;

const aDifferentBelief = `My mother tried tutoring other children to earn money for our education, but even what she earned could be taken by older family members to meet household expenses. Education, the very thing we believed could change our lives, was often treated as a luxury we could not afford. Still, somewhere between the expectations placed on girls and the limits imposed by poverty, a different belief began to grow in me:

> **What if the life I was born into did not have to determine the life I could build?**`;

const myBrother = `### The price of a dream

My brother, just one year older than me, became one of my greatest sources of strength. I watched him use technology, online work, and his communication skills to create opportunities for himself while helping to support our family and my education. Through him, I began to see technology as more than a career: it could be a pathway to independence.`;

const everydayStruggles = `Our struggles were not abstract; they were part of everyday life. During Grades 10 and 11, my brother and I sometimes carried large bottles to college so we could bring drinking water home, because buying it was more than we could comfortably afford. There were times when we had to borrow money just to buy cooking gas.

And then there was the college hiking trip. In Grade 11, I couldn't join my classmates because I couldn't afford the 250-rupee fee. For some, it was just the cost of a day out. For me, it was another reminder that hardship could take away experiences others never had to think twice about.`;

const wantingMore = `I didn't know then how far my life would take me. I only knew that I wanted more, not just for myself, but for my family and for every girl growing up believing that certain dreams were not meant for her.`;

// Part 02: What I'm Exploring
const vietnam = `### From 250 rupees to an international platform

At 20, during my first semester of university, I represented Nepal in Vietnam as a U-GO Nepal Ambassador, and the entire trip was covered: my plane fare, accommodation, meals, everything. Just a few years earlier, in Grade 11, I couldn't join a college hiking trip because of 250 rupees. Now I was exploring Vietnam for nearly two weeks.`;

const whatItMeant = `Take a moment to understand what that means to me. The girl who couldn't afford a college hiking trip was standing on an international platform, carrying the name of her country. The girl whose education had once seemed beyond her family's means was pursuing a bachelor's degree on a scholarship. And the girl who had grown up hearing that girls should not dream too big was discovering just how far a dream could travel.`;

const ifICan = `It was a moment I will always look back on, a chance to see where I once was and where I am now. I don't share it because I believe I have achieved everything. I share it because it reminds me that **your starting point is not your final destination.** A single opportunity can change the direction of a life, and the girl who misses out today can become the woman who opens doors tomorrow.

U-GO helped me continue my education when financial barriers threatened to limit my future, and I carry that opportunity with gratitude and a responsibility to make it meaningful. That is why I want everyone who reads this to know:

> **If I can, you can too.**`;

// Part 03: Where I'm Heading
const whyTechnology = `### Why I choose technology

Today, I am pursuing a Bachelor of Computer Applications, continuing the journey that began with my brother's example and my own curiosity about science and technology. But my ambition goes beyond earning a degree or building a successful career.`;

const girlsInTech = `I want to see more girls from rural and financially disadvantaged communities enter technology, not as outsiders trying to prove they belong, but as capable people with every right to learn, build, lead, and innovate. I want them to discover AI, develop practical IT skills, build digital products, and explore careers that give them independence and access to opportunities beyond their immediate surroundings.`;

const accessNotTalent = `I know that talent is not the problem; too often, access is. A girl can be intelligent, determined, and full of ideas, yet never discover what she is capable of because nobody gives her the chance to try. I want to help change that, not by telling girls that everything is easy, but by showing them what becomes possible when education meets opportunity, when skills meet encouragement, and when one person's progress inspires another to begin.`;

const stillBeingWritten = `### My story is still being written

I am proud of the distance I have travelled, but I am not finished. I am still learning, still growing, and still discovering how much I can contribute. I want to become stronger in technology and AI, build things that solve real problems, and learn from people who challenge me to think bigger. Most of all, I want to use what I learn to create opportunities for girls who remind me of the person I once was.

Because I remember the girl who had a dream but not the resources. I remember the mother who was told not to dream beyond feeding her children. I remember the 250 rupees that stood between me and a college experience. And I remember how different life can look when someone believes in your potential and gives you a chance.

> **I cannot go back and change what that little girl experienced. But I can work toward a future where fewer girls face the same limitations.**`;

const toEveryGirl = `If you are a girl from a remote village, from a family struggling financially, or from a community that underestimates your ambitions, I hope you see a little of yourself in my story. You do not have to wait for the world to believe in you before you begin believing in yourself. Start learning. Seek opportunities. Ask questions. Build your skills. Keep going.`;

const closing = `Your journey may be difficult; mine has been too. But you are allowed to imagine a life beyond the boundaries others have drawn for you.

I am Puspa Shukla. I began with a dream that seemed too big for my circumstances. Today, I am building the skills, confidence, and experience to turn that dream into something meaningful.

> **And if my journey can help even one girl believe that her future can be different, then I want my story to be only the beginning.**`;


const storyCategories = [
  { label: "Where I Began", href: "#where-i-began", target: "where-i-began" },
  { label: "What I’m Exploring", href: "#what-im-exploring", target: "what-im-exploring" },
  { label: "Where I’m Heading", href: "#where-im-heading", target: "where-im-heading" },
];

// Staggers the banner's fade-up, the same entrance the Contact page uses.
const riseDelay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

// A photo paired with the paragraphs it belongs to: two columns side by side
// on wider screens (photo on the given side), stacked on phones. The text
// never wraps under the photo, so no stray lines are left behind.
function PhotoBlock({
  src,
  alt,
  width,
  height,
  caption,
  side,
  children,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  side: "left" | "right";
  children: ReactNode;
}) {
  const portrait = height > width;
  return (
    <div
      className={`my-8 grid items-center gap-6 sm:gap-8 ${
        portrait
          ? side === "right"
            ? "sm:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]"
            : "sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]"
          : "sm:grid-cols-2"
      }`}
    >
      <StoryPhoto
        src={src}
        alt={alt}
        width={width}
        height={height}
        caption={caption}
        className={side === "right" ? "sm:order-2" : ""}
      />
      <div className="[&>:first-child]:mt-0 [&>:last-child]:mb-0">{children}</div>
    </div>
  );
}

function ChapterHeading({ part, id, title }: { part: string; id: string; title: string }) {
  return (
    <div className="not-prose mb-6 mt-12 border-t border-[#c9d6d9] pt-8 dark:border-white/12">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-[#1f5f6b] dark:text-[#8ed7bc]">
        Part {part}
      </p>
      <h2 id={id} className="scroll-mt-24 text-3xl tracking-tight sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}

export default function MyStory() {
  return (
    <div className="blog-story-page flex min-h-0 flex-col gap-y-8 pt-[4.5rem] text-[#17343a] dark:text-[#eef5f6] sm:gap-y-12">
      <StoryCategoryRibbon categories={storyCategories} allStories={null} />

      <header id="all-stories" className="mx-auto w-full max-w-3xl pt-6 sm:pt-10">
        <p
          className="contact-rise m-0 inline-flex items-center gap-2 rounded-full border border-[#c9d6d9] bg-white py-1.5 pl-3 pr-4 text-[0.8125rem] font-semibold tracking-[0.02em] text-[#33525a] dark:border-white/12 dark:bg-[#132c31] dark:text-[#b5cbd0]"
          style={riseDelay(0)}
        >
          <span
            aria-hidden="true"
            className="size-2 rounded-full bg-[#3fb28a] shadow-[0_0_0_3px_rgba(63,178,138,0.18)]"
          />
          My Story
        </p>
        <h1
          className="contact-rise mb-0 mt-6 text-[clamp(1.9rem,6vw,3rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-[#17343a] dark:text-[#eef5f6]"
          style={riseDelay(90)}
        >
          <span className="block sm:whitespace-nowrap">From a village that limited my dreams</span>
          <span className="block sm:whitespace-nowrap">
            to <span className="text-[#1f5f6b] dark:text-[#8ed7bc]">a world of possibilities.</span>
          </span>
        </h1>
        <p
          className="contact-rise mb-0 mt-6 max-w-2xl text-base leading-relaxed text-[#33525a] dark:text-[#b5cbd0] sm:text-lg"
          style={riseDelay(180)}
        >
          {opening}
        </p>
        <p
          className="contact-rise mb-0 mt-5 text-sm font-medium text-[#33525a]/80 dark:text-[#b5cbd0]/80"
          style={riseDelay(240)}
        >
          {DATA.name} · {DATA.location}
        </p>
      </header>

      <LaserPointer>
      <article className="blog-story-copy my-story-copy prose prose-neutral mx-auto w-full max-w-3xl text-pretty dark:prose-invert prose-p:leading-relaxed prose-headings:scroll-mt-24 [&_h3]:mb-4 [&_h3]:mt-10 [&_h3]:border-l-4 [&_h3]:border-[#1f5f6b] dark:[&_h3]:border-[#8ed7bc] [&_h3]:pl-3 [&_h3]:text-xl sm:[&_h3]:text-2xl">

        <section>
          <ChapterHeading part="01" id="where-i-began" title="Where I Began" />
          <PhotoBlock
            side="right"
            src="/my-story/village-home.png"
            alt="Puspa smiling in the courtyard of a village home with mud walls and a tiled roof"
            width={1200}
            height={1600}
            caption="Back home in my village in Nepal's Madhesh region."
          >
            <ReactMarkdown>{villageAndFamily}</ReactMarkdown>
          </PhotoBlock>
          <ReactMarkdown>{aDifferentBelief}</ReactMarkdown>
          <ReactMarkdown>{myBrother}</ReactMarkdown>
          <PhotoBlock
            side="left"
            src="/my-story/plastering-mud-wall.png"
            alt="Puspa plastering a mud wall by hand while a young girl looks on"
            width={1258}
            height={1495}
            caption="Everyday life in the village: plastering a mud wall by hand."
          >
            <ReactMarkdown>{everydayStruggles}</ReactMarkdown>
          </PhotoBlock>
          <ReactMarkdown>{wantingMore}</ReactMarkdown>
        </section>

        <section>
          <ChapterHeading part="02" id="what-im-exploring" title="What I’m Exploring" />
          <ReactMarkdown>{vietnam}</ReactMarkdown>
          <PhotoBlock
            side="right"
            src="/my-story/ugo-summit-vietnam.png"
            alt="Puspa giving a thumbs up with U-GO team members at the U-GO Summit 2025 in Da Nang, Vietnam"
            width={1080}
            height={676}
            caption="Representing Nepal at the U-GO Summit 2025 in Da Nang, Vietnam."
          >
            <ReactMarkdown>{whatItMeant}</ReactMarkdown>
          </PhotoBlock>
          <ReactMarkdown>{ifICan}</ReactMarkdown>
        </section>

        <section>
          <ChapterHeading part="03" id="where-im-heading" title="Where I’m Heading" />
          <ReactMarkdown>{whyTechnology}</ReactMarkdown>
          <PhotoBlock
            side="left"
            src="/my-story/techskills-at-work.png"
            alt="Puspa in a TechSkills T-shirt working between two computer monitors during IT training"
            width={1080}
            height={740}
            caption="Hands-on IT training at TechSkills, building the skills I want to share."
          >
            <ReactMarkdown>{girlsInTech}</ReactMarkdown>
          </PhotoBlock>
          <ReactMarkdown>{accessNotTalent}</ReactMarkdown>
          <ReactMarkdown>{stillBeingWritten}</ReactMarkdown>
          <PhotoBlock
            side="right"
            src="/my-story/with-village-girls.png"
            alt="Puspa taking a laughing selfie with young girls from her village"
            width={1600}
            height={1200}
            caption="With girls from my village, the girls I hope technology can open doors for."
          >
            <ReactMarkdown>{toEveryGirl}</ReactMarkdown>
          </PhotoBlock>
          <ReactMarkdown>{closing}</ReactMarkdown>
        </section>
      </article>
      </LaserPointer>
    </div>
  );
}

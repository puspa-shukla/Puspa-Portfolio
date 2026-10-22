import { Compass, Flag, Footprints } from "lucide-react";
import ReactMarkdown from "react-markdown";
import StoryCategoryRibbon from "@/components/section/story-category-ribbon";
import { DATA } from "@/data/resume";

const opening = `*I once couldn't afford a 250-rupee college hiking trip. At 20, I stood on an international platform in Vietnam, representing Nepal as a U-GO Ambassador. My circumstances changed. My dream grew. And my story was only beginning.*`;

const whereIBegan = `I come from a remote village in Nepal's Madhesh community, where I grew up watching my family fight battles that most people never see. I lost my father when I was three. He was a teacher who educated hundreds of students in our village. I grew up carrying his legacy, even before I fully understood what it meant.

My mother raised five children with very limited resources. But the hardest part was not always the lack of money. It was hearing people tell my mother to stop dreaming beyond survival.

I still remember the message behind their words: *Be grateful that your five children have food to eat. Don't think beyond that. Educating them is beyond your dreams.*

My mother had tried tutoring other children to earn money for our education. Yet even what she earned could be taken by older family members to meet household expenses. Education, the very thing we believed could change our lives, was often treated as a luxury we could not afford.

But somewhere between the expectations placed on girls and the limitations imposed by poverty, a different belief began to grow in me.

**What if the life I was born into did not have to determine the life I could build?**

### The price of a dream

My brother, just one year older than me, became one of my greatest sources of strength. I watched him use technology, online work, and his communication skills to create opportunities for himself while helping support our family and my education. Through him, I began to see technology as more than a career. It could be a pathway to independence.

Our struggles were not abstract. They were part of our everyday lives.

During my Grade 10 and 11 years, my brother and I sometimes carried large bottles to college so we could bring drinking water home. We could not comfortably afford to buy it. There were times when we had to ask others for money just to buy cooking gas.

And then there was the college hiking trip.

In Grade 11, I couldn't join my classmates because I couldn't afford the 250-rupee fee.

For some, it was just the cost of a day out. For me, it was another reminder that financial hardship could take away experiences that others barely had to think about.

I remember what it felt like to watch an opportunity pass me by because of such a small amount of money.

I didn't know then how far my life would eventually take me. I only knew that I wanted more—not just for myself, but for my family and for girls who were growing up believing that certain dreams were not meant for them.`;

const whatImExploring = `### From 250 rupees to an international platform

At 20, during my first semester of university, I represented Nepal in Vietnam as a U-GO Nepal Ambassador.

Take a moment to understand what that means to me.

The girl who couldn't afford a college hiking trip was now standing on an international platform, carrying the name of her country.

The girl whose education had once seemed beyond her family's means was pursuing her bachelor's degree with the support of a scholarship.

And the girl who had grown up hearing that girls should not dream too big was beginning to see just how far a dream could travel.

I don't share these moments because I believe I have achieved everything. I share them because they remind me that **your starting point is not your final destination.**

Sometimes, a single opportunity can change the direction of a life. Sometimes, the girl who misses out today becomes the woman who opens doors tomorrow.

U-GO helped me continue my education when financial barriers threatened to limit my future. I carry that opportunity with gratitude—and with a responsibility to make it meaningful.`;

const whereImHeading = `### Why I choose technology

Today, I am pursuing a Bachelor of Computer Applications, continuing the journey that began with my brother's example and my own curiosity about science and technology.

But my ambition goes beyond earning a degree or building a successful career.

I want to see more girls from rural and financially disadvantaged communities enter technology—not as outsiders trying to prove they belong, but as capable people who have every right to learn, build, lead, and innovate.

I want girls to discover AI, develop practical IT skills, build digital products, and explore careers that can give them greater independence and access to opportunities beyond their immediate surroundings.

I know that talent is not the problem. Too often, access is.

A girl can be intelligent, determined, and full of ideas, yet never discover what she is capable of because nobody gives her the opportunity to try.

I want to help change that.

Not by telling girls that everything is easy, but by showing them what becomes possible when education meets opportunity, when skills meet encouragement, and when one person's progress inspires another to begin.

### My story is still being written

I am proud of the distance I have travelled, but I am not finished. I am still learning, still growing, and still discovering how much I can contribute.

I want to become stronger in technology and AI. I want to build things that solve real problems. I want to learn from people who challenge me to think bigger. And I want to use what I learn to create opportunities for girls who remind me of the person I once was.

Because I remember the girl who had a dream but not the resources.

I remember the mother who was told not to dream beyond feeding her children.

I remember the 250 rupees that stood between me and a college experience.

And I remember how different life can look when someone believes in your potential and gives you a chance.

**I cannot go back and change what that little girl experienced. But I can work toward a future where fewer girls have to experience the same limitations.**

If you are a girl from a remote village, a family struggling financially, or a community that underestimates your ambitions, I hope you see a little of yourself in my story.

You do not have to wait until the world believes in you to begin believing in yourself. Start learning. Seek opportunities. Ask questions. Build your skills. Keep going.

Your journey may be difficult. Mine has been. But you are allowed to imagine a life beyond the boundaries others have drawn for you.

I am Puspa Shukla. I began with a dream that seemed too big for my circumstances. Today, I am building the skills, confidence, and experience to turn that dream into something meaningful.

**And if my journey can help even one girl believe that her future can be different, then I want my story to be only the beginning.**`;

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
            From a Village That Limited My Dreams to a World of Possibilities
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
        <ReactMarkdown>{opening}</ReactMarkdown>

        <section>
          <h2 id="where-i-began">Where I Began</h2>
          <ReactMarkdown>{whereIBegan}</ReactMarkdown>
        </section>

        <section>
          <h2 id="what-im-exploring">What I’m Exploring</h2>
          <ReactMarkdown>{whatImExploring}</ReactMarkdown>
        </section>

        <section>
          <h2 id="where-im-heading">Where I’m Heading</h2>
          <ReactMarkdown>{whereImHeading}</ReactMarkdown>
        </section>
      </article>
    </div>
  );
}

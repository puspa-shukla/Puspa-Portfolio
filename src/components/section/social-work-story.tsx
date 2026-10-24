import type { CSSProperties } from "react";
import ReactMarkdown from "react-markdown";
import LaserPointer from "@/components/section/laser-pointer";
import StoryCategoryRibbon from "@/components/section/story-category-ribbon";
import { ChapterHeading, PhotoBlock } from "@/components/section/story-blocks";
import { DATA } from "@/data/resume";

// Part 01: Where It Began
const beginning = `### Where my journey of service began

My college journey has never been only about attending classes, completing assignments, and preparing for examinations. From my very first year at Camad College, I wanted to be involved in something beyond the classroom—something that would allow me to learn from people, work with a team, and contribute to the community around me.

That desire led me to become the **President of the Social Work and Volunteering Club at Camad College**.

Taking on this responsibility as a student has been a meaningful part of my journey. It has taught me that leadership is not simply about holding a position or having a title. It is about being willing to take responsibility, bring people together, and turn good intentions into action.

I am still a student, still learning, and still figuring out many things about life. But I have come to believe that we do not need to wait until we graduate, become financially independent, or hold an important position to start contributing to society. We can begin with what we have, where we are, and the people around us.

That belief continues to guide our work.`;

const smallActions = `### Turning small ideas into meaningful action

As a team, we have participated in different social and community initiatives, each reminding us that service can take many forms.

Sometimes, it means cleaning our surroundings and encouraging people to care for the environment we all share. Sometimes, it means collecting basic food and essential supplies for people who need support. At other times, it means organizing a blood donation program, volunteering in community campaigns, or coming together to help people affected by disasters.

These activities may appear different, but they share one purpose: to contribute, however we can, to making life a little better for someone else.`;

const whatCanWeDo = `I have learned that social work does not always require a large budget, an established organization, or extraordinary resources. It often begins with a simple question: *What can we do to help?*

From there, a small idea can become a team effort. A conversation can encourage someone to volunteer. A few people working together can inspire others to join. And an effort that begins within a college can reach people and communities beyond it.`;

const smallEffortsGrow = `For me, that is one of the most meaningful parts of volunteering—seeing how small efforts can grow when people are willing to work together.`;

// Part 02: Service in Action
const floodSupport = `### Showing up when communities need support

One experience that stays with me is our team’s effort to support people affected by floods in Nepal.`;

const deliveredDirectly = `When communities were facing difficult circumstances, we came together as young volunteers to do our small part. We collected funds and used the contributions to arrange basic food and essential supplies, which we delivered directly to affected areas.

Our intention was not simply to send money and feel that we had done enough. We wanted to help ensure that the support reached people who needed it.`;

const realPeople = `Experiences like this remind me that behind every disaster report are real people, families, and lives disrupted by circumstances beyond their control. In such moments, even a modest contribution can matter.

We may not always have the resources to solve a large problem, but we can choose not to ignore it. We can organize, contribute, coordinate with others, and help in practical ways.

> **I believe that compassion becomes more meaningful when it moves beyond words and becomes action.**`;

const bloodDonation = `### A drop of blood, a chance at life

Another meaningful initiative was organizing a blood donation program at Camad College.`;

const teamGrew = `What made the experience special was not only the program itself, but also the willingness of students to come forward and contribute. We began as a small group of individuals with an idea, and over time, our team grew to around 15–20 passionate members, with more students expressing interest in joining our efforts.

Watching people volunteer their time, participate in the program, and support one another reminded me that many people genuinely want to help. Sometimes, they simply need an opportunity to take that first step.`;

const neverMeet = `Blood donation also taught me an important lesson: we may never personally meet the person who benefits from our contribution, yet that contribution can still matter enormously.

We cannot always know whose life our actions may touch. But we can create opportunities for people to come together and do something meaningful.

For me, that is what community service is about—creating opportunities for ordinary people to make an extraordinary difference together.`;

const community = `### Serving beyond our immediate surroundings

Our work has also included environmental clean-up activities, community campaigns, and volunteering initiatives that encourage people to take greater responsibility for the places where they live.`;

const noticing = `I believe that caring for a community begins with noticing what needs attention. It may be an unclean public space, a family in need of basic supplies, a community facing an emergency, or an initiative that needs more helping hands.

We cannot address every challenge at once. But we can choose one problem, bring people together, and begin working on it.`;

const teamwork = `Through these experiences, I have learned to appreciate the importance of teamwork, communication, planning, and consistency. An idea alone is not enough. It takes people who are willing to give their time, share responsibilities, and continue working even when the outcome is not immediate.

As President of the club, I have also learned that leadership means making room for others. It means appreciating every volunteer, listening to different ideas, and recognizing that the success of a community initiative belongs to everyone who contributes to it.

I am grateful to the students, teammates, donors, and supporters who have stood alongside me. Every effort, whether large or small, has been part of our shared journey.`;

// Part 03: What I'm Learning
const learning = `### What volunteering is teaching me

Social work has become an important part of my personal growth, not because I have all the answers, but because it continues to teach me how much there is to learn.

It has taught me that leadership is a responsibility before it is a recognition. It has shown me that teamwork requires patience, respect, and trust. It has helped me understand that meaningful work often happens quietly, without applause or immediate recognition.

Most importantly, it has reminded me that the value of an effort cannot always be measured by the size of the event or the number of people who see it.`;

const someonesWorld = `Sometimes, impact is found in a cleaner public space, a student who decides to volunteer, a family receiving essential supplies, or a community member finding support during a difficult time.

These moments may not change the entire world, but they can make a difference in someone’s world.

And that matters to me.`;

const balancing = `Balancing academics with social responsibilities has also challenged me to become more organized, responsible, and intentional with my time. I am learning that personal growth and service to others do not have to be separate journeys. They can strengthen each other.`;

const citizen = `### A student today, a responsible citizen every day

I am proud to be a student who is learning not only inside the classroom but also through the communities I am fortunate to serve.

My role as President of the Social Work and Volunteering Club is one part of my journey, not the final destination. There is still so much I want to learn, more people I hope to work with, and more ways I hope to contribute.

I do not see volunteering as something I do only during college or something that ends when I receive my degree. I see it as a habit of caring, a willingness to participate, and a responsibility I want to carry forward.

As I continue developing my technical skills, exploring technology and AI, and preparing for my future career, I also want to hold on to this part of myself: the part that believes progress means more when we use what we learn to contribute to something beyond ourselves.`;

const bringingPeopleTogether = `I hope to keep bringing people together, supporting meaningful initiatives, and finding practical ways to help communities.

I may be one student, and my contribution may sometimes be small. But I have learned that being young is not a reason to wait, and being a student is not a limitation on the difference we can make.`;

const learnWhileWeServe = `We can learn while we serve. We can grow while we give. And we can begin making a difference long before we feel completely ready.`;

const continues = `### The journey continues

If there is one lesson I want to carry from every volunteering experience, it is this: **you do not have to do something extraordinary to begin doing something meaningful.**

You can start by helping a neighbor, cleaning your surroundings, donating blood when eligible, contributing to a community initiative, supporting a family in need, or giving a few hours of your time to a cause you believe in.

You do not have to do everything. You simply have to be willing to do your part.`;

const thankful = `I am thankful to everyone who has been part of this journey—every volunteer who showed up, every teammate who shared the responsibility, and every person who supported our efforts.

We are still learning. We are still growing. And there is still much more we hope to do.`;

const closing = `> **Because to me, leadership is not just about the position we hold. It is about the responsibility we accept, the people we bring together, and the difference we keep trying to make.**

*One student. One team. Small steps. A continuing commitment to serve.*

*And this is only the beginning.*`;

const socialWorkCategories = [
  { label: "Where It Began", href: "#where-it-began", target: "where-it-began" },
  { label: "Service in Action", href: "#service-in-action", target: "service-in-action" },
  { label: "What I’m Learning", href: "#what-im-learning", target: "what-im-learning" },
];

// Staggers the header's rise-in animation (same as My Story and U-GO AI).
const riseDelay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const pillClass =
  "rounded-full border border-[#c9d6d9] bg-white px-3 py-1.5 dark:border-white/12 dark:bg-[#132c31]";

export default function SocialWorkStory() {
  return (
    <div className="blog-story-page flex min-h-0 flex-col gap-y-8 pt-[4.5rem] text-[#17343a] dark:text-[#eef5f6] sm:gap-y-12">
      <StoryCategoryRibbon categories={socialWorkCategories} allStories={null} />

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
          Social Impact
        </p>
        <h1
          className="contact-rise mb-0 mt-6 text-[clamp(1.9rem,6vw,3rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-[#17343a] dark:text-[#eef5f6]"
          style={riseDelay(90)}
        >
          <span className="block">Beyond the classroom:</span>
          <span className="block text-[#1f5f6b] dark:text-[#8ed7bc]">a journey of service and social impact.</span>
        </h1>
        <p
          className="contact-rise mb-0 mt-6 max-w-2xl text-base leading-relaxed text-[#33525a] dark:text-[#b5cbd0] sm:text-lg"
          style={riseDelay(180)}
        >
          “You don’t have to wait until you have achieved something big to
          make a difference. Sometimes, all it takes is the willingness to
          take the first step.”
        </p>
        <div
          className="contact-rise mt-6 flex flex-row flex-wrap items-center gap-2 text-xs font-semibold text-[#17343a] dark:text-[#eef5f6] sm:text-sm"
          style={riseDelay(240)}
        >
          <span className={pillClass}>President, Social Work and Volunteering Club</span>
          <span className={pillClass}>Camad College</span>
          <span className="rounded-full border border-[#1f5f6b] bg-[#1f5f6b] px-3 py-1.5 text-white dark:border-[#8ed7bc] dark:bg-[#8ed7bc] dark:text-[#0d2125]">
            A team of 15–20 volunteers
          </span>
        </div>
        <p
          className="contact-rise mb-0 mt-5 text-sm font-medium text-[#33525a]/80 dark:text-[#b5cbd0]/80"
          style={riseDelay(300)}
        >
          {DATA.name} · {DATA.location}
        </p>
      </header>

      <LaserPointer>
      <article className="blog-story-copy my-story-copy prose prose-neutral mx-auto w-full max-w-3xl text-pretty dark:prose-invert prose-p:leading-relaxed prose-headings:scroll-mt-24 [&_h3]:mb-4 [&_h3]:mt-10 [&_h3]:border-l-4 [&_h3]:border-[#1f5f6b] dark:[&_h3]:border-[#8ed7bc] [&_h3]:pl-3 [&_h3]:text-xl sm:[&_h3]:text-2xl">
        <section>
          <ChapterHeading part="01" id="where-it-began" title="Where It Began" />
          <ReactMarkdown>{beginning}</ReactMarkdown>
          <ReactMarkdown>{smallActions}</ReactMarkdown>
          <PhotoBlock
            side="right"
            src="/social/blood-donation-poster.png"
            alt="Puspa and a classmate in Camad College shirts putting up a hand-drawn poster: Camadian Students United for Life, Donate Blood Today"
            width={820}
            height={739}
            caption="Putting up our awareness poster: “Give blood, give hope.”"
          >
            <ReactMarkdown>{whatCanWeDo}</ReactMarkdown>
          </PhotoBlock>
          <ReactMarkdown>{smallEffortsGrow}</ReactMarkdown>
        </section>

        <section>
          <ChapterHeading part="02" id="service-in-action" title="Service in Action" />
          <ReactMarkdown>{floodSupport}</ReactMarkdown>
          <PhotoBlock
            side="left"
            src="/social/relief-supplies-team.png"
            alt="Seven members of the Camad College social work club standing behind boxes and sacks of food and supplies labelled Camad College"
            width={1035}
            height={765}
            caption="Our club with the food and essential supplies we collected for flood-affected families."
          >
            <ReactMarkdown>{deliveredDirectly}</ReactMarkdown>
          </PhotoBlock>
          <ReactMarkdown>{realPeople}</ReactMarkdown>

          <ReactMarkdown>{bloodDonation}</ReactMarkdown>
          <PhotoBlock
            side="right"
            src="/social/blood-donation-team.png"
            alt="The volunteer team at the Camad College blood donation program, two members holding certificates, with a Red Cross volunteer"
            width={1080}
            height={707}
            caption="The volunteer team behind our blood donation program at Camad College."
          >
            <ReactMarkdown>{teamGrew}</ReactMarkdown>
          </PhotoBlock>
          <ReactMarkdown>{neverMeet}</ReactMarkdown>

          <ReactMarkdown>{community}</ReactMarkdown>
          <PhotoBlock
            side="left"
            src="/social/food-for-children.png"
            alt="A volunteer bending down to hand packets of food to two small children in a public square"
            width={680}
            height={842}
            caption="Handing out food to children during one of our community drives."
          >
            <ReactMarkdown>{noticing}</ReactMarkdown>
          </PhotoBlock>
          <ReactMarkdown>{teamwork}</ReactMarkdown>
        </section>

        <section>
          <ChapterHeading part="03" id="what-im-learning" title="What I’m Learning" />
          <ReactMarkdown>{learning}</ReactMarkdown>
          <ReactMarkdown>{someonesWorld}</ReactMarkdown>
          <ReactMarkdown>{balancing}</ReactMarkdown>
          <ReactMarkdown>{citizen}</ReactMarkdown>
          <PhotoBlock
            side="left"
            src="/social/community-cycling-campaign.png"
            alt="Puspa taking a cheerful selfie with fellow cyclists in helmets and matching jackets at the Ride Against Cancer"
            width={1600}
            height={1200}
            caption="With fellow riders at the Ride Against Cancer."
          >
            <ReactMarkdown>{bringingPeopleTogether}</ReactMarkdown>
          </PhotoBlock>
          <ReactMarkdown>{learnWhileWeServe}</ReactMarkdown>
          <ReactMarkdown>{continues}</ReactMarkdown>
          <PhotoBlock
            side="right"
            src="/social/club-team.png"
            alt="Puspa taking a selfie with members of her Social Work and Volunteering Club team"
            width={794}
            height={603}
            caption="With my Social Work and Volunteering Club team."
          >
            <ReactMarkdown>{thankful}</ReactMarkdown>
          </PhotoBlock>
          <ReactMarkdown>{closing}</ReactMarkdown>
        </section>
      </article>
      </LaserPointer>
    </div>
  );
}

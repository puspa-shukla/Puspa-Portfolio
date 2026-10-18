import { HeartHandshake, HandHeart, UsersRound } from "lucide-react";
import StoryCategoryRibbon from "@/components/section/story-category-ribbon";

const socialWorkCategories = [
  { label: "My beginning", href: "#beginning", target: "beginning" },
  { label: "Small actions", href: "#small-actions", target: "small-actions" },
  { label: "Flood support", href: "#flood-support", target: "flood-support" },
  { label: "Blood donation", href: "#blood-donation", target: "blood-donation" },
  { label: "What I’m learning", href: "#learning", target: "learning" },
  { label: "The journey continues", href: "#continues", target: "continues" },
];

export default function SocialWorkStory() {
  return (
    <div className="blog-story-page flex min-h-0 flex-col gap-y-8 pt-[4.5rem] text-[#17343a] sm:gap-y-12">
      <StoryCategoryRibbon categories={socialWorkCategories} allStories={null} />

      <header
        id="all-stories"
        className="relative grid overflow-hidden rounded-[14px] bg-[#17343a] text-white shadow-xl shadow-[#17343a]/10 lg:min-h-[24rem] lg:grid-cols-[minmax(0,1fr)_minmax(17rem,0.45fr)]"
      >
        <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10 lg:p-12">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#8ed7bc]">
            Community · Service · Leadership
          </p>
          <h1 className="mb-0 max-w-4xl font-serif text-[clamp(2.25rem,4.4vw,4.25rem)] font-semibold leading-[1.02] tracking-tight text-white">
            Beyond the Classroom: A Student’s Journey of Service and Social
            Impact
          </h1>
          <p className="mt-6 max-w-3xl font-serif text-lg leading-relaxed text-white/85 sm:text-xl">
            “You don’t have to wait until you have achieved something big to
            make a difference. Sometimes, all it takes is the willingness to
            take the first step.”
          </p>
          <p className="mt-6 text-sm font-medium text-white/70">
            By Puspa Shukla · President, Social Work and Volunteering Club at
            CAMAD College
          </p>
        </div>
        <div className="relative flex min-h-64 items-center justify-center overflow-hidden bg-[#e6f0e9] p-8 text-[#17343a] sm:min-h-72 lg:min-h-full">
          <div
            aria-hidden="true"
            className="absolute -right-10 -top-16 size-64 rounded-full border border-[#1f5f6b]/15 sm:size-80"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-24 -left-8 size-64 rounded-full border border-[#1f5f6b]/15 sm:size-80"
          />
          <div className="relative z-10 grid max-w-sm grid-cols-2 gap-3">
            <div className="col-span-2 rounded-2xl border border-[#c9d6d9] bg-white/90 p-5 shadow-sm">
              <HeartHandshake aria-hidden="true" className="mb-4 size-9 text-[#1f5f6b]" />
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-[#1f5f6b]">
                The work begins here
              </p>
              <p className="mb-0 font-serif text-2xl font-semibold leading-snug">
                Bring people together. Take the first step.
              </p>
            </div>
            <div className="rounded-2xl border border-[#c9d6d9] bg-white/90 p-4 shadow-sm">
              <UsersRound aria-hidden="true" className="mb-3 size-6 text-[#1f5f6b]" />
              <p className="mb-0 text-sm font-semibold">A student-led team</p>
            </div>
            <div className="rounded-2xl border border-[#c9d6d9] bg-white/90 p-4 shadow-sm">
              <HandHeart aria-hidden="true" className="mb-3 size-6 text-[#1f5f6b]" />
              <p className="mb-0 text-sm font-semibold">Service in action</p>
            </div>
          </div>
        </div>
      </header>

      <article className="blog-story-copy prose prose-neutral mx-auto w-full max-w-3xl text-pretty dark:prose-invert prose-p:leading-8 prose-headings:scroll-mt-24">
        <p className="lead">By Puspa Shukla</p>
        <h2 id="beginning">Where My Journey of Service Began</h2>
        <p>
          My college journey has never been only about attending classes,
          completing assignments, and preparing for examinations. From my very
          first year at Camad College, I wanted to be involved in something
          beyond the classroom—something that would allow me to learn from
          people, work with a team, and contribute to the community around me.
        </p>
        <p>
          That desire led me to become the <strong>President of the Social Work
          and Volunteering Club at Camad College</strong>.
        </p>
        <p>
          Taking on this responsibility as a student has been a meaningful part
          of my journey. It has taught me that leadership is not simply about
          holding a position or having a title. It is about being willing to
          take responsibility, bring people together, and turn good intentions
          into action.
        </p>
        <p>
          I am still a student, still learning, and still figuring out many
          things about life. But I have come to believe that we do not need to
          wait until we graduate, become financially independent, or hold an
          important position to start contributing to society. We can begin
          with what we have, where we are, and the people around us.
        </p>
        <p>That belief continues to guide our work.</p>

        <h2 id="small-actions">Turning Small Ideas into Meaningful Action</h2>
        <p>
          As a team, we have participated in different social and community
          initiatives, each reminding us that service can take many forms.
        </p>
        <p>
          Sometimes, it means cleaning our surroundings and encouraging people
          to care for the environment we all share. Sometimes, it means
          collecting basic food and essential supplies for people who need
          support. At other times, it means organizing a blood donation
          program, volunteering in community campaigns, or coming together to
          help people affected by disasters.
        </p>
        <p>
          These activities may appear different, but they share one purpose: to
          contribute, however we can, to making life a little better for
          someone else.
        </p>
        <p>
          I have learned that social work does not always require a large
          budget, an established organization, or extraordinary resources. It
          often begins with a simple question: <em>What can we do to help?</em>
        </p>
        <p>
          From there, a small idea can become a team effort. A conversation can
          encourage someone to volunteer. A few people working together can
          inspire others to join. And an effort that begins within a college
          can reach people and communities beyond it.
        </p>
        <p>
          For me, that is one of the most meaningful parts of volunteering—
          seeing how small efforts can grow when people are willing to work
          together.
        </p>

        <h2 id="flood-support">Showing Up When Communities Need Support</h2>
        <p>
          One experience that stays with me is our team’s effort to support
          people affected by floods in Nepal.
        </p>
        <p>
          When communities were facing difficult circumstances, we came
          together as young volunteers to do our small part. We collected funds
          and used the contributions to arrange basic food and essential
          supplies, which we delivered directly to affected areas.
        </p>
        <p>
          Our intention was not simply to send money and feel that we had done
          enough. We wanted to help ensure that the support reached people who
          needed it.
        </p>
        <p>
          Experiences like this remind me that behind every disaster report are
          real people, families, and lives disrupted by circumstances beyond
          their control. In such moments, even a modest contribution can
          matter.
        </p>
        <p>
          We may not always have the resources to solve a large problem, but we
          can choose not to ignore it. We can organize, contribute, coordinate
          with others, and help in practical ways.
        </p>
        <p>
          I believe that compassion becomes more meaningful when it moves
          beyond words and becomes action.
        </p>

        <h2 id="blood-donation">A Drop of Blood, A Chance at Life</h2>
        <p>
          Another meaningful initiative was organizing a blood donation program
          at Camad College.
        </p>
        <p>
          What made the experience special was not only the program itself, but
          also the willingness of students to come forward and contribute. We
          began as a small group of individuals with an idea, and over time,
          our team grew to around 15–20 passionate members, with more students
          expressing interest in joining our efforts.
        </p>
        <p>
          Watching people volunteer their time, participate in the program,
          and support one another reminded me that many people genuinely want
          to help. Sometimes, they simply need an opportunity to take that
          first step.
        </p>
        <p>
          Blood donation also taught me an important lesson: we may never
          personally meet the person who benefits from our contribution, yet
          that contribution can still matter enormously.
        </p>
        <p>
          We cannot always know whose life our actions may touch. But we can
          create opportunities for people to come together and do something
          meaningful.
        </p>
        <p>
          For me, that is what community service is about—creating
          opportunities for ordinary people to make an extraordinary
          difference together.
        </p>

        <h2 id="community">Serving Beyond Our Immediate Surroundings</h2>
        <p>
          Our work has also included environmental clean-up activities,
          community campaigns, and volunteering initiatives that encourage
          people to take greater responsibility for the places where they live.
        </p>
        <p>
          I believe that caring for a community begins with noticing what needs
          attention. It may be an unclean public space, a family in need of
          basic supplies, a community facing an emergency, or an initiative
          that needs more helping hands.
        </p>
        <p>
          We cannot address every challenge at once. But we can choose one
          problem, bring people together, and begin working on it.
        </p>
        <p>
          Through these experiences, I have learned to appreciate the
          importance of teamwork, communication, planning, and consistency. An
          idea alone is not enough. It takes people who are willing to give
          their time, share responsibilities, and continue working even when
          the outcome is not immediate.
        </p>
        <p>
          As President of the club, I have also learned that leadership means
          making room for others. It means appreciating every volunteer,
          listening to different ideas, and recognizing that the success of a
          community initiative belongs to everyone who contributes to it.
        </p>
        <p>
          I am grateful to the students, teammates, donors, and supporters who
          have stood alongside me. Every effort, whether large or small, has
          been part of our shared journey.
        </p>

        <h2 id="learning">What Volunteering Is Teaching Me</h2>
        <p>
          Social work has become an important part of my personal growth, not
          because I have all the answers, but because it continues to teach me
          how much there is to learn.
        </p>
        <p>
          It has taught me that leadership is a responsibility before it is a
          recognition. It has shown me that teamwork requires patience,
          respect, and trust. It has helped me understand that meaningful work
          often happens quietly, without applause or immediate recognition.
        </p>
        <p>
          Most importantly, it has reminded me that the value of an effort
          cannot always be measured by the size of the event or the number of
          people who see it.
        </p>
        <p>
          Sometimes, impact is found in a cleaner public space, a student who
          decides to volunteer, a family receiving essential supplies, or a
          community member finding support during a difficult time.
        </p>
        <p>
          These moments may not change the entire world, but they can make a
          difference in someone’s world.
        </p>
        <p>And that matters to me.</p>
        <p>
          Balancing academics with social responsibilities has also challenged
          me to become more organized, responsible, and intentional with my
          time. I am learning that personal growth and service to others do not
          have to be separate journeys. They can strengthen each other.
        </p>

        <h2 id="citizen">A Student Today, A Responsible Citizen Every Day</h2>
        <p>
          I am proud to be a student who is learning not only inside the
          classroom but also through the communities I am fortunate to serve.
        </p>
        <p>
          My role as President of the Social Work and Volunteering Club is one
          part of my journey, not the final destination. There is still so much
          I want to learn, more people I hope to work with, and more ways I
          hope to contribute.
        </p>
        <p>
          I do not see volunteering as something I do only during college or
          something that ends when I receive my degree. I see it as a habit of
          caring, a willingness to participate, and a responsibility I want to
          carry forward.
        </p>
        <p>
          As I continue developing my technical skills, exploring technology
          and AI, and preparing for my future career, I also want to hold on to
          this part of myself: the part that believes progress means more when
          we use what we learn to contribute to something beyond ourselves.
        </p>
        <p>
          I hope to keep bringing people together, supporting meaningful
          initiatives, and finding practical ways to help communities.
        </p>
        <p>
          I may be one student, and my contribution may sometimes be small. But
          I have learned that being young is not a reason to wait, and being a
          student is not a limitation on the difference we can make.
        </p>
        <p>
          We can learn while we serve. We can grow while we give. And we can
          begin making a difference long before we feel completely ready.
        </p>

        <h2 id="continues">The Journey Continues</h2>
        <p>
          If there is one lesson I want to carry from every volunteering
          experience, it is this: <strong>you do not have to do something
          extraordinary to begin doing something meaningful.</strong>
        </p>
        <p>
          You can start by helping a neighbor, cleaning your surroundings,
          donating blood when eligible, contributing to a community initiative,
          supporting a family in need, or giving a few hours of your time to a
          cause you believe in.
        </p>
        <p>You do not have to do everything. You simply have to be willing to do your part.</p>
        <p>
          I am thankful to everyone who has been part of this journey—every
          volunteer who showed up, every teammate who shared the
          responsibility, and every person who supported our efforts.
        </p>
        <p>We are still learning. We are still growing. And there is still much more we hope to do.</p>
        <blockquote>
          <p>
            <strong>
              Because to me, leadership is not just about the position we hold.
              It is about the responsibility we accept, the people we bring
              together, and the difference we keep trying to make.
            </strong>
          </p>
          <p>
            <em>
              One student. One team. Small steps. A continuing commitment to
              serve.
            </em>
          </p>
          <p><em>And this is only the beginning.</em></p>
        </blockquote>
      </article>
    </div>
  );
}

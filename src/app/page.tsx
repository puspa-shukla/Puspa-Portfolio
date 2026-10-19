import { ChevronDown } from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";
import HeroNetworkScene from "@/components/hero-network-scene";
import PortraitThemeSwitch from "@/components/portrait-theme-switch";
import { DATA } from "@/data/resume";
import ContactSection from "@/components/section/contact-section";
import EducationSection from "@/components/section/education-section";
import HackathonsSection from "@/components/section/hackathons-section";
import SkillsSection from "@/components/section/skills-section";
import WorkSection from "@/components/section/work-section";
import CopyEmailBtn from "@/components/ui/CopyEmailBtn";
import Resume from "@/components/ui/Resume";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="home-page min-h-dvh flex flex-col gap-14 relative md:px-0">
      <section id="hero" className="home-hero">
        <HeroNetworkScene />
        <div className="relative z-10 w-full space-y-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div className="gap-4 flex flex-col order-2 md:order-1">
              <BlurFade delay={BLUR_FADE_DELAY} yOffset={8}>
                <h1 className="home-title text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl">
                  Hi, I&apos;m <span className="home-title-accent">Puspa</span>
                </h1>
              </BlurFade>
              <BlurFade delay={BLUR_FADE_DELAY * 2} yOffset={8}>
                <p className="home-subtitle max-w-[600px] md:text-lg lg:text-xl">
                  {DATA.description}
                </p>
              </BlurFade>
              <BlurFade
                delay={BLUR_FADE_DELAY * 3}
                className="home-actions z-20 mt-3 flex flex-wrap items-center gap-3"
              >
                <CopyEmailBtn />
                <Resume />
              </BlurFade>
            </div>
            <BlurFade delay={BLUR_FADE_DELAY} className="order-1 md:order-2">
              <PortraitThemeSwitch initials={DATA.initials} />
            </BlurFade>
          </div>
        </div>
        <a href="#about" className="home-scroll-cue group">
          <span className="home-scroll-dot" aria-hidden="true" />
          <span>Scroll to explore</span>
          <ChevronDown
            aria-hidden="true"
            className="size-4 transition-transform duration-200 group-hover:translate-y-0.5"
          />
        </a>
      </section>
      <section id="about" className="home-section">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="home-section-title text-xl font-bold">About</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="prose text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
              {DATA.professionalSummary}
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="work" className="home-section">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="home-section-title text-xl font-bold">Work Experience</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <WorkSection />
          </BlurFade>
        </div>
      </section>
      <section id="education" className="home-section">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="home-section-title text-xl font-bold">Education</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 8}>
            <EducationSection />
          </BlurFade>
        </div>
      </section>
      <SkillsSection />
      <section id="hackathons" className="home-section">
        <BlurFade delay={BLUR_FADE_DELAY * 13}>
          <HackathonsSection />
        </BlurFade>
      </section>
      <section id="contact" className="home-section">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <ContactSection />
        </BlurFade>
      </section>
    </main>
  );
}

"use client";

import { useMemo, useState } from "react";

import BlurFade from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import { DATA } from "@/data/resume";

const INITIAL_SKILLS_COUNT = 11;

export default function SkillsSection() {
  const [showAllSkills, setShowAllSkills] = useState(false);

  const visibleSkills = useMemo(
    () =>
      showAllSkills ? DATA.skills : DATA.skills.slice(0, INITIAL_SKILLS_COUNT),
    [showAllSkills],
  );

  return (
    <section id="skills">
      <div className="flex min-h-0 flex-col gap-y-4">
        <BlurFade delay={0.08} duration={0.22}>
          <h2 className="text-xl font-bold">Skills</h2>
        </BlurFade>

        <div className="flex flex-wrap gap-2">
          {visibleSkills.map((skill, id) => (
            <BlurFade key={skill.name} delay={0.1 + id * 0.015} duration={0.22}>
              <div className="border bg-background h-8 w-fit px-5 flex items-center gap-3">
                {skill.icon && (
                  <skill.icon className="size-4 rounded overflow-hidden object-contain" />
                )}
                <span className="text-foreground text-sm font-medium">
                  {skill.name}
                </span>
              </div>
            </BlurFade>
          ))}
        </div>

        {DATA.skills.length > INITIAL_SKILLS_COUNT && (
          // <BlurFade delay={0.1}>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-fit"
            onClick={() => setShowAllSkills((prev) => !prev)}
          >
            {showAllSkills ? "Show Less" : "Show More"}
          </Button>
          // </BlurFade>
        )}
      </div>
    </section>
  );
}

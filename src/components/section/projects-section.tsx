import type { CSSProperties } from "react";
import { ProjectCard } from "@/components/project-card";
import { DATA } from "@/data/resume";
import ProjectCategoryTabs from "./project-category-tabs";

// Each id doubles as a link anchor (/projects#id) that opens that category.
export const PROJECT_CATEGORIES = [
  { id: "build-as-i-learn", label: "Build as I Learn" },
  { id: "web-development", label: "Web Development" },
  { id: "ai-python", label: "AI and Python" },
];

export default function ProjectsSection({
  as: Heading = "h2",
  title = "Check out my latest work",
}: {
  as?: "h1" | "h2";
  title?: string;
}) {
    return (
        <section id="projects">
            <div className="flex min-h-0 flex-col gap-y-8">
                <div className="flex flex-col gap-y-4 items-center justify-center">
                    <div className="flex items-center w-full">
                        <div
                            className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent"

                        />
                        <div className="border bg-primary z-10 rounded-xl px-4 py-1">
                            <span className="text-background text-sm font-medium">My Projects</span>
                        </div>
                        <div
                            className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent"

                        />
                    </div>
                    <div className="flex flex-col gap-y-3 items-center justify-center">
                        <Heading className="text-3xl font-bold tracking-tighter sm:text-4xl">{title}</Heading>
                    </div>
                </div>
                <ProjectCategoryTabs
                    panels={PROJECT_CATEGORIES.map((category) => {
                        const projects = DATA.projects.filter(
                            (project) => project.category === category.id,
                        );

                        return {
                            id: category.id,
                            label: category.label,
                            count: projects.length,
                            content: projects.length > 0 ? (
                                <div className="grid grid-cols-1 gap-3 p-1 sm:grid-cols-2 auto-rows-fr">
                                    {projects.map((project, id) => (
                                        <div
                                            key={project.title}
                                            className="project-panel-item h-full"
                                            style={{ "--item-delay": `${80 + id * 70}ms` } as CSSProperties}
                                        >
                                            <ProjectCard
                                                href={project.href}
                                                title={project.title}
                                                description={project.description}
                                                dates={project.dates}
                                                tags={project.technologies}
                                                image={project.image}
                                                video={project.video}
                                                links={project.links}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="project-panel-item m-1 rounded-xl border border-dashed px-4 py-8 text-center text-sm text-muted-foreground">
                                    Projects coming soon. I&apos;m building them as I learn.
                                </p>
                            ),
                        };
                    })}
                />
            </div>
        </section>
    );
}

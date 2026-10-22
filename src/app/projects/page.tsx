import JsonLd from "@/components/json-ld";
import ProjectsSection from "@/components/section/projects-section";
import { pageMetadata } from "@/lib/metadata";
import { graph, projectsNode } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Web projects by Puspa Shukla built with HTML, CSS and JavaScript, including a currency converter, browser games and a route-planning system. Try the live demos or read the source.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <main className="projects-page blog-page-shell mx-auto min-h-dvh w-full max-w-4xl px-4 pb-24 pt-[4.5rem] sm:px-8">
      <JsonLd data={graph(projectsNode("/projects"))} />
      <section id="projects">
        <ProjectsSection as="h1" title="Projects by Puspa Shukla" />
      </section>
    </main>
  );
}

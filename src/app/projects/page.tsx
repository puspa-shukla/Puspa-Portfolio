import ProjectsSection from "@/components/section/projects-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore Puspa Shukla's web development, IT, and technology projects.",
  alternates: { canonical: "https://www.puspashukla.com.np/projects" },
};

export default function ProjectsPage() {
  return (
    <main className="mx-auto min-h-dvh w-full max-w-4xl pt-[4.5rem]">
      <ProjectsSection />
    </main>
  );
}

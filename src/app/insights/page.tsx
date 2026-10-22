import type { Metadata } from "next";
import InsightsStory from "@/components/section/insights-story";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Reflections by Puspa Shukla on girls in tech, AI, leadership, and ideas worth questioning.",
  alternates: {
    canonical: "https://www.puspashukla.com.np/insights",
  },
  robots: { index: false, follow: true },
};

export default function InsightsPage() {
  return (
    <main className="story-page blog-page-shell mx-auto w-full max-w-none px-4 pb-24 pt-0 sm:px-8 lg:px-12">
      <InsightsStory />
    </main>
  );
}

import type { Metadata } from "next";
import MyStory from "@/components/section/my-story";

export const metadata: Metadata = {
  title: "My Story",
  description:
    "Puspa Shukla's story: a BCA student in Kathmandu learning IT support, systems administration, and web development, and helping others learn with AI.",
  alternates: {
    canonical: "https://www.puspashukla.com.np/my-story",
  },
};

export default function MyStoryPage() {
  return (
    <main className="story-page blog-page-shell mx-auto w-full max-w-none px-4 pb-24 pt-0 sm:px-8 lg:px-12">
      <MyStory />
    </main>
  );
}

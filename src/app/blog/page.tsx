import BlogSection from "@/components/section/blog-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Girl Who Didn’t Wait to Be Asked",
  description: "A story by Puspa Shukla about leadership and helping others.",
};

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-3xl">
      <BlogSection />
    </main>
  );
}

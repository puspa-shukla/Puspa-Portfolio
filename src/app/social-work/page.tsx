import type { Metadata } from "next";
import SocialWorkStory from "@/components/section/social-work-story";

export const metadata: Metadata = {
  title: "Beyond the Classroom | Puspa Shukla",
  description:
    "A student’s journey of service, volunteering, and community impact as President of the Social Work and Volunteering Club at CAMAD College.",
  alternates: {
    canonical: "https://www.puspashukla.com.np/social-work",
  },
  authors: [{ name: "Puspa Shukla" }],
  openGraph: {
    type: "article",
    title: "Beyond the Classroom: A Student’s Journey of Service and Social Impact",
    description:
      "One student, one team, and the small steps that make community service meaningful.",
    url: "https://www.puspashukla.com.np/social-work",
    siteName: "Puspa Shukla",
  },
};

export default function SocialWorkPage() {
  return (
    <main className="blog-page-shell mx-auto w-full max-w-none px-4 pb-24 pt-0 sm:px-8 lg:px-12">
      <SocialWorkStory />
    </main>
  );
}

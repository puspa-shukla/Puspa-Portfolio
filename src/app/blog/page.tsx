import BlogSection from "@/components/section/blog-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Girl Who Didn’t Wait to Be Asked",
  description:
    "From finishing the U-GO AI course first to helping 3,000+ scholars build skills across borders: Puspa Shukla's story of initiative, leadership, and impact.",
  alternates: {
    canonical: "https://www.puspashukla.com.np/blog",
  },
  authors: [{ name: "Puspa Shukla" }],
  openGraph: {
    type: "article",
    title: "The Girl Who Didn’t Wait to Be Asked",
    description:
      "How one student turned initiative into AI learning opportunities for women across borders.",
    url: "https://www.puspashukla.com.np/blog",
    siteName: "Puspa Shukla",
    images: [
      {
        url: "/blog/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Puspa Shukla — The Girl Who Didn’t Wait to Be Asked",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Girl Who Didn’t Wait to Be Asked",
    description:
      "From finishing first to helping 3,000+ women build confidence with AI.",
    images: ["/blog/opengraph-image"],
  },
};

export default function BlogPage() {
  return (
    <main className="blog-page-shell mx-auto w-full max-w-none px-4 pb-24 pt-0 sm:px-8 lg:px-12">
      <BlogSection />
    </main>
  );
}

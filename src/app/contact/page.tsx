import type { Metadata } from "next";
import ContactExperience from "@/components/section/contact-experience";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Share an idea, collaborate on AI and software projects, discuss opportunities, or simply say hello to Puspa Shukla.",
  alternates: {
    canonical: "https://www.puspashukla.com.np/contact",
  },
  openGraph: {
    title: "Good things start with a conversation. | Puspa Shukla",
    description:
      "Have an idea, a question, feedback, or an opportunity? Let's connect.",
    url: "https://www.puspashukla.com.np/contact",
    siteName: "Puspa Shukla",
  },
};

export default function ContactPage() {
  return (
    <main className="contact-page blog-page-shell mx-auto w-full max-w-none px-4 pb-28 pt-0 sm:px-8 lg:px-12">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 pt-[4.5rem] sm:gap-12">
        <ContactExperience />
      </div>
    </main>
  );
}

import ComingSoon from "@/components/coming-soon";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Work Journey",
  description: "Puspa Shukla's work journey in IT support and web development. Coming soon.",
  path: "/work",
  noIndex: true,
});

export default function WorkPage() {
  return (
    <ComingSoon
      eyebrow="Work journey · Coming soon"
      title="My work journey, in progress"
      description="A longer write-up of my IT support and U-GO experience is on its way. My work experience is already on the home page and in my resume."
    />
  );
}

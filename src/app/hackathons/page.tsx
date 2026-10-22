import ComingSoon from "@/components/coming-soon";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Hackathons",
  description: "Puspa Shukla's hackathon and tech event experiences. Coming soon.",
  path: "/hackathons",
  noIndex: true,
});

export default function HackathonsPage() {
  return (
    <ComingSoon
      eyebrow="Hackathons · Coming soon"
      title="Hackathon stories, in progress"
      description="I'm writing up what I learned from events like the NASA Space Apps Challenge. Until then, explore my projects or say hello."
    />
  );
}

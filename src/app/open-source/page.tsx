import ComingSoon from "@/components/coming-soon";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Open Source",
  description: "Puspa Shukla's open source contributions and learnings. Coming soon.",
  path: "/open-source",
  noIndex: true,
});

export default function OpenSourcePage() {
  return (
    <ComingSoon
      eyebrow="Open source · Coming soon"
      title="Open source work, in progress"
      description="I'll share my open source contributions and what I learn from them here. Until then, explore my projects or say hello."
    />
  );
}

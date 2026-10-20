import { permanentRedirect } from "next/navigation";

// Insights moved to its own page.
export default function ContentCreationPage() {
  permanentRedirect("/insights");
}

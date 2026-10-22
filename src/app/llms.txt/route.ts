import { DATA } from "@/data/resume";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

// A plain-text profile for AI assistants and answer engines (llmstxt.org),
// generated from the same data as the site so the two never disagree.
export function GET() {
  const lines = [
    `# ${DATA.name}`,
    "",
    `> ${DATA.headline}`,
    "",
    `- Location: ${DATA.location} (${DATA.timezone})`,
    `- Focus: ${DATA.role}`,
    `- Email: ${DATA.contact.email}`,
    ...Object.values(DATA.contact.social)
      .filter((social) => social.url.startsWith("http"))
      .map((social) => `- ${social.name}: ${social.url}`),
    "",
    "## Key facts",
    ...DATA.proofPoints.map((point) => `- ${point.value} ${point.label}`),
    ...DATA.credentials.map(
      (credential) => `- Credential: ${credential.name} (${credential.issuer})`,
    ),
    "",
    "## Experience",
    ...DATA.work.flatMap((role) => [
      `### ${role.company}: ${role.title}`,
      ...role.work.map((item) => `- ${item}`),
      "",
    ]),
    "## Education",
    ...DATA.education.map(
      (education) =>
        `- ${education.school}: ${education.program} (${education.specialization}), ${education.start}-${education.end}. ${education.details.join(" ")}`,
    ),
    "",
    "## Projects",
    ...DATA.projects.map(
      (project) => `- [${project.title}](${project.demo || project.href}): ${project.description}`,
    ),
    "",
    "## Recognition",
    ...DATA.hackathonsAndEvents.map(
      (item) => `- ${item.title}${item.dates ? ` (${item.dates})` : ""}: ${item.description}`,
    ),
    "",
    "## Pages",
    `- [Home](${absoluteUrl("/")}): profile, experience, education, skills`,
    `- [Projects](${absoluteUrl("/projects")}): web projects with live demos and source code`,
    `- [Achievements](${absoluteUrl("/achievements")}): the story behind the TechSkills top-6 result`,
    `- [U-GO AI story](${absoluteUrl("/blog")}): AI learning and leadership with U-GO`,
    `- [Social impact](${absoluteUrl("/social-work")}): volunteering and community service`,
    `- [Resume](${absoluteUrl("/resume")}): printable resume (PDF at ${absoluteUrl("/api/resume")})`,
    `- [Contact](${absoluteUrl("/contact")}): contact form and details`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

import { DATA } from "@/data/resume";
import { PERSON_ID, SITE_URL, WEBSITE_ID, absoluteUrl } from "@/lib/site";

type JsonLdNode = Record<string, unknown>;

export function personNode(): JsonLdNode {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: DATA.name,
    url: SITE_URL,
    image: absoluteUrl("/puspa-profile-circle.jpeg"),
    jobTitle: "BCA Student, IT Support & Web Development",
    description: DATA.headline,
    email: `mailto:${DATA.contact.email}`,
    telephone: DATA.contact.tel,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kathmandu",
      addressCountry: "NP",
    },
    alumniOf: DATA.education.map((education) => ({
      "@type": "EducationalOrganization",
      name: education.school,
      url: education.href,
    })),
    affiliation: DATA.work.map((work) => ({
      "@type": "Organization",
      name: work.company,
      url: work.companyUrl,
    })),
    knowsAbout: [
      "IT support",
      "Systems administration",
      "Windows Server",
      "Active Directory",
      "Microsoft 365",
      "Networking (TCP/IP, DHCP, DNS, VPN)",
      "Virtualization (Hyper-V, VMware)",
      "Web development",
      "HTML",
      "CSS",
      "JavaScript",
      "Python",
      "AI tools for learning",
      "Mentoring",
    ],
    hasCredential: DATA.credentials.map((credential) => ({
      "@type": "EducationalOccupationalCredential",
      name: credential.name,
      url: absoluteUrl(credential.url),
      recognizedBy: { "@type": "Organization", name: credential.issuer },
    })),
    award: DATA.hackathonsAndEvents
      .filter((item) => item.dates)
      .map((item) => `${item.title} (${item.dates})`),
    sameAs: Object.values(DATA.contact.social)
      .map((social) => social.url)
      .filter((url) => url.startsWith("http")),
  };
}

export function websiteNode(): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: DATA.name,
    description: `Portfolio of ${DATA.name}: ${DATA.role}.`,
    inLanguage: "en",
    publisher: { "@id": PERSON_ID },
  };
}

export function articleNode({
  path,
  headline,
  description,
  image,
}: {
  path: string;
  headline: string;
  description: string;
  image?: string;
}): JsonLdNode {
  return {
    "@type": "Article",
    "@id": `${absoluteUrl(path)}#article`,
    mainEntityOfPage: absoluteUrl(path),
    headline,
    description,
    ...(image ? { image: absoluteUrl(image) } : {}),
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    isPartOf: { "@id": WEBSITE_ID },
    inLanguage: "en",
  };
}

export function projectsNode(path: string): JsonLdNode {
  return {
    "@type": "ItemList",
    "@id": `${absoluteUrl(path)}#projects`,
    name: `Projects by ${DATA.name}`,
    itemListElement: DATA.projects.map((project, index) => {
      const source = project.links.find((link) => link.type === "View Source");
      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "SoftwareSourceCode",
          name: project.title,
          description: project.description,
          image: absoluteUrl(project.image),
          programmingLanguage: project.technologies.filter(
            (technology) => technology !== "Algorithms",
          ),
          ...(source ? { codeRepository: source.href } : {}),
          ...(project.demo ? { url: project.demo } : { url: project.href }),
          author: { "@id": PERSON_ID },
        },
      };
    }),
  };
}

export function graph(...nodes: JsonLdNode[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

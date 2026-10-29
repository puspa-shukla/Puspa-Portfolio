import Link from "next/link";
import { ArrowUp, ArrowUpRight, Mail, MapPin } from "lucide-react";
import { DATA } from "@/data/resume";

// Server-rendered so every page ships plain, crawlable links to the rest of
// the site and to the ways of getting in touch.
const FOOTER_GROUPS = [
  {
    heading: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "My Story", href: "/my-story" },
      { label: "Projects", href: "/projects" },
      { label: "Achievements", href: "/achievements" },
    ],
  },
  {
    heading: "Stories",
    links: [
      { label: "Social Impact", href: "/social-work" },
      { label: "U-GO AI Story", href: "/blog" },
      { label: "Insights", href: "/insights" },
      { label: "Resume", href: "/resume" },
    ],
  },
];

export default function SiteFooter() {
  const socials = Object.values(DATA.contact.social).filter((social) =>
    social.url.startsWith("http"),
  );

  return (
    <footer className="site-footer relative z-10 w-full">
      <div className="mx-auto w-full max-w-6xl px-5 pb-28 pt-14 sm:px-6 sm:pt-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.6fr_1fr_1fr_1.4fr] lg:gap-x-10">
          <div className="col-span-2 max-w-sm space-y-4 lg:col-span-1">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="site-footer-badge">
                {DATA.initials}
              </span>
              <p className="site-footer-name">{DATA.name}</p>
            </div>
            <p className="site-footer-muted text-sm leading-relaxed">
              {DATA.role}. Open to opportunities and collaborations.
            </p>
            <Link href="/contact" className="site-footer-cta">
              Start a conversation
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          </div>

          {FOOTER_GROUPS.map((group) => (
            <nav key={group.heading} aria-label={`Footer: ${group.heading}`}>
              <p className="site-footer-heading">{group.heading}</p>
              <ul className="space-y-3 text-sm">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="site-footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-2 lg:col-span-1">
            <p className="site-footer-heading">Get in touch</p>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${DATA.contact.email}`}
                  className="site-footer-link inline-flex items-center gap-2 break-all"
                >
                  <Mail aria-hidden="true" className="size-4 shrink-0" />
                  {DATA.contact.email}
                </a>
              </li>
              <li className="site-footer-muted flex items-start gap-2">
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                <span>
                  {DATA.location}
                  <br />
                  {DATA.timezone}
                </span>
              </li>
            </ul>
            <ul className="mt-5 flex flex-wrap gap-2">
              {socials.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer me"
                    aria-label={social.name}
                    title={social.name}
                    className="site-footer-social"
                  >
                    <social.icon aria-hidden="true" className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="site-footer-rule mt-12 flex flex-col gap-3 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p className="site-footer-muted">
            © {new Date().getFullYear()} {DATA.name}. All rights reserved.
          </p>
          <a href="#" className="site-footer-link inline-flex items-center gap-1.5">
            Back to top
            <ArrowUp aria-hidden="true" className="size-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

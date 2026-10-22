import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { DATA } from "@/data/resume";

// Server-rendered so every page ships plain, crawlable links to the rest of
// the site and to the ways of getting in touch.
const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Achievements", href: "/achievements" },
  { label: "Social Impact", href: "/social-work" },
  { label: "U-GO AI Story", href: "/blog" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];

export default function SiteFooter() {
  const socials = Object.values(DATA.contact.social).filter((social) =>
    social.url.startsWith("http"),
  );

  return (
    <footer className="site-footer relative z-10 mx-auto w-full max-w-5xl px-4 pb-28 pt-4 sm:px-6">
      <div className="site-footer-card">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm space-y-3">
            <p className="site-footer-name">{DATA.name}</p>
            <p className="site-footer-muted text-sm leading-relaxed">
              {DATA.role}. Open to opportunities and collaborations.
            </p>
            <ul className="site-footer-muted space-y-1.5 text-sm">
              <li className="inline-flex items-center gap-2">
                <MapPin aria-hidden="true" className="size-4 shrink-0" />
                {DATA.location} · {DATA.timezone}
              </li>
              <li>
                <a
                  href={`mailto:${DATA.contact.email}`}
                  className="site-footer-link inline-flex items-center gap-2"
                >
                  <Mail aria-hidden="true" className="size-4 shrink-0" />
                  {DATA.contact.email}
                </a>
              </li>
            </ul>
            <Link href="/contact" className="site-footer-cta">
              Start a conversation
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm">
            {FOOTER_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="site-footer-link">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="site-footer-rule mt-6 flex flex-col gap-3 pt-5 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p className="site-footer-muted">
            © {new Date().getFullYear()} {DATA.name}
          </p>
          <ul className="flex flex-wrap gap-4">
            {socials.map((social) => (
              <li key={social.name}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="site-footer-link"
                >
                  {social.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

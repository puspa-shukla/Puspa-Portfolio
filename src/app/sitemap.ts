import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

// Only finished, indexable pages. Placeholder pages are noindex and left out.
const ROUTES = [
  { path: "/", priority: 1 },
  { path: "/projects", priority: 0.9 },
  { path: "/achievements", priority: 0.8 },
  { path: "/blog", priority: 0.8 },
  { path: "/social-work", priority: 0.7 },
  { path: "/resume", priority: 0.7 },
  { path: "/contact", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map(({ path, priority }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}

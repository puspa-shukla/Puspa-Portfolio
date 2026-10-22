import type { Metadata } from "next";
import { DATA } from "@/data/resume";
import { absoluteUrl } from "@/lib/site";

// Next.js replaces (rather than merges) nested metadata objects such as
// openGraph, so each page builds its full set of tags here.
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  type = "website",
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  type?: "website" | "article" | "profile";
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  const socialTitle = absoluteTitle ? title : `${title} | ${DATA.name}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: DATA.name,
      locale: "en_US",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

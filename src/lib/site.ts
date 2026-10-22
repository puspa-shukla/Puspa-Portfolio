// Canonical production origin. Canonical URLs, the sitemap and structured
// data always point here, even on preview deployments.
export const SITE_URL = "https://www.puspashukla.com.np";

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const absoluteUrl = (path = "/") =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

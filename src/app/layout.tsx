import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.URL
      ? process.env.URL.replace(/\/$/, "")
      : "http://localhost:3000";

const siteDescription =
  "Portfolio of Puspa Shukla, a BCA student in Kathmandu, Nepal, learning and building in web development, practical AI, and IT systems support.";

const cabinetGrotesk = localFont({
  src: "../../public/fonts/CabinetGrotesk-Medium.ttf",
  variable: "--font-sans",
  weight: "500",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${DATA.name} | BCA Student in Kathmandu, Nepal`,
    template: `%s | ${DATA.name}`,
  },
  description: siteDescription,
  openGraph: {
    title: `${DATA.name}`,
    description: siteDescription,
    url: siteUrl,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: `${DATA.name} | BCA Student in Kathmandu, Nepal`,
    card: "summary_large_image",
    description: siteDescription,
    images: ["/me.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen overflow-x-hidden bg-background font-sans antialiased relative",
          cabinetGrotesk.variable,
        )}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider delayDuration={0}>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Person",
                  name: DATA.name,
                  description:
                    "BCA student in Kathmandu, Nepal, learning and building in web development, practical AI, and IT systems support.",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Kathmandu",
                    addressCountry: "NP",
                  },
                  sameAs: [
                    DATA.contact.social.LinkedIn.url,
                    DATA.contact.social.GitHub.url,
                  ],
                }),
              }}
            />
            <div className="absolute inset-[0] overflow-hidden z-0">
              <FlickeringGrid
                className="h-[100px] w-full"
                squareSize={2}
                gridGap={2}
                style={{
                  maskImage: "linear-gradient(to bottom, black, transparent)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black, transparent)",
                }}
              />
            </div>
            <div className="relative z-10 mx-auto w-full px-4 py-12 pb-24 sm:px-6 sm:py-24 max-w-2xl sm:max-w-3xl ">
              {children}
            </div>
            <Navbar />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

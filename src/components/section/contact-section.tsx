import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { DATA } from "@/data/resume";
import { Icons } from "@/components/icons";

export default function ContactSection() {
  return (
    <div className="border rounded-xl p-10 relative">
      <div className="absolute -top-4 border bg-primary z-10 rounded-xl px-4 py-1 left-1/2 -translate-x-1/2">
        <span className="text-background text-sm font-medium">Contact</span>
      </div>
      <div className="absolute inset-0 top-0 left-0 right-0 h-1/2 rounded-xl overflow-hidden">
        <FlickeringGrid
          className="h-full w-full"
          squareSize={2}
          gridGap={2}
          style={{
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />
      </div>
      <div className="relative flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Get in Touch
        </h2>
        <p className="mx-auto max-w-lg text-muted-foreground text-balance">
          Want to chat? Send me a direct question on{" "}
          <a
            href={DATA.contact.social.LinkedIn.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline underline-offset-4"
          >
            LinkedIn
          </a>{" "}
          or{" "}
          <a
            href={DATA.contact.social.X.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline underline-offset-4"
          >
            X
          </a>
          .
        </p>
        <div className="flex flex-wrap items-center justify-center gap-5 text-sm">
          <a className="inline-flex items-center gap-2 underline underline-offset-4" href={`mailto:${DATA.contact.email}`}>
            <Icons.email className="size-4" />
            {DATA.contact.email}
          </a>
          <a className="inline-flex items-center gap-2 underline underline-offset-4" href={`tel:${DATA.contact.tel}`}>
            {DATA.contact.tel}
          </a>
          <a
            className="inline-flex items-center gap-2 underline underline-offset-4"
            href={DATA.contact.social.LinkedIn.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icons.linkedin className="size-4" />
            LinkedIn
          </a>
          <a
            className="inline-flex items-center gap-2 underline underline-offset-4"
            href={DATA.contact.social.GitHub.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icons.github className="size-4" />
            GitHub
          </a>
          <a
            className="inline-flex items-center gap-2 underline underline-offset-4"
            href={DATA.contact.social.X.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icons.x className="size-4" />
            X
          </a>
        </div>
      </div>
    </div>
  );
}


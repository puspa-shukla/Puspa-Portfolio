"use client";
import { useState } from "react";
import { DATA } from "@/data/resume";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const CopyEmailBtn = () => {
  const email = DATA.contact.email;
  const previewEmail = email;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center rounded-sm px-1 py-1 text-sm font-medium text-foreground underline underline-offset-4 decoration-1 transition-all hover:text-foreground/80 hover:decoration-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {copied ? "Copied!" : "Copy Email"}
        </button>
      </TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        sideOffset={10}
        collisionPadding={12}
        className="z-[70] rounded-xl border border-border bg-card px-3 py-2 text-card-foreground shadow-[0_18px_50px_-20px_rgba(0,0,0,0.35)]"
      >
        <p className="text-sm font-medium text-foreground">{previewEmail}</p>
        <TooltipArrow className="fill-card" />
      </TooltipContent>
    </Tooltip>
  );
};

export default CopyEmailBtn;

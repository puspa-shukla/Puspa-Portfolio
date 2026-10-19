"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import HamburgerNavigation from "@/components/hamburger-navigation";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";

// Real brand colors shown on hover, tap (active) and keyboard focus.
const SOCIAL_BRAND_COLORS: Record<string, string> = {
  LinkedIn:
    "hover:text-[#0a66c2] active:text-[#0a66c2] group-focus-visible:text-[#0a66c2]",
  GitHub:
    "hover:text-[#181717] active:text-[#181717] group-focus-visible:text-[#181717] dark:hover:text-white dark:active:text-white dark:group-focus-visible:text-white",
  X: "hover:text-black active:text-black group-focus-visible:text-black dark:hover:text-white dark:active:text-white dark:group-focus-visible:text-white",
};

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <HamburgerNavigation />
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex origin-bottom h-full max-h-14">
        <div className="fixed bottom-0 inset-x-0 h-16 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background"></div>
        <Dock className="z-50 pointer-events-auto relative mx-auto flex h-full items-center px-1 bg-card/90 backdrop-blur-3xl shadow-[0_0_10px_3px] shadow-primary/5 border rounded-full transform-gpu overflow-x-auto overflow-y-hidden max-w-[95vw] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] gap-1 sm:gap-2">
          {DATA.navbar.map((item) => {
            const isExternal = item.href.startsWith("http");
            const isActive =
              !isExternal &&
              (pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(`${item.href}/`)));
            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <a
                    href={item.href}
                    aria-label={item.label}
                    title={item.label}
                    aria-current={isActive ? "page" : undefined}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="group rounded-full [-webkit-tap-highlight-color:transparent] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2"
                  >
                    <DockIcon
                      className={`size-full cursor-pointer rounded-3xl border bg-background p-0 text-muted-foreground backdrop-blur-3xl transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:border-border hover:bg-muted hover:text-foreground active:text-foreground group-focus-visible:text-foreground ${
                        isActive
                          ? "border-border bg-muted text-foreground"
                          : "border-border"
                      }`}
                    >
                      <item.icon className="size-full rounded-sm overflow-hidden object-contain" />
                    </DockIcon>
                  </a>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  sideOffset={8}
                  className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
                >
                  <p>{item.label}</p>
                  <TooltipArrow className="fill-primary" />
                </TooltipContent>
              </Tooltip>
            );
          })}
          <Separator
            orientation="vertical"
            className="h-2/3 m-auto w-px bg-border"
          />
          {Object.entries(DATA.contact.social)
            .filter(([_, social]) => social.navbar)
            .map(([name, social], index) => {
              const isExternal = social.url.startsWith("http");
              const IconComponent = social.icon;
              return (
                <Tooltip key={`social-${name}-${index}`}>
                  <TooltipTrigger asChild>
                    <a
                      href={social.url}
                      aria-label={name}
                      title={name}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="group rounded-full [-webkit-tap-highlight-color:transparent] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2"
                    >
                      <DockIcon className={`size-full cursor-pointer rounded-3xl border border-border bg-background p-0 text-muted-foreground backdrop-blur-3xl transition-all duration-200 hover:scale-105 hover:border-border hover:bg-muted ${
                        SOCIAL_BRAND_COLORS[name] ??
                        "hover:text-foreground active:text-foreground group-focus-visible:text-foreground"
                      }`}>
                        <IconComponent className="size-full rounded-sm overflow-hidden object-contain" />
                      </DockIcon>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    sideOffset={8}
                    className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
                  >
                    <p>{name}</p>
                    <TooltipArrow className="fill-primary" />
                  </TooltipContent>
                </Tooltip>
              );
            })}
          <Separator
            orientation="vertical"
            className="h-2/3 m-auto w-px bg-border"
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <DockIcon className="group size-full cursor-pointer rounded-3xl border border-border bg-background p-0 text-muted-foreground backdrop-blur-3xl transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:border-border hover:bg-muted [-webkit-tap-highlight-color:transparent] hover:text-amber-600 active:text-amber-600 dark:hover:text-amber-400 dark:active:text-amber-400 has-[:focus-visible]:text-amber-600 dark:has-[:focus-visible]:text-amber-400">
                <ModeToggle className="size-full cursor-pointer" />
              </DockIcon>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              sideOffset={8}
              className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
            >
              <p>Theme</p>
              <TooltipArrow className="fill-primary" />
            </TooltipContent>
          </Tooltip>
        </Dock>
      </div>
    </>
  );
}

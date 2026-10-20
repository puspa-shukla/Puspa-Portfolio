"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type RefObject,
} from "react";
import dynamic from "next/dynamic";
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Check,
  CircleAlert,
  CircleCheck,
  Copy,
  Hand,
  LoaderCircle,
  MousePointerClick,
  Mail,
  MessageCircleMore,
  PawPrint,
  PenLine,
  Plus,
  Send,
} from "lucide-react";
import { Icons } from "@/components/icons";
import { DATA } from "@/data/resume";
import {
  CONTACT_EMAIL,
  CONTACT_LIMITS,
  INQUIRY_TYPES,
  validateContact,
  type ContactErrors,
  type InquiryType,
} from "@/lib/contact";
import type { KittyAction } from "./kitty-scene";

// WebGL only exists in the browser, so the scene is never server-rendered.
const KittyScene = dynamic(() => import("./kitty-scene"), { ssr: false });

const CHOICES: {
  inquiry: InquiryType;
  label: string;
  emoji: string;
  hint: string;
  reply: string;
  action: KittyAction;
}[] = [
  {
    inquiry: "Project Idea",
    label: "I have an idea",
    emoji: "💡",
    hint: "Project suggestions, AI ideas, things to build",
    reply: "Ooh, an idea! Tell me about it.",
    action: "tilt",
  },
  {
    inquiry: "Collaboration",
    label: "Let's collaborate",
    emoji: "🤝",
    hint: "Software projects, AI experiments, community work",
    reply: "Something to build together? I'm listening!",
    action: "wave",
  },
  {
    inquiry: "Career Opportunity",
    label: "I have an opportunity",
    emoji: "✨",
    hint: "Internships, jobs, mentorship, partnerships",
    reply: "That sounds exciting. Let's get Puspa involved.",
    action: "hop",
  },
  {
    inquiry: "General Conversation",
    label: "I just want to say hi",
    emoji: "👋",
    hint: "Questions, introductions, networking",
    reply: "Hi right back! What would you like to talk about?",
    action: "nod",
  },
];

// The places the kitty sits as the visitor scrolls, in page order: on the talk
// button, then on top of each step's card.
const SPOTS = ["hero", "choices", "write", "reach"] as const;
type Spot = (typeof SPOTS)[number];

const SPOT_LINES: Record<Spot, string> = {
  hero: "Hi! Tap me for shortcuts, or scroll and I'll guide you. 🐾",
  choices: "Pick whatever fits. I'll set up the form.",
  write: "Take your time. A few honest lines are perfect.",
  reach: "Prefer LinkedIn or GitHub? Those work too.",
};

const PET_REPLIES = [
  "Purrr… okay, you're nice.",
  "Hehe, that tickles!",
  "Mrrp. Right behind the ears, perfect.",
  "Alright, alright. Shall we talk to Puspa now?",
];
const SECRET_REPLY = "You found my favourite spot. ✨";
const KITTY_MENU_ID = "kitty-menu";

// The three ways to explore, shown under the headline so nobody has to guess.
const HOW_TO = [
  { icon: Hand, text: "Scroll, and the kitty walks you through each step" },
  { icon: PawPrint, text: "Tap the kitty anytime for quick shortcuts" },
  { icon: MousePointerClick, text: "Or press the button to jump straight in" },
];

// Opens Gmail's compose window addressed to Puspa. Plain mailto links do nothing
// on computers without a mail app set up, which is common on Windows.
const gmailComposeUrl = (subject = "", body = "") => {
  const params = new URLSearchParams({ view: "cm", fs: "1", to: CONTACT_EMAIL });
  if (subject) params.set("su", subject);
  if (body) params.set("body", body);
  return `https://mail.google.com/mail/?${params}`;
};

// App-icon glyphs: each app's own logo, sized to fill its square.
function GmailGlyph() {
  return (
    <svg aria-hidden="true" viewBox="52 42 88 66" className="w-[72%]">
      <path fill="#4285f4" d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6" />
      <path fill="#34a853" d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15" />
      <path fill="#fbbc04" d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2" />
      <path fill="#ea4335" d="M72 74V48l24 18 24-18v26L96 92" />
      <path fill="#c5221f" d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2" />
    </svg>
  );
}

function LinkedinGlyph() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="w-[66%]">
      <path
        fill="currentColor"
        d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z"
      />
    </svg>
  );
}

function GithubGlyph() {
  return <Icons.github aria-hidden="true" className="w-[80%]" />;
}

const githubHandle = new URL(DATA.contact.social.GitHub.url).pathname.replace(/\//g, "");

const DIRECT_LINKS = [
  {
    label: "Email",
    handle: CONTACT_EMAIL,
    action: "Write in Gmail",
    href: gmailComposeUrl(),
    glyph: GmailGlyph,
    brand: "contact-brand-email",
  },
  {
    label: "LinkedIn",
    handle: "Puspa Shukla",
    action: "Connect with me",
    href: DATA.contact.social.LinkedIn.url,
    glyph: LinkedinGlyph,
    brand: "contact-brand-linkedin",
  },
  {
    label: "GitHub",
    handle: `@${githubHandle}`,
    action: "See my projects",
    href: DATA.contact.social.GitHub.url,
    glyph: GithubGlyph,
    brand: "contact-brand-github",
  },
];

// A contact card that tilts in 3D toward the pointer (or finger), with a soft
// light that follows it. The app icon floats above the card.
function ReachCard({
  link,
  index,
  popped,
  onOpen,
}: {
  link: (typeof DIRECT_LINKS)[number];
  index: number;
  popped: boolean;
  onOpen: () => void;
}) {
  const Glyph = link.glyph;

  const tilt = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const card = event.currentTarget;
    const box = card.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width;
    const y = (event.clientY - box.top) / box.height;
    card.style.setProperty("--rx", `${((0.5 - y) * 16).toFixed(2)}deg`);
    card.style.setProperty("--ry", `${((x - 0.5) * 18).toFixed(2)}deg`);
    card.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
    card.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
    card.dataset.tilting = "";
  };

  const settle = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    const card = event.currentTarget;
    for (const name of ["--rx", "--ry", "--mx", "--my"]) card.style.removeProperty(name);
    delete card.dataset.tilting;
  };

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      onPointerMove={tilt}
      onPointerDown={tilt}
      onPointerLeave={settle}
      onPointerCancel={settle}
      onClick={onOpen}
      data-popped={popped ? "" : undefined}
      style={{ "--i": index } as CSSProperties}
      className={`contact-reach3d ${link.brand} group`}
    >
      <span aria-hidden="true" className="contact-reach3d-sheen" />
      <span className="contact-reach3d-float">
        <span className="contact-reach3d-icon">
          <Glyph />
        </span>
      </span>
      <span className="contact-reach3d-text">
        <span className="contact-heading text-base font-semibold">
          {link.label}
          <span className="sr-only"> (opens in a new tab)</span>
        </span>
        <span className="contact-muted block truncate text-sm">{link.handle}</span>
      </span>
      <span className="contact-reach3d-cta">
        <span className="hidden sm:inline">{link.action}</span>
        <ArrowUpRight aria-hidden="true" className="size-4" />
      </span>
    </a>
  );
}

const PLACEHOLDERS: Record<InquiryType, string> = {
  "Project Idea": "What's the idea, and what problem would it solve?",
  Feedback: "What worked, what didn't, and what would you change?",
  Collaboration:
    "Tell me about the project or idea, and how you'd like to work together.",
  "Career Opportunity":
    "Share the role or program, your organization, and what you have in mind.",
  "General Conversation": "Hi Puspa! I'm… and I wanted to ask…",
};

const FEEDBACK_PROMPTS = [
  "What caught your attention on my website?",
  "What would you improve or like to see more of?",
  "What would you like me to build, explore, or write about next?",
];

type Status = "idle" | "submitting" | "success" | "error" | "not_configured";
type Field = "name" | "email" | "inquiry" | "message";
const FIELD_ORDER: Field[] = ["name", "email", "inquiry", "message"];

const delayStyle = (ms: number) => ({ "--d": `${Math.round(ms)}ms` }) as CSSProperties;

// The kitty's feet sink this far into the edge it sits on, and it keeps this
// far in from that edge's right end.
const KITTY_SINK = 4;
const KITTY_INSET = 20;
const DROP_DELAY = 700;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const easeInOut = (p: number) => (p < 0.5 ? 4 * p ** 3 : 1 - (-2 * p + 2) ** 3 / 2);
const easeOut = (p: number) => 1 - (1 - p) ** 3;

type Flight = {
  fromX: number;
  fromY: number;
  start: number;
  duration: number;
  arc: number;
  drop: boolean;
};

// Keeps the kitty sitting on the step the visitor is reading. It rides along
// with the page while seated (it is positioned inside the page, so scrolling
// never makes it jitter) and hops in an arc to the next step when that step
// comes into view.
function useKittyCompanion({
  rootRef,
  companionRef,
  anchors,
  onMove,
  onArrive,
}: {
  rootRef: RefObject<HTMLDivElement | null>;
  companionRef: RefObject<HTMLDivElement | null>;
  anchors: RefObject<Partial<Record<Spot, HTMLElement | null>>>;
  onMove: (spot: Spot) => void;
  onArrive: (spot: Spot) => void;
}) {
  const onMoveRef = useRef(onMove);
  const onArriveRef = useRef(onArrive);
  useEffect(() => {
    onMoveRef.current = onMove;
    onArriveRef.current = onArrive;
  });

  useEffect(() => {
    const root = rootRef.current;
    const kitty = companionRef.current;
    if (!root || !kitty) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let current: Spot | null = null;
    let flight: Flight | null = null;
    let x = 0;
    let y = 0;
    let frameId = 0;

    const targetFor = (spot: Spot) => {
      const anchor = anchors.current?.[spot];
      if (!anchor) return null;
      const box = anchor.getBoundingClientRect();
      const origin = root.getBoundingClientRect();
      return {
        x: box.right - origin.left - kitty.offsetWidth - KITTY_INSET,
        y: box.top - origin.top - kitty.offsetHeight + KITTY_SINK,
      };
    };

    // The latest step whose top has risen past 60% of the screen.
    const activeSpot = (): Spot => {
      let active: Spot = "hero";
      for (const spot of SPOTS.slice(1)) {
        const anchor = anchors.current?.[spot];
        if (anchor && anchor.getBoundingClientRect().top < window.innerHeight * 0.6) active = spot;
      }
      return active;
    };

    const place = (opacity: number) => {
      kitty.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      kitty.style.opacity = String(opacity);
    };

    const frame = (now: number) => {
      frameId = 0;
      if (current === null) return;

      const next = activeSpot();
      if (next !== current) {
        const target = targetFor(next);
        if (target) {
          const distance = Math.hypot(target.x - x, target.y - y);
          current = next;
          onMoveRef.current(next);
          if (reducedMotion) {
            flight = null;
            onArriveRef.current(next);
          } else {
            flight = {
              fromX: x,
              fromY: y,
              start: now,
              duration: Math.min(1300, Math.max(750, distance * 1.1)),
              arc: Math.min(140, 40 + distance * 0.2),
              drop: false,
            };
          }
        }
      }

      const target = targetFor(current);
      if (!target) return;
      let opacity = 1;
      if (flight) {
        const progress = clamp01((now - flight.start) / flight.duration);
        const eased = flight.drop ? easeOut(progress) : easeInOut(progress);
        x = flight.fromX + (target.x - flight.fromX) * eased;
        y = flight.fromY + (target.y - flight.fromY) * eased - flight.arc * Math.sin(Math.PI * progress);
        if (flight.drop) opacity = clamp01(progress / 0.35);
        if (progress >= 1) {
          flight = null;
          onArriveRef.current(current);
        }
      } else {
        x = target.x;
        y = target.y;
      }
      place(opacity);
      if (flight) frameId = window.requestAnimationFrame(frame);
    };

    const schedule = () => {
      if (!frameId) frameId = window.requestAnimationFrame(frame);
    };

    // Float down from above onto wherever the visitor is.
    const dropTimer = window.setTimeout(
      () => {
        const spot = activeSpot();
        const target = targetFor(spot);
        if (!target) return;
        current = spot;
        x = target.x;
        y = target.y;
        onMoveRef.current(spot);
        if (reducedMotion) {
          place(1);
          onArriveRef.current(spot);
          return;
        }
        flight = {
          fromX: target.x,
          fromY: target.y - 260,
          start: performance.now(),
          duration: 1800,
          arc: 0,
          drop: true,
        };
        place(0);
        schedule();
      },
      reducedMotion ? 0 : DROP_DELAY,
    );

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // Layout shifts (error messages, the success panel) move the cards.
    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(root);

    return () => {
      window.clearTimeout(dropTimer);
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      resizeObserver.disconnect();
    };
  }, [rootRef, companionRef, anchors]);
}

// Each step fades up the first time it scrolls into view.
function useRevealSteps(rootRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const steps = root.querySelectorAll<HTMLElement>(".contact-step");
    root.classList.add("contact-reveal-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    steps.forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, [rootRef]);
}

function StepHeader({
  index,
  id,
  title,
  children,
}: {
  index: string;
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    // Room on the right is left free for the kitty, which sits on the card below.
    <header className="contact-step-head flex items-start gap-4 pr-28 sm:pr-40">
      <span aria-hidden="true" className="contact-step-index">
        {index}
      </span>
      <div className="min-w-0">
        <h2 id={id} className="contact-heading text-xl font-semibold tracking-tight sm:text-2xl">
          {title}
        </h2>
        <p className="contact-muted mt-1 text-sm leading-relaxed sm:text-base">{children}</p>
      </div>
    </header>
  );
}

export default function ContactExperience() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [inquiry, setInquiry] = useState<InquiryType | "">("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const [bubble, setBubble] = useState<{ text: string; key: number } | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const [cue, setCue] = useState<{ action: KittyAction; id: number } | null>(null);
  const [attention, setAttention] = useState(false);
  const [moving, setMoving] = useState(true);
  const [paws, setPaws] = useState<{ id: number; x: number; y: number }[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [kittyTapped, setKittyTapped] = useState(false);
  const [popped, setPopped] = useState<string | null>(null);
  const petCount = useRef(0);
  const cueId = useRef(0);
  const bubbleTimer = useRef(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const companionRef = useRef<HTMLDivElement>(null);
  const anchors = useRef<Partial<Record<Spot, HTMLElement | null>>>({});
  const setAnchor = (spot: Spot) => (element: HTMLElement | null) => {
    anchors.current[spot] = element;
  };

  const formRef = useRef<HTMLFormElement>(null);
  const fieldRefs = useRef<Partial<Record<Field, HTMLElement | null>>>({});
  const submittingRef = useRef(false);

  const values = { name, email, inquiry, message };

  // The kitty's speech bubble shows for a few seconds, then tucks away.
  const say = (text: string) => {
    window.clearTimeout(bubbleTimer.current);
    setBubble({ text, key: Date.now() });
    bubbleTimer.current = window.setTimeout(() => setBubble(null), 4800);
  };

  useEffect(() => () => window.clearTimeout(bubbleTimer.current), []);

  useKittyCompanion({
    rootRef,
    companionRef,
    anchors,
    onMove: () => {
      setMoving(true);
      setBubble(null);
    },
    onArrive: (spot) => {
      setMoving(false);
      say(SPOT_LINES[spot]);
    },
  });
  useRevealSteps(rootRef);

  // After the first submit attempt, keep errors in sync as the visitor types.
  const update = (field: Field, value: string) => {
    if (!attempted) return;
    setErrors(validateContact({ ...values, [field]: value }).errors);
  };

  const focusField = (field: Field) => {
    fieldRefs.current[field]?.focus({ preventScroll: true });
  };

  const reduceMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const playKitty = (action: KittyAction) => {
    cueId.current += 1;
    setCue({ action, id: cueId.current });
  };

  const chooseOption = (choice: (typeof CHOICES)[number]) => {
    setInquiry(choice.inquiry);
    update("inquiry", choice.inquiry);
    if (status === "success") setStatus("idle");
    playKitty(choice.action);
    say(choice.reply);
    setAnnouncement(`${choice.reply} The form below is set to “${choice.inquiry}”.`);
    // Give the kitty a moment to react before moving to the form.
    const instant = reduceMotion();
    window.setTimeout(
      () => {
        formRef.current?.scrollIntoView({
          behavior: instant ? "auto" : "smooth",
          block: "start",
        });
        focusField(name.trim() ? "message" : "name");
      },
      instant ? 0 : 900,
    );
  };

  const startTalking = () => {
    playKitty("wave");
    const instant = reduceMotion();
    document.getElementById("contact-choices")?.scrollIntoView({
      behavior: instant ? "auto" : "smooth",
      block: "start",
    });
    window.setTimeout(
      () =>
        document
          .querySelector<HTMLButtonElement>("#contact-choices button")
          ?.focus({ preventScroll: true }),
      instant ? 0 : 600,
    );
  };

  // Tapping the kitty opens its shortcut menu; tapping again closes it with a purr.
  const petKitty = (x: number, y: number) => {
    setKittyTapped(true);
    const opening = !menuOpen;
    setMenuOpen(opening);
    if (opening) {
      setBubble(null);
    } else {
      petCount.current += 1;
      const pets = petCount.current;
      say(pets === 5 ? SECRET_REPLY : PET_REPLIES[(pets - 1) % PET_REPLIES.length]);
    }
    if (reduceMotion()) return;
    const count = petCount.current;
    const id = Date.now() + count;
    setPaws((current) => [...current.slice(-3), { id, x, y }]);
    window.setTimeout(() => setPaws((current) => current.filter((paw) => paw.id !== id)), 1200);
  };

  const closeMenu = (refocus = false) => {
    setMenuOpen(false);
    if (refocus) {
      companionRef.current
        ?.querySelector<HTMLButtonElement>(".kitty-stage")
        ?.focus({ preventScroll: true });
    }
  };

  // Escape or a tap elsewhere closes the menu; opening it focuses the first item.
  useEffect(() => {
    if (!menuOpen) return;
    document
      .querySelector<HTMLElement>(`#${KITTY_MENU_ID} [data-menu-item]`)
      ?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      companionRef.current
        ?.querySelector<HTMLButtonElement>(".kitty-stage")
        ?.focus({ preventScroll: true });
    };
    const onPointer = (event: PointerEvent) => {
      if (!companionRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [menuOpen]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      say(`Copied! ${CONTACT_EMAIL} is on your clipboard. 📋`);
      setAnnouncement(`Copied ${CONTACT_EMAIL} to your clipboard.`);
    } catch {
      say(`Here it is: ${CONTACT_EMAIL}`);
      setAnnouncement(`Puspa's email is ${CONTACT_EMAIL}.`);
    }
    playKitty("nod");
  };

  const scrollToElement = (element: Element | null | undefined) =>
    element?.scrollIntoView({ behavior: reduceMotion() ? "auto" : "smooth", block: "start" });

  const menuActions = [
    {
      label: "Pick a topic",
      icon: MessageCircleMore,
      run: () => {
        scrollToElement(document.getElementById("contact-choices"));
        window.setTimeout(
          () =>
            document
              .querySelector<HTMLButtonElement>("#contact-choices button")
              ?.focus({ preventScroll: true }),
          reduceMotion() ? 0 : 600,
        );
      },
    },
    {
      label: "Write a message",
      icon: PenLine,
      run: () => {
        scrollToElement(formRef.current);
        window.setTimeout(
          () => focusField(name.trim() ? "message" : "name"),
          reduceMotion() ? 0 : 600,
        );
      },
    },
    {
      label: "Copy Puspa's email",
      icon: Copy,
      run: () => copyEmail(),
    },
    {
      label: "Back to top",
      icon: ArrowUp,
      run: () => window.scrollTo({ top: 0, behavior: reduceMotion() ? "auto" : "smooth" }),
    },
  ];

  // Each contact link pops out of the box when chosen; the kitty cheers it on.
  const popLink = (label: string) => {
    setPopped(label);
    playKitty("hop");
    say(label === "Email" ? "Opening Gmail for you. ✉️" : `Opening ${label} in a new tab. ✨`);
  };

  // Tapping a used prompt again takes it (and its blank line) back out.
  const removePrompt = (prompt: string) => {
    const next = message
      .replace(prompt, "")
      .replace(/\n{3,}/g, "\n\n")
      .replace(/^\s+/, "");
    setMessage(next);
    update("message", next);
  };

  const togglePrompt = (prompt: string) => {
    if (message.includes(prompt)) removePrompt(prompt);
    else addPrompt(prompt);
  };

  const addPrompt = (prompt: string) => {
    const next = message.trim() ? `${message.trimEnd()}\n\n${prompt}\n` : `${prompt}\n`;
    setMessage(next);
    update("message", next);
    if (!inquiry) {
      setInquiry("Feedback");
      update("inquiry", "Feedback");
    }
    if (status === "success") setStatus("idle");
    window.setTimeout(() => {
      const textarea = fieldRefs.current.message as HTMLTextAreaElement | null;
      if (!textarea) return;
      textarea.focus({ preventScroll: true });
      textarea.setSelectionRange(next.length, next.length);
      textarea.scrollTop = textarea.scrollHeight;
      textarea.scrollIntoView({
        behavior: reduceMotion() ? "auto" : "smooth",
        block: "center",
      });
    }, 0);
  };

  // Fallback when the form can't send: the same message, ready in Gmail.
  const fallbackEmailHref = () => {
    const subject = `[Portfolio] ${inquiry || "Hello"} from ${name.trim() || "a visitor"}`;
    const body = message.trim()
      ? `${message.trim()}\n\n${name.trim()}${email.trim() ? ` (${email.trim()})` : ""}`
      : "";
    return gmailComposeUrl(subject, body);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submittingRef.current) return;

    setAttempted(true);
    const result = validateContact(values);
    setErrors(result.errors);
    if (!result.data) {
      const firstInvalid = FIELD_ORDER.find((field) => result.errors[field]);
      if (firstInvalid) {
        fieldRefs.current[firstInvalid]?.focus();
        playKitty("tilt");
        say(`Psst: ${result.errors[firstInvalid]}`);
      }
      return;
    }

    submittingRef.current = true;
    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...result.data, company }),
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok && data.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setInquiry("");
        setMessage("");
        setAttempted(false);
        setErrors({});
        playKitty("hop");
        say("Sent! Puspa will be so happy. 💌");
      } else if (data.error === "validation" && data.errors) {
        setErrors(data.errors);
        setStatus("idle");
      } else if (data.error === "not_configured") {
        setStatus("not_configured");
        say("Hmm, the form isn't connected yet. The email link has your message ready.");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      submittingRef.current = false;
    }
  };

  const submitting = status === "submitting";
  const errorId = (field: Field) => (errors[field] ? `contact-${field}-error` : undefined);

  return (
    <div ref={rootRef} className="relative flex flex-col gap-20 sm:gap-24">
      {/* The kitty companion. It is positioned inside the page, so it scrolls
          with the content while seated and hops between steps. */}
      <div
        ref={companionRef}
        className="contact-companion pointer-events-none absolute left-0 top-0 z-20 h-[154px] w-[96px] opacity-0 sm:h-[192px] sm:w-[120px]"
      >
        <KittyScene
          cue={cue}
          attention={attention}
          moving={moving}
          onPet={petKitty}
          menuId={KITTY_MENU_ID}
          menuOpen={menuOpen}
        />
        {!kittyTapped && !moving && (
          <span aria-hidden="true" className="contact-tapme">
            Tap me
          </span>
        )}
        {paws.map((paw) => (
          <PawPrint
            key={paw.id}
            aria-hidden="true"
            className="contact-paw pointer-events-none absolute size-5"
            style={{ left: paw.x, top: paw.y }}
          />
        ))}
        {menuOpen && (
          <div id={KITTY_MENU_ID} role="group" aria-label="Kitty shortcuts" className="contact-kitty-menu">
            <p className="contact-muted px-2.5 pb-1.5 pt-1 text-xs font-semibold uppercase tracking-[0.12em]">
              Where to?
            </p>
            {menuActions.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  type="button"
                  data-menu-item
                  onClick={() => {
                    closeMenu();
                    void item.run();
                  }}
                  className="contact-kitty-menu-item"
                >
                  <Icon aria-hidden="true" className="size-4 shrink-0" />
                  {item.label}
                </button>
              );
            })}
          </div>
        )}
        {bubble && !menuOpen && (
          <p key={bubble.key} aria-hidden="true" className="contact-bubble">
            {bubble.text}
          </p>
        )}
      </div>
      <p role="status" aria-live="polite" className="sr-only">
        {announcement}
      </p>

      <section aria-labelledby="contact-title" className="contact-hero-block pt-6 sm:pt-10">
        <p className="contact-eyebrow contact-rise" style={delayStyle(0)}>
          <span aria-hidden="true" className="contact-eyebrow-dot" />
          Contact
        </p>
        <h1
          id="contact-title"
          className="contact-title contact-rise mt-6 max-w-3xl text-[clamp(2.5rem,6.2vw,4.5rem)] font-semibold leading-[1.02]"
          style={delayStyle(90)}
        >
          Good things start
          <br />
          with <span className="contact-title-accent">a conversation.</span>
        </h1>
        <p
          className="contact-muted contact-rise mt-6 max-w-xl text-base leading-relaxed sm:text-lg"
          style={delayStyle(180)}
        >
          Have an idea, a question, feedback, or an opportunity? I&apos;d love to
          hear from you. Let&apos;s connect and see what we can create together.
        </p>
        <ul
          aria-label="How to explore this page"
          className="contact-rise mt-8 grid max-w-md gap-2.5"
          style={delayStyle(230)}
        >
          {HOW_TO.map((tip) => {
            const Icon = tip.icon;
            return (
              <li key={tip.text} className="contact-howto">
                <span aria-hidden="true" className="contact-howto-icon">
                  <Icon className="size-3.5" />
                </span>
                {tip.text}
              </li>
            );
          })}
        </ul>

        {/* Room above the button is kept free for the kitty on smaller screens,
            where the headline runs the full width. */}
        <div
          className="contact-rise mt-[136px] flex justify-end sm:mt-[172px] lg:-mt-11"
          style={delayStyle(300)}
        >
          <div ref={setAnchor("hero")}>
            <button
              type="button"
              onClick={startTalking}
              onPointerEnter={() => setAttention(true)}
              onPointerLeave={() => setAttention(false)}
              onFocus={() => setAttention(true)}
              onBlur={() => setAttention(false)}
              className="contact-talk"
            >
              <span className="contact-talk-body">
                <span aria-hidden="true" className="contact-talk-fill" />
                <span className="contact-talk-label">Let&apos;s Talk to Puspa</span>
                <span aria-hidden="true" className="contact-talk-chip">
                  <ArrowRight className="size-[18px]" />
                </span>
              </span>
            </button>
          </div>
        </div>
      </section>

      <section
        id="contact-choices"
        aria-labelledby="contact-choices-title"
        className="contact-step flex scroll-mt-24 flex-col gap-5"
      >
        <StepHeader index="01" id="contact-choices-title" title="What's on your mind?">
          Choose a starting point and I&apos;ll set up the form for you.
        </StepHeader>
        <div ref={setAnchor("choices")} className="contact-card rounded-2xl p-3 sm:p-4">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {CHOICES.map((choice) => {
              const selected = inquiry === choice.inquiry;
              return (
                <li key={choice.inquiry}>
                  <button
                    type="button"
                    aria-pressed={selected}
                    onClick={() => chooseOption(choice)}
                    onPointerEnter={() => setAttention(true)}
                    onPointerLeave={() => setAttention(false)}
                    onFocus={() => setAttention(true)}
                    onBlur={() => setAttention(false)}
                    className="contact-option flex h-full w-full items-start gap-3 rounded-xl p-4 text-left"
                  >
                    <span
                      aria-hidden="true"
                      className="contact-option-icon inline-flex size-10 shrink-0 items-center justify-center rounded-xl text-lg"
                    >
                      {choice.emoji}
                    </span>
                    <span className="flex min-w-0 flex-col gap-0.5">
                      <span className="contact-heading font-semibold">{choice.label}</span>
                      <span className="contact-muted text-sm leading-snug">{choice.hint}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="contact-option-check ml-auto inline-flex size-5 shrink-0 items-center justify-center rounded-full"
                    >
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="contact-form-title" className="contact-step flex flex-col gap-5">
        <StepHeader index="02" id="contact-form-title" title="Write to me">
          I read every message and usually reply within a few days.
        </StepHeader>
        <div
          ref={setAnchor("write")}
          className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,22rem)]"
        >
          <div className="contact-card scroll-mt-24 rounded-2xl p-5 sm:p-8">
            <div role="status" aria-live="polite" className="empty:hidden mb-5">
              {status === "success" && (
                <div className="contact-alert contact-alert-success flex gap-3 rounded-xl p-4">
                  <CircleCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
                  <div>
                    <p className="font-semibold">Thank you, your message is on its way.</p>
                    <p className="mt-1 text-sm">
                      I&apos;ll get back to you at the email you shared.
                    </p>
                  </div>
                </div>
              )}
              {(status === "error" || status === "not_configured") && (
                <div className="contact-alert contact-alert-error flex gap-3 rounded-xl p-4">
                  <CircleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
                  <div>
                    <p className="font-semibold">
                      {status === "not_configured"
                        ? "The online form isn't connected yet."
                        : "Your message couldn't be sent."}
                    </p>
                    <p className="mt-1 text-sm">
                      {status === "not_configured"
                        ? "Nothing was sent. You can send the same message by email instead; it's already filled in."
                        : "Please try again in a moment, or send it by email instead."}
                    </p>
                    <a
                      href={fallbackEmailHref()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-link mt-2 inline-flex items-center gap-1.5 text-sm font-semibold"
                    >
                      <Mail aria-hidden="true" className="size-4" />
                      Email {CONTACT_EMAIL}
                    </a>
                  </div>
                </div>
              )}
            </div>

            <form
              ref={formRef}
              noValidate
              onSubmit={handleSubmit}
              aria-busy={submitting}
              className="grid scroll-mt-28 gap-5"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-1.5">
                  <label htmlFor="contact-name" className="contact-label">
                    Name
                  </label>
                  <input
                    ref={(element) => {
                      fieldRefs.current.name = element;
                    }}
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    maxLength={CONTACT_LIMITS.name}
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                      update("name", event.target.value);
                    }}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errorId("name")}
                    aria-required="true"
                    className="contact-input"
                  />
                  {errors.name && (
                    <p id="contact-name-error" className="contact-error">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div className="grid gap-1.5">
                  <label htmlFor="contact-email" className="contact-label">
                    Email address
                  </label>
                  <input
                    ref={(element) => {
                      fieldRefs.current.email = element;
                    }}
                    id="contact-email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    maxLength={CONTACT_LIMITS.email}
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      update("email", event.target.value);
                    }}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errorId("email")}
                    aria-required="true"
                    className="contact-input"
                  />
                  {errors.email && (
                    <p id="contact-email-error" className="contact-error">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-1.5">
                <label htmlFor="contact-inquiry" className="contact-label">
                  Inquiry type
                </label>
                <select
                  ref={(element) => {
                    fieldRefs.current.inquiry = element;
                  }}
                  id="contact-inquiry"
                  name="inquiry"
                  value={inquiry}
                  onChange={(event) => {
                    setInquiry(event.target.value as InquiryType | "");
                    update("inquiry", event.target.value);
                  }}
                  aria-invalid={Boolean(errors.inquiry)}
                  aria-describedby={errorId("inquiry")}
                  aria-required="true"
                  className="contact-input contact-select"
                >
                  <option value="" disabled>
                    Choose what this is about
                  </option>
                  {INQUIRY_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.inquiry && (
                  <p id="contact-inquiry-error" className="contact-error">
                    {errors.inquiry}
                  </p>
                )}
              </div>

              <div className="grid gap-1.5">
                <div className="flex items-baseline justify-between gap-3">
                  <label htmlFor="contact-message" className="contact-label">
                    Message
                  </label>
                  <span className="contact-muted text-xs tabular-nums" aria-hidden="true">
                    {message.length}/{CONTACT_LIMITS.message}
                  </span>
                </div>
                <textarea
                  ref={(element) => {
                    fieldRefs.current.message = element;
                  }}
                  id="contact-message"
                  name="message"
                  rows={7}
                  placeholder={
                    inquiry ? PLACEHOLDERS[inquiry] : "What would you like to talk about?"
                  }
                  maxLength={CONTACT_LIMITS.message}
                  value={message}
                  onChange={(event) => {
                    setMessage(event.target.value);
                    update("message", event.target.value);
                  }}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errorId("message")}
                  aria-required="true"
                  className="contact-input min-h-40 resize-y leading-relaxed"
                />
                {errors.message && (
                  <p id="contact-message-error" className="contact-error">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Honeypot for bots; hidden from people and assistive tech. */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor="contact-company">Company</label>
                <input
                  id="contact-company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={company}
                  onChange={(event) => setCompany(event.target.value)}
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="contact-submit inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold"
                >
                  {submitting ? (
                    <>
                      <LoaderCircle aria-hidden="true" className="size-4 animate-spin motion-reduce:animate-none" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send aria-hidden="true" className="size-4" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          <aside aria-labelledby="contact-feedback-title" className="contact-card contact-card-warm rounded-2xl p-5 sm:p-6">
            <h3 id="contact-feedback-title" className="contact-heading text-lg font-semibold tracking-tight">
              Help me make this better.
            </h3>
            <p className="contact-muted mt-1 text-sm leading-relaxed">
              Honest feedback helps me grow. Tap a question to add it to your
              message, or tap it again to remove it.
            </p>
            <ul className="mt-4 grid gap-2">
              {FEEDBACK_PROMPTS.map((prompt) => {
                const used = message.includes(prompt);
                return (
                  <li key={prompt}>
                    <button
                      type="button"
                      onClick={() => togglePrompt(prompt)}
                      aria-pressed={used}
                      className="contact-prompt flex w-full items-start gap-2.5 rounded-xl px-3.5 py-3 text-left text-sm font-medium"
                    >
                      {used ? (
                        <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                      ) : (
                        <Plus aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                      )}
                      <span>{prompt}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>
        </div>
      </section>

      <section aria-labelledby="contact-direct-title" className="contact-step flex flex-col gap-5">
        <h2 id="contact-direct-title" className="sr-only">
          Other ways to reach me
        </h2>
        {/* Two crossed 3D ribbons drifting left to right: the title on a dark
            band in front, the three channels on an amber band behind it. */}
        <div aria-hidden="true" className="contact-ribbons">
          <div className="contact-ribbon contact-ribbon-back">
            <div className="contact-ribbon-track">
              {Array.from({ length: 2 }, (_, copy) => (
                <span key={copy} className="contact-ribbon-run">
                  {Array.from({ length: 4 }, (_, index) => (
                    <span key={index} className="contact-ribbon-item">
                      Email <i>•</i> LinkedIn <i>•</i> GitHub <i>•</i>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
          <div className="contact-ribbon contact-ribbon-front">
            <div className="contact-ribbon-track">
              {Array.from({ length: 2 }, (_, copy) => (
                <span key={copy} className="contact-ribbon-run">
                  {Array.from({ length: 4 }, (_, index) => (
                    <span key={index} className="contact-ribbon-item">
                      Other ways to reach me <i>✦</i>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>
        <p className="contact-muted text-sm sm:text-base">Not a form person? Find me here.</p>
        {/* One box, three 3D cards. Each tilts toward the pointer; the chosen
            one pops out and opens in a new tab. */}
        <div ref={setAnchor("reach")} className="contact-card rounded-3xl p-2.5 sm:p-3">
          <ul className="contact-reach3d-grid grid gap-2.5 sm:grid-cols-3 sm:gap-3">
            {DIRECT_LINKS.map((link, index) => (
              <li key={link.label} className="contact-reach3d-cell relative">
                <ReachCard
                  link={link}
                  index={index}
                  popped={popped === link.label}
                  onOpen={() => popLink(link.label)}
                />
                {link.label === "Email" && (
                  <button
                    type="button"
                    onClick={() => void copyEmail()}
                    className="contact-app-copy absolute right-14 top-1/2 z-10 inline-flex -translate-y-1/2 sm:right-3 sm:top-3 sm:translate-y-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold"
                  >
                    <Copy aria-hidden="true" className="size-3" />
                    Copy
                    <span className="sr-only"> email address</span>
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

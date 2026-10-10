import Link from "next/link";
import { ExpressJsIcon, Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";
import { ReactLight } from "@/components/icons/svgs/reactLight";
import { NextjsIconDark } from "@/components/icons/svgs/nextjsIconDark";
import { Typescript } from "@/components/icons/svgs/typescript";
import { Nodejs } from "@/components/icons/svgs/nodejs";
import { Python } from "@/components/icons/svgs/python";
import { Postgresql } from "@/components/icons/svgs/postgresql";
import { Docker } from "@/components/icons/svgs/docker";
import { Kubernetes } from "@/components/icons/svgs/kubernetes";
import { Java } from "@/components/icons/svgs/java";
// import { Csharp } from "@/components/icons/svgs/csharp";

const summaryLinkClassName =
  "underline underline-offset-4 transition-colors duration-200 hover:text-foreground cursor-pointer";

export const DATA = {
  name: "Puspa Shukla",
  initials: "PS",
  location: "Kathmandu, Nepal",
  locationLink: "https://www.google.com/maps/place/Kathmandu/",
  description: "BCA student | IT Support, Systems Administration & Web Development",
  professionalSummary:
    "I’m a BCA student at CAMAD College, affiliated with Pokhara University, learning through web projects and hands-on IT systems support. Through U-GO, I’ve helped lead AI learning initiatives for scholars; its global publication reported a 97% course completion rate across more than 3,000 scholars in eight countries. I enjoy sharing what I learn, mentoring others, and helping more women find opportunities in technology.",
  summary:
    "I’m a BCA student at CAMAD College, affiliated with Pokhara University, learning through web projects and hands-on IT systems support. Through U-GO, I’ve helped lead AI learning initiatives for scholars; its global publication reported a 97% course completion rate across more than 3,000 scholars in eight countries. I enjoy sharing what I learn, mentoring others, and helping more women find opportunities in technology.",
  avatarUrl: "/puspa-profile.png",
  skillGroups: [
    { label: "Programming Languages", items: "Python, HTML, CSS, JavaScript, C" },
    { label: "Development Tools", items: "Git, GitHub, VS Code, Substack" },
    { label: "Leadership & Team Management", items: "Led U-GO Nepal scholars; coordinated college and extracurricular teams" },
    { label: "Communication & Public Speaking", items: "Hosted programs and engaged international participants at global summits" },
    { label: "Teaching & Mentoring", items: "Guided students in Biological Science and AI fundamentals" },
  ],
  skills: [
    { name: "Python", icon: undefined },
    { name: "HTML", icon: undefined },
    { name: "CSS", icon: undefined },
    { name: "JavaScript", icon: undefined },
    { name: "C", icon: undefined },
    { name: "Git", icon: Icons.git },
    { name: "GitHub", icon: Icons.github },
    { name: "VS Code", icon: undefined },
    { name: "Substack", icon: undefined },
    { name: "Windows & Windows Server", icon: undefined },
    { name: "Active Directory & Group Policy", icon: undefined },
    { name: "Microsoft 365, Exchange, SharePoint & Teams", icon: undefined },
    { name: "TCP/IP, DHCP, DNS & VPN", icon: undefined },
    { name: "Hyper-V & VMware", icon: undefined },
    { name: "Intune, RMM & MDM", icon: undefined },
    { name: "Azure & AWS fundamentals", icon: undefined },
    { name: "IT ticketing & SLA management", icon: undefined },
    { name: "Leadership & Team Management", icon: undefined },
    { name: "Communication & Public Speaking", icon: undefined },
    { name: "Teaching & Mentoring", icon: undefined },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "puspashukla321@gmail.com",
    tel: "+9779764601918",
    social: {
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/puspa-shukla-20b256287/",
        icon: Icons.linkedin,
        navbar: true,
      },
      GitHub: {
        name: "GitHub",
        url: "https://github.com/puspashukla321-web",
        icon: Icons.github,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/PShukla95269",
        icon: Icons.x,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:puspashukla321@gmail.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },
  work: [
    {
      company: "TechSkills Institute",
      companyUrl: "https://techskills.institute/",
      badges: [],
      location: "",
      title: "Technical Hands-on Experience · IT Support & Systems Administration",
      logoUrl: "/education/techskills-logo.png",
      start: "",
      end: "",
      work: [
        "Supported end users across Windows and Windows Server environments, including Active Directory, Group Policy, Microsoft 365, Exchange, SharePoint, Teams, and Intune.",
        "Worked with TCP/IP, DHCP, DNS, VPNs, routers, switches, Wi-Fi, Hyper-V, VMware, file servers, and NTFS permissions.",
        "Gained hands-on experience with backup and disaster recovery, RMM/MDM tools, Azure and AWS fundamentals, IT ticketing, SLA management, and remote and hardware-based troubleshooting.",
      ],
      impact: [],
      tools: [
        "Windows & Windows Server",
        "Active Directory & Group Policy",
        "Microsoft 365, Exchange, SharePoint & Teams",
        "TCP/IP, DHCP, DNS & VPN",
        "Hyper-V & VMware",
        "Intune, RMM & MDM",
        "Git",
        "GitHub",
      ],
      urls: [] as { label: string; href: string }[],
    },
    {
      company: "U-GO Nepal",
      companyUrl: "https://ugonepal.org/",
      badges: ["Internship"],
      location: "Nepal",
      title: "Intern",
      logoUrl: "/education/ugo-nepal-logo.jpeg",
      start: "",
      end: "",
      work: [
        "Supported 400+ scholars through practical training in AI tools, digital platforms, resume building, LinkedIn profile optimization, and portfolio development. Facilitated monthly online conferences to encourage engagement, learning, and professional growth.",
        "Conducted scholarship applicant interviews to understand backgrounds and educational needs; maintained scholar records in Google Sheets and Excel; supported document management and incoming calls; and contributed digital banners for organizational communication.",
        "Collaborated with instructors, mentors, and partners in the USA, Australia, the UK, and other countries, building cross-cultural communication, teamwork, and international relationship-building skills while contributing to expanded educational opportunities for women.",
      ],
      impact: [],
      tools: [
        "ChatGPT",
        "Claude",
        "NotebookLM",
        "Perplexity",
        "Replit",
        "Lovable",
        "Zoom",
        "Google Meet",
        "Microsoft Word",
        "Microsoft Excel",
        "Google Sheets",
        "Computers",
        "Printers",
        "Digital document management",
        "Social media design tools",
      ],
      urls: [] as { label: string; href: string }[],
    },
  ],
  education: [
    {
      school: "CAMAD College",
      href: "https://www.camadcollege.edu.np/",
      logoUrl: "/education/camad-college.jpg",
      start: "2024",
      end: "2028",
      program: "Bachelor in Computer Application",
      specialization: "BCA.IT",
      details: [
        "Pursuing a Bachelor of Computer Application at CAMAD College, affiliated with Pokhara University.",
        "Cumulative CGPA: 3.60.",
      ],
      highlights: ["U-GO Scholarship recipient."],
    },
    {
      school: "Everest Florida High School",
      href: "https://everestflorida.edu.np/introduction/",
      logoUrl: "/education/florida.png",
      start: "2022",
      end: "2024",
      program: "Higher Secondary Education",
      specialization: "Science",
      details: [
        "Cumulative CGPA: 3.55.",
        "Full-tuition scholarship based on college entrance examination.",
      ],
    },
  ],
  projects: [
    {
      title: "Currency Converter",
      href: "https://puspashukla321-web.github.io/CurrencyConverter/?From=USD&from=NPR",
      dates: "Web project",
      active: true,
      description:
        "Built a real-time currency conversion tool with input validation and a responsive interface.",
      technologies: ["HTML", "CSS", "JavaScript"],
      links: [
        {
          icon: <Icons.globe className="size-3.5" />,
          type: "Live Demo",
          href: "https://puspashukla321-web.github.io/CurrencyConverter/?From=USD&from=NPR",
        },
        {
          icon: <Icons.github className="size-3.5" />,
          type: "View Source",
          href: "https://github.com/puspashukla321-web/CurrencyConverter",
        },
      ],
      image: "/currency-converter.png",
      video: "",
    },
    {
      title: "Tic Tac Toe Game",
      href: "https://puspashukla321-web.github.io/TicTacToe/",
      dates: "Web project",
      active: true,
      description:
        "Created a two-player JavaScript game with win/draw detection and CSS-based visual feedback.",
      technologies: ["JavaScript", "CSS"],
      links: [
        {
          icon: <Icons.globe className="size-3.5" />,
          type: "Live Demo",
          href: "https://puspashukla321-web.github.io/TicTacToe/",
        },
        {
          icon: <Icons.github className="size-3.5" />,
          type: "View Source",
          href: "https://github.com/puspashukla321-web/TicTacToe",
        },
      ],
      image: "/tic-tac-toe.png",
      video: "",
    },
    {
      title: "Rock, Paper, Scissors Game",
      href: "https://puspashukla321-web.github.io/ScissorPaperRock/",
      dates: "Web project",
      active: true,
      description:
        "Developed a player-versus-computer game with randomized logic, winner detection, and a dynamic score display.",
      technologies: ["JavaScript", "CSS"],
      links: [
        {
          icon: <Icons.globe className="size-3.5" />,
          type: "Live Demo",
          href: "https://puspashukla321-web.github.io/ScissorPaperRock/",
        },
        {
          icon: <Icons.github className="size-3.5" />,
          type: "View Source",
          href: "https://github.com/puspashukla321-web/ScissorPaperRock",
        },
      ],
      image: "/scissor-paper-rock.png",
      video: "",
    },
    {
      title: "Route Way System",
      href: "http://localhost:3000/",
      dates: "Web project",
      active: true,
      description:
        "Designed a route-planning application that calculates efficient paths between locations using graph-based algorithms, with a focus on clean logic and usable output.",
      technologies: ["JavaScript", "Algorithms"],
      links: [
        {
          icon: <Icons.globe className="size-3.5" />,
          type: "Live Demo",
          href: "http://localhost:3000/",
        },
        {
          icon: <Icons.github className="size-3.5" />,
          type: "View Source",
          href: "https://github.com/puspashukla321-web/RouteWay-System",
        },
      ],
      image: "/routeway-system.png",
      video: "",
    },
  ],
  hackathonsAndEvents: [
    {
      title: "The Ripple Effect: U-GO Global Publication",
      dates: "2025",
      location: "International recognition",
      description:
        "Featured as a standout scholar for pioneering AI training among scholars and driving a 97% AI-course completion rate across 3,000+ scholars in eight countries.",
      image: "/ugo-ripple-effect-article.jpeg",
      links: [] as { label: string; href: string }[],
    },
    {
      title: "U-GO Nepal Representative",
      dates: "2025",
      location: "Global",
      description:
        "Represented Nepali scholars and attended the U-GO Global Summit in Vietnam, engaging in international collaboration and networking.",
      image: "/ugo-nepal-vietnam.jpg",
      links: [
        {
          label: "Read how I represented Nepal in Vietnam",
          href: "https://ugonepal.org/u-go-nepal-scholars-represent-nepal-at-the-2025-u-go-ambassador-program-in-vietnam/",
        },
      ] as { label: string; href: string }[],
    },
    {
      title: "Top 6 Finalist | TechSkills Nepal IT Scholarship Program",
      dates: "2025",
      location: "TechSkills Nepal IT Scholarship Program",
      description:
        "From 2,000+ applicants to the Grand Finale stage, Puspa’s journey reflects confidence, dedication, learning, and continuous growth.",
      image: "/techskills-working.jpg",
      links: [
        {
          label: "Read the Banking Samachar feature",
          href: "https://bankingsamachar.com/news/133050/",
        },
      ] as { label: string; href: string }[],
    },
    {
      title: "NASA Space Apps Challenge",
      dates: "2024",
      location: "International hackathon",
      description:
        "Participated in the NASA Space Apps Challenge, collaborating on technology-driven solutions for space and Earth sciences.",
      image: "/nasa-space-apps-team.jpeg",
      links: [] as { label: string; href: string }[],
    },
    {
      title: "U-GO AI Workshops & Advanced Courses",
      dates: "",
      location: "AI learning and mentoring",
      description:
        "Certified in U-GO AI workshops and advanced courses; helped students build practical foundations in AI.",
      image: "",
      links: [] as { label: string; href: string }[],
    },
  ],
} as const;

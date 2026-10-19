// Single source of truth for all copy, links, and flags.

export const SITE = "https://mihirsinhchavda.com";

export const AVAILABLE_FOR_WORK = true; // flip to false to hide the badge

export const EMAIL = "mihhhir08@gmail.com";

export const gmailCompose = (subject: string) =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${encodeURIComponent(subject)}`;

export const SOCIALS = {
  github: "https://github.com/mihhhir08",
  x: "https://x.com/mihirrr_08",
  linkedin: "https://www.linkedin.com/in/mihirsinh-chavda-7115b922b/",
} as const;

export const NAME = "Mihir";

export const ROLES = [
  "Software Engineer",
  "AI Engineer",
  "Builder of things that ship",
] as const;

// Rendered in HeroCard with inline icon chips for each tech name.
export const HERO_STACK = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
] as const;

export type ProjectStatus = "live" | "building" | "archived";

export type Project = {
  name: string;
  blurb: string;
  href: string;
  status: ProjectStatus;
  repo?: string; // owner/name — omit for closed source (no star badge)
  metric?: string; // traction, shown as a pill on the thumbnail — keep it short and true
  thumb: string;
  tags: string[];
  extraLinks?: { label: string; href: string }[];
};

export const PROJECTS: Project[] = [
  {
    name: "Sourcemap",
    blurb:
      "AI can write the code. It can't supervise it. A free 90-day path through software engineering, system design, and AI engineering, 358 concepts against 286 checked sources, built for reading systems instead of just shipping them.",
    href: "https://sourcemap.co/",
    status: "live",
    metric: "300+ daily users",
    thumb: "/previews/sourcemap.jpg",
    tags: ["Next.js", "Supabase", "Spaced repetition"],
  },
  {
    name: "High Council",
    blurb:
      "Two approvals and no signal is not a decision. High Council convenes a bench of adversarial agents on any question, blinds each seat to what you hoped to hear, checks every claim against your repo, and returns one committed verdict with the strongest case against it attached.",
    href: "https://high-council.vercel.app",
    status: "live",
    repo: "mihhhir08/high-council",
    thumb: "/previews/high-council.jpg",
    tags: ["Claude", "Multi-agent", "Plugin"],
  },
  {
    name: "rewind",
    blurb:
      "Every bug has a birthplace. rewind takes you back to it, replaying any LLM-agent run byte-exact, offline, $0.",
    href: "https://rewind-beta.vercel.app",
    status: "live",
    repo: "mihhhir08/rewind",
    thumb: "/previews/rewind.jpg",
    tags: ["TypeScript", "SQLite", "SDK internals"],
    extraLinks: [
      {
        label: "design decisions",
        href: "https://github.com/mihhhir08/rewind/blob/main/DECISIONS.md",
      },
    ],
  },
  {
    name: "Shotframe",
    blurb:
      "A screenshot is the first thing anyone sees of your work. Shotframe frames, annotates and animates one entirely in the browser — wallpapers, device frames, 3D tilt, and MP4 export — without a pixel ever leaving the device.",
    href: "https://shotframe-wheat.vercel.app",
    status: "live",
    thumb: "/previews/shotframe.jpg",
    tags: ["TypeScript", "React", "Canvas"],
  },
  {
    name: "Boostlane",
    blurb:
      "A founder's voice, distributed at scale. A multi-stage LLM pipeline that learns how you write, then writes as you.",
    href: "https://useboostlane.com",
    status: "live",
    metric: "50+ users",
    thumb: "/previews/boostlane.jpg",
    tags: ["Next.js", "LLM pipeline", "Embeddings"],
  },
  {
    name: "Continuity",
    blurb:
      "A breaking change is an incident you scheduled in advance. Continuity predicts what a release will break, repairs it inside your own environment, then proves it safe before ship.",
    href: "https://continuity-eight.vercel.app",
    status: "building",
    repo: "mihhhir08/continuity",
    thumb: "/previews/continuity.jpg",
    tags: ["TypeScript", "MCP", "Rust"],
    extraLinks: [
      {
        label: "architecture",
        href: "https://github.com/mihhhir08/continuity/blob/main/ARCHITECTURE.md",
      },
    ],
  },
  {
    name: "Earnings Delta",
    blurb:
      "The numbers move; the reason is the hard part. An evidence-first workspace that ranks what materially changed between earnings periods and keeps every claim tied to its calculation.",
    href: "https://earnings-delta.vercel.app",
    status: "live",
    repo: "mihhhir08/earnings-delta",
    thumb: "/previews/earnings-delta.jpg",
    tags: ["Next.js", "Three.js", "Financial modeling"],
  },
  {
    name: "x-algorithm, explained",
    blurb:
      "xAI open-sourced the For You feed and almost nobody read it. A hand-drawn technical zine that gets you to an accurate mental model in five minutes, real weights intact.",
    href: "https://x-algorithm-explained-ten.vercel.app",
    status: "live",
    repo: "mihhhir08/x-algorithm-explained",
    thumb: "/previews/x-algorithm.jpg",
    tags: ["Next.js", "Recommender systems", "Editorial design"],
  },
  {
    name: "AgentLens",
    blurb:
      "You can't trust what you can't see. Open-source observability for AI coding agents, a local CLI that renders everything the agent did as one HTML audit.",
    href: "https://agent-lens-azure.vercel.app",
    status: "live",
    repo: "mihhhir08/AgentLens",
    thumb: "/previews/agentlens.jpg",
    tags: ["TypeScript", "Git internals", "CLI"],
  },
  {
    name: "cupel",
    blurb:
      "You have never read what your agent loads. One local command that assays every skill, plugin, and MCP server on your machine, grading what it costs, what it can reach, and whether it works.",
    href: "https://mihhhir08.github.io/cupel/",
    status: "building",
    repo: "mihhhir08/cupel",
    thumb: "/previews/cupel.jpg",
    tags: ["TypeScript", "MCP", "Static analysis"],
  },
];


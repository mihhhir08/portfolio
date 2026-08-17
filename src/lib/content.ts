// Single source of truth for all copy, links, and flags.

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
  thumb: string;
  tags: string[];
  extraLinks?: { label: string; href: string }[];
};

export const PROJECTS: Project[] = [
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
    name: "Boostlane",
    blurb:
      "A founder's voice, distributed at scale. A multi-stage LLM pipeline that learns how you write, then writes as you. 50+ users.",
    href: "https://useboostlane.com",
    status: "live",
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
    href: "https://github.com/mihhhir08/AgentLens",
    status: "live",
    repo: "mihhhir08/AgentLens",
    thumb: "/previews/agentlens.jpg",
    tags: ["TypeScript", "Git internals", "CLI"],
  },
  {
    name: "shiplog",
    blurb:
      "Your git history is already the story. shiplog turns it into a build-in-public update, zero config. On npm.",
    href: "https://github.com/mihhhir08/shiplog",
    status: "live",
    repo: "mihhhir08/shiplog",
    thumb: "/previews/shiplog.jpg",
    tags: ["TypeScript", "Commander", "npm"],
  },
];


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
  "Full-Stack Developer",
] as const;

export const HERO_SUB =
  "I build production-ready web and AI products end to end, from semantic-search backends to open-source agent tooling. Currently building dev tools for the LLM era.";

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
      "Deterministic record/replay debugger for LLM agents. Replay any run byte-exact, offline, $0.",
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
      "Distribution engine for founders. A multi-stage LLM pipeline that learns each user's voice. 50+ users.",
    href: "https://useboostlane.com",
    status: "live",
    thumb: "/previews/boostlane.jpg",
    tags: ["Next.js", "LLM pipeline", "Embeddings"],
  },
  {
    name: "AgentLens",
    blurb:
      "Open-source observability for AI coding agents. Local CLI, HTML audit report of everything the agent did.",
    href: "https://github.com/mihhhir08/AgentLens",
    status: "live",
    repo: "mihhhir08/AgentLens",
    thumb: "/previews/agentlens.jpg",
    tags: ["TypeScript", "Git internals", "CLI"],
  },
  {
    name: "shiplog",
    blurb:
      "Zero-config CLI that turns git history into a build-in-public update. On npm.",
    href: "https://github.com/mihhhir08/shiplog",
    status: "live",
    repo: "mihhhir08/shiplog",
    thumb: "/previews/shiplog.jpg",
    tags: ["TypeScript", "Commander", "npm"],
  },
];


import { SocialGlyph } from "@/components/icons/Social";
import { AVAILABLE_FOR_WORK, SOCIALS, gmailCompose } from "@/lib/content";

// Each row names the door and what it's for, so a recruiter, a founder, and
// someone who just liked a project don't all guess at the same one.
const ROUTES = [
  {
    kind: "mail",
    title: "Drop me a mail",
    subtitle: "Roles, projects, or a quick question",
    href: gmailCompose("Hey Mihir, let's build something"),
    track: "email",
  },
  {
    kind: "linkedin",
    title: "Connect on LinkedIn",
    subtitle: "Recruiters and formal intros",
    href: SOCIALS.linkedin,
    track: "social",
  },
  {
    kind: "x",
    title: "Find me on X",
    subtitle: "Quick DMs and what I'm building",
    href: SOCIALS.x,
    track: "social",
  },
  {
    kind: "github",
    title: "Browse the GitHub",
    subtitle: "The code behind the projects",
    href: SOCIALS.github,
    track: "social",
  },
] as const;

export default function ContactCard() {
  return (
    <div className="flex h-full flex-col gap-6">
      <div>
        <p className="font-mono text-xs tracking-widest text-muted uppercase">
          the signal
        </p>
        <h2 className="mt-4 font-display text-2xl font-semibold">
          Every great build starts with a message.
        </h2>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {ROUTES.map((route) => (
          <a
            key={route.title}
            href={route.href}
            data-track={route.track}
            data-track-detail={route.kind}
            target="_blank"
            rel="noopener noreferrer"
            className="group/row flex items-center gap-3 rounded-xl border border-hairline-bright bg-surface px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          >
            <span className="text-muted transition-colors group-hover/row:text-accent">
              <SocialGlyph kind={route.kind} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium text-fg">
                {route.title}
              </span>
              <span className="block text-xs text-muted">
                {route.subtitle}
              </span>
            </span>
            <span
              aria-hidden="true"
              className="text-muted transition-transform duration-200 group-hover/row:translate-x-0.5 group-hover/row:text-accent"
            >
              →
            </span>
          </a>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted">
        <span className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-1.5 w-1.5 animate-ping rounded-full bg-status opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-status" />
          </span>
          Replies within a day
        </span>
        {AVAILABLE_FOR_WORK && <span>Open to full-time and freelance work</span>}
      </div>
    </div>
  );
}

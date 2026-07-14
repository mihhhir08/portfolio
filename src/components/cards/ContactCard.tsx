import CopyEmail from "@/components/CopyEmail";
import { SocialIcon } from "@/components/icons/Social";
import { SOCIALS, gmailCompose } from "@/lib/content";

export default function ContactCard() {
  return (
    <div className="flex h-full flex-col justify-between gap-6">
      <div>
        <p className="font-mono text-xs tracking-widest text-muted uppercase">
          contact
        </p>
        <h2 className="mt-4 font-display text-2xl font-semibold">
          Let&apos;s build something.
        </h2>
      </div>
      <div className="space-y-4">
        <CopyEmail />
        <div className="flex items-center gap-4">
          <a
            href={gmailCompose("Hey Mihir — let's build something")}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-fg px-4 py-1.5 text-sm font-medium text-bg transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            Let&apos;s connect →
          </a>
          <SocialIcon kind="github" href={SOCIALS.github} label="GitHub" />
          <SocialIcon kind="x" href={SOCIALS.x} label="X" />
          <SocialIcon kind="linkedin" href={SOCIALS.linkedin} label="LinkedIn" />
        </div>
      </div>
    </div>
  );
}

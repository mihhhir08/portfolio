import { PrimaryButton } from "@/components/Buttons";
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
      <div className="flex flex-wrap items-center gap-4">
        <PrimaryButton href={gmailCompose("Hey Mihir, let's build something")}>
          Drop me a mail
        </PrimaryButton>
        <SocialIcon kind="github" href={SOCIALS.github} label="GitHub" />
        <SocialIcon kind="x" href={SOCIALS.x} label="X" />
        <SocialIcon kind="linkedin" href={SOCIALS.linkedin} label="LinkedIn" />
      </div>
    </div>
  );
}

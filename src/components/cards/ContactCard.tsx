import { PrimaryButton } from "@/components/Buttons";
import DecryptReveal from "@/components/DecryptReveal";
import { SocialIcon } from "@/components/icons/Social";
import { SOCIALS, gmailCompose } from "@/lib/content";

export default function ContactCard() {
  return (
    // The veil covers the whole card, so it bleeds back out through BentoCard's
    // p-6 (-m-6 plus the matching height) and re-applies the padding inside.
    // The cipher is decoration on a pointer-events-none canvas: the button and
    // the social links underneath stay clickable and focusable throughout.
    <DecryptReveal
      className="-m-6 h-[calc(100%+3rem)] p-6"
      radius={230}
      cell={8}
      softness={0.55}
      colored={0.15}
      scramble={0.12}
      scrambleSpeed={5}
      edgeGlow={2}
      edgeTint={0.85}
      // the replica carries no page behind the cipher to bleed through, so any
      // passthrough would only darken the veil away from the card color
      passthrough={0}
      smoothing={0.14}
    >
      <div className="flex h-full flex-col justify-between gap-6">
        <div>
          <p className="font-mono text-xs tracking-widest text-muted uppercase">
            the signal
          </p>
          <h2 className="mt-4 font-display text-2xl font-semibold">
            Every great build starts with a message.
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <PrimaryButton
            href={gmailCompose("Hey Mihir, let's build something")}
            track="email"
          >
            Drop me a mail
          </PrimaryButton>
          <SocialIcon kind="github" href={SOCIALS.github} label="GitHub" />
          <SocialIcon kind="x" href={SOCIALS.x} label="X" />
          <SocialIcon kind="linkedin" href={SOCIALS.linkedin} label="LinkedIn" />
        </div>
      </div>
    </DecryptReveal>
  );
}

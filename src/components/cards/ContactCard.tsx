import { PrimaryButton } from "@/components/Buttons";
import DecryptReveal from "@/components/DecryptReveal";
import { SocialIcon } from "@/components/icons/Social";
import { SOCIALS, gmailCompose } from "@/lib/content";

export default function ContactCard() {
  return (
    <div className="flex h-full flex-col justify-between gap-6">
      {/* Only the heading is veiled. The CTA row below stays plain — burying
          "drop me a mail" under a cipher until someone hovers costs more than
          the effect is worth. */}
      <DecryptReveal
        radius={170}
        cell={8}
        softness={0.55}
        colored={0.15}
        scramble={0.12}
        scrambleSpeed={5}
        edgeGlow={2}
        edgeTint={0.85}
        // the replica only carries text, so there is no UI behind the cipher
        // to bleed through; any passthrough just darkens the veil off-card
        passthrough={0}
        smoothing={0.14}
      >
        <p className="font-mono text-xs tracking-widest text-muted uppercase">
          the signal
        </p>
        <h2 className="mt-4 font-display text-2xl font-semibold">
          Every great build starts with a message.
        </h2>
      </DecryptReveal>
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
  );
}

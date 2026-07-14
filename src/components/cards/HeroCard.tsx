"use client";

import { motion } from "motion/react";
import { Download } from "lucide-react";
import { useReady } from "@/components/Preloader";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import { SocialIcon } from "@/components/icons/Social";
import { HEADLINE, SOCIALS, gmailCompose } from "@/lib/content";

export default function HeroCard() {
  const ready = useReady();

  return (
    <div className="flex h-full flex-col justify-between gap-6">
      <div>
        <p className="font-mono text-xs tracking-widest text-muted uppercase">
          software engineer · ai
        </p>
        <h1 className="mt-4 font-display text-4xl leading-[1.05] font-semibold md:text-5xl">
          {HEADLINE.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className="entrance block"
                initial={{ y: "110%" }}
                animate={ready ? { y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: i * 0.09,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
          From semantic-search backends to open-source agent tooling. Currently{" "}
          <a
            href={SOCIALS.x}
            target="_blank"
            rel="noopener noreferrer"
            className="link-slide text-accent"
          >
            building dev tools for the LLM era
          </a>
        </p>
        <div className="mt-6">
          <AvailabilityBadge />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <a
          href={gmailCompose("Hey Mihir — saw your portfolio")}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-fg px-5 py-2 text-sm font-medium text-bg transition-transform hover:scale-[1.03] active:scale-[0.98]"
        >
          Let&apos;s connect →
        </a>
        <a
          href="/resume.pdf"
          download
          className="inline-flex items-center gap-2 rounded-full border border-hairline px-4 py-2 text-sm text-muted transition-colors hover:border-hairline-bright hover:text-fg"
        >
          <Download size={14} />
          Resume
        </a>
        <span className="flex items-center gap-4 pl-1">
          <SocialIcon kind="github" href={SOCIALS.github} label="GitHub" />
          <SocialIcon kind="x" href={SOCIALS.x} label="X" />
          <SocialIcon kind="linkedin" href={SOCIALS.linkedin} label="LinkedIn" />
        </span>
      </div>
    </div>
  );
}

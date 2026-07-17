"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Download } from "lucide-react";
import { useReady } from "@/components/Preloader";
import RotatingRoles from "@/components/RotatingRoles";
import ThemeToggle from "@/components/ThemeToggle";
import { SocialIcon } from "@/components/icons/Social";
import { PrimaryButton, SecondaryButton } from "@/components/Buttons";
import Magnetic from "@/components/Magnetic";
import {
  AVAILABLE_FOR_WORK,
  HERO_SUB,
  NAME,
  SOCIALS,
  gmailCompose,
} from "@/lib/content";

export default function HeroCard() {
  const ready = useReady();

  return (
    <div className="flex h-full flex-col gap-8">
      {/* top row — identity strip inside the box */}
      <div className="flex items-center justify-between">
        <span className="font-display text-base font-semibold tracking-tight">
          Mihirsinh Chavda
        </span>
        <div className="flex items-center gap-3">
          {AVAILABLE_FOR_WORK && (
            <span className="flex items-center gap-2 text-sm font-medium whitespace-nowrap text-status">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-status opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-status" />
              </span>
              Available for work
            </span>
          )}
          <ThemeToggle />
        </div>
      </div>

      {/* main row — intro left, portrait right */}
      <div className="flex flex-col-reverse items-start gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <span className="block overflow-hidden">
            <motion.h1
              className="entrance font-display text-4xl leading-tight font-semibold tracking-tight md:text-5xl"
              initial={{ y: "110%" }}
              animate={ready ? { y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              Hi, I&apos;m {NAME}
            </motion.h1>
          </span>
          <p className="mt-2 font-display text-2xl font-medium md:text-3xl">
            <RotatingRoles />
          </p>
          <p className="mt-5 text-sm leading-relaxed text-muted md:text-base">
            {HERO_SUB.split("the test that catches the real bug")[0]}
            <span className="text-accent">
              the test that catches the real bug
            </span>
            .
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Magnetic>
              <PrimaryButton href={gmailCompose("Hey Mihir, saw your portfolio")}>
                Drop me a mail
              </PrimaryButton>
            </Magnetic>
            <SecondaryButton href="/resume.pdf" download>
              <Download size={14} />
              Resume
            </SecondaryButton>
            {/* wraps below the buttons on mobile; ml-5 lines the first icon
                up with the "Let's connect" label, which sits px-5 inside its
                pill — flush ml-1 reads as misaligned once wrapped */}
            <span className="ml-5 flex items-center gap-4 md:ml-1">
              <SocialIcon kind="github" href={SOCIALS.github} label="GitHub" />
              <SocialIcon kind="x" href={SOCIALS.x} label="X" />
              <SocialIcon
                kind="linkedin"
                href={SOCIALS.linkedin}
                label="LinkedIn"
              />
            </span>
          </div>
        </div>

        {/* portrait — inset frame-in-frame */}
        <div className="group/photo relative mx-auto h-48 w-48 shrink-0 md:mx-0 md:mr-4 md:h-64 md:w-64">
          <svg
            viewBox="0 0 200 200"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full animate-[spin_22s_linear_infinite] transition-opacity duration-300 group-hover/photo:opacity-40 motion-reduce:animate-none"
          >
            <defs>
              <path
                id="orbit-path"
                d="M100,100 m-92,0 a92,92 0 1,1 184,0 a92,92 0 1,1 -184,0"
              />
            </defs>
            <text className="fill-muted/60 font-mono text-[10.5px] tracking-[2.5px]">
              <textPath
                href="#orbit-path"
                textLength="570"
                lengthAdjust="spacing"
              >
                SOFTWARE ENGINEER · AI · OPEN SOURCE ·
              </textPath>
            </text>
          </svg>
          <div className="absolute inset-6 rounded-full border border-hairline p-1.5 transition-colors duration-300 group-hover/photo:border-accent/50">
            <div className="relative h-full w-full overflow-hidden rounded-full border border-hairline-bright">
              <Image
                src="/photo.jpg"
                alt="Mihirsinh Chavda"
                fill
                sizes="256px"
                priority
                className="object-cover transition-transform duration-500 ease-out group-hover/photo:scale-110"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import StatusDot from "@/components/StatusDot";
import TechTag from "@/components/TechTag";
import { fetchStars } from "@/lib/stars";
import type { Project } from "@/lib/content";

export default function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    if (project.repo) fetchStars(project.repo).then(setStars);
  }, [project.repo]);

  return (
    <div
      className={`group/card flex h-full flex-col ${
        featured ? "md:flex-row md:items-center md:gap-8" : ""
      }`}
    >
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`relative block overflow-hidden rounded-lg border border-hairline ${
          featured ? "md:w-[56%] md:shrink-0" : ""
        }`}
      >
        <Image
          src={project.thumb}
          alt={`${project.name} preview`}
          width={720}
          height={450}
          // The featured card is the only project above the fold.
          loading={featured ? "eager" : "lazy"}
          priority={featured}
          sizes={featured ? "(min-width: 768px) 56vw, 100vw" : "(min-width: 768px) 50vw, 100vw"}
          className="w-full transition-transform duration-500 ease-out group-hover/card:scale-[1.03]"
        />
        {stars !== null && stars > 0 && (
          <span className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-full border border-hairline bg-bg/80 px-2 py-0.5 font-mono text-[10px] backdrop-blur">
            <Star size={9} className="fill-current" />
            {stars}
          </span>
        )}
      </a>
      <div className={`flex flex-1 flex-col ${featured ? "mt-4 md:mt-0" : "mt-4"}`}>
      <div className="flex items-center justify-between">
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`font-display font-semibold hover:text-accent transition-colors ${
            featured ? "text-lg md:text-2xl" : "text-lg"
          }`}
        >
          {project.name}
        </a>
        <StatusDot status={project.status} />
      </div>
      <p
        className={`mt-1 flex-1 leading-relaxed text-muted ${
          featured ? "text-sm md:text-base" : "text-sm"
        }`}
      >
        {project.blurb}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-1.5">
        {project.tags.map((t) => (
          <TechTag key={t} name={t} />
        ))}
      </div>
      <div className="mt-3 flex gap-4 font-mono text-xs">
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="link-slide group/lnk inline-flex items-center gap-0.5 text-muted transition-colors hover:text-fg"
        >
          visit <span className="inline-block transition-transform duration-200 group-hover/lnk:translate-x-0.5 group-hover/lnk:-translate-y-0.5">↗</span>
        </a>
        {project.repo && (
          <a
            href={`https://github.com/${project.repo}`}
            target="_blank"
            rel="noopener noreferrer"
            className="link-slide group/lnk inline-flex items-center gap-0.5 text-muted transition-colors hover:text-fg"
          >
            source <span className="inline-block transition-transform duration-200 group-hover/lnk:translate-x-0.5 group-hover/lnk:-translate-y-0.5">↗</span>
          </a>
        )}
        {project.extraLinks?.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="link-slide group/lnk inline-flex items-center gap-0.5 text-muted transition-colors hover:text-fg"
          >
            {l.label}{" "}
            <span className="inline-block transition-transform duration-200 group-hover/lnk:translate-x-0.5 group-hover/lnk:-translate-y-0.5">
              ↗
            </span>
          </a>
        ))}
      </div>
      </div>
    </div>
  );
}

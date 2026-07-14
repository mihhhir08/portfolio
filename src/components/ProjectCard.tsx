"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import StatusDot from "@/components/StatusDot";
import TechTag from "@/components/TechTag";
import { fetchStars } from "@/lib/stars";
import type { Project } from "@/lib/content";

export default function ProjectCard({ project }: { project: Project }) {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    if (project.repo) fetchStars(project.repo).then(setStars);
  }, [project.repo]);

  return (
    <div className="group/card flex h-full flex-col">
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block overflow-hidden rounded-lg border border-hairline"
      >
        <Image
          src={project.thumb}
          alt={`${project.name} preview`}
          width={720}
          height={450}
          loading="lazy"
          className="w-full transition-transform duration-500 ease-out group-hover/card:scale-[1.03]"
        />
        {stars !== null && stars > 0 && (
          <span className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-full border border-hairline bg-bg/80 px-2 py-0.5 font-mono text-[10px] backdrop-blur">
            <Star size={9} className="fill-current" />
            {stars}
          </span>
        )}
      </a>
      <div className="mt-4 flex items-center justify-between">
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-display text-lg font-semibold hover:text-accent transition-colors"
        >
          {project.name}
        </a>
        <StatusDot status={project.status} />
      </div>
      <p className="mt-1 flex-1 text-sm leading-relaxed text-muted">
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
          className="link-slide text-muted hover:text-fg"
        >
          visit ↗
        </a>
        {project.repo && (
          <a
            href={`https://github.com/${project.repo}`}
            target="_blank"
            rel="noopener noreferrer"
            className="link-slide text-muted hover:text-fg"
          >
            source ↗
          </a>
        )}
        {project.extraLinks?.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="link-slide text-muted hover:text-fg"
          >
            {l.label} ↗
          </a>
        ))}
      </div>
    </div>
  );
}

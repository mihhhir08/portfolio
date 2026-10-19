"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import StatusDot from "@/components/StatusDot";
import TechTag from "@/components/TechTag";
import { fetchStars } from "@/lib/stars";
import { caseStudyFor } from "@/lib/case-studies";
import type { Project } from "@/lib/content";

export default function ProjectCard({ project }: { project: Project }) {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    if (project.repo) fetchStars(project.repo).then(setStars);
  }, [project.repo]);

  // With a study written, the thumbnail and title lead inward and "visit"
  // keeps the outbound link. Without one, everything points out as before.
  const study = caseStudyFor(project.name);
  const headHref = study ? `/work/${study.slug}` : project.href;
  const outward = study ? {} : { target: "_blank", rel: "noopener noreferrer" };

  return (
    <div className="group/card flex h-full flex-col">
      <Link
        href={headHref}
        {...outward}
        data-track="project_thumb"
        data-track-detail={project.name}
        className="relative block overflow-hidden rounded-lg border border-hairline"
      >
        <Image
          src={project.thumb}
          alt={`${project.name} preview`}
          width={720}
          height={450}
          loading="lazy"
          sizes="(min-width: 768px) 50vw, 100vw"
          className="w-full transition-transform duration-500 ease-out group-hover/card:scale-[1.03]"
        />
        {project.metric && (
          <span className="absolute top-2 left-2 rounded-md border border-hairline bg-bg px-2 py-0.5 text-xs text-fg tabular-nums">
            {project.metric}
          </span>
        )}
        {stars !== null && stars > 0 && (
          <span className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-md border border-hairline bg-bg px-2 py-0.5 text-xs tabular-nums">
            <Star size={9} className="fill-current" />
            {stars}
          </span>
        )}
      </Link>
      <div className="mt-4 flex items-center justify-between">
        <Link
          href={headHref}
          {...outward}
          data-track="project_title"
          data-track-detail={project.name}
          className="font-display text-base font-semibold transition-colors hover:text-accent"
        >
          {project.name}
        </Link>
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
      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        {study && (
          <Link
            href={`/work/${study.slug}`}
            data-track="project_case_study"
            data-track-detail={project.name}
            className="text-link text-accent"
          >
            Case study
          </Link>
        )}
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          data-track="project_visit"
          data-track-detail={project.name}
          className="text-link text-muted"
        >
          Visit
        </a>
        {project.repo && (
          <a
            href={`https://github.com/${project.repo}`}
            target="_blank"
            rel="noopener noreferrer"
            data-track="project_source"
            data-track-detail={project.name}
            className="text-link text-muted"
          >
            Source
          </a>
        )}
        {project.extraLinks?.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            data-track="project_extra"
            data-track-detail={`${project.name}: ${l.label}`}
            className="text-link text-muted"
          >
            {l.label}
          </a>
        ))}
      </div>
    </div>
  );
}

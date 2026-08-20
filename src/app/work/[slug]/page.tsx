import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Preloader from "@/components/Preloader";
import Frame from "@/components/Frame";
import BentoCard from "@/components/BentoCard";
import Footer from "@/components/Footer";
import TrackClicks from "@/components/TrackClicks";
import Pipeline from "@/components/Pipeline";
import StatusDot from "@/components/StatusDot";
import TechTag from "@/components/TechTag";
import { CASE_STUDIES } from "@/lib/case-studies";
import { PROJECTS } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const study = CASE_STUDIES.find((c) => c.slug === slug);
  if (!study) return {};

  const title = `${study.project} · case study`;
  const url = `/work/${study.slug}`;
  const project = PROJECTS.find((p) => p.name === study.project);

  return {
    title,
    description: study.claim,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description: study.claim,
      ...(project ? { images: [{ url: project.thumb }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: study.claim,
      ...(project ? { images: [project.thumb] } : {}),
    },
  };
}

// Label above each block. Matches the "the work" / "the signal" treatment
// the home page already uses for section headers.
function Eyebrow({ children }: { children: string }) {
  return (
    <p className="font-mono text-xs tracking-widest text-muted uppercase">
      {children}
    </p>
  );
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const study = CASE_STUDIES.find((c) => c.slug === slug);
  if (!study) notFound();

  const project = PROJECTS.find((p) => p.name === study.project);

  const links = [
    project && { label: "visit", href: project.href },
    project?.repo && {
      label: "source",
      href: `https://github.com/${project.repo}`,
    },
    ...(project?.extraLinks ?? []),
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <Preloader>
      <Frame>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <BentoCard
            delay={0}
            track={`${study.slug}: header`}
            className="md:col-span-3"
          >
            <div className="flex h-full flex-col gap-6">
              <Link
                href="/#work"
                data-track="case_study_back"
                data-track-detail={study.slug}
                className="inline-flex w-fit items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-fg"
              >
                <ArrowLeft size={13} />
                the work
              </Link>

              <div>
                <div className="flex items-center gap-3">
                  <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
                    {study.project}
                  </h1>
                  {project && <StatusDot status={project.status} />}
                </div>
                <p className="mt-3 max-w-2xl font-display text-xl leading-snug font-medium text-muted md:text-2xl">
                  {study.claim}
                </p>
              </div>

              {project && (
                <div className="flex flex-wrap items-center gap-1.5">
                  {project.tags.map((t) => (
                    <TechTag key={t} name={t} />
                  ))}
                </div>
              )}

              {links.length > 0 && (
                <div className="flex flex-wrap items-center gap-5 font-mono text-xs">
                  {links.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-track="case_study_link"
                      data-track-detail={`${study.slug}: ${l.label}`}
                      className="text-muted transition-colors hover:text-accent"
                    >
                      {l.label} &#8599;
                    </a>
                  ))}
                </div>
              )}
            </div>
          </BentoCard>

          <BentoCard
            delay={0.08}
            track={`${study.slug}: problem`}
            className="md:col-span-2"
          >
            <Eyebrow>the problem</Eyebrow>
            <div className="mt-4 space-y-4">
              {study.problem.map((p) => (
                <p key={p} className="text-sm leading-relaxed text-muted">
                  {p}
                </p>
              ))}
            </div>
          </BentoCard>

          <BentoCard delay={0.14} track={`${study.slug}: build`}>
            <Eyebrow>the build</Eyebrow>
            <dl className="mt-4 space-y-4 text-sm">
              {(
                [
                  ["role", study.meta.role],
                  ["when", study.meta.timeline],
                  ["stack", study.meta.stack],
                ] as const
              ).map(([k, v]) => (
                <div key={k}>
                  <dt className="font-mono text-[11px] tracking-widest text-muted uppercase">
                    {k}
                  </dt>
                  <dd className="mt-1 leading-relaxed text-fg/90">{v}</dd>
                </div>
              ))}
            </dl>
          </BentoCard>

          <BentoCard
            delay={0.2}
            track={`${study.slug}: how`}
            className="md:col-span-3"
          >
            <Eyebrow>how it works</Eyebrow>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
              {study.how.body}
            </p>
            <div className="mt-6">
              <Pipeline steps={study.how.pipeline} />
            </div>
          </BentoCard>

          <BentoCard
            delay={0.26}
            track={`${study.slug}: call`}
            className="md:col-span-3"
          >
            <Eyebrow>the call</Eyebrow>
            <p className="mt-4 max-w-3xl font-display text-lg font-medium">
              {study.decision.question}
            </p>
            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
              {(
                [
                  ["chose", study.decision.chose, "text-status"],
                  ["rejected", study.decision.rejected, "text-muted"],
                  ["consequence", study.decision.consequence, "text-accent"],
                ] as const
              ).map(([k, v, tone]) => (
                <div key={k} className="border-t border-hairline pt-4">
                  <p
                    className={`font-mono text-[11px] tracking-widest uppercase ${tone}`}
                  >
                    {k}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{v}</p>
                </div>
              ))}
            </div>
          </BentoCard>

          <BentoCard
            delay={0.3}
            track={`${study.slug}: standing`}
            className="md:col-span-3"
          >
            <Eyebrow>where it stands</Eyebrow>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
              {study.standing}
            </p>
          </BentoCard>
        </div>
      </Frame>
      <Footer />
      <TrackClicks />
    </Preloader>
  );
}

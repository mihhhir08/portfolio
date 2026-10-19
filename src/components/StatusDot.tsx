import type { ProjectStatus } from "@/lib/content";

const COLOR: Record<ProjectStatus, string> = {
  live: "bg-status",
  building: "bg-status-building",
  archived: "bg-status-archived",
};

const LABEL: Record<ProjectStatus, string> = {
  live: "Live",
  building: "Building",
  archived: "Archived",
};

export default function StatusDot({ status }: { status: ProjectStatus }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted">
      <span className={`h-1.5 w-1.5 rounded-full ${COLOR[status]}`} />
      {LABEL[status]}
    </span>
  );
}

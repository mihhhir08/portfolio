import type { ProjectStatus } from "@/lib/content";

const COLOR: Record<ProjectStatus, string> = {
  live: "bg-status",
  building: "bg-status-building",
  archived: "bg-status-archived",
};

export default function StatusDot({ status }: { status: ProjectStatus }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-muted uppercase">
      <span className="relative flex h-1.5 w-1.5">
        {status === "live" && (
          <span
            className={`absolute inline-flex h-1.5 w-1.5 animate-ping rounded-full opacity-75 ${COLOR[status]}`}
          />
        )}
        <span
          className={`relative inline-flex h-1.5 w-1.5 rounded-full ${COLOR[status]}`}
        />
      </span>
      {status}
    </span>
  );
}

import { AVAILABLE_FOR_WORK } from "@/lib/content";

export default function AvailabilityBadge() {
  if (!AVAILABLE_FOR_WORK) return null;
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-hairline px-3 py-1 font-mono text-xs text-muted">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-status opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-status" />
      </span>
      Available for work
    </span>
  );
}

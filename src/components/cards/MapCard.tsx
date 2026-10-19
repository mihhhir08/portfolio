import LiveClock from "@/components/LiveClock";
import { US_PATH, US_VIEWBOX } from "@/lib/us-path";

// AlbersUSA-projected marker coords
const SF = { x: 34.8, y: 261.4 };

export default function MapCard() {
  return (
    <div className="flex h-full flex-col justify-between gap-4">
      <h2 className="card-title">San Francisco</h2>
      <svg
        viewBox={US_VIEWBOX}
        role="img"
        aria-label="Map of the United States highlighting San Francisco"
        className="w-full"
      >
        <path
          d={US_PATH}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
          className="fill-fg/[0.04] text-muted/50"
          vectorEffect="non-scaling-stroke"
        />

        <circle cx={SF.x} cy={SF.y} r="18" className="fill-accent/20" />
        <circle cx={SF.x} cy={SF.y} r="8" className="fill-accent" />
      </svg>

      <div className="flex items-center justify-between text-sm">
        <span className="text-muted">Local time</span>
        <LiveClock timezone="America/Los_Angeles" className="tabular-nums" />
      </div>
    </div>
  );
}

import LiveClock from "@/components/LiveClock";
import { US_PATH } from "@/lib/us-path";

// AlbersUSA-projected marker coords (viewBox 0 0 975 610)
const CITIES = [
  { label: "NYC", tz: "America/New_York", x: 869.7, y: 215.7 },
  { label: "SF", tz: "America/Los_Angeles", x: 34.8, y: 261.4 },
] as const;

export default function MapCard() {
  return (
    <div className="flex h-full flex-col justify-between gap-4">
      <svg
        viewBox="0 0 975 610"
        role="img"
        aria-label="Map of the United States highlighting New York and San Francisco"
        className="w-full"
      >
        <path
          d={US_PATH}
          stroke="currentColor"
          strokeWidth="1.5"
          className="fill-muted/10 text-muted/50"
          vectorEffect="non-scaling-stroke"
        />
        {CITIES.map((c) => (
          <g key={c.label}>
            <circle cx={c.x} cy={c.y} r="18" className="fill-accent/25">
              <animate
                attributeName="r"
                values="10;26;10"
                dur="2.4s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.6;0;0.6"
                dur="2.4s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx={c.x} cy={c.y} r="8" className="fill-accent" />
          </g>
        ))}
      </svg>
      <div className="space-y-1 font-mono text-xs">
        {CITIES.map((c) => (
          <div key={c.label} className="flex items-center justify-between">
            <span className="text-muted">{c.label}</span>
            <LiveClock timezone={c.tz} className="tabular-nums" />
          </div>
        ))}
        <p className="pt-2 text-[10px] tracking-wide text-muted uppercase">
          working across US time zones
        </p>
      </div>
    </div>
  );
}

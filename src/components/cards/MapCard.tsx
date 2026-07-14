import LiveClock from "@/components/LiveClock";
import { US_PATH, US_VIEWBOX } from "@/lib/us-path";

// AlbersUSA-projected marker coords
const CITIES = [
  { label: "NYC", x: 869.7, y: 215.7 },
  { label: "SF", x: 34.8, y: 261.4 },
] as const;

export default function MapCard() {
  return (
    <div className="flex h-full flex-col justify-between gap-4">
      <svg
        viewBox={US_VIEWBOX}
        role="img"
        aria-label="Map of the United States highlighting New York and San Francisco"
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
        {CITIES.map((c) => (
          <g key={c.label}>
            <circle cx={c.x} cy={c.y} r="18" className="fill-status/30">
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
            <circle cx={c.x} cy={c.y} r="8" className="fill-status" />
            <text
              x={c.label === "SF" ? c.x + 18 : c.x - 18}
              y={c.y - 14}
              textAnchor={c.label === "SF" ? "start" : "end"}
              className="fill-muted font-mono text-[26px] tracking-widest"
            >
              {c.label}
            </text>
          </g>
        ))}
      </svg>
      <div className="space-y-1 font-mono text-xs">
        <div className="flex items-center justify-between">
          <span className="text-muted">local time · SF</span>
          <LiveClock timezone="America/Los_Angeles" className="tabular-nums" />
        </div>
        <p className="pt-2 text-[10px] tracking-wide text-muted uppercase">
          working across US time zones
        </p>
      </div>
    </div>
  );
}

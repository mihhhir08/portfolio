import LiveClock from "@/components/LiveClock";
import { US_PATH, US_VIEWBOX } from "@/lib/us-path";

// AlbersUSA-projected marker coords
const SF = { x: 34.8, y: 261.4 };

// Three rings on the same 3s cycle, each starting a third of the way
// through the last — so the pin sheds one continuous outward wave
// instead of a single ring that visibly restarts.
const RIPPLES = [0, 1, 2];

export default function MapCard() {
  return (
    <div className="flex h-full flex-col justify-between gap-4">
      <svg
        viewBox={US_VIEWBOX}
        role="img"
        aria-label="Map of the United States highlighting San Francisco"
        className="w-full"
      >
        <defs>
          {/* Doubling the blur builds the falloff up to a visible halo;
              a single pass reads as a smudge at this viewBox scale. */}
          <filter
            id="sf-glow"
            x="-300%"
            y="-300%"
            width="700%"
            height="700%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="9" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
            </feMerge>
          </filter>
        </defs>

        <path
          d={US_PATH}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
          className="fill-fg/[0.04] text-muted/50"
          vectorEffect="non-scaling-stroke"
        />

        <g>
          {/* Waves repelling from the pin. SMIL ignores the reduced-motion
              query, so the whole group drops out instead. */}
          <g className="motion-reduce:hidden">
            {RIPPLES.map((i) => (
              <circle
                key={i}
                cx={SF.x}
                cy={SF.y}
                r="8"
                fill="none"
                strokeWidth="3"
                className="stroke-status"
                vectorEffect="non-scaling-stroke"
              >
                <animate
                  attributeName="r"
                  values="8;68"
                  dur="3s"
                  begin={`${i}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.55;0"
                  dur="3s"
                  begin={`${i}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
          </g>

          <circle
            cx={SF.x}
            cy={SF.y}
            r="10"
            filter="url(#sf-glow)"
            className="fill-status/70"
          />
          <circle cx={SF.x} cy={SF.y} r="8" className="fill-status" />
          <text
            x={SF.x + 18}
            y={SF.y - 14}
            textAnchor="start"
            className="fill-muted font-mono text-[26px] tracking-widest"
          >
            SF
          </text>
        </g>
      </svg>

      <div className="flex items-center justify-between font-mono text-xs">
        <span className="text-muted">local time · SF</span>
        <LiveClock timezone="America/Los_Angeles" className="tabular-nums" />
      </div>
    </div>
  );
}

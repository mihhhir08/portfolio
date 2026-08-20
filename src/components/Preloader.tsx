"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import DitherBackground from "@/components/DitherBackground";

// ready=false while the curtain is still down; consumers (cards,
// headline) hold their entrance animations until it flips.
const ReadyContext = createContext(false);
export const useReady = () => useContext(ReadyContext);

// Stylized transliterations of the name across scripts, flashed rapidly
// before settling on the Latin spelling — not authoritative translations.
// Ordered so no two neighbouring frames share a script family — the
// silhouette should change completely on every tick, which is the whole
// effect. Hangul and Arabic carry the most contrast against the CJK and
// Indic frames, so they sit in the middle where the flash is fastest.
const NAME_FRAMES = [
  "Mihir",
  "米希尔",
  "ミヒル",
  "미히르",
  "مهير",
  "मिहिर",
  "મિહિર",
  "Mihirsinh",
];
const FRAME_MS = 170;
const HOLD_MS = 800;

// The curtain is PANELS vertical strips that lift one after another,
// left to right. Each strip clips its own slice of the name, so the
// word tears apart column by column as the curtain goes up.
const PANELS = 5;
const PANEL_MS = 900; // travel time for a single strip
const STAGGER_MS = 110; // gap between one strip leaving and the next
const WIPE_MS = PANEL_MS + STAGGER_MS * (PANELS - 1);

export default function Preloader({ children }: { children: ReactNode }) {
  const [overlay, setOverlay] = useState(true);
  const [ready, setReady] = useState(false);
  const [wiping, setWiping] = useState(false);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    let skip = false;
    try {
      skip = sessionStorage.getItem("seen") === "1";
    } catch {
      /* private mode */
    }
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) skip = true;

    if (skip) {
      const raf = requestAnimationFrame(() => {
        setOverlay(false);
        setReady(true);
      });
      return () => cancelAnimationFrame(raf);
    }

    try {
      sessionStorage.setItem("seen", "1");
    } catch {
      /* private mode */
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    NAME_FRAMES.forEach((_, i) => {
      timers.push(setTimeout(() => setFrame(i), i * FRAME_MS));
    });

    const wipeAt = NAME_FRAMES.length * FRAME_MS + HOLD_MS;
    timers.push(
      setTimeout(() => {
        setReady(true);
        setWiping(true);
      }, wipeAt)
    );
    timers.push(setTimeout(() => setOverlay(false), wipeAt + WIPE_MS));

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <ReadyContext.Provider value={ready}>
      <DitherBackground />
      {overlay && (
        <div
          aria-hidden="true"
          className="preloader-overlay pointer-events-none fixed inset-0 z-50"
        >
          {Array.from({ length: PANELS }, (_, i) => (
            <div
              key={i}
              className="absolute inset-y-0 overflow-hidden bg-black transition-transform ease-[cubic-bezier(0.7,0,0.2,1)]"
              style={{
                left: `${(i * 100) / PANELS}%`,
                // +1px overlaps the neighbour so no seam of the page
                // shows through between strips mid-lift.
                width: `calc(${100 / PANELS}% + 1px)`,
                transitionDuration: `${PANEL_MS}ms`,
                transitionDelay: wiping ? `${i * STAGGER_MS}ms` : "0ms",
                transform: wiping ? "translateY(-100%)" : "translateY(0)",
              }}
            >
              {/* Full-viewport layer pulled back into place, so all five
                  slices line up into one continuous word. */}
              <div
                className="absolute inset-y-0 flex items-center justify-center"
                style={{ left: `${(i * -100) / PANELS}vw`, width: "100vw" }}
              >
                {/* Sized against the viewport so the word spans several
                    strips — that overlap is what makes it tear apart
                    as they lift, instead of riding up inside one. */}
                <span className="font-display text-[clamp(2rem,10vw,9rem)] leading-none font-semibold tracking-[0.08em] whitespace-nowrap text-white uppercase">
                  {NAME_FRAMES[frame]}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      {children}
    </ReadyContext.Provider>
  );
}

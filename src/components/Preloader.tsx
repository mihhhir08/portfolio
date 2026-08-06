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
const NAME_FRAMES = [
  "Mihir",
  "Mihir",
  "米希尔",
  "ミヒル",
  "मिहिर",
  "મિહિર",
  "Mihirsinh",
];
const FRAME_MS = 110;
const HOLD_MS = 350;
const WIPE_MS = 650;

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
    // Phones skip the reveal — content paints immediately for the
    // link-tap-from-Twitter crowd; desktop gets the full sequence.
    if (matchMedia("(pointer: coarse)").matches) skip = true;

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
          className={`pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-black transition-transform duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] [@media(pointer:coarse)]:hidden ${
            wiping ? "-translate-y-full" : "translate-y-0"
          }`}
        >
          <span className="font-display text-4xl font-semibold tracking-[0.2em] text-white uppercase">
            {NAME_FRAMES[frame]}
          </span>
        </div>
      )}
      {children}
    </ReadyContext.Provider>
  );
}

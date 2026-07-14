"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import DitherBackground from "@/components/DitherBackground";

// ready=false while the dither resolve is playing; consumers (cards,
// headline) hold their entrance animations until it flips.
const ReadyContext = createContext(false);
export const useReady = () => useContext(ReadyContext);

const DURATION = 1200;
const PIXEL_FROM = 48;
const PIXEL_TO = 3;

const easeOutCubic = (p: number) => 1 - Math.pow(1 - p, 3);

export default function Preloader({ children }: { children: ReactNode }) {
  const pixelRef = useRef<number>(PIXEL_TO);
  const [overlay, setOverlay] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let skip = false;
    try {
      skip = sessionStorage.getItem("seen") === "1";
    } catch {
      /* private mode */
    }
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) skip = true;
    // Phones skip the resolve — content paints immediately for the
    // link-tap-from-Twitter crowd; desktop gets the full entrance.
    if (matchMedia("(pointer: coarse)").matches) skip = true;

    if (skip) {
      pixelRef.current = PIXEL_TO;
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

    pixelRef.current = PIXEL_FROM;
    document.documentElement.setAttribute("data-preloading", "1");
    let raf: number;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / DURATION, 1);
      pixelRef.current =
        PIXEL_FROM + (PIXEL_TO - PIXEL_FROM) * easeOutCubic(p);
      // Hand off into the headline rise just before the resolve lands.
      if (p >= 0.8 && !ready) setReady(true);
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        document.documentElement.removeAttribute("data-preloading");
        setOverlay(false);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ReadyContext.Provider value={ready}>
      <DitherBackground pixelSizeRef={pixelRef} />
      {overlay && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center [@media(pointer:coarse)]:hidden"
        >
          <span
            className={`font-display text-4xl font-semibold tracking-[0.2em] uppercase transition-all duration-500 ${
              ready ? "opacity-0 blur-md" : "opacity-90 blur-0"
            }`}
          >
            Mihirsinh
          </span>
        </div>
      )}
      <div
        className={`entrance transition-opacity duration-500 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      >
        {children}
      </div>
    </ReadyContext.Provider>
  );
}

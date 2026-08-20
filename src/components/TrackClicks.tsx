"use client";

import { useEffect } from "react";
import { linkClick } from "@/lib/analytics";

// One delegated listener for the whole document instead of an onClick on
// every anchor. Server-rendered markup can opt in with a data attribute
// alone, so nothing has to become a client component just to be counted.
//
//   <a data-track="resume" data-track-detail="hero">
export default function TrackClicks() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-track]"
      );
      const name = el?.dataset.track;
      if (name) linkClick(name, el?.dataset.trackDetail);
    };

    // Capture phase: the click still counts even when something inside
    // stops propagation on its way up.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}

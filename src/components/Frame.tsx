"use client";

import type { ReactNode } from "react";

// Corner registration ticks — four 8px L-marks, print-sheet style.
function Tick({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute h-2 w-2 border-hairline-bright ${className}`}
    />
  );
}

export default function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto my-8 w-[calc(100%-32px)] max-w-[1080px] md:my-16">
      <Tick className="-top-3 -left-3 border-t border-l" />
      <Tick className="-top-3 -right-3 border-t border-r" />
      <Tick className="-bottom-3 -left-3 border-b border-l" />
      <Tick className="-bottom-3 -right-3 border-b border-r" />
      {children}
    </div>
  );
}

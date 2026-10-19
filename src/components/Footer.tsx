"use client";

import { useEffect, useState } from "react";
import Odometer from "@/components/Odometer";
import { getVisitorCount } from "@/lib/visitors";
import { SOCIALS } from "@/lib/content";

export default function Footer() {
  // undefined = still loading, null = unavailable (render nothing), number = live
  const [count, setCount] = useState<number | null | undefined>(undefined);

  useEffect(() => {
    let visited = false;
    try {
      visited = localStorage.getItem("visited") === "1";
    } catch {
      /* private mode */
    }
    getVisitorCount(visited).then((c) => {
      setCount(c);
      if (c === null) return; // don't mark visited if the increment never landed
      try {
        localStorage.setItem("visited", "1");
      } catch {
        /* private mode */
      }
    });
  }, []);

  return (
    <footer className="relative mt-8 overflow-hidden pb-0">
      <div className="mx-auto w-[calc(100%-32px)] max-w-[1080px]">
        <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2 border-t border-hairline pt-6 text-sm text-muted">
          <span>© {new Date().getFullYear()} Mihirsinh Chavda</span>
          {count !== null && (
            <span className="flex items-center gap-1.5">
              you are visitor&nbsp;
              {count === undefined ? (
                <span className="inline-block w-12 rounded bg-hairline">
                  &nbsp;
                </span>
              ) : (
                <span className="text-fg tabular-nums">
                  #<Odometer value={count} />
                </span>
              )}
            </span>
          )}
          <span className="flex gap-4">
            <a href={SOCIALS.github} target="_blank" rel="noopener noreferrer" className="text-link">GitHub</a>
            <a href={SOCIALS.x} target="_blank" rel="noopener noreferrer" className="text-link">X</a>
            <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" className="text-link">LinkedIn</a>
          </span>
        </div>
      </div>
      <svg
        aria-hidden="true"
        viewBox="0 0 1000 150"
        className="pointer-events-none mx-auto mt-8 -mb-[6%] block w-full max-w-[1100px] select-none md:-mb-[4%]"
        style={{
          maskImage:
            "linear-gradient(to bottom, black 0%, black 42%, transparent 88%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 42%, transparent 88%)",
        }}
      >
        <text
          x="500"
          y="145"
          textAnchor="middle"
          className="fill-fg font-display opacity-[0.08]"
          style={{ fontSize: 172, fontWeight: 700, letterSpacing: "-0.02em" }}
        >
          MIHIRSINH
        </text>
      </svg>
    </footer>
  );
}

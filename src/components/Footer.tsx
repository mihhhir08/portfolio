"use client";

import { useEffect, useState } from "react";
import Odometer from "@/components/Odometer";
import { getVisitorCount } from "@/lib/visitors";
import { SOCIALS } from "@/lib/content";

export default function Footer() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let visited = false;
    try {
      visited = localStorage.getItem("visited") === "1";
    } catch {
      /* private mode */
    }
    getVisitorCount(visited).then((c) => {
      setCount(c);
      try {
        localStorage.setItem("visited", "1");
      } catch {
        /* private mode */
      }
    });
  }, []);

  return (
    <footer className="relative mt-8 overflow-hidden pb-0">
      <div className="mx-auto w-[calc(100%-32px)] max-w-[840px]">
        <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2 border-t border-hairline pt-6 font-mono text-xs text-muted">
          <span>© {new Date().getFullYear()} Mihirsinh Chavda</span>
          <span className="flex items-center gap-1.5">
            you are visitor&nbsp;
            {count === null ? (
              <span className="inline-block w-12 animate-pulse rounded bg-hairline">
                &nbsp;
              </span>
            ) : (
              <span className="text-fg">
                #<Odometer value={count} />
              </span>
            )}
          </span>
          <span className="flex gap-4">
            <a href={SOCIALS.github} target="_blank" rel="noopener noreferrer" className="link-slide hover:text-fg">GitHub</a>
            <a href={SOCIALS.x} target="_blank" rel="noopener noreferrer" className="link-slide hover:text-fg">X</a>
            <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" className="link-slide hover:text-fg">LinkedIn</a>
          </span>
        </div>
      </div>
      <p
        aria-hidden="true"
        className="pointer-events-none mt-8 -mb-[0.24em] text-center font-display text-[clamp(2.5rem,17vw,10rem)] leading-[0.75] font-bold tracking-tight text-fg opacity-[0.05] select-none"
      >
        MIHIRSINH
      </p>
    </footer>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import type { NowPlaying } from "@/lib/spotify";

const POLL_MS = 30_000;

function Equalizer() {
  return (
    <span className="flex h-3.5 items-end gap-[3px]" aria-hidden="true">
      {[0.9, 0.5, 0.7].map((d, i) => (
        <span
          key={i}
          className="eq-bar w-[3px] rounded-full bg-status"
          style={{ animationDelay: `${i * 0.18}s`, animationDuration: `${d}s` }}
        />
      ))}
    </span>
  );
}

export default function SpotifyCard() {
  const [now, setNow] = useState<NowPlaying>({ isPlaying: false });

  useEffect(() => {
    let alive = true;
    const load = () =>
      fetch("/api/spotify")
        .then((r) => r.json())
        .then((d) => alive && setNow(d))
        .catch(() => {});
    load();
    const t = setInterval(load, POLL_MS);
    const onVisible = () => document.visibilityState === "visible" && load();
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      alive = false;
      clearInterval(t);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return (
    <div className="flex h-full flex-col">
      <p className="label flex items-center gap-2">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="text-status">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.5 17.3a.75.75 0 0 1-1.03.25c-2.82-1.72-6.37-2.11-10.55-1.16a.75.75 0 1 1-.33-1.46c4.57-1.05 8.5-.6 11.66 1.34.35.22.46.68.25 1.03zm1.47-3.27a.94.94 0 0 1-1.29.31c-3.23-1.98-8.15-2.56-11.97-1.4a.94.94 0 1 1-.55-1.79c4.37-1.33 9.8-.68 13.5 1.6.44.27.58.85.31 1.28zm.13-3.41C15.24 8.32 8.94 8.11 5.25 9.23a1.13 1.13 0 1 1-.65-2.15c4.24-1.28 11.28-1.04 15.72 1.6a1.13 1.13 0 0 1-1.22 1.94z" />
        </svg>
        listening to
      </p>
      <AnimatePresence mode="wait">
        {now.isPlaying ? (
          <motion.a
            key={now.title}
            href={now.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="group mt-4 flex items-center gap-3"
          >
            {now.albumArt && (
              <Image
                src={now.albumArt}
                alt={now.album ?? "album art"}
                width={44}
                height={44}
                unoptimized
                className="rounded-lg border border-hairline transition-transform duration-300 group-hover:scale-105"
              />
            )}
            <span className="min-w-0">
              <span className="flex items-center gap-2">
                <Equalizer />
                <span className="truncate text-sm text-fg transition-colors group-hover:text-accent">
                  {now.title}
                </span>
              </span>
              <span className="mt-0.5 block truncate font-mono text-[11px] text-muted">
                {now.artist}
              </span>
            </span>
          </motion.a>
        ) : (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4 flex items-center gap-3"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-hairline">
              <span className="h-2 w-2 rounded-full bg-muted/50" />
            </span>
            <span>
              <span className="block text-sm text-muted">Silence, for now</span>
              <span className="mt-0.5 block font-mono text-[11px] text-muted/70">
                the code has its own rhythm
              </span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

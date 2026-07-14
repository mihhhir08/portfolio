"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PROJECTS } from "@/lib/content";

type Line = { text: string; accent?: boolean };

const HELP = `help          this list
ls            list projects
open <name>   open a project
whoami        about me
resume        download resume
theme         toggle theme
clear         clear screen
exit          close terminal`;

export default function TerminalEgg() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const outRef = useRef<HTMLDivElement>(null);

  const projects = Object.fromEntries(
    PROJECTS.map((p) => [p.name.toLowerCase(), p.href])
  );

  const print = (text: string, accent = false) =>
    setLines((l) => [...l, { text, accent }]);

  const exec = (cmd: string) => {
    print("$ " + cmd);
    const parts = cmd.trim().split(/\s+/);
    const name = (parts[0] || "").toLowerCase();
    if (!name) return;
    if (name === "help") print(HELP);
    else if (name === "ls") print(Object.keys(projects).join("  "));
    else if (name === "open") {
      const p = (parts[1] || "").toLowerCase();
      if (projects[p]) {
        print(`opening ${p}…`, true);
        window.open(projects[p], "_blank");
      } else print("unknown project. try: " + Object.keys(projects).join(", "));
    } else if (name === "whoami")
      print("Mihirsinh Chavda · software engineer.\nI ship AI products end to end.");
    else if (name === "resume") {
      const a = document.createElement("a");
      a.href = "/resume.pdf";
      a.download = "";
      a.click();
      print("downloading resume.pdf…", true);
    } else if (name === "theme") {
      const next =
        document.documentElement.dataset.theme === "light" ? "dark" : "light";
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {}
      print("theme: " + next, true);
    } else if (name === "clear") setLines([]);
    else if (name === "exit") setOpen(false);
    else print(`command not found: ${name} (try \`help\`)`);
  };

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => {
      const tag = ((e.target as HTMLElement)?.tagName || "").toLowerCase();
      if (e.key === "`" && tag !== "input" && tag !== "textarea") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("open-term", onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("open-term", onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const raf = requestAnimationFrame(() => {
      setLines((l) =>
        l.length ? l : [{ text: "mihir@portfolio · type `help`", accent: true }]
      );
      inputRef.current?.focus();
    });
    return () => cancelAnimationFrame(raf);
  }, [open]);

  useEffect(() => {
    outRef.current?.scrollTo(0, outRef.current.scrollHeight);
  }, [lines]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <motion.div
            initial={{ scale: 0.96, y: 8 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 8, opacity: 0 }}
            transition={{ duration: 0.15 }}
            role="dialog"
            aria-label="Terminal"
            className="w-[min(560px,calc(100vw-32px))] overflow-hidden rounded-xl border border-hairline bg-surface font-mono text-xs backdrop-blur-md"
          >
            <div className="flex items-center gap-1.5 border-b border-hairline px-3 py-2 text-muted">
              <span className="h-2 w-2 rounded-full bg-status-archived/70" />
              <span className="h-2 w-2 rounded-full bg-status-building/70" />
              <span className="h-2 w-2 rounded-full bg-status/70" />
              <span className="ml-2">mihir@portfolio</span>
            </div>
            <div ref={outRef} className="max-h-64 min-h-32 overflow-y-auto p-3">
              {lines.map((l, i) => (
                <div
                  key={i}
                  className={`whitespace-pre-wrap ${l.accent ? "text-accent" : ""}`}
                >
                  {l.text}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1 border-t border-hairline px-3 py-2">
              $
              <input
                ref={inputRef}
                aria-label="Terminal input"
                autoComplete="off"
                spellCheck={false}
                className="w-full bg-transparent outline-none"
                onKeyDown={(e) => {
                  e.stopPropagation();
                  if (e.key === "Enter") {
                    exec(e.currentTarget.value);
                    e.currentTarget.value = "";
                  } else if (e.key === "Escape") setOpen(false);
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

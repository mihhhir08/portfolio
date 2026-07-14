"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { EMAIL, PROJECTS, SOCIALS } from "@/lib/content";

type Command = { n: string; h: string; run: () => void };

function buildCommands(): Command[] {
  return [
    {
      n: "Copy email",
      h: EMAIL,
      run: () => void navigator.clipboard?.writeText(EMAIL),
    },
    {
      n: "Download resume",
      h: "pdf",
      run: () => {
        const a = document.createElement("a");
        a.href = "/resume.pdf";
        a.download = "";
        a.click();
      },
    },
    {
      n: "Open terminal",
      h: "`",
      run: () => window.dispatchEvent(new CustomEvent("open-term")),
    },
    {
      n: "Toggle theme",
      h: "dark / light",
      run: () => {
        const next =
          document.documentElement.dataset.theme === "light" ? "dark" : "light";
        document.documentElement.dataset.theme = next;
        try {
          localStorage.setItem("theme", next);
        } catch {}
      },
    },
    { n: "Go to work", h: "#work", run: () => (location.hash = "#work") },
    {
      n: "Go to contact",
      h: "#contact",
      run: () => (location.hash = "#contact"),
    },
    { n: "Open GitHub", h: "↗", run: () => window.open(SOCIALS.github, "_blank") },
    { n: "Open X", h: "↗", run: () => window.open(SOCIALS.x, "_blank") },
    {
      n: "Open LinkedIn",
      h: "↗",
      run: () => window.open(SOCIALS.linkedin, "_blank"),
    },
    ...PROJECTS.map((p) => ({
      n: `Open ${p.name}`,
      h: "↗",
      run: () => window.open(p.href, "_blank"),
    })),
  ];
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const commands = useMemo(() => buildCommands(), []);

  const shown = commands.filter((c) =>
    c.n.toLowerCase().includes(query.toLowerCase())
  );
  const selIdx = Math.min(sel, Math.max(shown.length - 1, 0));

  const close = useCallback(() => setOpen(false), []);
  const openPal = useCallback(() => {
    setQuery("");
    setSel(0);
    setOpen(true);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => {
          if (!o) {
            setQuery("");
            setSel(0);
          }
          return !o;
        });
      }
    };
    const onOpen = () => openPal();
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, [openPal]);

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") close();
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSel((selIdx + 1) % shown.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSel((selIdx - 1 + shown.length) % shown.length);
    } else if (e.key === "Enter" && shown[selIdx]) {
      close();
      shown[selIdx].run();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-[18vh] backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <motion.div
            initial={{ scale: 0.96, y: -8 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: -8, opacity: 0 }}
            transition={{ duration: 0.15 }}
            role="dialog"
            aria-label="Command palette"
            className="w-[min(520px,calc(100vw-32px))] overflow-hidden rounded-xl border border-hairline bg-surface backdrop-blur-md"
          >
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSel(0);
              }}
              onKeyDown={onInputKey}
              placeholder="Type a command…"
              autoComplete="off"
              spellCheck={false}
              className="w-full border-b border-hairline bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted"
            />
            <ul className="max-h-72 overflow-y-auto p-1">
              {shown.map((c, i) => (
                <li key={c.n}>
                  <button
                    onClick={() => {
                      close();
                      c.run();
                    }}
                    onMouseMove={() => setSel(i)}
                    className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm ${
                      i === selIdx ? "bg-accent/15 text-fg" : "text-muted"
                    }`}
                  >
                    {c.n}
                    <span className="font-mono text-[10px] opacity-60">
                      {c.h}
                    </span>
                  </button>
                </li>
              ))}
              {shown.length === 0 && (
                <li className="px-3 py-2 text-sm text-muted">no matches</li>
              )}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

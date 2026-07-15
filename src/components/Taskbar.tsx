"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowUp, Command } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import LiveClock from "@/components/LiveClock";

const SECTIONS = ["about", "work", "contact"] as const;

function DockItem({
  children,
  onClick,
  href,
  label,
  active,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  label: string;
  active?: boolean;
}) {
  const inner = (
    <motion.span
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="relative flex h-10 items-center justify-center px-2 text-muted transition-colors hover:text-fg sm:h-8"
    >
      {children}
      {active && (
        <motion.span
          layoutId="dock-active"
          className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent"
        />
      )}
    </motion.span>
  );
  return href ? (
    <a href={href} aria-label={label} className="text-sm">
      {inner}
    </a>
  ) : (
    <button onClick={onClick} aria-label={label} className="cursor-pointer text-sm">
      {inner}
    </button>
  );
}

export default function Taskbar() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const openPalette = () =>
    window.dispatchEvent(new CustomEvent("open-palette"));

  return (
    <nav
      aria-label="Quick actions"
      className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-0.5 rounded-full border border-hairline bg-surface px-2 py-1.5 backdrop-blur-md sm:gap-1 sm:px-3"
    >
      {SECTIONS.map((id) => (
        <DockItem key={id} href={`#${id}`} label={id} active={active === id}>
          <span className="px-1 font-mono text-sm sm:text-xs">{id}</span>
        </DockItem>
      ))}
      <span aria-hidden="true" className="mx-1 h-4 w-px bg-hairline" />
      {/* ⌘K needs a keyboard — pointless on touch, hidden there */}
      <span className="hidden [@media(pointer:fine)]:inline">
        <DockItem onClick={openPalette} label="Open command palette">
          <span className="flex items-center gap-1 font-mono text-xs">
            <Command size={11} />K
          </span>
        </DockItem>
      </span>
      <ThemeToggle />
      <span className="hidden px-2 font-mono text-[10px] text-muted tabular-nums sm:inline">
        PST <LiveClock timezone="America/Los_Angeles" seconds={false} />
      </span>
      <DockItem href="#top" label="Back to top">
        <ArrowUp size={15} />
      </DockItem>
    </nav>
  );
}

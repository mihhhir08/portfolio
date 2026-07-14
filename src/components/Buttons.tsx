"use client";

import type { ReactNode } from "react";

// Crafted button pair — crisp borders, arrow nudge on hover, visible focus.

export function PrimaryButton({
  href,
  children,
  download,
}: {
  href: string;
  children: ReactNode;
  download?: boolean;
}) {
  return (
    <a
      href={href}
      {...(download
        ? { download: true }
        : { target: "_blank", rel: "noopener noreferrer" })}
      className="group/btn inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-all duration-200 hover:opacity-90 hover:ring-2 hover:ring-accent/40 hover:ring-offset-2 hover:ring-offset-bg focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none active:scale-[0.97]"
    >
      {children}
      <span className="transition-transform duration-200 group-hover/btn:translate-x-0.5">
        →
      </span>
    </a>
  );
}

export function SecondaryButton({
  href,
  children,
  download,
}: {
  href: string;
  children: ReactNode;
  download?: boolean;
}) {
  return (
    <a
      href={href}
      {...(download
        ? { download: true }
        : { target: "_blank", rel: "noopener noreferrer" })}
      className="inline-flex items-center gap-2 rounded-full border border-hairline-bright bg-surface px-4 py-2.5 text-sm font-medium text-fg transition-all duration-200 hover:border-accent hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none active:scale-[0.97]"
    >
      {children}
    </a>
  );
}

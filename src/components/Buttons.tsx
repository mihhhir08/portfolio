"use client";

import type { ReactNode } from "react";

// Button pair: filled for the one main action, outlined for the rest.

export function PrimaryButton({
  href,
  children,
  download,
  track,
}: {
  href: string;
  children: ReactNode;
  download?: boolean;
  track?: string;
}) {
  return (
    <a
      href={href}
      data-track={track}
      {...(download
        ? { download: true }
        : { target: "_blank", rel: "noopener noreferrer" })}
      className="inline-flex items-center gap-2 rounded-lg bg-fg px-4 py-2.5 text-sm font-medium text-bg transition-colors duration-200 hover:bg-accent hover:text-white focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:outline-none active:scale-[0.98]"
    >
      {children}
    </a>
  );
}

export function SecondaryButton({
  href,
  children,
  download,
  track,
}: {
  href: string;
  children: ReactNode;
  download?: boolean;
  track?: string;
}) {
  return (
    <a
      href={href}
      data-track={track}
      {...(download
        ? { download: true }
        : { target: "_blank", rel: "noopener noreferrer" })}
      className="inline-flex items-center gap-2 rounded-lg border border-hairline-bright px-4 py-2.5 text-sm font-medium text-fg transition-colors duration-200 hover:border-accent hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none active:scale-[0.98]"
    >
      {children}
    </a>
  );
}

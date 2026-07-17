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
      className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-all duration-200 hover:-translate-y-0.5 hover:ring-2 hover:ring-accent/40 hover:ring-offset-2 hover:ring-offset-bg focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none active:translate-y-0 active:scale-[0.97]"
    >
      {/* sheen sweep across the surface on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-bg/35 to-transparent transition-transform duration-700 ease-out group-hover/btn:translate-x-[120%]"
      />
      <span className="relative">{children}</span>
      {/* arrow loops out the right edge while a fresh one enters from the left */}
      <span aria-hidden="true" className="relative block h-4 w-4 overflow-hidden">
        <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out group-hover/btn:translate-x-[140%]">
          →
        </span>
        <span className="absolute inset-0 flex -translate-x-[140%] items-center justify-center transition-transform duration-300 ease-out group-hover/btn:translate-x-0">
          →
        </span>
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

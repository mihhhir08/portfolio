"use client";

import { useEffect, useRef, type ReactNode } from "react";
import type {
  DecryptRevealInstance,
  DecryptRevealOptions,
} from "@/lib/decrypt-reveal";

type Props = DecryptRevealOptions & {
  children: ReactNode;
  className?: string;
};

/**
 * Flattens every background in the element's ancestor chain into one opaque
 * color.
 *
 * The veil has to match what is actually painted behind the text or it reads as
 * a rectangle sitting on the card rather than the card itself being encrypted.
 * That is more than one layer here — the card is translucent over a translucent
 * frame over the body — so the whole chain gets composited bottom-up rather
 * than assuming a single surface color.
 */
function effectiveBackground(el: HTMLElement, fallback: string) {
  const layers: string[] = [];
  for (let node: HTMLElement | null = el; node; node = node.parentElement) {
    layers.push(getComputedStyle(node).backgroundColor);
  }
  const probe = document.createElement("canvas");
  probe.width = probe.height = 1;
  const ctx = probe.getContext("2d", { willReadFrequently: true });
  if (!ctx) return fallback;
  ctx.fillStyle = fallback;
  ctx.fillRect(0, 0, 1, 1);
  for (let i = layers.length - 1; i >= 0; i--) {
    // an unparseable color leaves fillStyle untouched, so reset to a
    // transparent no-op first rather than repainting the previous layer
    ctx.fillStyle = "rgba(0, 0, 0, 0)";
    ctx.fillStyle = layers[i];
    ctx.fillRect(0, 0, 1, 1);
  }
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return `rgb(${r}, ${g}, ${b})`;
}

function themeColors(content: HTMLElement) {
  const style = getComputedStyle(document.documentElement);
  const base = style.getPropertyValue("--t-bg").trim() || "#0a0a0a";
  return {
    background: effectiveBackground(content, base),
    color: style.getPropertyValue("--t-accent").trim() || "#f0347f",
  };
}

/**
 * Veils its children in cipher glyphs that decrypt under the cursor.
 *
 * The children stay in the DOM untouched — real text, real links, real focus
 * order. This paints an opaque overlay above them that goes transparent inside
 * the cursor circle, so nothing here affects clicks, selection or crawlers.
 *
 * Desktop pointers only. The whole effect is cursor-driven, so on touch it
 * would just be an opaque box over the content; there it never loads at all.
 */
export default function DecryptReveal({ children, className, ...options }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLCanvasElement>(null);
  const instanceRef = useRef<DecryptRevealInstance | null>(null);
  // Captured once: the call site passes literals and the effect only reads
  // them on mount.
  const optionsRef = useRef(options);

  useEffect(() => {
    const content = contentRef.current;
    const output = outputRef.current;
    if (!content || !output) return;

    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const wideQuery = window.matchMedia("(min-width: 768px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!pointerQuery.matches || !wideQuery.matches || motionQuery.matches) return;

    let cancelled = false;
    let themeObserver: MutationObserver | undefined;

    // Dynamic import: the shaders and glyph atlas never reach the bundle for
    // visitors who can't use them.
    import("@/lib/decrypt-reveal").then(({ createDecryptReveal }) => {
      if (cancelled) return;
      const instance = createDecryptReveal(
        { source: document.createElement("canvas"), content, output },
        { ...themeColors(content), ...optionsRef.current },
      );
      if (!instance) return;
      instanceRef.current = instance;

      themeObserver = new MutationObserver(() => {
        instance.setOptions(themeColors(content));
        instance.refresh();
      });
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"],
      });
    });

    return () => {
      cancelled = true;
      themeObserver?.disconnect();
      instanceRef.current?.destroy();
      instanceRef.current = null;
    };
  }, []);

  return (
    <div className={`relative ${className ?? ""}`}>
      <div ref={contentRef}>{children}</div>
      <canvas
        ref={outputRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
    </div>
  );
}

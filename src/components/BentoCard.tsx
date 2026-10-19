"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { sectionView } from "@/lib/analytics";

type Props = {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Analytics name. Reports once, the first time the card is half seen. */
  track?: string;
};

export default function BentoCard({ children, className = "", id, track }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!track || !el) return;

    // Counts as seen once the card reaches the middle half of the viewport.
    // A ratio threshold cannot work here: the work card is taller than the
    // screen, so its ratio never reaches 0.5 and it would never report.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        sectionView(track);
        io.disconnect(); // one report per card per page view
      },
      { rootMargin: "-25% 0px -25% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [track]);

  return (
    <section
      ref={ref}
      id={id}
      className={`relative rounded-xl border border-hairline bg-surface p-6 md:p-8 ${className}`}
    >
      {children}
    </section>
  );
}

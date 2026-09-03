"use client";

import { motion } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import { useReady } from "@/components/Preloader";
import { sectionView } from "@/lib/analytics";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
  /** Analytics name. Reports once, the first time the card is half seen. */
  track?: string;
  /** Hover lift. Off for cards with an overlay that would drift away from it. */
  lift?: boolean;
};

export default function BentoCard({
  children,
  className = "",
  delay = 0,
  id,
  track,
  lift = true,
}: Props) {
  const ready = useReady();
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
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={ready ? { opacity: 1, y: 0 } : {}}
      whileHover={lift ? { y: -3 } : undefined}
      transition={{ duration: 0.5, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`entrance group relative overflow-hidden rounded-xl border border-hairline bg-surface p-6 transition-colors duration-300 hover:border-hairline-bright ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.section>
  );
}

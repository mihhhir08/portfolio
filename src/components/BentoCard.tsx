"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useReady } from "@/components/Preloader";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
};

export default function BentoCard({
  children,
  className = "",
  delay = 0,
  id,
}: Props) {
  const ready = useReady();

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={ready ? { opacity: 1, y: 0 } : {}}
      whileHover={{ y: -3 }}
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

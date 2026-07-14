"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function DigitStrip({
  digit,
  delay,
  animate,
}: {
  digit: number;
  delay: number;
  animate: boolean;
}) {
  return (
    <span className="inline-block h-[1em] overflow-hidden leading-none">
      <motion.span
        className="flex flex-col"
        initial={{ y: 0 }}
        animate={animate ? { y: `${-digit}em` } : {}}
        transition={{
          type: "spring",
          stiffness: 60,
          damping: 14,
          delay,
        }}
      >
        {DIGITS.map((d) => (
          <span key={d} className="h-[1em]">
            {d}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

export default function Odometer({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const chars = value.toLocaleString("en-US").split("");

  if (reduced) {
    return <span className="tabular-nums">{value.toLocaleString("en-US")}</span>;
  }

  let digitIndex = 0;
  const digitTotal = chars.filter((c) => /\d/.test(c)).length;

  return (
    <span ref={ref} className="inline-flex tabular-nums" aria-label={String(value)}>
      {chars.map((c, i) => {
        if (!/\d/.test(c)) {
          return <span key={i}>{c}</span>;
        }
        // stagger right-to-left like a mechanical counter
        const delay = (digitTotal - ++digitIndex) * 0.06;
        return (
          <DigitStrip key={i} digit={+c} delay={delay} animate={inView} />
        );
      })}
    </span>
  );
}

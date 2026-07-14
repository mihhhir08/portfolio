"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Copy } from "lucide-react";
import { EMAIL } from "@/lib/content";

const variants = {
  initial: { y: 8, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -8, opacity: 0 },
};

export default function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked — the address is visible anyway */
    }
  };

  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted">
      {EMAIL}
      <button
        onClick={handleCopy}
        aria-label="Copy email address"
        className="relative inline-flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center overflow-hidden transition-colors hover:text-fg"
      >
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.span
              key="check"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.12 }}
              className="absolute"
            >
              <Check size={13} className="text-status" />
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.18 }}
              className="absolute"
            >
              <Copy size={13} />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </span>
  );
}

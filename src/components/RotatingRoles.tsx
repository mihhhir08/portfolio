"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ROLES } from "@/lib/content";

export default function RotatingRoles() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % ROLES.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="inline-block text-muted">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={ROLES[i]}
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="inline-block"
        >
          {ROLES[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

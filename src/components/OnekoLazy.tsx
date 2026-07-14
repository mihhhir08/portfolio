"use client";

import dynamic from "next/dynamic";

// Below-the-fold nicety — never worth blocking first paint for a cat.
const Oneko = dynamic(() => import("@/components/Oneko"), { ssr: false });

export default function OnekoLazy() {
  return <Oneko />;
}

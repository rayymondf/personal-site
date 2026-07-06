"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export function CyclingWord({ phrases }: { phrases: string[] }) {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % phrases.length);
    }, 2800);
    return () => clearInterval(id);
  }, [phrases.length, reduced]);

  if (reduced) {
    return <span className="font-mono text-accent">{phrases[0]}</span>;
  }

  return (
    <span className="inline-grid overflow-hidden align-bottom">
      {/* invisible longest phrase reserves width so the line never shifts */}
      <span className="invisible col-start-1 row-start-1 font-mono" aria-hidden>
        {phrases.reduce((a, b) => (a.length >= b.length ? a : b))}
      </span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={phrases[index]}
          className="col-start-1 row-start-1 font-mono text-accent whitespace-nowrap"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

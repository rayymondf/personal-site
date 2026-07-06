"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CyclingWord } from "@/components/CyclingWord";
import { cyclingPhrases, links } from "@/lib/data";

const heroLinks = [
  { label: "github", href: links.github, external: true },
  { label: "linkedin", href: links.linkedin, external: true },
  { label: "email", href: links.email, external: false },
  { label: "resume", href: links.resume, external: true },
];

export function Hero() {
  const reduced = useReducedMotion();

  const fade = (i: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: i * 0.09, ease: "easeOut" as const },
        };

  return (
    <section id="top" className="px-6 pt-36 pb-16">
      <div className="mx-auto max-w-3xl">
        <motion.p {...fade(0)} className="mb-6 font-mono text-sm text-muted">
          hi, i&apos;m raymond
        </motion.p>

        <motion.h1
          {...fade(1)}
          className="mb-8 text-4xl font-bold leading-tight tracking-tight sm:text-5xl"
        >
          i teach robots to
          <br />
          <CyclingWord phrases={cyclingPhrases} />
        </motion.h1>

        <motion.p {...fade(2)} className="mb-8 max-w-xl leading-relaxed text-muted">
          ee @ waterloo. i train models, build software, and get it all
          running on real systems.
        </motion.p>

        <motion.p
          {...fade(3)}
          className="mb-10 flex items-center gap-2.5 font-mono text-xs text-muted"
        >
          <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-emerald-500" />
          <span>
            currently: building humanoid manipulation @ watonomous · open to
            fall 2026 internships
          </span>
        </motion.p>

        <motion.div {...fade(4)} className="flex flex-wrap gap-5 font-mono text-sm">
          {heroLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noopener noreferrer" : undefined}
              className="text-fg underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              {l.label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

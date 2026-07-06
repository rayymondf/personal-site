"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import { ProjectModal } from "@/components/sections/ProjectModal";
import { projects } from "@/lib/data";

export function Projects() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const open = projects.find((p) => p.slug === openSlug) ?? null;

  return (
    <section id="projects" className="scroll-mt-20 px-6 py-14">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h2 className="mb-10 font-mono text-sm text-accent">projects</h2>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.06}>
              <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-line transition-colors hover:border-accent/50 hover:bg-accent-glow">
                <button
                  onClick={() => setOpenSlug(p.slug)}
                  className="relative w-full cursor-pointer overflow-hidden text-left"
                  style={{ aspectRatio: "16/9" }}
                  aria-label={`open ${p.name} details`}
                >
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, 350px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </button>
                <div className="flex flex-1 flex-col gap-2.5 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-medium leading-snug text-fg">{p.name}</h3>
                      {p.subtitle && (
                        <p className="mt-0.5 font-mono text-xs text-faint">{p.subtitle}</p>
                      )}
                    </div>
                    <div className="flex shrink-0 gap-2 pt-0.5">
                      {p.repo && (
                        <a
                          href={p.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${p.name} repository`}
                          className="text-faint transition-colors hover:text-accent"
                        >
                          <GithubIcon size={15} />
                        </a>
                      )}
                      {p.demo && (
                        <a
                          href={p.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${p.name} demo`}
                          className="text-faint transition-colors hover:text-accent"
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-muted">{p.oneLiner}</p>
                  <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-1">
                    {p.chips.map((c) => (
                      <span
                        key={c}
                        className="whitespace-nowrap rounded-md border border-line px-2 py-0.5 font-mono text-xs text-faint"
                      >
                        {c}
                      </span>
                    ))}
                    <button
                      onClick={() => setOpenSlug(p.slug)}
                      className="ml-auto font-mono text-xs text-accent transition-opacity hover:opacity-75"
                    >
                      more →
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && <ProjectModal project={open} onClose={() => setOpenSlug(null)} />}
      </AnimatePresence>
    </section>
  );
}

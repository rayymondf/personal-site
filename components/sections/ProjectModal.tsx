"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import type { Project } from "@/lib/data";

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const m = project.modal;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.2 }}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-line bg-bg p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="close"
          className="absolute right-4 top-4 text-faint transition-colors hover:text-accent"
        >
          <X size={18} />
        </button>

        <h2 className="mb-1 text-lg font-semibold text-fg">{project.name}</h2>
        <p className="mb-5 font-mono text-xs text-faint">{m.tagline}</p>

        {m.images ? (
          <div className="mb-6 grid grid-cols-2 gap-3">
            {m.images.map((img) => (
              <figure key={img.src} className="overflow-hidden rounded-xl border border-line">
                <div className="relative w-full bg-surface" style={{ aspectRatio: "4/3" }}>
                  <Image src={img.src} alt={img.caption} fill className="object-contain p-2" />
                </div>
                <figcaption className="py-1.5 text-center font-mono text-xs text-faint">
                  {img.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <figure className="mb-6">
            <div className="overflow-hidden rounded-xl border border-line">
              <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
                <Image src={project.image} alt={project.imageAlt} fill className="object-cover" />
              </div>
            </div>
            {m.imageCaption && (
              <figcaption className="mt-2 text-center font-mono text-xs text-faint">
                {m.imageCaption}
              </figcaption>
            )}
          </figure>
        )}

        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-muted">{m.intro}</p>

          {m.sections.map((sec) => (
            <div key={sec.title} className="rounded-xl border border-line bg-surface p-4">
              <p className="mb-3.5 font-mono text-xs text-accent">{sec.title}</p>
              {sec.kind === "bullets" ? (
                <ul className="space-y-2.5 text-sm leading-relaxed text-muted">
                  {sec.items.map((it) => (
                    <li key={it.text}>
                      {it.lead && <span className="font-medium text-fg">{it.lead} </span>}
                      {it.text}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="space-y-1">
                  {sec.items.map((it) => (
                    <div key={it.text} className="flex gap-3 py-1.5 text-sm">
                      <span className="w-32 shrink-0 leading-relaxed text-faint">{it.lead}</span>
                      <span className="leading-relaxed text-muted">{it.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="flex flex-wrap gap-1.5">
            {m.tags.map((t) => (
              <span
                key={t}
                className="whitespace-nowrap rounded-md border border-line px-2 py-0.5 font-mono text-xs text-faint"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {(project.repo || project.demo) && (
          <div className="mt-6 flex gap-4 font-mono text-sm">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-muted underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent"
              >
                <GithubIcon size={14} /> repo
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-muted underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent"
              >
                <ExternalLink size={14} />
                {project.demo.includes("youtu") ? "demo video" : "live demo"}
              </a>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

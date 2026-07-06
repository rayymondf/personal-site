import { Reveal } from "@/components/Reveal";
import { links } from "@/lib/data";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 px-6 py-14">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h2 className="mb-8 font-mono text-sm text-accent">say hi</h2>
          <p className="mb-8 max-w-xl leading-relaxed text-muted">
            i like talking about systems that move, models that misbehave, and
            why the sim always lies. if you&apos;re hiring for fall 2026, or
            just want to chat, my inbox is open.
          </p>
          <a
            href={links.email}
            className="font-mono text-lg text-accent underline decoration-accent/40 underline-offset-4 transition-opacity hover:opacity-75 sm:text-xl"
          >
            rayymondf29@gmail.com
          </a>
          <p className="mt-6 flex flex-wrap gap-x-2 gap-y-1 font-mono text-xs text-faint">
            <span>also:</span>
            <a href={links.emailSchool} className="transition-colors hover:text-accent">
              r53fang@uwaterloo.ca
            </a>
            <span>·</span>
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
            >
              github
            </a>
            <span>·</span>
            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
            >
              linkedin
            </a>
            <span>·</span>
            <a
              href={links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
            >
              resume
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

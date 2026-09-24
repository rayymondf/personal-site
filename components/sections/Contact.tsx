import { Reveal } from "@/components/Reveal";
import { links } from "@/lib/data";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 px-6 py-14">
      <div className="mx-auto max-w-3xl">
        <Reveal>
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
          </p>
        </Reveal>
      </div>
    </section>
  );
}

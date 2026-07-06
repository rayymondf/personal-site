import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { experience } from "@/lib/data";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 px-6 py-14">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h2 className="mb-10 font-mono text-sm text-accent">work</h2>
        </Reveal>
        <div className="space-y-10">
          {experience.map((e, i) => (
            <Reveal key={e.company} delay={i * 0.05}>
              <div className="flex gap-4">
                <div className="mt-0.5 h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-line bg-surface">
                  <Image
                    src={e.logo}
                    alt={e.company}
                    width={40}
                    height={40}
                    className={`h-full w-full object-contain ${e.logoClass ?? ""}`}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-medium text-fg">
                      {e.company}
                      <span className="text-muted"> · {e.role}</span>
                    </h3>
                    <span className="font-mono text-xs text-faint">{e.period}</span>
                  </div>
                  <ul className="space-y-2">
                    {e.bullets.map((b) => (
                      <li key={b} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

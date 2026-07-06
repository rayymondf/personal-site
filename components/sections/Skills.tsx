import { Reveal } from "@/components/Reveal";
import { skills } from "@/lib/data";

export function Skills() {
  return (
    <section className="px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="mb-4 font-mono text-xs text-faint">things i use</p>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span
                key={s}
                className="rounded-md border border-line px-2.5 py-1 font-mono text-xs text-muted transition-colors hover:border-accent/50 hover:text-fg"
              >
                {s}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

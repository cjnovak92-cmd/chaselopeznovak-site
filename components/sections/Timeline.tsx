import { timeline } from "@/lib/content";
import { Section } from "@/components/Section";

const categoryStyles: Record<
  (typeof timeline)[number]["category"],
  string
> = {
  Education: "bg-accent/20 text-ice",
  Work: "bg-cerulean/20 text-cyan",
  Personal: "bg-magenta/20 text-magenta",
};

export function Timeline() {
  return (
    <Section
      id="timeline"
      label="Timeline"
      title="Education, work, and the experiences that shaped me."
    >
      <ol className="relative space-y-0">
        {timeline.map((entry, index) => (
          <li
            key={`${entry.year}-${entry.title}`}
            className="relative grid gap-4 pb-12 md:grid-cols-[140px_1fr] md:gap-10"
          >
            {index < timeline.length - 1 && (
              <span
                aria-hidden
                className="absolute left-[69px] top-8 hidden h-[calc(100%-1rem)] w-px bg-border md:block"
              />
            )}

            <div className="md:pt-1">
              <time className="text-sm font-medium text-muted">{entry.year}</time>
            </div>

            <div className="rounded-2xl border border-border/80 bg-surface/50 p-6 md:p-7">
              <span
                className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${categoryStyles[entry.category]}`}
              >
                {entry.category}
              </span>
              <h3 className="mt-4 font-serif text-xl text-foreground">{entry.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted md:text-base">
                {entry.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

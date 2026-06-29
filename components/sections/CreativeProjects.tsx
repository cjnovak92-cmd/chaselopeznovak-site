import { projects } from "@/lib/content";
import { Section } from "@/components/Section";

export function CreativeProjects() {
  return (
    <Section id="projects" label="Creative Projects" title="Selected work and ongoing experiments.">
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className="group flex flex-col rounded-2xl border border-border/80 bg-white/50 p-6 transition-all hover:border-accent/30 hover:shadow-sm md:p-8"
          >
            <h3 className="font-serif text-xl text-foreground transition-colors group-hover:text-accent">
              {project.href ? (
                <a href={project.href} className="outline-offset-4 focus-visible:outline-2 focus-visible:outline-accent">
                  {project.title}
                </a>
              ) : (
                project.title
              )}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted md:text-base">
              {project.description}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-border/80 px-3 py-1 text-xs text-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}

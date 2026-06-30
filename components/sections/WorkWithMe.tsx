import { site, workWithMe } from "@/lib/content";
import { Section } from "@/components/Section";

export function WorkWithMe() {
  return (
    <Section
      id="work-with-me"
      label="Work with Me"
      title={workWithMe.headline}
      className="border-b-0"
    >
      <div className="max-w-2xl space-y-5 text-base leading-relaxed text-muted md:text-lg">
        {workWithMe.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
        <a
          href={`mailto:${site.email}`}
          className="inline-flex items-center justify-center rounded-full bg-highlight px-7 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          {workWithMe.cta}
        </a>
        <p className="text-sm text-muted">{site.location}</p>
      </div>
    </Section>
  );
}

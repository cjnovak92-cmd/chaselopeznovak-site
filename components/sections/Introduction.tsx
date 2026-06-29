import { introduction, site } from "@/lib/content";
import { Section } from "@/components/Section";

export function Introduction() {
  return (
    <Section id="introduction" label="Introduction" title={introduction.headline}>
      <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:gap-16">
        <div>
          <p className="font-serif text-2xl leading-snug text-foreground md:text-3xl">
            {site.name}
          </p>
          <p className="mt-3 text-muted">{site.tagline}</p>
        </div>

        <div className="space-y-5 text-base leading-relaxed text-muted md:text-lg">
          {introduction.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </Section>
  );
}

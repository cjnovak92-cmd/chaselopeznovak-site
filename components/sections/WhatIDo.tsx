import { services } from "@/lib/content";
import { Section } from "@/components/Section";

export function WhatIDo() {
  return (
    <Section id="what-i-do" label="What I Do" title="Clarity, craft, and collaboration.">
      <div className="grid gap-6 sm:grid-cols-2">
        {services.map((service) => (
          <article
            key={service.title}
            className="rounded-2xl border border-border/80 bg-white/50 p-6 transition-shadow hover:shadow-sm md:p-8"
          >
            <h3 className="font-serif text-xl text-foreground">{service.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
              {service.description}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}

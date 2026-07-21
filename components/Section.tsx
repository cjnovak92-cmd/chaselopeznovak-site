import { ReactNode } from "react";

type SectionProps = {
  id: string;
  label?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
};

export function Section({
  id,
  label,
  title,
  subtitle,
  children,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`scroll-mt-[calc(var(--spacing-masthead)+1rem)] border-b border-border py-section ${className}`}
    >
      <div className="mx-auto max-w-content px-site-gutter">
        <header className="section-heading mb-12 md:mb-16">
          {label ? (
            <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-label text-muted after:h-px after:w-10 after:bg-timeline-gold/60">
              {label}
            </p>
          ) : null}
          <h2
            id={`${id}-heading`}
            className="section-heading__title max-w-reading font-serif text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.02] tracking-[-0.03em] text-foreground"
          >
            {title}
          </h2>
          {subtitle ? (
            <p className="section-heading__subtitle mt-4 max-w-reading text-[clamp(1rem,1.6vw,1.2rem)] leading-relaxed text-muted">
              {subtitle}
            </p>
          ) : null}
        </header>
        {children}
      </div>
    </section>
  );
}

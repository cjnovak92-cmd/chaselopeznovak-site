import { ReactNode } from "react";

type SectionProps = {
  id: string;
  label: string;
  title: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, label, title, children, className = "" }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`scroll-mt-[calc(var(--spacing-masthead)+1rem)] border-b border-border py-section ${className}`}
    >
      <div className="mx-auto max-w-content px-site-gutter">
        <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-label text-muted after:h-px after:w-10 after:bg-timeline-gold/60">
          {label}
        </p>
        <h2
          id={`${id}-heading`}
          className="mb-12 max-w-reading font-serif text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.02] tracking-[-0.03em] text-foreground md:mb-16"
        >
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

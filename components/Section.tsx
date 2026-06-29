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
      className={`scroll-mt-20 border-b border-border/60 py-20 md:py-28 ${className}`}
    >
      <div className="mx-auto max-w-5xl px-6">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted">
          {label}
        </p>
        <h2
          id={`${id}-heading`}
          className="mb-10 max-w-2xl font-serif text-3xl tracking-tight text-foreground md:text-4xl"
        >
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

import { site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-border bg-paper-raised/50">
      <div className="mx-auto flex max-w-reading flex-col items-center px-site-gutter py-10 text-center md:py-12">
        <p className="max-w-[40rem] font-serif text-[clamp(1.05rem,2vw,1.25rem)] font-medium leading-snug text-foreground">
          Conceptualized, Designed, and Directed by{" "}
          <span className="whitespace-nowrap">
            <span className="text-brand-blue">Chase</span>{" "}
            <span className="text-brand-green">Lopez</span>{" "}
            <span className="text-brand-red">Novak</span>
          </span>
          .
        </p>
        <p className="mt-2 text-sm font-medium leading-relaxed text-muted">
          Engineered with OpenAI Codex.
        </p>
        <p className="mt-5 text-xs font-semibold tracking-[0.08em] text-foreground">
          Version {site.version}
        </p>
        <p className="mt-2 text-[0.6875rem] leading-relaxed text-muted">
          © {site.copyrightYear} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

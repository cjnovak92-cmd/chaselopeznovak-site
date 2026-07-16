import { site } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-paper-raised/50">
      <div className="mx-auto flex max-w-content flex-col gap-2 px-site-gutter py-12 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p className="font-serif text-base text-foreground">
          © {year} {site.name}
        </p>
        <p className="text-xs font-medium tracking-[0.04em] text-muted">
          A living portfolio — updated as the work evolves.
        </p>
      </div>
    </footer>
  );
}

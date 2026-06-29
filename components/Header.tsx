import Link from "next/link";
import { navigation, site } from "@/lib/content";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-6 py-4">
        <Link
          href="/"
          className="font-serif text-lg tracking-tight text-foreground transition-opacity hover:opacity-70"
        >
          {site.name}
        </Link>

        <nav aria-label="Primary" className="max-w-[60vw] md:max-w-none">
          <ul className="flex items-center gap-4 overflow-x-auto md:gap-6">
            {navigation.map((item) => (
              <li key={item.id} className="shrink-0">
                <a
                  href={`#${item.id}`}
                  className="text-xs text-muted transition-colors hover:text-foreground md:text-sm"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

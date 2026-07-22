import Image from "next/image";
import { site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-border bg-paper-raised/50">
      <div className="mx-auto flex max-w-reading flex-col items-center px-site-gutter py-10 text-center md:py-12">
        <div className="flex max-w-[40rem] flex-col items-center">
          <p className="font-serif text-[clamp(1.05rem,2vw,1.25rem)] font-medium leading-snug text-foreground">
            Conceptualized, Designed, Directed and all Words Written by{" "}
            <span className="whitespace-nowrap">
              <span className="text-brand-blue">Chase</span>{" "}
              <span className="text-brand-green">Lopez</span>{" "}
              <span className="text-brand-red">Novak</span>
            </span>
            .
          </p>
          <div className="colophon-portrait">
            <Image
              src="/images/profile/chase-colophon.webp"
              alt="Chase Lopez Novak smiling."
              width={600}
              height={600}
              sizes="(min-width: 40rem) 8rem, 6.5rem"
              className="colophon-portrait__image"
            />
          </div>
          <p className="mt-2 text-sm font-medium leading-relaxed text-muted">
            Engineered with OpenAI Codex.
          </p>
        </div>

        <div className="mt-6 flex max-w-[40rem] flex-col items-center gap-1 text-sm leading-relaxed">
          <p className="font-medium text-foreground">
            Built with Next.js, TypeScript, and Tailwind CSS.
          </p>
          <p className="text-muted">Deployed and hosted on Vercel.</p>
        </div>

        <div className="mt-6 flex flex-col items-center">
          <p className="text-xs font-semibold tracking-[0.08em] text-foreground">
            Version {site.version}
          </p>
          <p className="mt-2 text-[0.6875rem] leading-relaxed text-muted">
            © {site.copyrightYear} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

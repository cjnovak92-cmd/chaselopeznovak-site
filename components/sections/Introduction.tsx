import { Wordmark } from "@/components/Wordmark";
import { introduction, site } from "@/lib/content";

export function Introduction() {
  return (
    <section
      id="introduction"
      aria-labelledby="introduction-heading"
      className="homepage-hero scroll-mt-[var(--spacing-masthead)] border-b border-border"
    >
      <div className="mx-auto max-w-content px-site-gutter">
        <div className="hero-identity">
          <Wordmark
            name={site.name}
            variant="vertical"
            as="h1"
            className="hero-wordmark"
          />
          <span
            id="hero-wordmark-sentinel"
            aria-hidden="true"
            className="hero-wordmark-sentinel"
          />
          <p className="hero-tagline">{site.tagline}</p>
          <span aria-hidden="true" className="hero-ornament">
            <span />
            <span>✦</span>
            <span />
          </span>
        </div>

        <div className="hero-introduction">
          <div className="hero-introduction__content">
            <h2
              id="introduction-heading"
              aria-label={introduction.headingLines.join(" ")}
              className="hero-heading"
            >
              {introduction.headingLines.map((line) => (
                <span
                  key={line}
                  aria-hidden="true"
                  className="hero-heading__line"
                >
                  {line}
                </span>
              ))}
            </h2>
            <p className="hero-introduction__paragraph">
              {introduction.paragraph}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

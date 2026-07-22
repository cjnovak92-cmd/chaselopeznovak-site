import Image from "next/image";
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
          <h1 aria-label={site.name} className="hero-wordmark">
            <Image
              src="/images/brand/chase-lopez-novak-wordmark.png"
              alt=""
              width={741}
              height={758}
              priority
              sizes="(max-width: 48rem) 15rem, 24rem"
              className="hero-wordmark__image"
            />
          </h1>
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
      </div>
    </section>
  );
}

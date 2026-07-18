import type { Metadata } from "next";
import Link from "next/link";
import { essays } from "@/content/essays";

export const metadata: Metadata = {
  title: "Essays",
};

export default function EssaysPage() {
  return (
    <div className="essay-index-page">
      <header className="essay-index-header mx-auto max-w-content px-site-gutter">
        <Link href="/creative-work" className="essay-back-link">
          <span aria-hidden="true">←</span> Creative Work
        </Link>
        <p className="essay-kicker">Writing</p>
        <h1>Essays</h1>
        <p className="essay-index-count">
          {essays.length} published {essays.length === 1 ? "essay" : "essays"}
        </p>
      </header>

      <section
        aria-label="Published essays"
        className="essay-index-list mx-auto max-w-content px-site-gutter"
      >
        {essays.map((essay, index) => (
          <article key={essay.slug} className="essay-index-entry">
            <p className="essay-index-entry__number">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h2>
              <Link href={`/creative-work/essays/${essay.slug}`}>
                {essay.title}
              </Link>
            </h2>
            <time dateTime={essay.publishedDate}>{essay.publishedLabel}</time>
          </article>
        ))}
      </section>
    </div>
  );
}

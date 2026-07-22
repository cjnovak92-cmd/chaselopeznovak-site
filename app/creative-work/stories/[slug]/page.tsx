import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStoryBySlug, stories } from "@/content/stories";
import { site } from "@/lib/content";
import { getPageMetadata } from "@/lib/metadata";

type StoryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return stories
    .filter((story) => story.detail)
    .map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({
  params,
}: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

  if (!story?.detail) {
    return {};
  }

  const description = story.detail.formats[0]?.logline ?? site.tagline;

  return getPageMetadata({
    title: story.title,
    description,
    path: `/creative-work/stories/${story.slug}`,
    type: "article",
  });
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

  if (!story?.detail) {
    notFound();
  }

  return (
    <article className="story-detail-page">
      <header className="story-detail-header mx-auto px-site-gutter">
        <Link href="/creative-work/stories" className="story-back-link">
          <span aria-hidden="true">←</span> Stories
        </Link>
        <p className="story-kicker">Screenplay</p>
        <h1
          aria-label={story.titleLines ? story.title : undefined}
          className={story.titleLines ? "story-detail-title--stacked" : undefined}
        >
          {story.titleLines
            ? story.titleLines.map((line) => (
                <span key={line} aria-hidden="true">
                  {line}
                </span>
              ))
            : story.title}
        </h1>
        <p className="story-detail-author">Written by {story.detail.author}</p>
        {story.detail.dedication && (
          <p className="story-detail-dedication">{story.detail.dedication}</p>
        )}
        {story.detail.sequenceNote && (
          <p className="story-detail-sequence">{story.detail.sequenceNote}</p>
        )}
      </header>

      <div className="story-formats mx-auto max-w-content px-site-gutter">
        {story.detail.formats.map((format, index) => (
          <section key={format.title} className="story-format">
            <p className="story-format__number">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h2>{format.title}</h2>
            <div className="story-format__logline">
              <h3>Logline</h3>
              <p>{format.logline}</p>
            </div>
            {format.setting && (
              <p className="story-format__setting">{format.setting}</p>
            )}
            {format.comparison && (
              <p className="story-format__comparison">{format.comparison}</p>
            )}
            {format.status && (
              <p className="story-format__status">{format.status}</p>
            )}
          </section>
        ))}
      </div>
    </article>
  );
}

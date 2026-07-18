import type { Metadata } from "next";
import Link from "next/link";
import {
  StoriesExplorer,
  type StoriesExplorerCollection,
} from "@/components/stories/StoriesExplorer";
import { stories, storyCollections } from "@/content/stories";

export const metadata: Metadata = {
  title: "Stories",
};

export default function StoriesPage() {
  const storiesBySlug = new Map(stories.map((story) => [story.slug, story]));
  const collections: StoriesExplorerCollection[] = storyCollections.map(
    (collection) => ({
      id: collection.id,
      title: collection.title,
      titleLines: collection.titleLines,
      stories: collection.storySlugs.flatMap((slug) => {
        const story = storiesBySlug.get(slug);

        return story
          ? [
              {
                slug: story.slug,
                title: story.title,
                comparison: story.comparison,
                descriptor: story.descriptor,
                status: story.status,
                hasDetail: Boolean(story.detail),
              },
            ]
          : [];
      }),
    }),
  );

  return (
    <div className="stories-index-page">
      <header className="stories-index-header mx-auto max-w-content px-site-gutter">
        <Link href="/creative-work" className="story-back-link">
          <span aria-hidden="true">←</span> Creative Work
        </Link>
        <h1>Stories</h1>
        <p className="stories-index-count">Choose a collection to explore.</p>
      </header>

      <section
        aria-label="Story collections"
        className="mx-auto max-w-content px-site-gutter"
      >
        <StoriesExplorer collections={collections} />
      </section>
    </div>
  );
}

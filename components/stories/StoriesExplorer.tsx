"use client";

import Link from "next/link";
import { useState } from "react";

export type StoriesExplorerStory = {
  slug: string;
  title: string;
  comparison?: string;
  descriptor?: string;
  status?: string;
  hasDetail: boolean;
};

export type StoriesExplorerCollection = {
  id: string;
  title: string;
  titleLines: string[];
  stories: StoriesExplorerStory[];
};

type StoriesExplorerProps = {
  collections: StoriesExplorerCollection[];
};

export function StoriesExplorer({ collections }: StoriesExplorerProps) {
  const [activeCollectionId, setActiveCollectionId] = useState<string | null>(
    null,
  );
  const activeCollection = collections.find(
    (collection) => collection.id === activeCollectionId,
  );

  return (
    <div className="stories-explorer">
      <div className="story-collection-grid">
        {collections.map((collection, index) => {
          const isActive = collection.id === activeCollectionId;
          const panelId = `story-collection-${collection.id}`;

          return (
            <button
              key={collection.id}
              type="button"
              className="story-collection-button"
              data-collection={collection.id}
              aria-expanded={isActive}
              aria-controls={panelId}
              onClick={() =>
                setActiveCollectionId(isActive ? null : collection.id)
              }
            >
              <span aria-hidden="true" className="story-collection-button__number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="story-collection-button__title">
                {collection.titleLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </span>
              <span className="story-collection-button__count">
                {collection.stories.length}{" "}
                {collection.stories.length === 1 ? "title" : "titles"}
              </span>
              <span aria-hidden="true" className="story-collection-button__symbol">
                {isActive ? "−" : "+"}
              </span>
            </button>
          );
        })}
      </div>

      {activeCollection && (
        <section
          id={`story-collection-${activeCollection.id}`}
          aria-labelledby={`story-collection-heading-${activeCollection.id}`}
          className="story-collection-panel"
        >
          <header className="story-collection-panel__header">
            <p>Selected collection</p>
            <h2 id={`story-collection-heading-${activeCollection.id}`}>
              {activeCollection.title}
            </h2>
          </header>

          <div className="story-reveal-grid">
            {activeCollection.stories.map((story, index) =>
              story.hasDetail ? (
                <Link
                  key={story.slug}
                  href={`/creative-work/stories/${story.slug}`}
                  className="story-reveal story-reveal--link"
                >
                  <span aria-hidden="true" className="story-reveal__number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="story-reveal__title">{story.title}</span>
                  <span aria-hidden="true" className="story-reveal__symbol">
                    →
                  </span>
                </Link>
              ) : (
                <details key={story.slug} className="story-reveal">
                  <summary>
                    <span aria-hidden="true" className="story-reveal__number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="story-reveal__title">{story.title}</span>
                    <span aria-hidden="true" className="story-reveal__symbol">
                      +
                    </span>
                  </summary>

                  <div className="story-reveal__details">
                    {story.comparison && (
                      <p className="story-reveal__comparison">
                        {story.comparison}
                      </p>
                    )}
                    {story.descriptor && (
                      <p className="story-reveal__descriptor">
                        {story.descriptor}
                      </p>
                    )}
                    {story.status && (
                      <p className="story-reveal__status">{story.status}</p>
                    )}
                  </div>
                </details>
              ),
            )}
          </div>
        </section>
      )}
    </div>
  );
}

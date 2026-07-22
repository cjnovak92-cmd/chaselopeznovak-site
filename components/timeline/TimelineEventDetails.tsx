import Image from "next/image";
import type { TimelinePresentationEvent } from "@/components/timeline/types";

type TimelineEventDetailsProps = {
  event: TimelinePresentationEvent;
  onClearSelection: () => void;
  detailId: string;
};

export function TimelineEventDetails({
  event,
  onClearSelection,
  detailId,
}: TimelineEventDetailsProps) {
  const astrologyMarker = "\nAstrology:";
  const astrologyIndex = event.description?.indexOf(astrologyMarker) ?? -1;
  const description =
    astrologyIndex >= 0
      ? event.description?.slice(0, astrologyIndex).trim()
      : event.description;
  const astrology =
    astrologyIndex >= 0
      ? event.description
          ?.slice(astrologyIndex + astrologyMarker.length)
          .trim()
          .split(/,\s*/)
      : undefined;

  return (
    <article
      id={detailId}
      className="timeline-event-details"
      data-category={event.category}
      data-has-description={Boolean(event.description)}
      aria-label={`Details for ${event.title}`}
    >
      <div className="timeline-event-details__actions">
        <button
          type="button"
          className="timeline-event-details__close"
          aria-label={`Close details for ${event.title}`}
          onClick={onClearSelection}
        >
          <span aria-hidden>×</span>
        </button>
      </div>

      {event.description && (
        <div className="timeline-event-details__description">
          <p>{description}</p>
          {astrology && (
            <div className="timeline-event-details__astrology">
              <p>Astrology:</p>
              <ul>
                {astrology.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {event.image && event.imageAlt && (
        <div className="timeline-event-details__media">
          <Image
            src={event.image}
            alt={event.imageAlt}
            fill
            sizes="(min-width: 1024px) 340px, calc(100vw - 6rem)"
            className="timeline-event-details__image"
          />
        </div>
      )}
    </article>
  );
}

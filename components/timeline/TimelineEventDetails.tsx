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
  return (
    <article
      id={detailId}
      className="timeline-event-details"
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
        <p className="timeline-event-details__description">
          {event.description}
        </p>
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

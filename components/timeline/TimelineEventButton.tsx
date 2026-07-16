import type { TimelinePresentationEvent } from "@/components/timeline/types";

type TimelineEventButtonProps = {
  event: TimelinePresentationEvent;
  canExpand: boolean;
  isSelected: boolean;
  onSelect?: () => void;
};

export function TimelineEventButton({
  event,
  canExpand,
  isSelected,
  onSelect,
}: TimelineEventButtonProps) {
  const content = (
    <>
      <time
        className="timeline-event-button__date"
        dateTime={String(event.yearStart)}
      >
        {event.dateLabel}
      </time>
      <span className="timeline-event-button__title">{event.title}</span>
      <span
        className="timeline-event-button__category timeline-category"
        data-category={event.category}
      >
        {event.category}
      </span>
      {canExpand && (
        <span className="timeline-event-button__action" aria-hidden>
          {isSelected ? "Selected" : "View"}
          <span>→</span>
        </span>
      )}
    </>
  );

  if (!canExpand) {
    return (
      <div
        className="timeline-event-button timeline-event-button--static"
        data-category={event.category}
      >
        {content}
      </div>
    );
  }

  return (
    <button
      type="button"
      className="timeline-event-button"
      data-category={event.category}
      data-timeline-event-id={event.id}
      aria-pressed={isSelected}
      aria-expanded={isSelected}
      aria-controls={
        isSelected
          ? `mobile-${event.id}-details desktop-${event.id}-details`
          : undefined
      }
      onClick={onSelect}
    >
      {content}
    </button>
  );
}

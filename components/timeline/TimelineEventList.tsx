import { TimelineEventButton } from "@/components/timeline/TimelineEventButton";
import { TimelineEventDetails } from "@/components/timeline/TimelineEventDetails";
import {
  hasTimelineEventDetails,
  type TimelinePresentationEvent,
} from "@/components/timeline/types";

type TimelineEventListProps = {
  events: TimelinePresentationEvent[];
  selectedEventId: string | null;
  onSelectEvent: (eventId: string) => void;
  onClearSelection: () => void;
};

export function TimelineEventList({
  events,
  selectedEventId,
  onSelectEvent,
  onClearSelection,
}: TimelineEventListProps) {
  return (
    <div className="timeline-event-list-shell">
      <p className="timeline-region-label">Timeline</p>
      {events.length > 0 ? (
        <ol className="timeline-event-list">
          {events.map((event) => {
            const canExpand = hasTimelineEventDetails(event);
            const isSelected = canExpand && selectedEventId === event.id;

            return (
              <li
                key={event.id}
                className="timeline-event"
                data-selected={isSelected || undefined}
              >
                <span className="timeline-event__node" aria-hidden />
                <TimelineEventButton
                  event={event}
                  canExpand={canExpand}
                  isSelected={isSelected}
                  onSelect={
                    canExpand ? () => onSelectEvent(event.id) : undefined
                  }
                />
                {isSelected && (
                  <div className="timeline-event__mobile-details">
                    <TimelineEventDetails
                      event={event}
                      detailId={`mobile-${event.id}-details`}
                      onClearSelection={onClearSelection}
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      ) : (
        <div className="timeline-zero-state">
          <p>No timeline events match this filter.</p>
        </div>
      )}
    </div>
  );
}

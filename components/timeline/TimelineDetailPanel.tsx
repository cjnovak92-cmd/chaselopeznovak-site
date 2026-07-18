import { TimelineEventDetails } from "@/components/timeline/TimelineEventDetails";
import type { TimelinePresentationEvent } from "@/components/timeline/types";

type TimelineDetailPanelProps = {
  event: TimelinePresentationEvent | null;
  onClearSelection: () => void;
};

export function TimelineDetailPanel({
  event,
  onClearSelection,
}: TimelineDetailPanelProps) {
  return (
    <aside
      className="timeline-detail-region"
      aria-label={event ? undefined : "Memoryline event details"}
    >
      <div className="timeline-detail-panel">
        {event ? (
          <TimelineEventDetails
            event={event}
            detailId={`desktop-${event.id}-details`}
            onClearSelection={onClearSelection}
          />
        ) : (
          <div className="timeline-detail-empty">
            <span className="timeline-detail-empty__ornament" aria-hidden>
              ✦
            </span>
            <h3>Select an event</h3>
            <p>Choose an event from the memoryline to read its details.</p>
          </div>
        )}
      </div>
    </aside>
  );
}

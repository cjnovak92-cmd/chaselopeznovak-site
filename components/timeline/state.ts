import type {
  TimelineFilter,
  TimelinePresentationEvent,
} from "@/components/timeline/types";

export function filterTimelineEvents(
  events: TimelinePresentationEvent[],
  filter: TimelineFilter,
): TimelinePresentationEvent[] {
  return filter === "All"
    ? events
    : events.filter((event) => event.category === filter);
}

export function getVisibleTimelineSelection(
  events: TimelinePresentationEvent[],
  filter: TimelineFilter,
  selectedEventId: string | null,
): string | null {
  if (!selectedEventId) {
    return null;
  }

  return filterTimelineEvents(events, filter).some(
    (event) => event.id === selectedEventId,
  )
    ? selectedEventId
    : null;
}

import type {
  TimelineCategory,
  TimelineEvent,
} from "@/lib/timeline/types";

export type TimelineFilter = "All" | TimelineCategory;

export type TimelinePresentationEvent = Omit<TimelineEvent, "visibility"> & {
  id: string;
};

export function hasTimelineEventDetails(
  event: TimelinePresentationEvent,
): boolean {
  return Boolean(event.description || event.image);
}

import type { TimelineEvent } from "./types";

type ChronologicalTimelineEvent = Pick<
  TimelineEvent,
  "yearStart" | "sortOrder"
>;

export function compareTimelineEventsByChronology(
  left: ChronologicalTimelineEvent,
  right: ChronologicalTimelineEvent,
): number {
  const yearDifference = left.yearStart - right.yearStart;

  if (yearDifference !== 0) {
    return yearDifference;
  }

  return (left.sortOrder ?? 0) - (right.sortOrder ?? 0);
}

export function sortTimelineEvents<T extends ChronologicalTimelineEvent>(
  events: readonly T[],
): T[] {
  return [...events].sort(compareTimelineEventsByChronology);
}

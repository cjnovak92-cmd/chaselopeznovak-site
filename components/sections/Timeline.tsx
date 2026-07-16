import { Section } from "@/components/Section";
import { TimelineExplorer } from "@/components/timeline/TimelineExplorer";
import type { TimelinePresentationEvent } from "@/components/timeline/types";
import { loadTimelineEvents } from "@/lib/timeline/load.server";
import {
  TIMELINE_CATEGORIES,
  type TimelineEvent,
} from "@/lib/timeline/types";

function createPresentationId(
  event: Pick<TimelineEvent, "yearStart" | "sortOrder">,
  index: number,
): string {
  return `timeline-${event.yearStart}-${event.sortOrder ?? "only"}-${index}`;
}

function toPresentationEvent(
  event: TimelineEvent,
  index: number,
): TimelinePresentationEvent {
  const presentationEvent = {
    id: createPresentationId(event, index),
    title: event.title,
    dateLabel: event.dateLabel,
    yearStart: event.yearStart,
    yearEnd: event.yearEnd,
    sortOrder: event.sortOrder,
    description: event.description,
    category: event.category,
  };

  return event.image
    ? {
        ...presentationEvent,
        image: event.image,
        imageAlt: event.imageAlt,
      }
    : presentationEvent;
}

export function Timeline() {
  const timeline = loadTimelineEvents();
  const events = timeline.map(toPresentationEvent);

  return (
    <Section
      id="timeline"
      label="Timeline"
      title="Education, work, and the experiences that shaped me."
      className="timeline-section"
    >
      <TimelineExplorer events={events} categories={TIMELINE_CATEGORIES} />
    </Section>
  );
}

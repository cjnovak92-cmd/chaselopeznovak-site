"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { TimelineDetailPanel } from "@/components/timeline/TimelineDetailPanel";
import { TimelineEventList } from "@/components/timeline/TimelineEventList";
import { TimelineFilters } from "@/components/timeline/TimelineFilters";
import {
  filterTimelineEvents,
  getVisibleTimelineSelection,
} from "@/components/timeline/state";
import {
  hasTimelineEventDetails,
  type TimelineFilter,
  type TimelinePresentationEvent,
} from "@/components/timeline/types";
import type { TimelineCategory } from "@/lib/timeline/types";

type TimelineExplorerProps = {
  events: TimelinePresentationEvent[];
  categories: readonly TimelineCategory[];
};

export function TimelineExplorer({
  events,
  categories,
}: TimelineExplorerProps) {
  const [selectedFilter, setSelectedFilter] =
    useState<TimelineFilter>("All");
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const counts = useMemo(() => {
    const categoryCounts = Object.fromEntries(
      categories.map((category) => [category, 0]),
    ) as Record<TimelineCategory, number>;

    for (const event of events) {
      categoryCounts[event.category] += 1;
    }

    return categoryCounts;
  }, [categories, events]);

  const visibleEvents = useMemo(
    () => filterTimelineEvents(events, selectedFilter),
    [events, selectedFilter],
  );

  const selectedEvent = selectedEventId
    ? (events.find(
        (event) =>
          event.id === selectedEventId && hasTimelineEventDetails(event),
      ) ?? null)
    : null;

  const handleFilterChange = (filter: TimelineFilter) => {
    setSelectedFilter(filter);
    setSelectedEventId((currentId) =>
      getVisibleTimelineSelection(events, filter, currentId),
    );
  };

  const clearSelection = useCallback(() => {
    const eventId = selectedEventId;
    setSelectedEventId(null);

    if (eventId) {
      window.requestAnimationFrame(() => {
        document
          .querySelector<HTMLButtonElement>(
            `[data-timeline-event-id="${eventId}"]`,
          )
          ?.focus();
      });
    }
  }, [selectedEventId]);

  useEffect(() => {
    if (!selectedEventId) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        clearSelection();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [clearSelection, selectedEventId]);

  return (
    <div className="timeline-explorer">
      <div className="timeline-filter-region">
        <TimelineFilters
          categories={categories}
          counts={counts}
          totalCount={events.length}
          selectedFilter={selectedFilter}
          onFilterChange={handleFilterChange}
        />
      </div>

      <div className="timeline-list-region">
        <TimelineEventList
          events={visibleEvents}
          selectedEventId={selectedEventId}
          onSelectEvent={setSelectedEventId}
          onClearSelection={clearSelection}
        />
      </div>

      <TimelineDetailPanel
        event={selectedEvent}
        onClearSelection={clearSelection}
      />
    </div>
  );
}

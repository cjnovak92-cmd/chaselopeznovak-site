import type {
  TimelineFilter,
  TimelinePresentationEvent,
} from "@/components/timeline/types";
import type { TimelineCategory } from "@/lib/timeline/types";

type TimelineFiltersProps = {
  categories: readonly TimelineCategory[];
  counts: Record<TimelineCategory, number>;
  totalCount: number;
  selectedFilter: TimelineFilter;
  onFilterChange: (filter: TimelineFilter) => void;
};

type FilterOption = {
  value: TimelineFilter;
  label: string;
  count: number;
  category?: TimelinePresentationEvent["category"];
};

export function TimelineFilters({
  categories,
  counts,
  totalCount,
  selectedFilter,
  onFilterChange,
}: TimelineFiltersProps) {
  const options: FilterOption[] = [
    { value: "All", label: "All Events", count: totalCount },
    ...categories.map((category) => ({
      value: category,
      label: category,
      count: counts[category],
      category,
    })),
  ];

  return (
    <fieldset className="timeline-filters">
      <legend className="timeline-region-label">Filter memoryline</legend>
      <div className="timeline-filters__scroller">
        <div className="timeline-filters__list">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className="timeline-filter-button"
              data-category={option.category}
              aria-pressed={selectedFilter === option.value}
              onClick={() => onFilterChange(option.value)}
            >
              <span className="timeline-filter-button__marker" aria-hidden />
              <span>{option.label}</span>
              <span className="timeline-filter-button__count">
                {option.count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </fieldset>
  );
}

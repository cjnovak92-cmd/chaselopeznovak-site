export const TIMELINE_CSV_HEADERS = [
  "Title",
  "dateLabel",
  "yearStart",
  "yearEnd",
  "sortOrder",
  "Description",
  "Category",
  "Image",
  "imageAlt",
  "Visibility",
] as const;

export const TIMELINE_CATEGORIES = [
  "Life",
  "Education",
  "Passions",
  "Service",
  "Work",
] as const;

export const TIMELINE_VISIBILITIES = ["Public"] as const;

export type TimelineCsvHeader = (typeof TIMELINE_CSV_HEADERS)[number];
export type TimelineCategory = (typeof TIMELINE_CATEGORIES)[number];
export type TimelineVisibility = (typeof TIMELINE_VISIBILITIES)[number];

export type RawTimelineRow = Record<TimelineCsvHeader, string>;

type TimelineMedia =
  | {
      image: string;
      imageAlt: string;
    }
  | {
      image?: undefined;
      imageAlt?: undefined;
    };

export type TimelineEvent = {
  title: string;
  dateLabel: string;
  yearStart: number;
  yearEnd?: number;
  sortOrder?: number;
  description?: string;
  category: TimelineCategory;
  visibility: TimelineVisibility;
} & TimelineMedia;

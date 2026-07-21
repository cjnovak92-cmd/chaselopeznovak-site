import { parse } from "csv-parse/sync";
import {
  TIMELINE_CATEGORIES,
  TIMELINE_CSV_HEADERS,
  TIMELINE_VISIBILITIES,
  type RawTimelineRow,
  type TimelineCategory,
  type TimelineCsvHeader,
  type TimelineEvent,
  type TimelineVisibility,
} from "./types";

export type ParsedTimelineEvent = {
  event: TimelineEvent;
  rowNumber: number;
};

const YEAR_PATTERN = /^\d{4}$/;
const POSITIVE_INTEGER_PATTERN = /^[1-9]\d*$/;

function validationError(
  rowNumber: number,
  field: TimelineCsvHeader,
  message: string,
): Error {
  return new Error(
    `Timeline CSV row ${rowNumber}, field "${field}": ${message}`,
  );
}

function requiredValue(
  row: RawTimelineRow,
  rowNumber: number,
  field: TimelineCsvHeader,
): string {
  const value = row[field];

  if (!value) {
    throw validationError(rowNumber, field, "a non-empty value is required");
  }

  return value;
}

function optionalValue(value: string): string | undefined {
  return value || undefined;
}

function parseYear(
  value: string,
  rowNumber: number,
  field: "yearStart" | "yearEnd",
): number {
  if (!YEAR_PATTERN.test(value)) {
    throw validationError(rowNumber, field, "expected a four-digit year");
  }

  return Number(value);
}

function parseSortOrder(value: string, rowNumber: number): number | undefined {
  if (!value) {
    return undefined;
  }

  if (!POSITIVE_INTEGER_PATTERN.test(value)) {
    throw validationError(
      rowNumber,
      "sortOrder",
      "expected a positive integer",
    );
  }

  return Number(value);
}

function parseCategory(value: string, rowNumber: number): TimelineCategory {
  if (!TIMELINE_CATEGORIES.some((category) => category === value)) {
    throw validationError(
      rowNumber,
      "Category",
      `expected one of: ${TIMELINE_CATEGORIES.join(", ")}`,
    );
  }

  return value as TimelineCategory;
}

function parseVisibility(value: string, rowNumber: number): TimelineVisibility {
  if (!TIMELINE_VISIBILITIES.some((visibility) => visibility === value)) {
    throw validationError(
      rowNumber,
      "Visibility",
      `unknown value "${value}"; expected one of: ${TIMELINE_VISIBILITIES.join(", ")}`,
    );
  }

  return value as TimelineVisibility;
}

function validateImagePath(image: string, rowNumber: number): void {
  const segments = image.slice(1).split("/");

  if (
    !image.startsWith("/") ||
    image.includes("\\") ||
    image.includes("\0") ||
    image.includes("?") ||
    image.includes("#") ||
    segments.some(
      (segment) => !segment || segment === "." || segment === "..",
    )
  ) {
    throw validationError(
      rowNumber,
      "Image",
      "expected a public-root-relative path without traversal segments",
    );
  }
}

function normalizeRow(row: RawTimelineRow, rowNumber: number): TimelineEvent {
  const title = requiredValue(row, rowNumber, "Title");
  const dateLabel = requiredValue(row, rowNumber, "dateLabel");
  const yearStart = parseYear(
    requiredValue(row, rowNumber, "yearStart"),
    rowNumber,
    "yearStart",
  );
  const yearEndValue = optionalValue(row.yearEnd);
  const yearEnd = yearEndValue
    ? parseYear(yearEndValue, rowNumber, "yearEnd")
    : undefined;
  const sortOrder = parseSortOrder(row.sortOrder, rowNumber);
  const description = optionalValue(row.Description);
  const category = parseCategory(
    requiredValue(row, rowNumber, "Category"),
    rowNumber,
  );
  const visibility = parseVisibility(
    requiredValue(row, rowNumber, "Visibility"),
    rowNumber,
  );
  const image = optionalValue(row.Image);
  const imageAlt = optionalValue(row.imageAlt);

  if (yearEnd !== undefined && yearEnd <= yearStart) {
    throw validationError(
      rowNumber,
      "yearEnd",
      "must be later than yearStart",
    );
  }

  if (image) {
    validateImagePath(image, rowNumber);

    if (!imageAlt) {
      throw validationError(
        rowNumber,
        "imageAlt",
        "a meaningful value is required when Image is populated",
      );
    }

    return {
      title,
      dateLabel,
      yearStart,
      yearEnd,
      sortOrder,
      description,
      category,
      visibility,
      image,
      imageAlt,
    };
  }

  if (imageAlt) {
    throw validationError(
      rowNumber,
      "imageAlt",
      "must be empty when Image is empty",
    );
  }

  return {
    title,
    dateLabel,
    yearStart,
    yearEnd,
    sortOrder,
    description,
    category,
    visibility,
  };
}

function validateSameYearOrdering(events: ParsedTimelineEvent[]): void {
  const eventsByYear = new Map<number, ParsedTimelineEvent[]>();

  for (const parsedEvent of events) {
    const sameYearEvents = eventsByYear.get(parsedEvent.event.yearStart) ?? [];
    sameYearEvents.push(parsedEvent);
    eventsByYear.set(parsedEvent.event.yearStart, sameYearEvents);
  }

  for (const [yearStart, sameYearEvents] of eventsByYear) {
    if (sameYearEvents.length === 1) {
      continue;
    }

    for (const parsedEvent of sameYearEvents) {
      if (parsedEvent.event.sortOrder === undefined) {
        throw validationError(
          parsedEvent.rowNumber,
          "sortOrder",
          `is required because multiple events share yearStart ${yearStart}`,
        );
      }
    }

    const firstEventBySortOrder = new Map<number, ParsedTimelineEvent>();

    for (const parsedEvent of sameYearEvents) {
      const sortOrder = parsedEvent.event.sortOrder as number;
      const existingEvent = firstEventBySortOrder.get(sortOrder);

      if (existingEvent) {
        throw validationError(
          parsedEvent.rowNumber,
          "sortOrder",
          `must be unique for yearStart ${yearStart}; value ${sortOrder} is already used on row ${existingEvent.rowNumber}`,
        );
      }

      firstEventBySortOrder.set(sortOrder, parsedEvent);
    }
  }
}

export function parseTimelineCsv(csvSource: string): ParsedTimelineEvent[] {
  let records: string[][];

  try {
    records = parse(csvSource, {
      bom: true,
      relax_column_count: true,
      skip_empty_lines: true,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Timeline CSV parsing failed: ${message}`, { cause: error });
  }

  if (records.length === 0) {
    throw new Error("Timeline CSV row 1: the header row is missing");
  }

  const [headers, ...dataRows] = records;

  if (headers.length !== TIMELINE_CSV_HEADERS.length) {
    throw new Error(
      `Timeline CSV row 1: expected ${TIMELINE_CSV_HEADERS.length} headers but received ${headers.length}`,
    );
  }

  for (const [index, expectedHeader] of TIMELINE_CSV_HEADERS.entries()) {
    if (headers[index] !== expectedHeader) {
      throw new Error(
        `Timeline CSV row 1, column ${index + 1}: expected header "${expectedHeader}" but received "${headers[index] ?? ""}"`,
      );
    }
  }

  const events = dataRows.map((values, index) => {
    const rowNumber = index + 2;

    if (values.length !== TIMELINE_CSV_HEADERS.length) {
      throw new Error(
        `Timeline CSV row ${rowNumber}: expected ${TIMELINE_CSV_HEADERS.length} columns but received ${values.length}`,
      );
    }

    const trimmedValues = values.map((value) => value.trim());
    const row = Object.fromEntries(
      TIMELINE_CSV_HEADERS.map((header, headerIndex) => [
        header,
        trimmedValues[headerIndex],
      ]),
    ) as RawTimelineRow;

    return {
      event: normalizeRow(row, rowNumber),
      rowNumber,
    };
  });

  validateSameYearOrdering(events);

  return events;
}

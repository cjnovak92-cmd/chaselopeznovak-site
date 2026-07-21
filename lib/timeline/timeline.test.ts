import assert from "node:assert/strict";
import test from "node:test";
import {
  filterTimelineEvents,
  getVisibleTimelineSelection,
} from "../../components/timeline/state";
import type { TimelinePresentationEvent } from "../../components/timeline/types";
import { parseTimelineCsv } from "./parse";
import { sortTimelineEvents } from "./sort";
import {
  TIMELINE_CSV_HEADERS,
  type RawTimelineRow,
} from "./types";

const defaultRow: RawTimelineRow = {
  Title: "A memory",
  dateLabel: "2001",
  yearStart: "2001",
  yearEnd: "",
  sortOrder: "",
  Description: "A description",
  Category: "Life",
  Image: "",
  imageAlt: "",
  Visibility: "Public",
};

function serializeCsvValue(value: string): string {
  return `"${value.replaceAll('"', '""')}"`;
}

function timelineCsv(...rows: Partial<RawTimelineRow>[]): string {
  const dataRows = rows.map((row) => {
    const completeRow = { ...defaultRow, ...row };
    return TIMELINE_CSV_HEADERS.map((header) =>
      serializeCsvValue(completeRow[header]),
    ).join(",");
  });

  return [TIMELINE_CSV_HEADERS.join(","), ...dataRows].join("\n");
}

function presentationEvent(
  id: string,
  category: TimelinePresentationEvent["category"],
): TimelinePresentationEvent {
  return {
    id,
    title: `Event ${id}`,
    dateLabel: "2001",
    yearStart: 2001,
    description: `Details for ${id}`,
    category,
  };
}

test("parses, trims, and normalizes a valid CSV row", () => {
  const [parsed] = parseTimelineCsv(
    timelineCsv({
      Title: "  A trimmed memory  ",
      yearStart: "2001",
      yearEnd: "2003",
      sortOrder: "2",
      Image: "/images/timeline/example.jpg",
      imageAlt: "A meaningful description",
    }),
  );

  assert.equal(parsed.rowNumber, 2);
  assert.deepEqual(parsed.event, {
    title: "A trimmed memory",
    dateLabel: "2001",
    yearStart: 2001,
    yearEnd: 2003,
    sortOrder: 2,
    description: "A description",
    category: "Life",
    visibility: "Public",
    image: "/images/timeline/example.jpg",
    imageAlt: "A meaningful description",
  });
});

test("requires canonical headers in their documented order", () => {
  const csv = timelineCsv({}).replace("Title,dateLabel", "dateLabel,Title");

  assert.throws(
    () => parseTimelineCsv(csv),
    /expected header "Title" but received "dateLabel"/,
  );
});

test("rejects missing required values with row and field context", () => {
  assert.throws(
    () => parseTimelineCsv(timelineCsv({ Title: "" })),
    /row 2, field "Title": a non-empty value is required/,
  );
});

test("rejects a year range that does not end after it starts", () => {
  assert.throws(
    () =>
      parseTimelineCsv(
        timelineCsv({ yearStart: "2005", yearEnd: "2005" }),
      ),
    /field "yearEnd": must be later than yearStart/,
  );
});

test("requires sortOrder when multiple events share a year", () => {
  assert.throws(
    () =>
      parseTimelineCsv(
        timelineCsv(
          { Title: "First", yearStart: "2005", sortOrder: "1" },
          { Title: "Second", yearStart: "2005", sortOrder: "" },
        ),
      ),
    /field "sortOrder": is required because multiple events share yearStart 2005/,
  );
});

test("rejects duplicate same-year sortOrder values", () => {
  assert.throws(
    () =>
      parseTimelineCsv(
        timelineCsv(
          { Title: "First", yearStart: "2005", sortOrder: "1" },
          { Title: "Second", yearStart: "2005", sortOrder: "1" },
        ),
      ),
    /value 1 is already used on row 2/,
  );
});

test("requires image alt text whenever an image is present", () => {
  assert.throws(
    () =>
      parseTimelineCsv(
        timelineCsv({ Image: "/images/timeline/example.jpg" }),
      ),
    /field "imageAlt": a meaningful value is required when Image is populated/,
  );
});

test("rejects image alt text when no image is present", () => {
  assert.throws(
    () => parseTimelineCsv(timelineCsv({ imageAlt: "Orphaned alt" })),
    /field "imageAlt": must be empty when Image is empty/,
  );
});

test("rejects unsafe public image paths", () => {
  assert.throws(
    () =>
      parseTimelineCsv(
        timelineCsv({ Image: "/images/../secret.jpg", imageAlt: "Secret" }),
      ),
    /expected a public-root-relative path without traversal segments/,
  );
});

test("sorts chronologically and uses sortOrder within the same year", () => {
  const input = [
    { id: "late", yearStart: 2020, sortOrder: 1 },
    { id: "same-year-second", yearStart: 2001, sortOrder: 2 },
    { id: "early", yearStart: 1999 },
    { id: "same-year-first", yearStart: 2001, sortOrder: 1 },
  ];

  const sorted = sortTimelineEvents(input);

  assert.deepEqual(
    sorted.map((event) => event.id),
    ["early", "same-year-first", "same-year-second", "late"],
  );
  assert.deepEqual(
    input.map((event) => event.id),
    ["late", "same-year-second", "early", "same-year-first"],
  );
});

test("filters events without changing chronological order", () => {
  const events = [
    presentationEvent("life-one", "Life"),
    presentationEvent("work-one", "Work"),
    presentationEvent("life-two", "Life"),
  ];

  assert.deepEqual(
    filterTimelineEvents(events, "Life").map((event) => event.id),
    ["life-one", "life-two"],
  );
  assert.equal(filterTimelineEvents(events, "All"), events);
});

test("clears a selection when a new filter hides the selected event", () => {
  const events = [
    presentationEvent("life-one", "Life"),
    presentationEvent("work-one", "Work"),
  ];

  assert.equal(
    getVisibleTimelineSelection(events, "Life", "work-one"),
    null,
  );
  assert.equal(
    getVisibleTimelineSelection(events, "Work", "work-one"),
    "work-one",
  );
  assert.equal(
    getVisibleTimelineSelection(events, "All", "missing-event"),
    null,
  );
});

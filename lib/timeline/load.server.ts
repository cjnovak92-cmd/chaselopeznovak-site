import "next/dist/compiled/server-only";

import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { parseTimelineCsv, type ParsedTimelineEvent } from "./parse";
import { compareTimelineEventsByChronology } from "./sort";
import type { TimelineEvent } from "./types";

const TIMELINE_CSV_PATH = path.join(process.cwd(), "data", "timeline.csv");
const PUBLIC_DIRECTORY = path.join(process.cwd(), "public");

function imageValidationError(
  parsedEvent: ParsedTimelineEvent,
  message: string,
): Error {
  return new Error(
    `Timeline CSV row ${parsedEvent.rowNumber}, field "Image": ${message}`,
  );
}

function validateExactImagePath(parsedEvent: ParsedTimelineEvent): void {
  const { image } = parsedEvent.event;

  if (!image) {
    return;
  }

  let currentPath = PUBLIC_DIRECTORY;

  for (const segment of image.slice(1).split("/")) {
    let directoryEntries: string[];

    try {
      directoryEntries = readdirSync(currentPath);
    } catch {
      throw imageValidationError(
        parsedEvent,
        `the parent directory for "${image}" does not exist`,
      );
    }

    if (!directoryEntries.includes(segment)) {
      const caseMismatch = directoryEntries.find(
        (entry) => entry.toLocaleLowerCase() === segment.toLocaleLowerCase(),
      );
      const detail = caseMismatch
        ? `filename casing does not match; found "${caseMismatch}"`
        : `path segment "${segment}" does not exist under public`;

      throw imageValidationError(parsedEvent, `"${image}" is invalid: ${detail}`);
    }

    currentPath = path.join(currentPath, segment);
  }

  try {
    if (!statSync(currentPath).isFile()) {
      throw imageValidationError(
        parsedEvent,
        `"${image}" does not resolve to a file`,
      );
    }
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("Timeline CSV")) {
      throw error;
    }

    throw imageValidationError(
      parsedEvent,
      `"${image}" does not resolve to a readable file`,
    );
  }
}

export function loadTimelineEvents(): TimelineEvent[] {
  let csvSource: string;

  try {
    csvSource = readFileSync(TIMELINE_CSV_PATH, "utf8");
  } catch (error) {
    throw new Error(
      `Unable to read the canonical timeline source at ${TIMELINE_CSV_PATH}`,
      { cause: error },
    );
  }

  const parsedEvents = parseTimelineCsv(csvSource);

  for (const parsedEvent of parsedEvents) {
    validateExactImagePath(parsedEvent);
  }

  return parsedEvents
    .filter(({ event }) => event.visibility === "Public")
    .sort((left, right) =>
      compareTimelineEventsByChronology(left.event, right.event),
    )
    .map(({ event }) => event);
}

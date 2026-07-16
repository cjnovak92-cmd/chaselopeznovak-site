# Timeline system

## Current CSV contract

### Source of truth

`data/timeline.csv` is the canonical timeline source. Timeline entries must be loaded from this source and must not be hard-coded into presentation components.

### Columns

The CSV currently has exactly these columns, in this order:

| Column | Requirement | Purpose |
| --- | --- | --- |
| `Title` | Required | The event title shown to visitors. |
| `dateLabel` | Required | Author-written display text for the event's date or period. |
| `yearStart` | Required | Four-digit machine-readable year used as the primary chronological value. |
| `yearEnd` | Optional | Four-digit ending year for an event that spans multiple calendar years. |
| `sortOrder` | Conditionally required | Positive integer that determines the order of events sharing the same `yearStart`. |
| `Description` | Optional | Event description. An empty value remains empty and does not imply placeholder copy. |
| `Category` | Required | One supported timeline category. |
| `Image` | Optional | Public-root-relative path to the event's single image. |
| `imageAlt` | Conditionally required | Meaningful alternative text required whenever `Image` is populated. It remains empty when no image is present. |
| `Visibility` | Required | Publication state. `Public` is the only currently supported value. |

### Required-field rules

The following values must be present and non-empty:

- `Title`
- `dateLabel`
- `yearStart`
- `Category`
- `Visibility`

The following values are optional:

- `yearEnd`
- `Description`
- `Image`

The following values are conditionally required:

- `sortOrder` is required when multiple events share a `yearStart`.
- `imageAlt` is required whenever `Image` is present.
- `imageAlt` should remain empty when no image is present.

### Date rules

- `dateLabel` is authored display text. It must not be parsed to establish chronology.
- `yearStart` is the primary machine-readable chronological year.
- `yearEnd` is used for events spanning multiple calendar years.
- A same-year period may keep `yearEnd` empty and express the period through `dateLabel`.
- A populated `yearEnd` must be later than `yearStart`.

### Ordering rules

- Sort entries ascending by numeric `yearStart`.
- Sort events with the same `yearStart` ascending by numeric `sortOrder`.
- Never rely on physical CSV row order.
- Same-year `sortOrder` values must be positive, unique, and complete.
- A blank `sortOrder` is permitted only when the event is the sole event beginning in its year.

### Categories

The exact supported category values are:

- `Life`
- `Education`
- `Passions`
- `Service`
- `Work`

The current CSV supports exactly one category per event. There is no multi-category delimiter in the current contract.

### Media rules

- `Image` uses a public-root-relative path, such as `/images/timeline/example.jpg`.
- The referenced file must exist under `public`.
- Filename and extension casing must match the file exactly so paths remain valid on case-sensitive Linux deployments.
- Every populated image requires meaningful `imageAlt` text.
- `imageAlt` remains empty when `Image` is empty.
- The current schema supports one image per event.

### Empty-value handling

- A future parser should trim leading and trailing whitespace from every value.
- Empty optional cells should normalize to `undefined`.
- Empty required fields should produce validation errors.
- Empty descriptions or images must not cause placeholder content to be invented.

### Visibility

- `Public` is the only currently documented `Visibility` value.
- Future visibility values must be defined before they are added to the CSV.
- A future implementation should fail closed on an unknown value rather than publish the entry.

## Future extensions

The following are possible extension points, but they are not part of the current CSV contract and are not implemented yet:

- Stable event IDs for deep links.
- Multiple categories per event.
- Long-form Markdown content.
- Relevant links.
- Image galleries and other media.

Any extension should be documented and validated before the CSV contract or parser is changed.

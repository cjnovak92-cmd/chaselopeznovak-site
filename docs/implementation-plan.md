# Website Implementation Plan

Status: Planning document - implementation not yet authorized
Source: Codex repository inspection and finalized timeline CSV review
Repository: chaselopeznovak-site
Created: July 15, 2026

## 1. Repository Summary

- **Framework:** Next.js 15 using the App Router, React 19, and strict TypeScript.
- **Routing:** One route currently exists: `/`, implemented by [app/page.tsx](/Users/chase/Documents/GitHub/chaselopeznovak-site/app/page.tsx). The shared root layout is [app/layout.tsx](/Users/chase/Documents/GitHub/chaselopeznovak-site/app/layout.tsx).
- **Rendering model:** All current components are Server Components. There are no `"use client"` boundaries, hooks, animation libraries, selection state, or interactive timeline controls.
- **Styling:** Tailwind CSS 4 through PostCSS. Tokens are already centralized in the `@theme` block in [app/globals.css](/Users/chase/Documents/GitHub/chaselopeznovak-site/app/globals.css), while components use Tailwind utilities.
- **Typography:** `Inter` and `Source Serif 4` are loaded through `next/font/google`.
- **Content:** All copy, navigation, services, five timeline entries, and four project records live in [lib/content.ts](/Users/chase/Documents/GitHub/chaselopeznovak-site/lib/content.ts).
- **Timeline data:** A typed TypeScript array named `timeline`; there is no CSV, JSON, Markdown, MDX, parser, schema library, or separate timeline content file.
- **Routes/components:** The homepage composes `Introduction`, `WhatIDo`, `Timeline`, `CreativeProjects`, and `WorkWithMe`. Shared shell components are `Header`, `Footer`, and `Section`.
- **Assets:** `public/images/` contains a profile image and 14 timeline images. Photography files have not yet been added to the repository. None of the existing images are referenced by current content or components.
- **Creative Work source content:** The first essay has not yet been added to the repository.
- **Dependencies:** No animation, icon, state-management, CMS, validation, Markdown, carousel, or testing dependencies are installed.
- **Deployment:** No Vercel, Netlify, Docker, or other deployment configuration exists. [next.config.ts](/Users/chase/Documents/GitHub/chaselopeznovak-site/next.config.ts) is empty apart from the default export.
- **Repository guidance:** There is a short README, but no `AGENTS.md`, `CONTRIBUTING.md`, content-model documentation, or update workflow.
- **Responsive baseline:** The current page uses ordinary Tailwind breakpoints, a horizontally scrollable header navigation, stacked mobile sections, and a two-column desktop timeline card layout. It does not implement the reference three-region timeline.
- **Accessibility baseline:** There is semantic `header`, `nav`, `main`, `footer`, `section`, `ol`, and `time` markup; navigation and sections have accessible labels. However, timeline entries are not interactive, `<time>` lacks `dateTime`, most links lack explicit focus-visible styling, and global smooth scrolling has no reduced-motion override.

The installed dependency tree currently resolves to Next 15.5.19, React 19.2.7, Tailwind 4.3.2, and TypeScript 5.9.3, while `package.json` declares compatible caret ranges.

Prior saved context was used only as background for the personal-story, mobile-first intent. All repository findings above were verified directly in this checkout.

## 2. Current Timeline Data Assessment

The current `TimelineEntry` model contains only:

| Field | Current representation | Limitation |
|---|---|---|
| `year` | Arbitrary string | Mixes ranges and non-dates such as `2024 — Present`, `Ongoing`, and `Foundations`; it cannot be reliably sorted or emitted as `dateTime`. |
| `category` | One of `Education`, `Work`, or `Personal` | Only one category per event; does not match the expected Life/Education/Passions/Service/Work taxonomy. |
| `title` | String | No stable ID or slug exists. |
| `description` | String | No distinction between summary and longer detail content. |

Current flow:

1. [lib/content.ts](/Users/chase/Documents/GitHub/chaselopeznovak-site/lib/content.ts) exports the array.
2. [components/sections/Timeline.tsx](/Users/chase/Documents/GitHub/chaselopeznovak-site/components/sections/Timeline.tsx) imports it directly.
3. The component calls `timeline.map(...)`.
4. Each entry is rendered as a static card.
5. Category styling is a local hard-coded lookup inside the component.

There is no parsing, validation beyond TypeScript’s compile-time union, normalization, filtering, selection, media lookup, or detail-loading step.

**Existing `sortOrder` behavior:** no `sortOrder` field exists, and no sorting function exists. The visible order is exactly the literal array order. Adding a `sortOrder` property to a record today would have no effect unless rendering logic were also changed.

Other findings:

- The array is broadly reverse chronological at the start, followed by the textual values `Ongoing` and `Foundations`.
- Date ranges exist only as display strings; start and end dates are not separately represented.
- Categories are singular.
- Timeline keys are derived from `year + title`, which is vulnerable to collisions and content edits.
- No image, gallery, alt text, caption, link, related media, or long-description field exists.
- The timeline image directory is not connected to the records.
- Several `.jpg` assets are actually HEIF files with misleading extensions and may fail in browsers.
- Multiple public images retain EXIF/GPS metadata, which should be stripped from web derivatives.

**CSV assessment:** CSV is not the current format, so there is no working CSV system to preserve or replace. Introducing CSV now would weaken type safety and make nested categories, galleries, links, and date ranges awkward. The clearest near-term choice is typed TypeScript content, using `satisfies` for compile-time validation.

Long prose should initially remain an optional string or paragraph array in typed content. Markdown or MDX should only be added when real long-form event narratives or essays require headings, embedded media, and rich links. That avoids adding a content-processing dependency prematurely.

## 3. Design Reference Interpretation

All six reference images were reviewed.

### Essential design requirements

- Warm white/off-white background and primarily black text.
- Editorial serif typography, supported by restrained sans-serif or monospace interface text.
- A vertically stacked CHASE / LOPEZ / NOVAK hero.
- CHASE in blue, LOPEZ in green, NOVAK in red.
- The exact subtitle: “Sensitive, Intuitive, Inquisitive, Creative.”
- Transition to a compact horizontal wordmark in a sticky masthead.
- Persistent access to Timeline and Creative Work.
- Gold as the continuity/thread accent, subordinate to the RGB identity.
- A desktop timeline with filters, central event thread, and detail area.
- A mobile timeline that becomes a readable card sequence rather than a squeezed three-column interface.
- Four reusable Creative Work entry tiles: Photography, Essays, Screenwriting and Stories, and Software.
- Clear selected, hover, keyboard-focus, and empty states.

### Directional ideas

- Thin gold rules, small stars/diamonds, compass-like ornaments, and fine borders.
- A gently winding thread rather than a geometrically perfect curve.
- Soft card shadows and subtle paper texture.
- Very restrained scan lines, chromatic edge color, and analog softness.
- Category-colored icons and labels.
- Desktop detail imagery or a gallery.
- A mobile bottom navigation, hamburger, exact filter-pill treatment, and exact masthead arrangement.
- The precise card proportions, icon family, line curvature, and ornamental positioning.
- Quotes and decorative footer treatments.

These should be interpreted responsively rather than copied literally.

### Placeholder material

- All sample timeline event dates, titles, descriptions, icons, and category assignments.
- Mobile categories such as `Creative` and `Milestones`, which conflict with both the desktop mockup and current repository.
- Creative tile descriptions, cover images, code samples, script excerpts, and calls to action.
- Quotes and attributed authors.
- “Hello World” introduction copy.
- “As you scroll, my name flattens,” which reads as a mockup annotation rather than production copy.
- About, Résumé, Instagram, and other navigation destinations that do not currently exist.
- Mockup copyright years.
- The apparent “Creatine” navigation typo in the Creative Work reference.

## 4. Recommended Architecture

| Area | Recommendation |
|---|---|
| **Site shell** | Keep `RootLayout` as a Server Component. Preserve one global header/footer and let route content remain server-rendered. Confine browser state to small client components. |
| **Hero and transition** | Render the full vertical wordmark in the introduction. Use a small `IntersectionObserver`-based client component to detect when the hero marker leaves the viewport and switch the masthead to its compact state. No animation library is warranted. |
| **Sticky masthead** | Extend the current sticky header. At the top of the homepage it can emphasize navigation while the hero owns the large wordmark; after the threshold, reveal the compact horizontal wordmark and reduced subtitle. Inner routes start compact. |
| **Navigation** | Use Next `Link` for routes and ordinary anchors for homepage sections. Initially expose only real destinations: home, `/#timeline`, `/creative-work`, and the configured email. Do not add dead résumé or Instagram links. |
| **Timeline filters** | Generate filters from a centralized category registry, not from component conditionals. Start with single-select “All Events” plus one category because that matches the reference and is easier to understand; the data model can still support multiple categories per event. |
| **Timeline thread** | Use decorative inline SVG or repeated CSS/SVG connector segments behind the list. It should be `aria-hidden`, data-independent, and able to grow with content. Use a simpler vertical gold line on narrow screens. |
| **Event nodes** | Render each event trigger as a native button inside an ordered list. Include stable ID, display date, title, category indicators, `aria-expanded`, and `aria-controls`. Enter and Space should work without custom keyboard emulation. |
| **Detail panel** | Use a sticky desktop `aside` with a meaningful empty state. Selected content should support dates, title, summary, paragraphs, categories, gallery, captions, and links. Keep focus on the triggering button unless an explicit “open details” action warrants moving it. |
| **Mobile timeline** | Preserve one event dataset and shared event/detail components. Use horizontally scrollable filter buttons and inline expandable details. CSS changes layout; there should not be a second independently maintained timeline implementation. |
| **Creative Work** | Add `/creative-work` and generate category tiles from data. Separate category definitions from individual projects so a fifth category requires a data entry rather than a page rewrite. Do not create empty category routes until they have useful content. |
| **Content storage** | Keep general site copy typed. Split timeline and creative-work records into dedicated TypeScript content modules. Use structured dates, stable IDs, optional long descriptions, media arrays, and link arrays. Defer MDX until actual rich writing requires it. |
| **Design tokens** | Expand the existing `@theme` tokens into semantic RGB brand colors, gold, paper, ink, muted ink, borders, focus color, shadows, texture intensity, typography, spacing, masthead height, and motion duration. Components should consume semantic tokens rather than raw colors. |
| **Motion** | Use CSS opacity/transform transitions controlled by a single observed state. Under `prefers-reduced-motion: reduce`, disable smooth scrolling and transformation, switching directly between readable states. VHS texture should remain static or nearly static. |

Recommended date model:

- `dateLabel`: author-controlled display text.
- `startDate`: sortable ISO-like value such as `2018`, `2018-08`, or `2018-08-14`.
- `endDate`: optional sortable value or `"present"`.
- `sortOrder`: optional numeric tie-breaker for events sharing the same effective date.
- `id`: stable slug independent of the title.
- `categories`: array of category IDs.

Given the life-story direction in the mockups, chronological ascending is the recommended primary order. Sort by normalized start date, then ascending `sortOrder`, then stable ID. If reverse chronology is chosen, reverse only the primary date comparison, not the same-date tie-break rule.

## 5. Proposed Component Map

Names below follow the repository’s existing PascalCase file and named-export convention.

| Component | Responsibility | Desktop/mobile sharing |
|---|---|---|
| `RootLayout` | Fonts, metadata, global shell, header, main, footer. | Shared |
| `Header` | Sticky masthead state and compact/expanded presentation. | Shared, responsive |
| `Wordmark` | Consistent RGB name markup in vertical or horizontal mode. | Shared |
| `PrimaryNavigation` | Timeline, Creative Work, home, and real external/contact links. | Shared |
| `Introduction` | Hero wordmark, subtitle, professional introduction, and scroll marker. | Shared |
| `Section` | Consistent section semantics, heading association, spacing, and scroll offset. | Shared |
| `Timeline` | Server-side section wrapper; loads normalized timeline data. | Shared |
| `TimelineExplorer` | Small client boundary owning active filter and selected event ID. | Shared |
| `TimelineFilters` | Accessible filter buttons generated from the category registry. | Same controls; rail on desktop and horizontal row on mobile |
| `TimelineList` | Ordered event sequence and structural layout. | Shared responsive markup |
| `TimelineThread` | Decorative gold thread/connectors. | Shared implementation with responsive styling |
| `TimelineEvent` | Date, node, trigger, categories, title, summary, and expansion state. | Shared |
| `TimelineEventDetails` | Reusable detail body: prose, categories, media, captions, and links. | Shared content renderer |
| `TimelineDetailPanel` | Desktop sticky `aside` and empty state around `TimelineEventDetails`. | Desktop wrapper only |
| `CreativeProjects` | Homepage Creative Work introduction/teaser using the shared data model. | Shared |
| `CreativeWorkGrid` | Data-driven category layout on `/creative-work`. | Shared responsive grid |
| `CreativeWorkTile` | One reusable category entry point with accent, media, copy, and valid action. | Shared |
| `Footer` | Copyright, contact, and only verified external links. | Shared |

No separate `DesktopTimeline` and `MobileTimeline` should be created. Layout differences should be CSS-driven; only the desktop detail-panel wrapper is truly breakpoint-specific.

## 6. Proposed Data Flow

### Timeline

1. `content/timeline.ts` exports records using `satisfies readonly TimelineEntry[]`.
2. `types/content.ts` defines category, date, media, link, and timeline record contracts.
3. `lib/timeline.ts` performs development-time assertions for unique IDs, known categories, valid date ranges, and required alt text.
4. It normalizes partial dates into sortable keys without parsing the author-facing `dateLabel`.
5. It sorts by date, then `sortOrder`, then stable ID.
6. The server `Timeline` component obtains the normalized array and passes serializable records to `TimelineExplorer`.
7. `TimelineExplorer` owns only UI state: selected category and selected event ID.
8. Filtering derives a visible array without mutating the normalized source.
9. `TimelineList` renders visible records and passes selection state into each `TimelineEvent`.
10. The selected record is derived by ID and rendered through `TimelineEventDetails`, inside the desktop panel or the mobile inline expansion.

This keeps content, content rules, and interface state separate. Adding an event changes only the content module and its assets.

### Creative Work

1. `content/creative-work.ts` exports a category registry and project records.
2. Categories have stable IDs, title, description, accent token, optional cover media, and optional action.
3. Projects reference category IDs and can contain status, summary, media, links, and later a long-form content reference.
4. The Creative Work route loads categories and groups projects by category on the server.
5. `CreativeWorkGrid` maps categories to reusable `CreativeWorkTile` components.
6. Adding a category or project does not require modifying the grid or page component.
7. If rich essays or project case studies become real requirements, add an optional Markdown/MDX loader later without changing the category index.

## 7. Exact File Impact

### Existing files likely to be modified

- [README.md](/Users/chase/Documents/GitHub/chaselopeznovak-site/README.md) — document the actual content model, routes, image workflow, and commands.
- [package.json](/Users/chase/Documents/GitHub/chaselopeznovak-site/package.json) — add a `typecheck` command and, if adopted, Vitest as the only new testing dependency.
- [package-lock.json](/Users/chase/Documents/GitHub/chaselopeznovak-site/package-lock.json) — only if Vitest is added.
- [app/globals.css](/Users/chase/Documents/GitHub/chaselopeznovak-site/app/globals.css) — expand tokens, paper/VHS treatment, focus styles, responsive shell rules, and reduced-motion handling.
- [app/layout.tsx](/Users/chase/Documents/GitHub/chaselopeznovak-site/app/layout.tsx) — revised metadata/site shell and possibly wordmark-aware header structure.
- [app/page.tsx](/Users/chase/Documents/GitHub/chaselopeznovak-site/app/page.tsx) — compose the hero, timeline, and Creative Work entry point in the intended order.
- [lib/content.ts](/Users/chase/Documents/GitHub/chaselopeznovak-site/lib/content.ts) — retain as a compatibility/general-copy module or barrel while timeline and creative content move into dedicated modules.
- [components/Header.tsx](/Users/chase/Documents/GitHub/chaselopeznovak-site/components/Header.tsx) — compact wordmark, sticky-state behavior, and revised navigation.
- [components/Footer.tsx](/Users/chase/Documents/GitHub/chaselopeznovak-site/components/Footer.tsx) — adopt tokens and real navigation/contact data.
- [components/Section.tsx](/Users/chase/Documents/GitHub/chaselopeznovak-site/components/Section.tsx) — update shared spacing, section labels, and sticky-header offsets.
- [components/sections/Introduction.tsx](/Users/chase/Documents/GitHub/chaselopeznovak-site/components/sections/Introduction.tsx) — become the full hero/professional introduction.
- [components/sections/Timeline.tsx](/Users/chase/Documents/GitHub/chaselopeznovak-site/components/sections/Timeline.tsx) — become the server wrapper around the timeline explorer.
- [components/sections/CreativeProjects.tsx](/Users/chase/Documents/GitHub/chaselopeznovak-site/components/sections/CreativeProjects.tsx) — use the shared Creative Work data model.

### New files likely to be created

- `AGENTS.md` — repository-specific content, accessibility, asset, and verification guidance.
- `docs/content-model.md` — field definitions, ordering rules, examples, and update workflow.
- `types/content.ts` — shared content contracts.
- `content/site.ts` — site metadata, navigation, introduction, and contact data.
- `content/timeline.ts` — timeline records only.
- `content/creative-work.ts` — categories and project records.
- `lib/timeline.ts` — validation, date normalization, sorting, and filtering helpers.
- `lib/timeline.test.ts` — focused ordering and filtering tests if Vitest is approved.
- `components/Wordmark.tsx` — shared vertical/horizontal RGB wordmark.
- `components/PrimaryNavigation.tsx` — reusable navigation markup.
- `components/timeline/TimelineExplorer.tsx`
- `components/timeline/TimelineFilters.tsx`
- `components/timeline/TimelineList.tsx`
- `components/timeline/TimelineThread.tsx`
- `components/timeline/TimelineEvent.tsx`
- `components/timeline/TimelineEventDetails.tsx`
- `components/timeline/TimelineDetailPanel.tsx`
- `components/creative-work/CreativeWorkGrid.tsx`
- `components/creative-work/CreativeWorkTile.tsx`
- `app/creative-work/page.tsx` — Creative Work landing route.
- Browser-safe `.webp` derivatives for selected HEIF/mislabeled source images, using the same base names and retaining originals.

### Files that should remain untouched

- `docs/design-references/*` — immutable visual references, not production assets.
- [next.config.ts](/Users/chase/Documents/GitHub/chaselopeznovak-site/next.config.ts) — no change unless MDX or remote image domains are genuinely introduced later.
- [tsconfig.json](/Users/chase/Documents/GitHub/chaselopeznovak-site/tsconfig.json) — strict mode and the `@/*` alias are already appropriate.
- [postcss.config.mjs](/Users/chase/Documents/GitHub/chaselopeznovak-site/postcss.config.mjs) — already correct for Tailwind 4.
- [eslint.config.mjs](/Users/chase/Documents/GitHub/chaselopeznovak-site/eslint.config.mjs) — current Next and TypeScript lint presets are sufficient.
- `next-env.d.ts` — generated framework file.
- `components/sections/WhatIDo.tsx` and `components/sections/WorkWithMe.tsx` during the core timeline work; they can continue below the main experience until their content role is intentionally revisited.
- Original photographs in `public/images/` should not be overwritten. Create sanitized web derivatives for selected assets.
- `.next/` and `node_modules/` are generated/installed state and should never be manually edited.

Tracked `.DS_Store` files are cleanup candidates, but their removal should be isolated from feature work and accompanied by a `.gitignore` rule.

## 8. Phased Implementation Plan

### Phase 0: Documentation and repository guidance

- **Goal:** Establish the content contract, update workflow, and reliable commands before moving data or UI.
- **Files:** `README.md`, new `AGENTS.md`, new `docs/content-model.md`, `package.json`.
- **Expected result:** The repository clearly distinguishes current behavior, target fields, category questions, asset rules, and verification commands.
- **Acceptance criteria:** No visual change; timeline ordering rules are documented; `npm run typecheck` exists; unsupported format/test commands are not falsely documented.
- **Risks:** Accidentally documenting expected categories or chronology as settled facts.
- **Commit boundary:** `docs: define portfolio content and contribution workflow`.

### Phase 1: Design tokens, typography, background, and shell

- **Goal:** Establish the visual system without introducing interaction.
- **Files:** `app/globals.css`, `app/layout.tsx`, `components/Section.tsx`, `components/Footer.tsx`, `content/site.ts`.
- **Expected result:** Central RGB/gold/paper tokens, editorial type hierarchy, subtle static analog treatment, consistent focus color, and responsive spacing.
- **Acceptance criteria:** No raw brand colors scattered through components; text contrast remains readable; texture does not interfere with text; existing content remains accessible.
- **Risks:** Excessive texture, overly faint muted text, or a typography scale that breaks on mobile.
- **Commit boundary:** `style: establish editorial brand foundation`.

### Phase 2: Hero wordmark and scroll-to-sticky transition

- **Goal:** Implement the primary homepage identity and compact masthead.
- **Files:** `components/Header.tsx`, new `Wordmark.tsx`, new `PrimaryNavigation.tsx`, `components/sections/Introduction.tsx`, `app/page.tsx`, `app/globals.css`.
- **Expected result:** Large vertical wordmark at page entry; compact horizontal wordmark after scrolling; Timeline and Creative Work remain reachable.
- **Acceptance criteria:** No animation dependency; no header layout jump; duplicate visual wordmarks do not create duplicate screen-reader announcements; reduced motion switches states without animation.
- **Risks:** Hydration mismatch, sticky-header jitter, cumulative layout shift, or observation thresholds that behave inconsistently on short screens.
- **Commit boundary:** `feat: add responsive hero and compact masthead`.

### Phase 3: Data model and responsive timeline rendering

- **Goal:** Separate timeline content from presentation and render the responsive structural layout.
- **Files:** `types/content.ts`, `content/timeline.ts`, `lib/timeline.ts`, `lib/content.ts`, `components/sections/Timeline.tsx`, new timeline list/thread/event components, `package.json`, `package-lock.json`, optional `lib/timeline.test.ts`.
- **Expected result:** Current repository entries render through normalized, typed data in the desktop three-region and mobile single-column structures.
- **Acceptance criteria:** No event is hard-coded in JSX; unique IDs exist; dates and ranges have structured values; same-date ordering has a tested `sortOrder` rule; thread length grows with content; no horizontal overflow.
- **Risks:** Ambiguous migration of `Ongoing` and `Foundations`, unresolved category mapping, thread/node alignment with variable-height cards.
- **Commit boundary:** `feat: introduce typed timeline model and responsive structure`.

### Phase 4: Filtering, selection, and details

- **Goal:** Add useful timeline interaction while preserving native accessibility.
- **Files:** `TimelineExplorer`, `TimelineFilters`, `TimelineEvent`, `TimelineEventDetails`, `TimelineDetailPanel`, `content/timeline.ts`, `app/globals.css`.
- **Expected result:** Category filtering, selected states, desktop empty/detail panel, and mobile inline expansion.
- **Acceptance criteria:** Filter and event controls work with Tab, Shift+Tab, Enter, and Space; Escape clears selection if a close behavior is supplied; filtered-out selection is cleared predictably; empty state is meaningful; details support missing optional fields.
- **Risks:** Focus loss when filtering, sticky detail overflow, excessive announcements, or inconsistent desktop/mobile selection state.
- **Commit boundary:** `feat: add accessible timeline filtering and details`.

### Phase 5: Creative Work landing page

- **Goal:** Add the Photography, Essays, Screenwriting and Stories, and Software entry points through a reusable model.
- **Files:** `app/creative-work/page.tsx`, `content/creative-work.ts`, `CreativeWorkGrid.tsx`, `CreativeWorkTile.tsx`, `CreativeProjects.tsx`, `Header.tsx`.
- **Expected result:** A responsive Creative Work page and homepage entry point driven entirely by category data.
- **Acceptance criteria:** Four required categories render from data; adding a fifth requires no layout edit; actions are real links or clearly noninteractive status text; cards have logical headings and useful alt text where images exist.
- **Risks:** Insufficient real category copy, unclear destinations, or using decorative mockup assets as real portfolio content.
- **Commit boundary:** `feat: add data-driven creative work landing page`.

### Phase 6: Accessibility, reduced motion, responsive refinement, and testing

- **Goal:** Validate and refine the completed interaction system.
- **Files:** `app/globals.css`, interactive components, `lib/timeline.test.ts`, and any narrowly scoped test files.
- **Expected result:** Robust keyboard, focus, motion, zoom, and breakpoint behavior.
- **Acceptance criteria:** Visible focus at all times; 200% zoom remains usable; reduced-motion mode removes smooth scrolling and transforms; touch targets are at least approximately 44×44 CSS pixels; sorting/filter tests pass; no serious automated accessibility violations.
- **Risks:** Treating automated checks as a substitute for manual keyboard and screen-reader review.
- **Commit boundary:** `test: harden accessibility and responsive behavior`.

### Phase 7: Final content integration and cleanup

- **Goal:** Connect approved real content and production-safe media.
- **Files:** `content/*.ts`, selected new web image derivatives, `README.md`, and optionally `.gitignore` plus tracked `.DS_Store` cleanup.
- **Expected result:** Real events, descriptions, categories, links, and Creative Work content replace only confirmed scaffold material.
- **Acceptance criteria:** Every used image is browser-readable, optimized, stripped of GPS/private metadata, and has alt text; no dead links; no mockup events remain; image path casing works on case-sensitive deployments; content update instructions are accurate.
- **Risks:** Content approval, copyright/provenance, ambiguous category assignments, unintended cropping, and accidentally publishing private metadata.
- **Commit boundary:** Prefer two commits: one for approved content/media and one for repository cleanup.

## 9. Testing and Validation Plan

### Existing commands

| Purpose | Current command | Status |
|---|---|---|
| Development | `npm run dev` | Exists; starts Next development server. |
| Production build | `npm run build` | Exists. |
| Production server | `npm run start` | Exists; requires a prior build. |
| Linting | `npm run lint` | Exists and invokes `next lint`. |
| Formatting | None | No Prettier or formatting script is configured. |
| Type checking | None as an npm script | TypeScript is installed; add `npm run typecheck` using `tsc --noEmit`. |
| Tests | None | No test runner or test files exist. |

These commands were inspected but not run because development/build/type-check commands can update `.next` or TypeScript cache state, which would violate this task’s no-change constraint.

Recommended automated validation after implementation:

- `npm run lint`
- `npm run typecheck`
- `npm test` for pure sorting/filtering tests if Vitest is added
- `npm run build`
- A clean `git status --short` after validation

Recommended manual checks:

- **Desktop:** 1024, 1280, and 1440+ widths; verify rail, thread, and detail panel remain readable and sticky without overlap.
- **Mobile:** 320, 375/390, and 768 widths; check filter scrolling, card expansion, masthead height, touch targets, and no horizontal page overflow.
- **Keyboard:** Traverse all navigation, filters, event buttons, close controls, gallery controls, and links. Verify Enter/Space activation and visible focus.
- **Reduced motion:** Emulate `prefers-reduced-motion: reduce`; verify immediate wordmark-state changes and no smooth scrolling or animated VHS effects.
- **Timeline ordering:** Test single dates, ranges, `"present"`, partial year/month values, and undated records.
- **Same-year events:** Include at least three records with the same effective date and different `sortOrder` values; ensure ascending `sortOrder` is deterministic.
- **Category filtering:** Verify every category, All Events, zero-result behavior, and selection clearing when the selected item is filtered out.
- **Event selection:** Verify selected styling, desktop detail updates, mobile inline expansion, re-selection, and closing.
- **Empty state:** Confirm the desktop panel is useful before selection and after clearing.
- **Missing images:** An event with no media must remain complete; an invalid media record should fail validation in development rather than create a broken card.
- **Long descriptions:** Test several paragraphs, long unbroken URLs, captions, and a gallery large enough to require panel scrolling.
- **Dates:** Render semantic `<time dateTime>` values while keeping author-controlled display labels.
- **Zoom and text size:** Check 200% browser zoom and increased OS text sizing.
- **Assets:** Test deployed/case-sensitive paths and confirm HEIF-mislabeled images are never sent as JPEG.
- **Content growth:** Test a larger fixture to ensure the thread and sticky regions remain stable.

## 10. Risks and Open Questions

- The repository contains only five broad, scaffold-like timeline entries. No richer “real timeline” data file is present.
- The actual category union is `Education | Work | Personal`; the requested expected taxonomy is `Life | Education | Passions | Service | Work`. `Personal` cannot safely be mapped to Life or Passions without a content decision.
- The current order is broadly reverse chronological; the mockups show chronological ascending. The canonical direction must be chosen before data migration.
- `Ongoing` and `Foundations` do not contain sortable dates. They need structured dates, explicit placement rules, or an intentional undated grouping.
- Current timeline ranges are display strings only. Their real start/end precision is unknown.
- Existing timeline assets are not mapped to events and lack repository-provided alt text/captions.
- Photography files and the first essay have not yet been added, so their Creative Work integration cannot yet be validated.
- The profile image and several `.jpg` files are actually HEIF. At least the profile image and three timeline images need browser-safe derivatives before use.
- Several public originals contain EXIF/GPS metadata. Production derivatives should strip all metadata.
- Filename casing is inconsistent (`.JPG`, `.jpg`, `Me-`, `Bianca`), which is risky on case-sensitive deployments.
- Résumé content/file/route is absent even though résumé access is part of the broader purpose.
- Instagram and other mockup social links are absent; they should not be invented.
- The four Creative Work categories have no dedicated records yet. Existing `projects` are generic project cards and should not be silently reclassified.
- The deployment target is unspecified; image optimization and path behavior should be checked against the chosen host.
- Rich Markdown/MDX content is not yet justified. The decision should be revisited when real long-form material is ready.
- Exact animation timing and transition threshold should be tuned in-browser, but the implementation method does not need another dependency.
- Gold text and fine gold rules may fail contrast if used for small essential labels; black should remain the accessible text color.
- Sticky masthead, filter rail, and detail panel heights must account for short laptop viewports, not only the tall reference canvas.
- Future photography and project copyright, consent, and alt-text language need content-owner review before publication.

## 11. Recommended First Implementation Task

Begin with a single nonvisual Phase 0 foundation commit:

1. Add `AGENTS.md`.
2. Add `docs/content-model.md`.
3. Update the README to reflect the actual repository.
4. Add a `typecheck` script to `package.json`.
5. Document the proposed date, category, `sortOrder`, media, and long-description contracts while marking category mapping and chronological direction as unresolved decisions.

This creates a reviewable source of truth without moving content, adding runtime dependencies, or changing the current page. Once approved, Phase 1 can establish visual tokens and Phase 3 can migrate data against a settled contract.

No files were changed, created, moved, renamed, or deleted during this inspection and planning task.

<oai-mem-citation>
<citation_entries>
MEMORY.md:75-78|note=[prior personal story and mobile first timeline intent]
</citation_entries>
<rollout_ids>
019ed2a9-3fcb-7483-9ffa-889f6fd46022
</rollout_ids>
</oai-mem-citation>

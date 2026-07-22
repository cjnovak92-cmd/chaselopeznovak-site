# chaselopeznovak-site

A living portfolio for Chase Lopez Novak — creative consulting, selected work, and an evolving timeline of experience.

Built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customizing content

Timeline events live in `data/timeline.csv`, the canonical timeline source. See `docs/timeline-system.md` for its columns, validation rules, and ordering contract.

Creative Work categories live in `content/creative-work.ts` and render at `/creative-work` through shared grid and tile components.
Photography entries live in `content/photography.ts` and render as a selected collection at `/creative-work/photography`.
Published essays live in `content/essays.ts`; each essay is statically generated under `/creative-work/essays/[slug]`.
Story titles and available details live in `content/stories.ts`; published story detail pages are generated under `/creative-work/stories/[slug]`.
Software projects live in `content/software.ts` and render at `/creative-work/software`; each project links directly to its external site.
The manifesto lives in `app/manifesto/page.tsx` and renders at `/manifesto`.

The remaining homepage copy and centralized navigation data live in `lib/content.ts`.

## Release versioning

Keep the public `site.version` in `lib/content.ts` and the private package versions in `package.json` and `package-lock.json` aligned as one release. Version 1.0 is represented publicly as `1.0` and internally as the semver equivalent `1.0.0`. For a future patch release, use `1.0.1` consistently; for a future minor release, use public `1.1` and internal `1.1.0`.

## Production media workflow

Reference only browser-readable, metadata-free derivatives from site content. Keep source photographs outside `public/` whenever possible because every file under `public/` is deployed even when no page references it.

For each production image:

1. Bake in its recorded orientation and convert its color to sRGB.
2. Export a lowercase `.webp` derivative using a deterministic image processor. Current photography derivatives use a maximum 3000-pixel long edge at quality 88; timeline derivatives use a maximum 1600-pixel long edge at quality 86. Lossless WebP is used for interface and document previews.
3. Confirm the derivative contains no EXIF, GPS, IPTC, XMP, embedded thumbnail, or source color-profile metadata.
4. Update the exact case-sensitive content path and the rendered width and height where the content model records dimensions.
5. Inspect the derivative visually and verify the route in a production build.

Do not overwrite or delete source photographs as part of routine derivative generation. Review any originals already under `public/` before deployment and relocate them only with explicit approval.

## Scripts

- `npm run dev` — start the development server
- `npm run build` — create a production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint
- `npm run typecheck` — check TypeScript without emitting files
- `npm test` — run the focused timeline parsing, sorting, and filtering tests
- `npm run test:smoke` — after `npm run build`, start the production server and verify launch routes, metadata, and public image references

The accepted Next.js/PostCSS advisory remains a moderate audit finding because Next.js pins the affected PostCSS release. This site does not process attacker-controlled CSS. Recheck the advisory whenever Next.js is upgraded; do not add an override or use `npm audit fix --force`.

The current production audit also reports high-severity Sharp/libvips findings through Next.js. This site accepts no image uploads and configures no remote image sources, which limits the exposed image-processing surface but does not make the audit clean. Evaluate a supported Next.js upgrade that carries fixed transitive versions; `npm audit fix --force` currently proposes a breaking Next.js downgrade and must not be used.

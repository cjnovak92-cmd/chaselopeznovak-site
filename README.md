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
Photography entries live in `content/photography.ts` and render newest-first at `/creative-work/photography`.
Published essays live in `content/essays.ts`; each essay is statically generated under `/creative-work/essays/[slug]`.
Story titles and available details live in `content/stories.ts`; published story detail pages are generated under `/creative-work/stories/[slug]`.
Software projects live in `content/software.ts` and render at `/creative-work/software`; each project links directly to its external site.

The remaining homepage copy and centralized navigation data live in `lib/content.ts`.

## Scripts

- `npm run dev` — start the development server
- `npm run build` — create a production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint

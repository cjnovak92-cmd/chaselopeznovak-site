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

The remaining homepage copy and navigation data live in `lib/content.ts`.

## Scripts

- `npm run dev` — start the development server
- `npm run build` — create a production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint

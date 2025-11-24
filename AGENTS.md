# Repository Guidelines

## Project Structure & Module Organization
Web app layout: `src/pages/` (or `src/routes/`) map routes, `src/components/` stores shared UI, `src/lib/` hosts helpers (search adapters, moderation hooks), and `src/server/` handles API routes or edge middleware. Static memes, favicons, and OG images stay in `public/`; design tokens, Tailwind config, and CSS modules belong in `styles/`. Document every runtime variable in `.env.example`; real keys live only in `.env.local`.

## Build, Test, and Development Commands
- `npm install` — sync Node dependencies after cloning or lockfile edits.
- `npm run dev` — hot-reload dev server on http://localhost:3000.
- `npm run build` — production bundle; mirrors the CI deploy step.
- `npm run preview` — serve the bundle locally for pre-merge smoke tests.
- `npm run lint` — ESLint + TypeScript gate; must pass before merging.
- `npm run test` / `npm run test:e2e` — run Vitest/Jest units and Playwright journeys (upload, browse, search).

## Coding Style & Naming Conventions
Ship TypeScript with `strict` mode and 2-space indentation. Prettier owns formatting—commit only formatted files. Name components in `PascalCase`, hooks in `useCamelCase`, utilities in `camelCase.ts`, and align CSS module filenames with their components. Favor semantic HTML plus Tailwind utilities. Order imports framework → packages → internal and prefer configured path aliases over deep `../../` chains.

## Testing Guidelines
Co-locate unit tests with their targets (`MemeGrid.test.tsx`, `lib/__tests__/search.spec.ts`) and stub APIs using MSW for determinism. Aim for ≥85 % coverage on search, upload, queue, and moderation paths, using Testing Library queries (`findByRole`, `findByText`) so assertions match UX. E2E specs reside in `tests/e2e/` and exercise guest browsing, contributor submissions, and moderator approvals; include any manual QA steps in the PR checklist when visual confirmation is needed.

## Commit & Pull Request Guidelines
History shows short imperative subjects (“update”), so stick to ≤50-character commands (“Add meme grid”). Group related work into focused commits and add a body only when nuance is needed. PRs must describe scope, list verification commands (`npm run dev`, `npm run test`), link issues, and attach screenshots or Looms for UI tweaks. Flag env-var, schema, or CDN changes under “Deployment Notes” and request reviewers from design, moderation, or infra as appropriate.

## Security & Configuration Tips
Load secrets through `.env.local` and mirror them in hosting config. Proxy sensitive calls (search indexing, moderation webhooks) through API handlers, never the browser bundle. Sanitize captions and URLs, resize uploads server-side, and store attribution metadata for quick takedowns.

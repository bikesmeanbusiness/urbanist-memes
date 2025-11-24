# MVP Plan & Checklist

## Objective
Launch a lightweight, community-driven MVP for Urbanist Memes that allows visitors to browse a curated gallery and contribute content in a "Wiki-style" manner (anonymous submissions and edits), all while maintaining high accessibility standards and a portable data architecture.

## Implementation Plan
1. **Project setup** – Scaffold a Next.js + TypeScript + Tailwind app, configure ESLint/Prettier, and connect GitHub to the chosen host (Vercel/Netlify).
2. **Content model** – Define a minimal meme schema (`id`, `title`, `mediaUrl`, `attribution`, `tags`, `description`). Seed `/data/memes.json` with 15-20 curated entries.
3. **Browse experience** – Create responsive grid/list components. **Crucial**: Use `next/image` for optimized image loading and layout shift prevention. Implement client-side search and tag filtering.
4. **Detail & sharing** – Provide a dedicated page per meme with large media, credits, and share buttons.
5. **Community Contribution (Wiki-Style)** – Instead of a private form, use **GitHub Issues** as a transparent moderation queue.
    - **Submit**: Users fill a form -> System creates a GitHub Issue with the JSON payload.
    - **Edit**: Users click "Suggest Edit" -> System creates a GitHub Issue with the proposed changes.
    - **Approve**: Moderators close the issue/merge the data to update `memes.json`.
6. **Accessibility (A11y)** – Target **WCAG 2.1 AA** compliance.
    - Mandatory `alt` text for all images.
    - Full keyboard navigation support for grid and interactive elements.
    - High contrast support.
7. **Scalability & Migration** – Start with `memes.json` for zero-cost hosting and portability.
    - **Migration Path**: When the site grows, migrate `memes.json` to a proper database (Postgres/Supabase). The frontend data fetching logic is modular and can be swapped without UI changes.
8. **AI-Powered Discoverability** – Implement "Smart Search" and "Related Clusters".
    - **Ingestion**: Use an LLM (e.g., Gemini) to analyze new memes and generate `semantic_message`, `mood`, and `visual_description` tags.
    - **Search**: Index these semantic fields to allow users to search by *concept* (e.g., "anti-car") rather than just keywords.
    - **Clustering**: Display "Related Memes" based on semantic similarity.
9. **Deployment & ops** – Use Incremental Static Regeneration (ISR) or build hooks to update content when `memes.json` changes.

## Checklist
- [ ] Next.js project initialized with linting, formatting, and CI preview deploys.
- [ ] **Test Environment**: Vitest and Playwright configured for unit and E2E testing.
- [ ] `memes.json` schema defined (including new AI fields: `semantic_message`, `mood`).
- [ ] Gallery page implemented with `next/image` and responsive grid.
- [ ] Client-side search + tag filters working.
- [ ] **AI Integration**: Ingestion script configured to call LLM for metadata generation.
- [ ] **Accessibility**: Site passes automated a11y tests (e.g., axe-core) and manual keyboard checks.
- [ ] **Contribution Flow**: "Submit" and "Suggest Edit" forms wired to GitHub Issues API.
- [ ] Deployment runbook documented (including moderation workflow).

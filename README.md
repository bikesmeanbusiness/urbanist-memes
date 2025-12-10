# Urbanist Memes (and More)

A lightweight, configuration-driven platform for collecting and browsing memes. Initially built for the Urbanist community, this engine can be white-labeled for any theme.

## Features

- **Curated Gallery**: Responsive grid with support for Images, YouTube clips, and Social Embeds (Twitter/Bluesky).
- **Search & Filter**: Client-side filtering by tags and text.
- **CMS via GitHub**: Uses GitHub Issues as the content backend. No database required.
- **Customizable**: Fully config-driven branding titles, descriptions, and hero text.

## Getting Started

### Prerequisites

- Node.js 18+
- A GitHub account (for the content backend)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/urbanist-memes.git
   cd urbanist-memes
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
   
   Open `.env.local` and add your GitHub credentials:
   ```env
   # Required for fetching memes
   GITHUB_TOKEN=your_personal_access_token
   GITHUB_REPO_OWNER=your_github_username
   GITHUB_REPO_NAME=your_repo_name

   # Optional Site Configuration (defaults to Urbanist Memes)
   NEXT_PUBLIC_SITE_NAME="My Personal Collection"
   NEXT_PUBLIC_SITE_DESCRIPTION="Memes that make me laugh"
   NEXT_PUBLIC_HERO_TITLE="My Meme Stash"
   NEXT_PUBLIC_HERO_SUBTITLE="From the depths of the internet"
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the site.

## Deployment

The easiest way to deploy is via **Vercel**.

1. Push your code to a GitHub repository.
2. Import the project into Vercel.
3. **Important**: Add the Environment Variables from your `.env.local` to the Vercel Project Settings.
   - `GITHUB_TOKEN`
   - `GITHUB_REPO_OWNER`
   - `GITHUB_REPO_NAME`
   - (Optional) `NEXT_PUBLIC_SITE_NAME`, etc.

### Running Multiple Sites
You can deploy the same codebase to multiple Vercel projects to host different sites.
- **Project A (Urbanist)**: Set `GITHUB_REPO_NAME=urbanist-memes-data`
- **Project B (Personal)**: Set `GITHUB_REPO_NAME=my-personal-memes` & `NEXT_PUBLIC_SITE_NAME=My Memes`

## Testing

- **Linting**:
  ```bash
  npm run lint
  ```
- **Unit Tests**:
  (Coming soon - verify implementation in `vitest.config.ts`)
  ```bash
  npx vitest
  ```

## Content Management (CMS)

Content is managed entirely through GitHub Issues.
- Create an issue with the label `meme`.
- Add YAML frontmatter to the issue body to define metadata (see `src/lib/types.ts` for schema).
- The text description below the frontmatter serves as the meme description.

Example Issue Body:
```yaml
---
type: image
title: "Trains are cool"
mediaUrl: "https://example.com/train.jpg"
tags: [transit, trains]
attribution: "transit_fan_123"
---
This is a description of why this train is cool.
```

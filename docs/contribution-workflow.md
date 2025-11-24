# Contribution Workflow (Wiki-Style)

This document outlines the "Wiki-style" contribution workflow for Urbanist Memes, leveraging GitHub Issues as a transparent, lightweight backend.

## Overview

To allow anonymous contributions without managing a database or authentication system, we use **GitHub Issues** as our moderation queue.

1.  **User** submits content (New Meme or Edit) via the website form.
2.  **System** formats the data and creates a new Issue in the GitHub repository.
3.  **Moderator** reviews the Issue.
4.  **Action**:
    *   **Approve**: Moderator merges the data into `data/memes.json` (manually or via a helper script/action).
    *   **Reject**: Moderator closes the Issue with a comment.

## Workflow Details

### 1. Submission (User Side)

The website will feature a "Submit Meme" and "Suggest Edit" form.

*   **New Meme**:
    *   Fields: Title, Image URL (or upload to temp host), Tags, Attribution, Description.
    *   Output: A JSON payload representing the new entry.
*   **Edit Suggestion**:
    *   Fields: Existing Meme ID, Proposed Changes (e.g., new tags, fixed typo).
    *   Output: A JSON diff or comment.

### 2. The "Backend" (GitHub API)

The frontend uses a server-side API route (to hide the GitHub Token) to call the GitHub API.

*   **POST /api/submit**:
    *   Receives form data.
    *   Authenticates with a `GITHUB_BOT_TOKEN`.
    *   Creates an Issue with the label `submission` or `edit-request`.
    *   Body of the Issue contains the formatted JSON data block for easy copying.

### 3. Moderation (Maintainer Side)

Maintainers monitor the "Issues" tab.

*   **Review**: Check image quality, attribution, and relevance.
*   **AI Enrichment (Optional but Recommended)**:
    *   Before merging, run the "Enrich" script/action.
    *   **Input**: Image URL + User Title.
    *   **AI Action**: Calls LLM to generate `semantic_message` (e.g., "Critique of suburban sprawl"), `mood`, and `tags`.
    *   **Output**: Updated JSON with rich metadata.
*   **Merge**:
    *   *Phase 1 (Manual)*: Copy the JSON from the issue, paste it into `data/memes.json`, commit, and push.
    *   *Phase 2 (Automated)*: A GitHub Action could be triggered by a specific comment (e.g., `/approve`) to automatically merge the JSON payload.

## Image Hosting Strategy

Since we cannot let anonymous users upload directly to the git repository (security + size limits):

1.  **External URL**: Users provide a link to the image (Imgur, Twitter, etc.).
2.  **Upload Service**: We use a free-tier service (e.g., Vercel Blob, Cloudinary) where the form uploads the image first, gets a URL, and *then* submits the GitHub Issue with that URL.

## Future Migration

This workflow is designed to be replaced easily.
*   **To Database**: Change `/api/submit` to write to a Postgres table instead of creating a GitHub Issue.
*   **To Auth**: Add a "Login" step before the form.

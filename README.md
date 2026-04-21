# Dilawer Ahmed's Website

This repository contains the code for my personal website hosted at https://dilawer.org.

## Development

- `npm run dev` — start the Next.js app in `web/`
- `npm run build` — build the static export used for deployment
- `npm run lint` — run the Next.js app lint checks

## Content

Content remains in-repo under `content/`, with page-bundle assets stored alongside Markdown where appropriate.

The live app currently treats **publications** and **projects** as first-class collections. Homepage copy and experience data live in `web/lib/site-data.ts`.

## Extendability

If you want to bring back writing, talks, or another collection later, follow the same pattern used for publications and projects:

1. Add a content directory under `content/<collection>/<slug>/index.md`.
2. Extend `web/lib/content.ts` with a loader for that collection.
3. Add route files under `web/app/<collection>/` and `web/app/<collection>/[slug]/`.
4. Link the new section from the homepage or header only once it is populated.

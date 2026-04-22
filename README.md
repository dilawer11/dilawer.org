# Dilawer Ahmed's Website

This repository contains the code for my personal website hosted at https://dilawer.org.

## Development

- `npm run dev` — start the Next.js app in `web/`
- `npm run build` — build the static export used for deployment
- `npm run lint` — run the Next.js app lint checks
- `npm run sync:dblp` — sync publications from DBLP and enrich them with OpenAlex metadata

## Content

Content remains in-repo under `content/`, with page-bundle assets stored alongside Markdown where appropriate.

The live app currently treats **publications** and **projects** as first-class collections. Homepage copy and experience data live in `web/lib/site-data.ts`.

### Publication sync

`npm run sync:dblp` updates `content/publication/*/index.md` using the DBLP author feed for Dilawer Ahmed and enriches each matched paper with OpenAlex metadata such as abstracts and canonical venue names.

- DBLP is the primary source for publication membership, title, authors, venue, DOI, and stable record keys.
- OpenAlex is used opportunistically for abstracts, publication dates, venue naming, and OA PDF links when the repo does not already have a local/manual PDF URL.
- Existing site-specific fields such as `featured`, `projects`, `tags`, code/dataset links, images, and manual-only entries are preserved.
- Use `npm run sync:dblp -- --dry-run` to preview what would change without writing files.

## Extendability

If you want to bring back writing, talks, or another collection later, follow the same pattern used for publications and projects:

1. Add a content directory under `content/<collection>/<slug>/index.md`.
2. Extend `web/lib/content.ts` with a loader for that collection.
3. Add route files under `web/app/<collection>/` and `web/app/<collection>/[slug]/`.
4. Link the new section from the homepage or header only once it is populated.

# Copilot instructions

## Commands

- **Local preview:** `npm run dev`
- **Local production build:** `npm run build`
- **Lint:** `npm run lint`
- **Publication sync:** `npm run sync:dblp`
- **App-specific commands:** `cd web && npm run dev|build|lint`

## Architecture

- The primary application is a **Next.js App Router** site under `web/`, built as a **static export** for GitHub Pages.
- Root-level scripts delegate to the `web/` app so `npm run dev|build|lint` works from the repository root.
- The Next app reads content directly from the repository's `content/` tree rather than from a CMS.
- Main content types are page bundles under `content/`:
  - `content/authors/<slug>/` for author profiles
  - `content/publication/<slug>/` for publications
  - `content/project/<slug>/` for projects
- Page bundles keep `index.md` beside related assets such as `cite.bib`, `featured.png`, PDFs, or diagrams.
- The Next app syncs non-Markdown assets from `content/`, `assets/media/`, and `static/` into `web/public/` before build via `web/scripts/sync-source-assets.mjs`.
- Publication metadata can be refreshed from external sources with `web/scripts/sync-dblp.mjs`, which uses DBLP as the primary source and OpenAlex for enrichment while preserving local project links and manual-only entries.
- Homepage structure and copy now live in Next-native code/data under `web/app/` and `web/lib/site-data.ts`, not in Hugo widget config.
- Deployment happens from `main` through `.github/workflows/gh-pages.yml`, which builds `web/` and publishes `web/out`.

## Conventions

- Keep app code in `web/`, but keep canonical content in `content/`.
- Reuse author slugs from `content/authors/<slug>/` when linking content to people.
- Publications and projects cross-link by slug:
  - `projects:` entries in publication front matter should match a folder name in `content/project/`
- The shipped app intentionally focuses on homepage, publications, and projects. If you add a new collection later, mirror the existing `web/lib/content.ts` and `web/app/projects|publications` patterns rather than reviving old Hugo-era routes.
- Treat `web/public/` and `web/out/` as generated artifacts. Make source changes in `web/`, `content/`, `assets/media/`, or `static/`.

# Ishaan Madan

A personal website connecting planetary science, self-discovery, reflection, and useful resources. Built with Astro and Tailwind; published at [ishaanmadan.org](https://ishaanmadan.org) through Cloudflare Workers Builds.

## Development and verification

```sh
npm install
npm run dev       # Astro development server
npm run build     # Production output in dist/client
npm run check     # Astro and TypeScript diagnostics
npm test          # Built routes, links, assets, metadata, redirects, and science controls
npm run preview   # Build and run an isolated local Cloudflare preview
npm run review    # Local-only accessibility review at http://127.0.0.1:8788
```

The review server injects axe-core and a small diagnostic report into responses in memory. It does not modify production files. Add `?nojs` to block scripts and verify progressive fallbacks. It is a local development tool, not a server to deploy. The regular preview uses Cloudflare's static-asset runtime to exercise `_redirects` and headers; its temporary configuration and state are kept outside the watched asset directory.

## Content map

- `src/content/projects.json`: Titan and Venus questions, summaries, contributions, findings, image credits, and related publication/resource IDs.
- `src/content/publications.json`: selected publications. Initial records verified against Crossref on September 5, 2026.
- `src/content/resources.json`: talks, teaching, and fellowship/application material.
- `src/content/reflections.json`: reflection metadata. Event dates are separate from publication dates; do not invent a publication date from an event.
- `src/content/articles/`: authored HTML for the two interactive companions and retreat article. These are build-time imports, never fetched from third parties at runtime.
- `src/data/story.ts`: the complete personal timeline.
- `src/data/editorial.ts`: dated focus note, meditation playlist, registration, and portrait attribution URL.
- `src/consts.ts`: identity, navigation, contact, CVs, and social profiles.

Collections are defined in `src/content.config.ts`. The homepage build validates cross-references. Project pages and previews share project records; publication and resource lists resolve the same references. Use stable IDs when adding or connecting content.

## Layouts and experiences

`Layout.astro` provides navigation, theme selection, metadata, and the footer. `ProjectLayout.astro` connects a research overview to its evidence and resources. `ExperienceLayout.astro` wraps the long-form experiences with author identity, chapters, and onward reading.

Companion styles are explicitly prefixed (`.experience-titan`, `.experience-venus`, `.experience-first-retreat`) to avoid leaking into the surrounding site. Companion scripts are scoped to the matching wrapper and initialize on normal document navigation. Native disclosure/menu elements support reading without JavaScript. The science controls progressively enhance static explanations; if a script fails, the explanation stays visible.

## Images and sharing

Run `npm run og` to regenerate page-specific sharing images, responsive portraits, and optimized Titan illustrations. Original image assets remain available for compatibility. Preserve published figure credits and captions when editing. Sharing images are checked into `public/og/` so normal builds do not require image generation.

## URLs and deployment

The domain is configured in `astro.config.mjs` and `public/robots.txt`. `src/data/redirects.json` documents old-to-new URL mappings. Astro receives one definition per normalized path; the Cloudflare adapter generates both slash variants in `dist/client/_redirects`. Keep original article anchor IDs when changing content so previously shared fragment links continue to work.

The repository's existing **Workers Builds: ishaanmadan** check confirms the Workers deployment path. `npm run deploy` builds and deploys via Wrangler; it publishes production and should only be run when intended. The website redesign is submitted as a feature-branch PR for review, with production merge/deployment left to the owner. An automatic branch preview depends on the existing Cloudflare build configuration.

## Review evidence

See [the implementation review](docs/review/README.md) for screenshots, checks, content migration notes, and known limits of the local measurements.

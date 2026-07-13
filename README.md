# ishaanmadan

Personal academic site for Ishaan Madan — computational astrobiology, research
workflows, and science communication. Built with **Astro + Tailwind CSS** with a
cosmic / observatory design system, deployed on **Cloudflare Pages** at
[ishaanmadan.org](https://ishaanmadan.org).

## Develop

```bash
npm install
npm run dev        # local dev server → http://localhost:4321
npm run build      # static build → dist/
npm run preview    # preview the built site
```

## Deploy (Cloudflare Pages)

Connect the GitHub repo to Cloudflare Pages once:

- **Framework preset:** Astro
- **Build command:** `npm run build`
- **Build output directory:** `dist`

Cloudflare watches `main` and rebuilds on every push. The canonical public URL is
`https://ishaanmadan.org`. Keep the `site` value in
[`astro.config.mjs`](astro.config.mjs) and the `Sitemap:` line in
[`public/robots.txt`](public/robots.txt) aligned with that domain so canonical
URLs, sitemaps, structured data, and social metadata remain correct.

## Maintaining content

- **Nav, contact info, socials, CVs:** one place — [`src/consts.ts`](src/consts.ts).
- **Resources & Selected Work:** edit the arrays at the top of
  [`src/pages/resources.astro`](src/pages/resources.astro) and
  [`src/pages/index.astro`](src/pages/index.astro).
- **Brand images (OG card, apple-touch-icon):** regenerate with `npm run og`
  after editing [`scripts/generate-og.mjs`](scripts/generate-og.mjs). The favicon
  is [`public/favicon.svg`](public/favicon.svg).

## Design system

Theme tokens (dark default + light) live as CSS variables in
[`src/styles/global.css`](src/styles/global.css) and are exposed to Tailwind via
`@theme inline`. Dark mode is the default; the header toggle persists the choice
and first visits honor `prefers-color-scheme`. All decorative motion respects
`prefers-reduced-motion`, and core content works with JavaScript disabled.

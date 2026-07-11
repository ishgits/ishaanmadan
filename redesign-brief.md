# Website Reimagining — Handoff Brief

**Owner:** Ishaan Madan (Ish)
**Prepared:** July 2026
**For:** Fable / Claude Code (the agent executing the rebuild)
**Repo:** https://github.com/ishgits/ishaanmadan (currently deployed on GitHub Pages at `ishgits.github.io/ishaanmadan`)

---

## 0. TL;DR for the executing agent

Rebuild this personal academic site as a **full reimagining** with a **cosmic / space-forward** aesthetic. Migrate from hand-written HTML + Tailwind Play CDN to **Astro + Tailwind (real build step)**, deploy to **Cloudflare Pages**. Preserve all existing content and links (inventory in §4), but you have **creative latitude** on the visual design within the guardrails in §5 and §11. Ship four interactive features (§7). Keep it accessible, fast, and static-first (zero JS except where an island genuinely needs it).

Do **not** invent facts about Ish's research, publications, awards, or biography. Use only the content in §4 (and the linked source docs). If something is missing, leave a clearly-marked `TODO(ish)` placeholder rather than fabricating.

---

## 1. Context & goals

Ish is a PhD student in Planetary Science & Astrobiology at Purdue (NSF Graduate Research Fellow) doing computational prebiotic chemistry — modeling how life's molecular building blocks could become accessible on worlds like Titan and Venus. The site is his personal hub: research identity, story, "work with me," and a growing resources library.

The current site is clean and tasteful but reads as a Tailwind starter template and rests on a shaky technical foundation. Goals for the rebuild, in priority order:

1. **Fix the foundation** — production build, componentized layout, a real design-token system.
2. **Establish a distinctive, memorable identity** — cosmic/space-forward, tied to the astrobiology work.
3. **Add interactivity that showcases the science** without bloating the site or hurting accessibility.
4. **Stay free to host and easy for Ish to maintain** going forward.

Success = a site that looks intentionally designed (not templated), loads fast, is easy to update (change the nav once, not five times), and makes a first-time visitor immediately understand "this person studies chemical possibility on other worlds."

---

## 2. Current state — audit findings (what we're fixing)

Grounded review of the existing five files (`index.html`, `about.html`, `work-with-me.html`, `resources.html`, `page-template.html`):

**Foundation problems (must fix):**
- **Tailwind Play CDN** (`<script src="https://cdn.tailwindcss.com">`) on every page. Not for production — ships the full compiler, compiles in-browser on each load, causes FOUC, no purge/minify, third-party-CDN dependency. This is the #1 issue.
- **Nav duplicated verbatim across all 5 files** (header + mobile menu markup + toggle script). Any change means editing five files. No components/includes.
- **No design tokens.** The palette lives as magic strings: `bg-[#fdfaf6]` (cream) ×5, `[#fffaf0]` (open-card) ×3, `border-yellow-400` accent, one-off `[#A6CE39]`. Accent drifts between yellow-400 and cream tones.
- **No footer and no favicon anywhere.** Home folds contact into a section; other pages just end. No browser-tab icon.
- **Inconsistent container widths:** home `max-w-7xl`, about `max-w-3xl`, resources/work-with-me `max-w-5xl`. Page rhythm jumps when navigating.
- **Default system font stack only** — no typographic identity.

**Smaller polish (fix during rebuild):**
- Mobile menu doesn't close on link-click or Escape.
- Motion doesn't respect `prefers-reduced-motion`.
- No custom focus-visible styling.
- `og:image` points to the 4:5 headshot, not a proper 1200×630 social card.
- No `JSON-LD` / schema.org `Person` structured data (valuable for academic discoverability).
- No `sitemap.xml` / `robots.txt`.
- No dark mode.

**Strengths to preserve (don't regress these):**
- Semantic HTML with real `aria` labels and `aria-expanded`.
- `<details>`/`<summary>` accordions (accessible; work with JS disabled).
- Tasteful, consistent micro-interactions (hover `-translate-y`, `+` rotating on open).
- Restrained whitespace; good baseline SEO/OG meta.

---

## 3. Target stack & hosting

**Framework: Astro + Tailwind CSS (compiled).**
- Astro outputs fully static HTML with **zero JS by default**; interactive pieces become opt-in "islands," so the four features in §7 don't tax the rest of the site.
- Componentize: one `Header`/`Nav`, one `Footer`, one base `Layout`, reusable `Card` / `Chip` / `Button` / `Accordion` components. This kills the 5×-duplication problem.
- Tailwind via the official integration (real build, purged + minified) with a **custom theme** (tokens in §6). Remove the Play CDN entirely.
- Content collections for the resources/talks and (future) notes/blog so entries are data, not hand-written HTML.

**Hosting: Cloudflare Pages (free).** Verified current free-tier facts (July 2026):
- **Unlimited bandwidth** and unlimited requests (the other free hosts cap at ~100 GB/mo).
- 500 builds/month, up to 20,000 files, 25 MiB max per asset, 20-min build timeout.
- 300+ city CDN (fastest global load), free SSL, free serverless **Workers** (available if a real contact form or an ORCID-caching API is ever wanted).
- Deploys directly from the GitHub repo — Cloudflare watches `main` and rebuilds on push. Repo stays on GitHub.

**URL note / decision for Ish (see §12):** moving off GitHub Pages changes the URL from `ishgits.github.io/ishaanmadan` to a free `*.pages.dev` (e.g. `ishaanmadan.pages.dev`). A custom domain (`~$10/yr`) is the only paid, fully-optional add-on. Until decided, target `pages.dev`.

**Why not the others:** GitHub Pages = static-only, no functions, 100 GB soft cap, commercial use disallowed. Netlify/Vercel = 100 GB caps and (Vercel) a non-commercial Hobby tier. Cloudflare wins on limits + future headroom at zero cost.

---

## 4. Content inventory — preserve all of this

All existing content must carry over (copy can be lightly reflowed to fit new layouts, but do not change meaning or invent claims). Source of truth is the current repo files.

### Global
- **Name/brand:** Ishaan Madan
- **Nav:** Home · My Story · Work With Me · Resources (add a **Notes/Blog** entry once §7d exists)
- **Headshot:** `assets/headshot.jpg` (only image currently in `assets/`)
- **Tagline eyebrow (home):** "Computational astrobiology · workflows · science communication"

### Home (`index.html`)
- H1: "I study chemical possibility on worlds beyond Earth."
- Intro: PhD student in Planetary Science & Astrobiology at Purdue; builds automated scientific workflows connecting computational chemistry, thermodynamic modeling, prebiotic chemistry, planetary environments, and future mission science.
- Headshot caption: "PhD student in Planetary Science & Astrobiology at Purdue University · NSF Graduate Research Fellow"
- **Selected Work** — 3 accordion cards, each with Question / Method / Why-it-matters:
  1. **Prebiotic Chemistry on Titan** — accessibility of life's building blocks in Titan impact-melt environments; ties to NASA Dragonfly.
  2. **Research Automation Workflows** — Python tools for Gaussian input generation, thermochemical data parsing, Cantera equilibrium modeling, figure generation.
  3. **Science Communication** — videos, writing, presentations, educational content.
- **Contact / CV / Socials** block:
  - Email: `madani@purdue.edu`
  - Calendar: https://calendar.app.google/HqtfQ4z6WszoSTnF6 ("Book a time to meet with me")
  - Academic CV (Google Doc): https://docs.google.com/document/d/1CDoZUVaAGbocn8ZCk1GwOGBMQo-0mAdVQyNbImmL35E/edit?usp=sharing
  - Industry CV (Google Doc): https://docs.google.com/document/d/1biiPs5yVRxD9zL58fzFX22tkbIXaxZOQVaxmqTdPJo0/edit?usp=sharing
  - ORCID: https://orcid.org/0000-0003-1813-8561
  - LinkedIn: https://www.linkedin.com/in/ishaanmadan18/
  - GitHub: https://github.com/ishgits
  - YouTube: @scient_ish (https://www.youtube.com/@scient_ish), @spiritual_ish (https://www.youtube.com/@spiritual_ish), Notes by Ish (https://www.youtube.com/@notesbyish)

### My Story (`about.html`)
Chronological narrative with section headings (keep the timeline structure — it feeds §7c):
- 2000–2013 · Wonder Begins
- 2013–2018 · Immigration, Survival, and Adaptation
- 2018–2022 · Finding Astrobiology
- 2022–2024 · Stability vs. Alignment
- 2024–Present · Coming Full Circle
- Beyond Research (@scient_ish, @spiritual_ish)
- What I've Learned
(Full prose is in the repo; preserve it. Handles: `@scient_ish`, `@spiritual_ish`.)

### Work With Me (`work-with-me.html`)
Current framing: **community, mentorship, and focused project-based collaboration** (recently reworked away from a 3-service-card model). "Ways to connect" + email CTA (`madani@purdue.edu`). Preserve this framing.

### Resources (`resources.html`)
- **Presentations & Lectures** (cards with Canva links — verify these are set to *public view*):
  - "Prebiotic Chemistry Insights for Dragonfly" — AbSciCon 2026 — https://canva.link/yps6w2wag24ecop
  - "Alternative Chemistries Beyond Earth" — Telluride Science 2025 — https://canva.link/ads34memmvt7hba
  - "Organics" — Astrobiology Missions 2026 — https://canva.link/wbuoig9gxvd8wpv
  - "Fellowships" — Lab meeting 2026 — https://canva.link/b04tqud6l7zurv6
- **Applications & Fellowships:**
  - "NSF Graduate Research Fellowship Application" — Awarded, 2025 cycle — Google Drive folder: https://drive.google.com/drive/folders/1NHL4GLXRj_xQLOyMbSSxaXk2cYUm_COK?usp=share_link

---

## 5. Aesthetic direction — cosmic / space-forward

**Chosen direction:** cosmic / space-forward. Dark canvas by default, subtle celestial atmosphere, glowing accents, and a data-visual sensibility that leans into the astrobiology identity. This is the identity that makes the site memorable and true to the work.

**Fable has creative latitude** on the specifics (exact palette, type pairing, motion language, hero treatment). The brief sets direction and guardrails, not pixel specs. Interpret "cosmic" as *sophisticated observatory / scientific-instrument*, **not** sci-fi kitsch. Reference feel: deep-space imagery, spectral/thermodynamic data, planetary science visuals — restrained and credible, the way a serious researcher's site should look.

Guardrails so "cosmic" stays classy:
- Dark is the default theme, but readability is non-negotiable — hit WCAG AA contrast on all text.
- Effects (starfields, glows, parallax, gradients) should be **subtle and performant**, never a wall of animation. All decorative motion must respect `prefers-reduced-motion`.
- Keep generous whitespace and clear hierarchy — the current restraint is a strength; don't bury content under theme.
- One coherent accent system, not a rainbow of neons.
- The warm cream/amber of the current site can be retired or reinterpreted as a light-mode counterpart (see dark mode, §7c).

---

## 6. Design-system requirements

Define these as real tokens (Tailwind theme config + CSS variables for theme switching), not arbitrary values:

- **Color:** a named palette — background/canvas, surface/card, elevated surface, primary text, muted text, border, and a coherent accent (plus a secondary/glow accent if needed). Provide **both dark (default) and light** token sets driven by CSS variables so §7c's toggle is a class swap.
- **Typography:** a deliberate pairing — one distinctive display/heading face and one highly readable body face. Load via a performant method (self-hosted or `next/font`-style subsetting; avoid render-blocking). Establish a modular type scale.
- **Spacing & radius & shadow:** standardized scale; one canonical container width (pick one measure and use it site-wide — fix the 3xl/5xl/7xl inconsistency).
- **Components:** `Layout`, `Header`/`Nav` (with working mobile menu that closes on link-click and Escape), `Footer` (new — site-wide contact/socials + copyright), `Card`, `Chip/Badge`, `Button`, `Accordion` (port the `<details>` pattern), `Section` heading with eyebrow.
- **Iconography:** keep crisp inline SVGs (ORCID, LinkedIn, GitHub, YouTube already exist — carry them over).
- **Assets:** add a favicon set and a proper **1200×630 OG social card** (generate one on-brand; stop using the headshot as `og:image`).

---

## 7. Interactive features to build

All four are wanted. Each should be an Astro island (JS only where used) and must degrade gracefully / stay accessible.

### 7a. Research data visualization
An interactive figure that showcases the actual science. Options for Fable to choose/propose (pick the one that's honest to available data — **do not fabricate data**; if real numbers aren't provided, build the interaction around clearly-labeled illustrative/schematic data and mark it as such):
- A **"worlds" explorer** (Titan / Venus / Enceladus) — select a world, see its relevant chemistry/conditions and which of Ish's projects touch it.
- A **thermodynamics interaction** — e.g., a temperature (or environment) slider that shows how molecular accessibility/abundance shifts, reflecting the Titan impact-melt work.
- Use a lightweight lib (Plotly, D3, or Chart.js) as an island. Provide a static fallback image/description for no-JS and reduced-motion.
- it should be schematic.

### 7b. Dark mode + page transitions
- **Dark mode** is the default (cosmic); include a light-mode toggle driven by the §6 CSS-variable tokens, respecting `prefers-color-scheme` on first visit and persisting the user's choice.
- **Page transitions** via Astro's built-in View Transitions for smooth, app-like navigation. Keep them quick and reduced-motion-aware.

### 7c. Animated About timeline
- The My Story page is already chronological (§4). Turn it into a **scrollytelling / animated vertical timeline** — era markers (2000–2013 … 2024–Present), reveal-on-scroll, a cosmic through-line motif (e.g., a trajectory/orbit line). Content stays exactly as written; only the presentation is upgraded. Must remain readable as a plain document with JS off and with reduced motion.

### 7d. Publications + Notes/blog
- **Publications:** a clean list. Ideally pull from ORCID (`0000-0003-1813-8561`) — either at build time (fetch during Astro build) or via a Cloudflare Worker if live data is wanted later. Fall back to a hand-maintained data file if the ORCID API is awkward. Feature 2 of the most recent ones (or more if space permits).
- **Notes/blog:** a writing section (ties to "Notes by Ish"). Use an Astro content collection (Markdown/MDX) so Ish can add posts as files. Add a **Notes** nav entry. Ship with 0–1 seed post; `(ish)TODO` for real content.

---

## 8. Accessibility & performance bar

- WCAG 2.1 **AA** contrast across both themes; visible custom focus states; full keyboard operability (nav, toggles, accordions, timeline).
- Respect `prefers-reduced-motion` for **all** decorative motion (starfield, parallax, transitions, timeline reveals).
- Semantic landmarks and `aria` (preserve/extend current usage).
- Performance targets: Lighthouse ≥ 95 performance and ≥ 95 a11y on the built site; no render-blocking fonts; lazy-load heavy viz islands; keep total JS minimal.
- Core content must render and be usable with JavaScript disabled.

---

## 9. SEO & metadata

- Per-page `<title>`, description, and Open Graph/Twitter tags (carry over and improve current ones).
- New **1200×630 OG card** as default `og:image`.
- Add `JSON-LD` `Person` structured data (name, affiliation = Purdue, sameAs = ORCID/LinkedIn/GitHub).
- Generate `sitemap.xml` and `robots.txt` (Astro sitemap integration).

---

## 10. Suggested build phases

1. **Scaffold & foundation:** Astro + Tailwind project, theme tokens (dark + light), base `Layout`, `Header`/`Footer` components, port pages 1:1 with new components (no new features yet). Kill the Play CDN. Deploy to Cloudflare Pages early to validate the pipeline.
2. **Identity pass:** apply the cosmic design system — typography, palette, hero, card styling, favicon, OG card.
3. **Interactive features:** 7b (dark mode + transitions) → 7c (timeline) → 7d (publications/notes) → 7a (data viz, likely the most involved).
4. **Polish & QA:** a11y audit, Lighthouse, reduced-motion checks, cross-browser/mobile, link verification (incl. the Canva view-permission check), SEO/structured data.

Keep it version-controlled with small, reviewable commits; open a PR rather than committing straight to `main` (matches the repo's existing PR-based history).

---

## 11. Non-negotiables / guardrails

- **Don't fabricate** research results, publications, awards, dates, or biographical claims. Use §4 content and linked docs only; mark gaps as `TODO(ish)`.
- **Preserve every existing link and piece of content** (§4). Losing a link is a regression.
- **Static-first:** no server dependency for core content; JS only in islands.
- **Accessibility is a requirement, not a nice-to-have** (§8).
- **Free hosting** — nothing that introduces a recurring cost (custom domain is the only optional paid item, Ish's call).
- Cosmic ≠ cluttered. When in doubt, favor restraint and readability.

---

## 12. Open decisions for Ish (resolve before or during build)

- [ ] **Domain:** stay on free `*.pages.dev`, or buy a custom domain (`~$10/yr`)? (Affects Cloudflare setup + OG URLs.)
- [ ] **Data viz (7a):** can real datasets/figures be shared, or should it be schematic/illustrative?
- [ ] **Publications (7d):** auto-pull from ORCID, or hand-curate a featured list? Which papers to highlight?
- [ ] **Notes/blog (7d):** launch with real seed posts, or ship the section empty-but-ready?
- [ ] **Canva links:** confirm all four decks are set to "Anyone with the link → View" (they currently resolve to `/edit`).
- [ ] **Light mode:** reinterpret the current cream/amber as the light theme, or go fully neutral?

---

*Prepared as a starting brief. Fable/Claude Code should treat §5's creative latitude as genuine — propose and justify design choices — while holding the §11 guardrails firm.*

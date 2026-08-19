# Website edit plan — August 19, 2026

## Goal

Simplify the home page and launch the first entry in the Interactive Science collection. The result should make the site feel more focused: a clear introduction, a portrait, direct next steps, and a dedicated place for interactive paper companions.

## 1. Interactive Science: add the first paper card

**File:** `src/pages/interactive-science.astro`

Replace the current “More coming soon” empty state with a reusable data-driven list of paper cards. Each card represents one paper and contains:

1. A short paper title.
2. A single-sentence description.
3. A clear link/button leading to that paper’s standalone HTML companion.

### First-card content (fill in before implementation)

| Field | Content |
| --- | --- |
| Short title | `Venus, Sulfuric Acid, and Alternate Chemistries` |
| One-sentence description | `We test the potential for non-carbon polymers in Venusian atmosphere.` |
| Interactive HTML path | `/interactive-science/venus-chemistry-story.html` |
| Button label | `Explore the interactive paper` |

### Design and behavior

- Use a responsive card grid: one column on small screens, two columns when there is room for multiple papers.
- Match the existing site language: rounded corners, `border-line`, translucent `bg-surface/70`, and `shadow-card`.
- Make the title a heading and the action an obvious button-style link using the existing `Button.astro` component (or matching its classes).
- Until the standalone file is ready, do **not** publish a broken link. Either keep the link field as a local placeholder during development or delay the card’s publication until the path is known.
- Keep the cards driven by an array at the top of the page so adding future papers only requires a new title, description, and URL.

### Suggested section framing

- Keep the existing page eyebrow, heading, and introductory paragraph.
- Replace “More coming soon” with a collection heading such as **“Paper companions”** or omit the extra heading and let the cards follow the introduction directly.
- After the first card, a small muted line can remain: “More interactive paper companions are in progress.” This preserves the sense that the collection will grow without making the first item feel provisional.

## 2. Home page: remove Selected Work and pair the portrait with the hero

**File:** `src/pages/index.astro`

Remove the entire `selectedWork` data array and the “Selected Work” accordion section. This includes:

- The `Accordion` import.
- The `selectedWork` array.
- The “Selected Work” button in the hero.
- The `#selected-work` anchor and all three expandable work items.

Rebuild the opening area as a two-column layout:

- **Left:** the existing headshot, including its caption and attribution.
- **Right:** the current main introductory panel (eyebrow, hero statement, supporting paragraph, and calls to action).
- **Small screens:** stack portrait first, then introductory panel, with comfortable spacing.
- **Larger screens:** use a balanced two-column grid, vertically aligned near the top. The portrait may stay somewhat narrower than the copy panel, as it is today.

The resulting home-page sequence should be:

```text
Header
  Portrait | Introductory panel
Footer (contact, CVs, social links)
```
the portrait should appear before the hero on mobile.

### Updated calls to action

Remove the Selected Work anchor button. Keep:

- `Work With Me` → `/work-with-me/`
- `CV & Links` → `#site-footer`

## 3. Condense the hero statement

**File:** `src/pages/index.astro`

Current hero statement:

> Scientific investigation and contemplative practices are two disciplined ways I am drawn to interrogate life and its potential beyond Earth.

### Recommended replacement

> I explore life and its potential beyond Earth through scientific investigation and contemplative practice.

This preserves the original personal and interdisciplinary idea while being much easier to scan. It should remain the `h1`.

## Implementation checklist

- [x] Confirm the first paper’s short title, one-sentence description, and final standalone HTML path.
- [x] Update `src/pages/interactive-science.astro` with the reusable paper-card list and first card.
- [x] Update `src/pages/index.astro` to remove Selected Work and use the portrait-plus-panel layout.
- [x] Replace the home-page hero statement with the recommended shorter copy.
- [ ] Check desktop, tablet, and mobile layouts in both dark and light themes.
- [x] Confirm keyboard focus is visible and the paper-card link has descriptive text.
- [x] Run the production build (`npm run build`) before publishing.

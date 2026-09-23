# Website simplification review

## Scope

The homepage now introduces Ishaan and offers three equal paths into research, meditation, and learning, followed by the free course and a conversation invitation. Resources use a two-column desktop / single-column mobile card library. Meditation leads with the weekly circle; booking is immediately available on Connect. Scholarships move to My Story. Research cards have one project destination, and How I Work retains its content without outgoing links.

The footer retains its previous content, order, and destinations. Existing page URLs and meditation anchors remain valid. This branch does not deploy the site.

## Assets and destinations

- Course and meditation flyers: user-provided PNGs, converted to local WebP assets with their aspect ratios preserved.
- Presentation covers: first-page Canva thumbnails from DAHJANoEIys (AbSciCon), DAHCJeqAZcQ (Organics), DAG0Xd3IHK4 (Telluride), and DAHPAPWuaWE (Fellowships). Stored locally so expiring thumbnail URLs are not required at runtime.
- NSF preview: a document-style illustration, not a reproduction of the application.
- Course playlist verified to resolve to **Life Beyond and Within: The Science of Life and the Wonder of Being Alive**: https://www.youtube.com/playlist?list=PLPrbqdk9a3Wo
- Both meditation short links resolve to the same form: `1FAIpQLSc8xHXscMpKR5mviChw4B_DcILj9FkDfHmhl4NMjBxa3_0U5g`. The website now uses https://forms.gle/X2pzTcFjN97YT9en9, matching the flyer.

## Validation

- `npm run build`, `npm test`, and `npm run check` pass.
- Site checks cover 11 pages, 319 internal links/assets, 15 redirects, metadata, landmarks, anchors, image dimensions, Titan model settings, and Venus controls.
- Browser inspection at 390px mobile and 1440px desktop; resource grid, flyers, booking, navigation, and research entry points reviewed.
- No horizontal overflow on the six primary pages at those widths.
- Automated WCAG A/AA checks report no violations on the six primary pages in desktop light/dark and mobile dark modes. Automated checks do not replace a complete accessibility audit.
- Mobile menu opens and closes with Escape; light/dark switch verified.

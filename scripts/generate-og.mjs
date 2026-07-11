/**
 * Generates the static brand assets that need to be raster:
 *   - public/og-card.png        (1200×630 social card)
 *   - public/apple-touch-icon.png (180×180)
 *
 * Run with `npm run og`. Output is committed so the build itself needs
 * no image toolchain. Deterministic — safe to re-run.
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

// deterministic starfield
function stars(count, seed, w, h) {
  let s = seed;
  const rand = () => ((s = (s * 1664525 + 1013904223) % 4294967296), s / 4294967296);
  let out = '';
  for (let i = 0; i < count; i++) {
    const x = (rand() * w).toFixed(1);
    const y = (rand() * h).toFixed(1);
    const r = (rand() * 1.3 + 0.3).toFixed(2);
    const o = (rand() * 0.6 + 0.2).toFixed(2);
    out += `<circle cx="${x}" cy="${y}" r="${r}" fill="#e8edf9" opacity="${o}"/>`;
  }
  return out;
}

const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="neb1" cx="85%" cy="0%" r="70%">
      <stop offset="0%" stop-color="#f0c26a" stop-opacity="0.22"/>
      <stop offset="60%" stop-color="#f0c26a" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="neb2" cx="0%" cy="70%" r="70%">
      <stop offset="0%" stop-color="#8fd8e8" stop-opacity="0.16"/>
      <stop offset="60%" stop-color="#8fd8e8" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#070b15"/>
  <rect width="1200" height="630" fill="url(#neb1)"/>
  <rect width="1200" height="630" fill="url(#neb2)"/>
  ${stars(140, 20, 1200, 630)}

  <!-- orbit motif -->
  <g transform="translate(980 150)">
    <ellipse cx="0" cy="0" rx="150" ry="60" fill="none" stroke="#35426a" stroke-width="2" transform="rotate(-22)"/>
    <circle cx="0" cy="0" r="34" fill="#f0c26a"/>
    <circle cx="130" cy="-38" r="9" fill="#8fd8e8"/>
  </g>

  <text x="90" y="150" font-family="'Space Grotesk','Helvetica Neue',sans-serif" font-size="26" letter-spacing="6" fill="#f0c26a">ISHAAN MADAN</text>
  <text x="86" y="300" font-family="'Space Grotesk','Helvetica Neue',sans-serif" font-size="76" font-weight="700" fill="#e8edf9">I study chemical</text>
  <text x="86" y="386" font-family="'Space Grotesk','Helvetica Neue',sans-serif" font-size="76" font-weight="700" fill="#e8edf9">possibility on worlds</text>
  <text x="86" y="472" font-family="'Space Grotesk','Helvetica Neue',sans-serif" font-size="76" font-weight="700" fill="#f0c26a">beyond Earth.</text>
  <text x="90" y="556" font-family="'Inter','Helvetica Neue',sans-serif" font-size="26" fill="#a3aecb">PhD · Planetary Science &amp; Astrobiology · Purdue · NSF GRFP</text>
</svg>`;

const iconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="#070b15"/>
  <ellipse cx="16" cy="16" rx="12" ry="5" fill="none" stroke="#35426a" stroke-width="1.4" transform="rotate(-24 16 16)"/>
  <circle cx="16" cy="16" r="4.5" fill="#f0c26a"/>
  <circle cx="26" cy="10.2" r="1.9" fill="#8fd8e8"/>
</svg>`;

await sharp(Buffer.from(ogSvg)).png().toFile(join(publicDir, 'og-card.png'));
await sharp(Buffer.from(iconSvg)).png().toFile(join(publicDir, 'apple-touch-icon.png'));
console.log('Generated og-card.png and apple-touch-icon.png');

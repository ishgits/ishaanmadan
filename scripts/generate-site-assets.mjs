import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
await mkdir('public/og',{recursive:true});
const pages = [
 ['home','A SCIENTIST. A CURIOUS HUMAN.',['Exploring other worlds.','Discovering myself.']],
 ['research','RESEARCH',['Chemical possibility','across worlds.']],
 ['titan','TITAN / RESEARCH',['A temporary melt pool.','Life’s ingredients.']],
 ['venus','VENUS / RESEARCH',['Unfamiliar chemistry.','A different possibility.']],
 ['titan-explore','TITAN / AN INTERACTIVE STORY',['What could a melt pool','make possible?']],
 ['venus-explore','VENUS / AN INTERACTIVE STORY',['Chemistry beyond','the familiar.']],
 ['about','MY STORY',['A path of','self-discovery.']],
 ['reflections','REFLECTIONS & MEDITATION',['A little more room','to notice.']],
 ['first-retreat','A PERSONAL REFLECTION',['My first virtual','meditation retreat.']],
 ['resources','RESOURCES',['Useful things are','worth sharing.']],
 ['connect','CONNECT',['Good questions start','a conversation.']],
];
const escape = s => s.replaceAll('&','&amp;').replaceAll('<','&lt;');
for (const [slug,label,lines] of pages) {
 const warm=['reflections','first-retreat'].includes(slug);
 const bg=warm?'#eae5d7':'#070b15',ink=warm?'#293a33':'#e8edf5',muted=warm?'#505e55':'#aab5c9',accent=warm?'#80502b':'#f0c26a';
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="${bg}"/><g fill="none" stroke="${muted}" opacity=".22"><circle cx="1100" cy="110" r="260"/><circle cx="1100" cy="110" r="190"/><circle cx="1100" cy="110" r="120"/></g><circle cx="1100" cy="110" r="45" fill="${accent}"/><text x="76" y="94" font-family="Helvetica,sans-serif" font-size="24" fill="${ink}">Ishaan Madan</text><text x="76" y="205" font-family="Helvetica,sans-serif" font-size="18" letter-spacing="3" fill="${accent}">${escape(label)}</text>${lines.map((line,i)=>`<text x="70" y="${320+i*92}" font-family="Helvetica,sans-serif" font-weight="500" font-size="76" letter-spacing="-3" fill="${i===1?accent:ink}">${escape(line)}</text>`).join('')}<path d="M76 518H1124" stroke="${muted}" opacity=".3"/><text x="76" y="567" font-family="Helvetica,sans-serif" font-size="21" fill="${muted}">ishaanmadan.org</text><text x="840" y="567" font-family="Helvetica,sans-serif" font-size="18" fill="${muted}">Curiosity, inside &amp; out.</text></svg>`;
 await sharp(Buffer.from(svg)).png().toFile(`public/og/${slug}.png`);
}
for (const width of [480, 800]) {
  await sharp('public/assets/headshot.jpg')
    .resize({ width, height: Math.round(width * 1.25), fit: 'cover', position: 'centre' })
    .webp({ quality: 90, smartSubsample: true })
    .toFile(`public/assets/headshot-${width}.webp`);
}
console.log(`Generated ${pages.length} sharing images and responsive portraits.`);

for (const name of ['Dragonfly_SurfaceOps.jpg', 'titan-sequence-refreezing-v2.png', 'titan-sequence-melt-pool-v2.png', 'titan-sequence-atmosphere.png', 'titan-sequence-impact-v2.png']) {
  const output = name.replace(/\.(png|jpg)$/, '.webp');
  await sharp(`public/interactive-science/${name}`).resize({ width: name.startsWith('Dragonfly') ? 1400 : 700, withoutEnlargement: true }).webp({ quality: 86 }).toFile(`public/interactive-science/${output}`);
}

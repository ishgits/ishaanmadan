import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { resolve, join, relative } from 'node:path';
import { strict as assert } from 'node:assert';
import { runInNewContext } from 'node:vm';
import { parseHTML } from 'linkedom';

const root = resolve('dist/client');
assert(existsSync(join(root,'index.html')), 'Run npm run build before npm test.');
const walk = dir => readdirSync(dir).flatMap(n => statSync(join(dir,n)).isDirectory() ? walk(join(dir,n)) : [join(dir,n)]);
const pages = walk(root).filter(p => p.endsWith('.html'));
const docs = new Map(pages.map(p => [p, parseHTML(readFileSync(p,'utf8')).document]));
const redirects = JSON.parse(readFileSync('src/data/redirects.json','utf8'));
const resolvePage = pathname => {
 const redirected = redirects[pathname] || pathname;
 const file = join(root,decodeURIComponent(redirected));
 return docs.has(file) ? file : join(file,'index.html');
};
const errors=[];
let links=0;
for(const [file,doc] of docs) {
 const route='/'+relative(root,file).replace(/index\.html$/,'');
 const check=(condition,message)=>{if(!condition)errors.push(`${route}: ${message}`);};
 check(doc.querySelectorAll('h1').length===1,'Expected exactly one h1');
 check(doc.querySelectorAll('main').length===1,'Expected one main landmark');
 check(Boolean(doc.querySelector('title')?.textContent),'Missing title');
 check(Boolean(doc.querySelector('meta[name="description"]')?.content),'Missing description');
 check(doc.querySelector('link[rel="canonical"]')?.href===`https://ishaanmadan.org${route}`,'Incorrect canonical URL');
 const ids=[...doc.querySelectorAll('[id]')].map(e=>e.id);
 check(new Set(ids).size===ids.length,'Duplicate IDs');
 for(const img of doc.querySelectorAll('img')) {
  check(img.hasAttribute('alt'),'Image missing alternative text');
  check(img.hasAttribute('width')&&img.hasAttribute('height'),'Image missing reserved dimensions');
 }
 for(const meta of doc.querySelectorAll('meta[property="og:image"]')) check(existsSync(join(root,new URL(meta.content).pathname)),'Missing sharing image');
 for(const script of doc.querySelectorAll('script[type="application/ld+json"]')) { try{JSON.parse(script.textContent);}catch{check(false,'Invalid structured data');} }
 for(const element of doc.querySelectorAll('a[href],img[src],script[src],link[rel="stylesheet"]')) {
  const href=element.getAttribute('href')||element.getAttribute('src');
  const url=new URL(href,`https://ishaanmadan.org${route}`);
  if(url.origin!=='https://ishaanmadan.org')continue;
  links++;
  const pathname=url.pathname;
  if(element.tagName==='A') {
   const target=resolvePage(pathname);
   const asset=join(root,decodeURIComponent(pathname));
   check(docs.has(target)||existsSync(asset),`Missing link destination ${href}`);
   if(url.hash && docs.has(target)) check(Boolean(docs.get(target).getElementById(decodeURIComponent(url.hash.slice(1)))),`Missing anchor ${href}`);
  } else check(existsSync(join(root,decodeURIComponent(pathname))),`Missing asset ${href}`);
 }
}
const rules=readFileSync(join(root,'_redirects'),'utf8').trim().split('\n').map(l=>l.trim().split(/\s+/));
for(const [from,to] of Object.entries(redirects)) assert(rules.some(r=>r[0]===from&&r[1]===to&&r[2]==='301'),`Missing permanent redirect ${from}`);
const about=docs.get(join(root,'about/index.html'));
assert(about.body.textContent.includes('At the center of it all has been one recurring pull: the process of self-discovery.'),'Self-discovery wording changed');

// Execute the actual control scripts against a DOM, not a duplicate implementation.
for(const id of ['titan','venus']) {
 const {document,window}=parseHTML(`<html><body><div class="experience-${id}">${readFileSync(`src/content/articles/${id}.html`,'utf8')}</div></body></html>`);
 runInNewContext(readFileSync(`src/scripts/${id}.js`,'utf8'),{document,window});
 if(id==='titan') {
  const slider=document.getElementById('ammonia-slider');
  assert.equal(slider.max||slider.getAttribute('max'),'6');
  for(const [index,concentration] of [0,1,2,3,4,5,10].entries()) {
   slider.value=String(index);slider.dispatchEvent(new window.Event('input'));
   assert.equal(slider.getAttribute('aria-valuetext'),`${concentration}% ammonia`);
   assert.equal(document.getElementById('ammonia-value').textContent,`${concentration}% NH₃`);
   const counts=[...document.querySelectorAll('#molecule-grid strong')].map(e=>e.textContent);
   assert.deepEqual(counts,index===0?['3 of 21','1 of 7','0 of 1','1 of 11']:['19 of 21','7 of 7','1 of 1','11 of 11']);
   assert(document.querySelector('.slider-ticks .active'),'Reported stop not highlighted');
  }
  assert(document.querySelector('.static-model')?.textContent.includes('38'),'Missing static model fallback');
 } else {
  for(const [key,title] of [['water','Water-rich conditions'],['dry','Lower-water conditions'],['acid','Sulfuric-acid conditions']]) {
   document.querySelector(`[data-environment="${key}"]`).click();
   assert.equal(document.getElementById('env-title').textContent,title);
   assert.equal(document.querySelectorAll('[data-environment][aria-pressed="true"]').length,1);
  }
  const evidence=[...document.querySelectorAll('.evidence button')];
  evidence[0].click();assert.equal(evidence[0].getAttribute('aria-expanded'),'true');
  evidence[1].click();assert.equal(evidence[0].getAttribute('aria-expanded'),'false');assert.equal(evidence[1].getAttribute('aria-expanded'),'true');
  evidence[1].click();assert.equal(evidence[1].getAttribute('aria-expanded'),'false');
 }
}
assert.deepEqual(errors,[]);
console.log(`PASS: ${pages.length} pages, ${links} internal links/assets, ${Object.keys(redirects).length} redirects, metadata, landmarks, anchors, image dimensions, exact story wording, all 7 Titan settings, and Venus controls.`);

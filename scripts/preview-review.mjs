/** Local-only review server. Adds accessibility/performance instrumentation in memory;
 * it never changes the production build. Usage: node scripts/preview-review.mjs [build-dir] [port]
 * Add ?nojs to a page to disable scripts with a response header. */
import http from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { resolve, join, extname } from 'node:path';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url);
const root=resolve(process.argv[2]||'dist/client');
const port=Number(process.argv[3]||8788);
const mime={'.html':'text/html','.css':'text/css','.js':'text/javascript','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.woff2':'font/woff2','.xml':'application/xml'};
const instrumentation=`(()=>{
 const report={lcp:0,cls:0};
 try{new PerformanceObserver(list=>{report.lcp=list.getEntries().at(-1).startTime;}).observe({type:'largest-contentful-paint',buffered:true});new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)report.cls+=e.value;}).observe({type:'layout-shift',buffered:true});}catch{}
 window.addEventListener('load',async()=>{
  const result=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}});
  const node=document.createElement('output');node.id='qa-results';node.hidden=true;
  node.textContent=JSON.stringify({violations:result.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),incomplete:result.incomplete.map(v=>v.id),performance:report});document.body.append(node);
 });
})();`;
const redirects=JSON.parse(readFileSync(new URL('../src/data/redirects.json',import.meta.url),'utf8'));
http.createServer((req,res)=>{
 const url=new URL(req.url,`http://127.0.0.1:${port}`);
 if(url.pathname==='/__qa/axe.js'){res.setHeader('Content-Type','text/javascript');return res.end(readFileSync(require.resolve('axe-core/axe.min.js')));}
 if(url.pathname==='/__qa/audit.js'){res.setHeader('Content-Type','text/javascript');return res.end(instrumentation);}
 if(redirects[url.pathname]){res.writeHead(301,{Location:redirects[url.pathname]});return res.end();}
 let file=resolve(root,'.'+decodeURIComponent(url.pathname));
 if(file!==root&&!file.startsWith(root+'/')){res.writeHead(403);return res.end();}
 if(existsSync(file)&&statSync(file).isDirectory())file=join(file,'index.html');
 if(!existsSync(file)){res.writeHead(404);return res.end('Not found');}
 res.setHeader('Content-Type',mime[extname(file)]||'application/octet-stream');
 res.setHeader('Cache-Control','no-store');
 if(url.searchParams.has('nojs'))res.setHeader('Content-Security-Policy',"script-src 'none'");
 let body=readFileSync(file);
 if(extname(file)==='.html'&&!url.searchParams.has('nojs'))body=body.toString().replace('</head>','<script src="/__qa/axe.js" defer></script><script src="/__qa/audit.js" defer></script></head>');
 res.end(body);
}).listen(port,'127.0.0.1',()=>console.log(`Local review server: http://127.0.0.1:${port}`));

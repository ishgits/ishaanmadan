/** Keep Wrangler's generated files outside the watched asset directory. */
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawn } from 'node:child_process';
const dir = await mkdtemp(join(tmpdir(), 'ishaan-preview-'));
const config = join(dir, 'wrangler.jsonc');
await writeFile(config, JSON.stringify({ name: 'ishaan-local-preview', compatibility_date: '2026-07-11', assets: { directory: resolve('dist/client') } }));
const child = spawn(resolve('node_modules/.bin/wrangler'), ['dev', '--config', config, '--persist-to', join(dir, 'state'), '--ip', '127.0.0.1'], { stdio: 'inherit' });
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => child.kill(signal));
child.on('exit', async code => { await rm(dir, { recursive: true, force: true }); process.exit(code ?? 0); });

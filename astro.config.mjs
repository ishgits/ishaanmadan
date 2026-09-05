// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import cloudflare from '@astrojs/cloudflare';
import redirects from './src/data/redirects.json' with { type: 'json' };

export default defineConfig({
  site: 'https://ishaanmadan.org',
  redirects: Object.fromEntries(Object.entries(redirects).filter(([from]) => !from.endsWith('/')).map(([from, destination]) => [from, { destination, status: 301 }])),
  integrations: [sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: cloudflare(),
});
import { defineConfig } from 'astro/config';
import { readdirSync, readFileSync } from 'node:fs';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import preact from '@astrojs/preact';

const BLOG = new URL('./src/content/blog/', import.meta.url);

// Ordagranna kopior från vetra.se pekar sin canonical dit och hör inte hemma
// i den här sajtens sitemap.
const copies = readdirSync(BLOG)
  .filter((f) => /^canonical:/m.test(readFileSync(new URL(f, BLOG), 'utf8')))
  .map((f) => `/blog/${f.replace(/\.md$/, '')}`);

// GitHub Pages serverar docs/ på master, så bygget landar där och committas.
// `format: 'file'` ger index.sv.html osv., samma adresser som förut.
export default defineConfig({
  site: 'https://www.ignalina.dk',
  outDir: './docs',
  build: { format: 'file' },
  markdown: { shikiConfig: { theme: 'github-light' } },
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !copies.some((c) => new URL(page).pathname.replace(/\/$/, '') === c),
      // Integrationen skriver adresserna utan .html; canonical har den.
      serialize(item) {
        const url = new URL(item.url);
        const path = url.pathname.replace(/\/$/, '');
        url.pathname = path === '' ? '/' : path.endsWith('.html') ? path : `${path}.html`;
        item.url = url.href;
        return item;
      },
    }),
    preact(),
  ],
  output: 'static',
});

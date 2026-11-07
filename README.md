# www.ignalina.dk

The front page of Ignalina ApS, in five languages. Built with Astro, Tailwind and
Preact, the same stack as vetra.se.

- `src/data/content.ts` holds every word on the site, per language. Change the
  text there and nowhere else.
- `src/components/Page.astro` is the page; the five files in `src/pages/` only
  pick the language. `Layout.astro` carries the metadata: titles, descriptions,
  hreflang, Open Graph and the structured data.
- `src/content/blog/` holds the posts as Markdown. A verbatim copy of a vetra.se
  post sets `canonical` to the original and stays out of the sitemap; a translation
  sets `original` and is a page of its own.
- `src/data/facts.ts` holds the English product facts for `/ai.html`, `/ai.json`,
  `/llms.txt` and `/llms-full.txt`, which are generated at build time, as are the
  `.md` version of each post and `/rss.xml`.
- `public/` holds the images, `CNAME` and `robots.txt`.
- `docs/` is the build output and is committed, because GitHub Pages serves that
  directory from `master`. Never edit it by hand.

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # writes docs/; commit the result
```

`.nornir/site/` is the earlier Markdown source that `dwarves docs book --format
site` rendered into typeset SVG pages. It is no longer what the site is built
from.

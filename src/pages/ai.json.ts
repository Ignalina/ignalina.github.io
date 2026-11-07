import type { APIRoute } from 'astro';
import { allPosts, postMd, postPath } from '../data/blog';
import { ABOUT, PERMISSION, SITE, facts } from '../data/facts';

export const GET: APIRoute = async () => {
  const posts = await allPosts();
  const body = {
    name: 'Ignalina ApS',
    about: ABOUT,
    permission: PERMISSION,
    contact: 'rickard@ignalina.dk',
    full_text: `${SITE}/llms-full.txt`,
    products: facts,
    posts: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      date: p.data.pubDate.toISOString().slice(0, 10),
      author: p.data.author,
      language: p.data.lang,
      html: SITE + postPath(p.slug),
      markdown: SITE + postMd(p.slug),
      original: p.data.canonical ?? p.data.original ?? null,
    })),
  };
  return new Response(JSON.stringify(body, null, 2) + '\n', {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};

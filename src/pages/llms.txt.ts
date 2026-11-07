import type { APIRoute } from 'astro';
import { allPosts, postMd } from '../data/blog';
import { ABOUT, PERMISSION, SITE, facts } from '../data/facts';

export const GET: APIRoute = async () => {
  const posts = await allPosts();
  const text = [
    '# Ignalina ApS',
    '',
    `> ${ABOUT}`,
    '',
    PERMISSION,
    '',
    `Everything in one file: ${SITE}/llms-full.txt`,
    `Structured data: ${SITE}/ai.json`,
    `Contact: rickard@ignalina.dk`,
    '',
    '## Products',
    '',
    ...facts.map((f) => `- ${f.source ? `[${f.name}](${f.source})` : f.name}: ${f.summary}${f.licence ? ` Licence: ${f.licence}.` : ''}`),
    '',
    '## Posts',
    '',
    ...posts.map((p) => `- [${p.data.title}](${SITE}${postMd(p.slug)}): ${p.data.description}`),
    '',
  ].join('\n');
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};

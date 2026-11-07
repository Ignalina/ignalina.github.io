import type { APIRoute } from 'astro';
import { allPosts } from '../data/blog';
import { ABOUT, PERMISSION, SITE, facts } from '../data/facts';
import { content, langs } from '../data/content';

// Hela sajten i en enda fil: om företaget, produkterna på alla språk och
// varje inlägg i sin helhet.
export const GET: APIRoute = async () => {
  const posts = await allPosts();
  const parts = [
    `# Ignalina ApS\n\n${ABOUT}\n\n${PERMISSION}\n\nSite: ${SITE}/\nContact: rickard@ignalina.dk`,
    '## Products\n\n' +
      facts
        .map((f) =>
          [
            `### ${f.name}`,
            '',
            f.summary,
            ...(f.licence ? ['', `Licence: ${f.licence}`] : []),
            ...(f.source ? [`Source: ${f.source}`] : []),
            ...(f.crate ? [`Crate: ${f.crate}`] : []),
            ...(f.site ? [`Site: ${f.site}`] : []),
          ].join('\n'),
        )
        .join('\n\n'),
    ...langs.map((l) => {
      const c = content[l];
      return [
        `## Front page: ${c.langName} (${SITE}/${c.path})`,
        '',
        c.headline,
        '',
        c.intro,
        '',
        ...c.products.map((p) => `- ${p.name}: ${p.what} ${p.more}`),
      ].join('\n');
    }),
    ...posts.map((p) => {
      const source = p.data.canonical ?? p.data.original;
      return [
        `## ${p.data.title}`,
        '',
        `${p.data.pubDate.toISOString().slice(0, 10)}, ${p.data.author}, language: ${p.data.lang}${source ? `, original: ${source}` : ''}`,
        '',
        p.body.trim(),
      ].join('\n');
    }),
  ];
  return new Response(parts.join('\n\n---\n\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};

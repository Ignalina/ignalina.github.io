import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { allPosts, postPath } from '../data/blog';

export async function GET(context: APIContext) {
  const posts = await allPosts();
  return rss({
    title: 'Ignalina ApS',
    description: 'Tekniske indlæg fra Ignalina om vores software i Rust.',
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.pubDate,
      author: p.data.author,
      link: postPath(p.slug),
    })),
    customData: '<language>da</language>',
  });
}

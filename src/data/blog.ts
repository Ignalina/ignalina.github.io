import { getCollection } from 'astro:content';

// Nyast först; en översättning går före originalet från samma dag.
export async function allPosts() {
  const posts = await getCollection('blog');
  return posts.sort(
    (a, b) =>
      b.data.pubDate.getTime() - a.data.pubDate.getTime() ||
      (a.data.lang === 'da' ? -1 : 0) - (b.data.lang === 'da' ? -1 : 0),
  );
}

export const postPath = (slug: string) => `/blog/${slug}.html`;
export const postMd = (slug: string) => `/blog/${slug}.md`;

export const postDate = (d: Date) =>
  d.toLocaleDateString('da-DK', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

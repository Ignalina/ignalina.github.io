import type { APIRoute } from 'astro';
import { allPosts } from '../../data/blog';

// Varje inlägg som ren Markdown, för den som hellre läser text än HTML.
export async function getStaticPaths() {
  const posts = await allPosts();
  return posts.map((post) => ({ params: { slug: post.slug }, props: { post } }));
}

export const GET: APIRoute = ({ props }) => {
  const { data, body } = props.post;
  const date = data.pubDate.toISOString().slice(0, 10);
  const source = data.canonical ?? data.original;
  const head = `# ${data.title}\n\n${date}, ${data.author}${source ? `. Original: ${source}` : ''}\n`;
  return new Response(`${head}\n${body.trim()}\n`, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};

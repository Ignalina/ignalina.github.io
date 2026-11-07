import { defineCollection, z } from 'astro:content';

// Blogginläggen. `canonical` sätts på ordagranna kopior av ett inlägg på
// vetra.se: originalet är det som ska ranka, och kopian lämnas utanför
// sitemapen. `original` sätts på översättningar, som är egna sidor.
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string(),
    tag: z.string(),
    lang: z.enum(['da', 'en']),
    canonical: z.string().url().optional(),
    original: z.string().url().optional(),
  }),
});

export const collections = { blog };

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: z.object({
    title: z.string(),
    order: z.number().default(99),
    hidden: z.boolean().default(false),
    short: z.string().default(''),
    tagline: z.string().default(''),
    image: z.string().default(''),
    gallery: z.array(z.string()).default([]),
    price: z.string().default(''),
    price_note: z.string().default(''),
    badge: z.string().default(''),
    color: z.string().default(''),
    effects: z.array(z.object({ title: z.string(), text: z.string().default('') })).default([]),
    suitable: z.array(z.string()).default([]),
    ingredients: z.array(z.object({ name: z.string(), text: z.string().default('') })).default([]),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    cover: z.string().default(''),
    excerpt: z.string().default(''),
    draft: z.boolean().default(false),
  }),
});

export const collections = { products, posts };

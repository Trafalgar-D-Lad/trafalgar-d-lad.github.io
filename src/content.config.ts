import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const sharedPostSchema = z.object({
  title: z.string(),
  description: z.string(),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
  categories: z.array(z.string()).default([]),
  draft: z.boolean().default(false)
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: sharedPostSchema
});

const sweetlandia = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/sweetlandia' }),
  schema: sharedPostSchema.extend({
    phase: z.enum([
      'Fondations',
      'Worldbuilding',
      'Préproduction',
      'Modélisation 3D',
      'Production',
      'Publication'
    ]),
    featured: z.boolean().default(false)
  })
});

export const collections = { blog, sweetlandia };

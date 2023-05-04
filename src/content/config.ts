import { z, defineCollection } from 'astro:content'

const blog = defineCollection({
  schema: z.object({
    category: z.enum(['Web Dev', '3D Arts', 'Music Production']).optional(),
    type: z.enum(['tutorial', 'video', 'article']).optional(),
    name: z.string(),
    title: z
      .string()
      .max(160, 'for SEO , please provide a title of 60 character or less'),
    pubDate: z.string(),
    shortDescription: z.string().max(400, 'maximum 400 words are allowed'),
    description: z.string(),
    author: z.enum([
      'Iman Kimiaei',
      'Rodriguez De Santaz',
      'Meredith Piaff',
      'Jamal Sobhani',
      'Bobby Denzel',
      'Xeon Martinez',
    ]),
    image: z.object({ url: z.string(), alt: z.string() }),
    size: z.array(z.number()).length(2),
    tags: z.array(z.string()),
    editor: z.boolean().optional(),
    selected: z.boolean().optional(),
    discussion: z.boolean().optional(),
    toprated: z.boolean().optional(),
  }),
})

export const collections = { blog }

import { defineCollection, z} from "astro:content";

const posts = defineCollection({

  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string(),
    slug: z.string().optional(),
    image: z.object({
      url: z.string(),
      alt: z.string()
    }),
    tags: z.array(z.tring())
  })
})

export const collections = { posts }

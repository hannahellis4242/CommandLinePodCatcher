import { z } from "zod";

export const ItemSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  link: z.string().optional(),
  pubDate: z.string().optional(),
  enclosure: z.object({
    "@_url": z.string().url(),
    "@_type": z.string(),
  }),
});

type Item = z.infer<typeof ItemSchema>;
export default Item;

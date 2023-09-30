import { z } from "zod";
import { ItemSchema } from "./Item";

export const RSSSchema = z.object({
  channel: z.object({
    title: z.string(),
    link: z.string().optional(),
    description: z.string().optional(),
    author: z.string().optional(),
    item: z.array(ItemSchema),
  }),
});

type RSS = z.infer<typeof RSSSchema>;
export default RSS;

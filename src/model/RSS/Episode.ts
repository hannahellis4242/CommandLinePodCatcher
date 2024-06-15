import { z } from "zod";

export const EpisodeSchema = z.object({
  title: z.string(),
  description: z.string(),
  link: z.string(),
  pubDate: z.string(),
  url: z.string(),
});

type Item = z.infer<typeof EpisodeSchema>;
export default Item;

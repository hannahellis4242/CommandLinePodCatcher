import { z } from "zod";
import { EpisodeSchema } from "./Episode";

export const RSSSchema = z.object({
  channel: z.object({
    title: z.string(),
    link: z.string().optional(),
    description: z.string().optional(),
    author: z.string().optional(),
    episodes: z.array(EpisodeSchema),
  }),
});

type RSS = z.infer<typeof RSSSchema>;
export default RSS;

import { z } from "zod";

export const EpisodeSchema = z.object({
  id: z.string(),
  channel: z.string(),
  title: z.string(),
  url: z.string().url(),
  added: z.date(),
});

type Episode = z.infer<typeof EpisodeSchema>;
export default Episode;

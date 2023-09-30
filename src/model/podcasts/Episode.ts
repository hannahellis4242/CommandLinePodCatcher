import { z } from "zod";

export const EpisodeSchema = z.object({
  title: z.string(),
  url: z.string().url(),
  filePath: z.string(),
});

type Episode = z.infer<typeof EpisodeSchema>;
export default Episode;

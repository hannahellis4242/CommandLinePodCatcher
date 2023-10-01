import { z } from "zod";

export const EpisodeSchema = z.object({
  title: z.string(),
  url: z.string(),
  filePath: z.string(),
  valid: z.boolean(),
  subscribe: z.boolean(),
});

type Episode = z.infer<typeof EpisodeSchema>;
export default Episode;

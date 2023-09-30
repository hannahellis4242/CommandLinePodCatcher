import { z } from "zod";
import { EpisodeSchema } from "./Episode";

export const ChannelSchema = z.object({
  path: z.string(),
  title: z.string(),
  episodes: z.array(EpisodeSchema),
});

type Channel = z.infer<typeof ChannelSchema>;
export default Channel;

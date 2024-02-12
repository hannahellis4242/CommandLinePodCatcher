import { z } from "zod";
import { FeedSchema } from "./Feed";
import { ChannelSchema } from "./Channel";
import { EpisodeSchema } from "./Episode";
import { FileSchema } from "./File";

export const DatabaseSchema = z.object({
  updated: z.date(),
  feeds: z.array(FeedSchema),
  channels: z.array(ChannelSchema),
  episodes: z.array(EpisodeSchema),
  files: z.array(FileSchema),
});

type Database = z.infer<typeof DatabaseSchema>;
export default Database;

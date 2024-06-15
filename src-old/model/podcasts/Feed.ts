import { z } from "zod";
import { ChannelSchema } from "./Channel";

export const FeedSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  channel: ChannelSchema.optional(),
});

type Feed = z.infer<typeof FeedSchema>;
export default Feed;

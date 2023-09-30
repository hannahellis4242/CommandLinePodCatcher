import { z } from "zod";

export const FeedSchema = z.object({
  id: z.string(),
  url: z.string().url(),
});

type Feed = z.infer<typeof FeedSchema>;
export default Feed;

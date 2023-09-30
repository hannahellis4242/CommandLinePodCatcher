import { z } from "zod";
import { RSSSchema } from "./RSS";

export const FeedInfoSchema = z.object({
  id: z.string(),
  rss: RSSSchema,
});

type FeedInfo = z.infer<typeof FeedInfoSchema>;
export default FeedInfo;

import { z } from "zod";
import Feed, { FeedSchema } from "./Feed";

export const FeedsSchema = z.object({
  time: z.string(),
  feeds: z.array(FeedSchema),
});

export default interface Feeds {
  time: string;
  feeds: Feed[];
}

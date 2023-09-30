import { z } from "zod";
import { FeedSchema } from "./podcasts/Feed";

export const ConfigSchema = z.object({
  path: z.string(),
  feeds: z.array(FeedSchema),
});

type Config = z.infer<typeof ConfigSchema>;
export default Config;

import { z } from "zod";

export const ChannelSchema = z.object({
  id: z.string(),
  feed: z.string(),
  title: z.string(),
  added: z.date(),
});

type Channel = z.infer<typeof ChannelSchema>;
export default Channel;

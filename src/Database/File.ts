import { z } from "zod";

export const FileSchema = z.object({
  id: z.string(),
  episode: z.string(),
  path: z.string(),
});

type File = z.infer<typeof FileSchema>;
export default File;

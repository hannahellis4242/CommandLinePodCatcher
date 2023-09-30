import { PathLike } from "fs";
import { readFile } from "fs/promises";
import { join } from "path";
import { feedFilename } from "../../model/Files";
import Feeds, { FeedsSchema } from "../../model/Feeds";

const readFeedsFile = async (path: PathLike): Promise<Feeds | undefined> => {
  try {
    const raw = await readFile(join(path.toString(), feedFilename));
    const data = FeedsSchema.safeParse(JSON.parse(raw.toString()));
    if (!data.success) {
      console.error("Feeds file is not valid!!! 😕");
      console.error(data.error.issues);
      return undefined;
    }
    return data.data;
  } catch (err) {
    console.error("Error :", err);
    return undefined;
  }
};
export default readFeedsFile;

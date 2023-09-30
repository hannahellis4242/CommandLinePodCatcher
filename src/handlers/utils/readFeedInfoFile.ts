import { PathLike } from "fs";
import { readFile } from "fs/promises";
import { join } from "path";
import { feedsDirName } from "../../model/Files";
import FeedInfo, { FeedInfoSchema } from "../../model/FeedInfo";

const readFeedInfoFile = async (
  path: PathLike,
  id: string
): Promise<FeedInfo | undefined> => {
  try {
    const raw = await readFile(
      join(path.toString(), feedsDirName, `${id}.json`)
    );
    const info = FeedInfoSchema.safeParse(JSON.parse(raw.toString()));
    if (!info.success) {
      console.error("Could not parse info file for id", id);
      console.log(info.error.issues);
      return undefined;
    }
    return info.data;
  } catch (err) {
    console.error("Error ", err);
    console.error("Could not read info file for id", id);
    return undefined;
  }
};
export default readFeedInfoFile;

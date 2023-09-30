import { PathLike } from "fs";
import { feedFilename } from "../../model/Files";
import { writeFile } from "fs/promises";
import Feeds from "../../model/Feeds";
import { join } from "path";

const writeFeedsFile = async (path: PathLike, feeds: Feeds) => {
  try {
    await writeFile(join(path.toString(), feedFilename), JSON.stringify(feeds));
    return true;
  } catch (err) {
    console.error("Error:", err);
    return false;
  }
};
export default writeFeedsFile;

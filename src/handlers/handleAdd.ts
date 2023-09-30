import { URL } from "url";
import checkInit from "../utils/checkInit";
import { PathLike } from "fs";
import { join } from "path";
import { feedFilename } from "../model/Files";
import { readFile, writeFile } from "fs/promises";
import { FeedsSchema } from "../model/Feeds";
import { v4 } from "uuid";
import { FeedSchema } from "../model/Feed";

const handleAdd = async (path: PathLike, url: URL) => {
  if (!(await checkInit(path))) {
    console.log(
      `No feeds file found in ${path}.\n Did you init before running this command? 😕`
    );
    return;
  }
  try {
    const raw = await readFile(join(path.toString(), feedFilename));
    const data = FeedsSchema.safeParse(JSON.parse(raw.toString()));
    if (!data.success) {
      console.error("Feeds file is not valid!!! 😕");
      console.error(data.error.issues);
      return;
    }
    const feeds = data.data;
    //check for duplicates
    const isDuplicate =
      feeds.feeds.map(({ url }) => url).filter((x) => url.toString() === x)
        .length > 0;
    if (isDuplicate) {
      console.log("Feed is already added 😀");
      return;
    }
    const newFeed = FeedSchema.safeParse({ id: v4(), url: url.toString() });
    if (!newFeed.success) {
      console.error("Provided url is not valid!!! 😕");
      console.error(newFeed.error.issues);
      return;
    }
    feeds.feeds.push(newFeed.data);
    await writeFile(join(path.toString(), feedFilename), JSON.stringify(feeds));
  } catch (err) {
    console.error("Error:", err);
  }
};
export default handleAdd;

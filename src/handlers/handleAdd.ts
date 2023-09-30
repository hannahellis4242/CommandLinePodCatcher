import { URL } from "url";
import { PathLike } from "fs";
import { v4 } from "uuid";
import { FeedSchema } from "../model/Feed";
import readFeedsFile from "./utils/readFeedsFile";
import writeFeedsFile from "./utils/writeFeeds";

const handleAdd = async (path: PathLike, url: URL) => {
  const feeds = await readFeedsFile(path);
  if (!feeds) {
    console.error(
      `No feeds file found in ${path}.\n Did you init before running this command? 😕`
    );
    return;
  }
  //check for duplicates
  const isDuplicate =
    feeds.feeds.map(({ url }) => url).filter((x) => url.toString() === x)
      .length > 0;
  if (isDuplicate) {
    console.log("Feed is already added 😀");
    return;
  }
  const newFeed = FeedSchema.safeParse({
    id: v4().replaceAll("-", ""),
    url: url.toString(),
  });
  if (!newFeed.success) {
    console.error("Provided url is not valid!!! 😕");
    console.error(newFeed.error.issues);
    return;
  }
  feeds.feeds.push(newFeed.data);
  const success = await writeFeedsFile(path, feeds);
  if (!success) {
    console.error("Something went wrong while saving");
  }
};
export default handleAdd;

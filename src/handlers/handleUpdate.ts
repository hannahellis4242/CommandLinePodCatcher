import { PathLike } from "fs";
import readFeedsFile from "./utils/readFeedsFile";
import Feed from "../model/Feed";
import readFeedInfoFile from "./utils/readFeedInfoFile";
import createFeedInfoFile from "./utils/createFeedInfoFile";

const handleFeedInfo = async (path: PathLike, feed: Feed) => {
  const info = await readFeedInfoFile(path, feed.id);
  if (!info) {
    await createFeedInfoFile(path, feed);
  }
};

const handleUpdate = async (path: PathLike) => {
  const feeds = await readFeedsFile(path);
  if (!feeds) {
    console.error("Cannot read feeds file");
    return;
  }
  feeds.feeds.forEach((feed) => handleFeedInfo(path, feed));
};
export default handleUpdate;

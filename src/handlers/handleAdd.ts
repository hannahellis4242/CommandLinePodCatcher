import { URL } from "url";
import { v4 } from "uuid";
import readConfigFile from "./utils/readConfigFile";
import writeFeedsFile from "./utils/writeConfig";
import { FeedSchema } from "../model/podcasts/Feed";

const addToConfig = async (path: string, url: URL) => {
  const config = await readConfigFile(path);
  if (!config) {
    return Promise.reject(
      new Error(
        `No config file found in ${path}.\n Did you init before running this command? 😕`
      )
    );
  }
  //check for duplicates
  const isDuplicate =
    config.feeds.map(({ url }) => url).filter((x) => url.toString() === x)
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
    return Promise.reject(
      new Error(`Provided url is not valid!!! 😕\n${newFeed.error.issues}`)
    );
  }
  config.feeds.push(newFeed.data);
  await writeFeedsFile(path, config);
};

const handleAdd = async (path: string, url: URL) => {
  try {
    await addToConfig(path, url);
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};
export default handleAdd;

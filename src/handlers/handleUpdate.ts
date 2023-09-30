import Config from "../model/Config";
import createChannel from "./utils/createChannel";
import readConfigFile from "./utils/readConfigFile";
import writeConfig from "./utils/writeConfig";

const handleUpdate = async (path: string) => {
  try {
    const config = await readConfigFile(path);
    const deepCopy: Config = JSON.parse(JSON.stringify(config));
    const updatedFeeds = deepCopy.feeds.map(async (feed) => {
      const newChannel = await createChannel(deepCopy.path, feed);
      return { id: feed.id, url: feed.url, channel: newChannel };
    });
    const newFeeds = await Promise.all(updatedFeeds);
    deepCopy.feeds = newFeeds;
    writeConfig(path, deepCopy);
  } catch (err: any) {
    console.error(err);
    process.exit(1);
  }
};
export default handleUpdate;

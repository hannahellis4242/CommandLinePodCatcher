import axios from "axios";
import Config from "../model/Config";
import Episode from "../model/podcasts/Episode";
import exists from "./utils/exitsts";
import readConfigFile from "./utils/readConfigFile";
import { mkdir, writeFile } from "fs/promises";
import Channel from "../model/podcasts/Channel";
import download from "./utils/download";

const getChannels = (config: Config): Channel[] =>
  config.feeds
    .filter((feed) => feed.channel)
    .map((feed) => feed.channel)
    .map((channel) => channel!);

const handlePull = async (path: string) => {
  try {
    const config = await readConfigFile(path);
    const podcastsDirExists = await exists(config.path);
    if (!podcastsDirExists) {
      await mkdir(config.path);
    }
    const channels = getChannels(config);
    for (const channel of channels) {
      const dirExists = await exists(channel.path);
      if (!dirExists) {
        await mkdir(channel.path);
      }
      const { episodes } = channel;
      for (const episode of episodes) {
        const fileExists = await exists(episode.filePath);
        if (!fileExists) {
          await download(episode);
        }
      }
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default handlePull;

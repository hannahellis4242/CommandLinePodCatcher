import axios from "axios";
import Config from "../model/Config";
import Episode from "../model/podcasts/Episode";
import exists from "./utils/exitsts";
import readConfigFile from "./utils/readConfigFile";
import { mkdir, writeFile } from "fs/promises";
import Channel from "../model/podcasts/Channel";
import download from "./utils/download";
import { join } from "path";
import { v4 } from "uuid";

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
    const fails = [];
    for (const channel of channels) {
      console.log("pulling channel", channel.title);
      const dirExists = await exists(channel.path);
      if (!dirExists) {
        await mkdir(channel.path);
      }
      const { episodes } = channel;
      for (const episode of episodes) {
        console.log("\tpulling episode", episode.title);
        if (!episode.valid) {
          continue;
        }
        const fileExists = await exists(episode.filePath);
        if (!fileExists) {
          try {
            await download(episode);
          } catch (err: any) {
            console.error(err.message);
            fails.push(episode);
          }
        }
      }
    }
    await writeFile(
      join(path, `fails_${v4().replaceAll("-", "")}.json`),
      JSON.stringify(fails, null, 2)
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default handlePull;

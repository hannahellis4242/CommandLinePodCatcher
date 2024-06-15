import { join, resolve } from "path";
import RSS from "../../model/RSS/RSS";
import Channel from "../../model/podcasts/Channel";
import convertItemToEpisode from "./convertItemToEpisode";
import sanitiseFilename from "./sanitiseFilename";

const convertRSSToChannel = (path: string, { channel }: RSS): Channel => {
  const podcastDirectory = resolve(join(path, sanitiseFilename(channel.title)));
  return {
    path: podcastDirectory,
    title: channel.title,
    episodes: channel.item.map((item) =>
      convertItemToEpisode(podcastDirectory, item)
    ),
  };
};
export default convertRSSToChannel;

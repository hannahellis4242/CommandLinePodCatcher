import { join } from "path";
import { podcastsDirname } from "../../model/Files";
import RSS from "../../model/RSS/RSS";
import Channel from "../../model/podcasts/Channel";
import convertItemToEpisode from "./convertItemToEpisode";

const convertRSSToChannel = (path: string, { channel }: RSS): Channel => {
  const podcastDirectory = join(
    path,
    podcastsDirname,
    channel.title.replaceAll(/\s/g, "-")
  );
  return {
    path: podcastDirectory,
    title: channel.title,
    episodes: channel.item.map((item) =>
      convertItemToEpisode(podcastDirectory, item)
    ),
  };
};
export default convertRSSToChannel;

import Channel from "../model/podcasts/Channel";
import Episode from "../model/podcasts/Episode";
import Feed from "../model/podcasts/Feed";
import readConfigFile from "./utils/readConfigFile";

const showEpisode = ({ title, subscribe }: Episode): string =>
  `[${subscribe ? "*" : " "}] ${title}`;

const showChannel = ({ title, episodes }: Channel): string => {
  const episodesStr = episodes
    .map(showEpisode)
    .map((s) => `\t${s}`)
    .join("\n");
  return `${title}\n${episodesStr}`;
};

const showFeed = ({ id, url, channel }: Feed): string => {
  return `${id}\n${url}\n${
    channel ? showChannel(channel) : "no channel information available"
  }`;
};

const handleShow = async (
  path: string,
  targetId: string | undefined,
  targetTitle: string | undefined
) => {
  const config = await readConfigFile(path);
  const feeds = config.feeds
    .filter(({ id }) => id === targetId)
    .filter(({ channel }) => (channel ? channel.title === targetTitle : true));
  const output = feeds.map(showFeed).join("\n");
  console.log(output);
};

export default handleShow;

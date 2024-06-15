import Feed from "../../model/podcasts/Feed";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import Channel from "../../model/podcasts/Channel";
import { RSSSchema } from "../../model/RSS/RSS";
import convertRSSToChannel from "./convertRSSToChannel";

const createChannel = async (path: string, feed: Feed): Promise<Channel> => {
  try {
    const rawRSS = await axios<string>(feed.url).then(({ data }) => data);
    const xmlParser = new XMLParser({ ignoreAttributes: false });
    const parsed = xmlParser.parse(rawRSS);
    if (!parsed.rss) {
      return Promise.reject(new Error(`no rss feed found for ${feed.id}`));
    }
    const rss = RSSSchema.safeParse(parsed.rss);
    if (!rss.success) {
      return Promise.reject(
        `could not parse rss for ${feed.id}\n${JSON.stringify(
          rss.error.issues,
          null,
          2
        )}`
      );
    }
    return convertRSSToChannel(path, rss.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
export default createChannel;

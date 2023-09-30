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
      console.error("no rss feed found");
      return Promise.reject(new Error("no rss feed found"));
    }
    const rss = RSSSchema.safeParse(parsed.rss);
    if (!rss.success) {
      console.error("could not parse rss");
      console.error(rss.error.issues);
      return Promise.reject(rss.error.issues);
    }
    return convertRSSToChannel(path, rss.data);
  } catch (err) {
    console.error("Error ", err);
    return Promise.reject(err);
  }
};
export default createChannel;

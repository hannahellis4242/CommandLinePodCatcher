import { PathLike } from "fs";
import Feed from "../../model/Feed";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import FeedInfo from "../../model/FeedInfo";
import { RSSSchema } from "../../model/RSS";

const createFeedInfoFile = async (path: PathLike, feed: Feed) => {
  try {
    const rawRSS = await axios<string>(feed.url).then(({ data }) => data);
    console.log(rawRSS);
    const xmlParser = new XMLParser();
    const parsed = xmlParser.parse(rawRSS);
    if (!parsed.rss) {
      console.error("no rss feed found");
      return;
    }
    console.log(parsed.rss);
    const rss = RSSSchema.safeParse(parsed.rss);
    if (!rss.success) {
      console.error("could not parse rss");
      console.error(rss.error.issues);
      return;
    }
    const feedInfo: FeedInfo = {
      id: feed.id,
      rss: rss.data,
    };
    console.log(feedInfo.rss.channel.item.at(0));
  } catch (err) {
    console.error("Error ", err);
  }
};
export default createFeedInfoFile;

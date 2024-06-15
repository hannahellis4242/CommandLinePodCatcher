import axios from "axios";
import RSS, { RSSSchema } from "./model/RSS/RSS";
import { XMLParser } from "fast-xml-parser";

const createRSS = async (url: string): Promise<RSS> => {
  try {
    const rawRSS = await axios<string>(url).then(({ data }) => data);
    const xmlParser = new XMLParser({ ignoreAttributes: false });
    const parsed = xmlParser.parse(rawRSS);
    if (!parsed.rss) {
      return Promise.reject(new Error(`no rss feed found`));
    }
    const rss = RSSSchema.safeParse(parsed.rss);
    if (!rss.success) {
      return Promise.reject(
        `could not parse rss\n${JSON.stringify(rss.error.issues, null, 2)}`
      );
    }
    return rss.data;
  } catch (err) {
    return Promise.reject(err);
  }
};
export default createRSS;

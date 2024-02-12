import { v4 } from "uuid";
import Database from "../../Database/Database";
import Feed from "../../Database/Feed";

const addFeed =
  (...urls: string[]) =>
  (db: Database): Database => {
    const cpy: Database = Object.assign({}, db);
    const feeds: Feed[] = urls.map((url) => ({
      id: v4(),
      url,
      added: new Date(),
    }));
    cpy.feeds = cpy.feeds.concat(feeds);
    cpy.updated = new Date();
    return cpy;
  };
export default addFeed;

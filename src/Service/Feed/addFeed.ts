import { v4 } from "uuid";
import Database from "../../Database/Database";
import Feed from "../../Database/Feed";

const addFeed =
  (url: string) =>
  (db: Database): Database => {
    const cpy: Database = Object.assign({}, db);
    const feed: Feed = { id: v4(), url, added: new Date() };
    cpy.feeds.push(feed);
    cpy.updated = new Date();
    return cpy;
  };
export default addFeed;

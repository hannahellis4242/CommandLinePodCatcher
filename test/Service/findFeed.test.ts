import { v4 } from "uuid";
import addFeed from "../../src/Service/Feed/addFeed";
import Database from "../../src/Database/Database";
import Feed from "../../src/Database/Feed";

jest.mock("uuid", () => ({
  v4: jest.fn(),
}));

interface FeedQuery {
  id?: string;
  url?: string;
  date?: { from: Date; to: Date };
}

const findFeed =
  (query: FeedQuery) =>
  ({ feeds }: Database): Feed[] => {
    if (query.id) {
      return feeds.filter(({ id }) => id === query.id);
    }
    if (query.url) {
      return feeds.filter(({ url }) => url === query.url);
    }
    if (query.date) {
      const { from, to } = query.date;
      return feeds
        .filter(({ added }) => added >= from)
        .filter(({ added }) => added <= to);
    }
    return [];
  };

describe("findFeed", () => {
  const mockedV4 = v4 as jest.MockedFunction<typeof v4>;
  const db: Database = {
    updated: new Date(),
    feeds: [
      { id: "id1", url: "url1", added: new Date(2020, 1, 10, 10, 57, 25, 100) },
      { id: "id2", url: "url2", added: new Date(2021, 5, 7, 11, 48, 7, 598) },
      { id: "id3", url: "url3", added: new Date(2023, 9, 23, 15, 12, 4, 756) },
    ],
    channels: [],
    episodes: [],
    files: [],
  };
  test("find by id", () => {
    const i = Math.floor(Math.random() * db.feeds.length);
    const targetId = db.feeds[i].id;
    const results = findFeed({ id: targetId })(db);
    expect(results).toHaveLength(1);
    const [result] = results;
    expect(result.id).toBe(targetId);
  });
  test("find by url", () => {
    const i = Math.floor(Math.random() * db.feeds.length);
    const targetURL = db.feeds[i].url;
    const results = findFeed({ url: targetURL })(db);
    expect(results).toHaveLength(1);
    const [result] = results;
    expect(result.url).toBe(targetURL);
  });

  test("find by date", () => {
    const results = findFeed({
      date: {
        from: new Date(2021, 1, 1, 0, 0, 0, 0),
        to: new Date(2021, 12, 31, 23, 59, 59, 999),
      },
    })(db);
    console.log(results);
    expect(results).toHaveLength(1);
    const [result] = results;
    expect(result.id).toBe(db.feeds[1].id);
  });
});

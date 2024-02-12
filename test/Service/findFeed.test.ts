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
      return feeds.filter(({ added }) => added > from && added < to);
    }
    return [];
  };

describe("findFeed", () => {
  const mockedV4 = v4 as jest.MockedFunction<typeof v4>;
  const start: Database = {
    updated: new Date(),
    feeds: [],
    channels: [],
    episodes: [],
    files: [],
  };
  test("find by id", () => {
    const ids = ["id1", "id2", "id3"];
    const urls = ["url1", "url2", "url3"];
    mockedV4.mockReturnValueOnce(ids[0]);
    mockedV4.mockReturnValueOnce(ids[1]);
    mockedV4.mockReturnValueOnce(ids[2]);
    const db = addFeed(...urls)(start);
    const result = findFeed({ id: ids[1] })(db);
    expect(result.id).toBe(ids[1]);
  });
});

import { v4 } from "uuid";
import addFeed from "../../src/Service/Feed/addFeed";
import Database from "../../src/Database/Database";

jest.mock("uuid", () => ({
  v4: jest.fn(),
}));

describe("addFeed", () => {
  const mockedV4 = v4 as jest.MockedFunction<typeof v4>;
  const start: Database = {
    updated: new Date(),
    feeds: [],
    channels: [],
    episodes: [],
    files: [],
  };
  test("empty DB", () => {
    const id = "newId";
    mockedV4.mockReturnValueOnce(id);
    const url = "my/test/url";
    const db = addFeed(url)(start);
    expect(mockedV4).toHaveBeenCalled();
    const { feeds } = db;
    expect(feeds).toHaveLength(1);
    const [feed] = feeds;
    expect(feed.url).toBe(url);
    expect(feed.id).toBe(id);
    expect(db.updated).not.toBe(start.updated);
  });
  test("adding two entries one after the other", () => {
    const id = "newId";
    mockedV4.mockReturnValueOnce(id);
    const url = "my/test/url";
    const db = addFeed(url)(start);
    {
      expect(mockedV4).toHaveBeenCalled();
      const { feeds } = db;
      expect(feeds).toHaveLength(1);
      const [feed] = feeds;
      expect(feed.url).toBe(url);
      expect(feed.id).toBe(id);
      expect(db.updated).not.toBe(start.updated);
    }
    const id2 = "id2";
    mockedV4.mockReturnValueOnce(id2);
    const url2 = "my/new/podcast/url";
    const db2 = addFeed(url2)(db);
    {
      expect(mockedV4).toHaveBeenCalled();
      const { feeds } = db2;
      expect(feeds).toHaveLength(2);
      const [feed1, feed2] = feeds;
      expect(feed1.url).toBe(url);
      expect(feed1.id).toBe(id);
      expect(feed2.url).toBe(url2);
      expect(feed2.id).toBe(id2);
      expect(db2.updated).not.toBe(db.updated);
    }
  });
  test("adding two entries at the same time", () => {
    const id = "newId";
    mockedV4.mockReturnValueOnce(id);
    const id2 = "id2";
    mockedV4.mockReturnValueOnce(id2);
    const url = "my/test/url";
    const url2 = "my/new/podcast/url";

    const db = addFeed(url, url2)(start);
    {
      expect(mockedV4).toHaveBeenCalled();
      const { feeds } = db;
      expect(feeds).toHaveLength(2);
      const [feed1, feed2] = feeds;
      expect(feed1.url).toBe(url);
      expect(feed1.id).toBe(id);
      expect(feed2.url).toBe(url2);
      expect(feed2.id).toBe(id2);
      expect(db.updated).not.toBe(start.updated);
    }
  });
  test("adding an array of entries at the same time", () => {
    const id = "newId";
    mockedV4.mockReturnValueOnce(id);
    const id2 = "id2";
    mockedV4.mockReturnValueOnce(id2);
    const url = "my/test/url";
    const url2 = "my/new/podcast/url";

    const db = addFeed(...[url, url2])(start);
    {
      expect(mockedV4).toHaveBeenCalled();
      const { feeds } = db;
      expect(feeds).toHaveLength(2);
      const [feed1, feed2] = feeds;
      expect(feed1.url).toBe(url);
      expect(feed1.id).toBe(id);
      expect(feed2.url).toBe(url2);
      expect(feed2.id).toBe(id2);
      expect(db.updated).not.toBe(start.updated);
    }
  });
});

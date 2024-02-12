import { v4 } from "uuid";
import addFeed from "../../src/Service/Feed/addFeed";
import Database from "../../src/Database/Database";

jest.mock("./uuid", () => ({
  v4: jest.fn(),
}));

describe("addFeed", () => {
  test("empty DB", () => {
    const start: Database = {
      updated: new Date(),
      feeds: [],
      channels: [],
      episodes: [],
      files: [],
    };
    const db = addFeed("my/test/url")(start);
    expect(db.feeds).toHaveLength(1);
    expect(db.updated).not.toBe(start.updated);
  });
});

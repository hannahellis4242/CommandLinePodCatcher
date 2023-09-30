import { subcommands } from "cmd-ts";
import add from "./feed/add";
import remove from "./feed/remove";
import update from "./feed/update";

const feed = (path: string) =>
  subcommands({
    name: "feed",
    cmds: { add: add(path), remove, update: update(path) },
  });
export default feed;

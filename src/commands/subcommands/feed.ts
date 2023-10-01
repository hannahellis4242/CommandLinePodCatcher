import { subcommands } from "cmd-ts";
import add from "./feed/add";
import update from "./feed/update";

const feed = (path: string) =>
  subcommands({
    name: "feed",
    cmds: { add: add(path), update: update(path) },
  });
export default feed;

import { subcommands } from "cmd-ts";
import add from "./feed/add";
import remove from "./feed/remove";
import { PathLike } from "fs";

const feed = (path: PathLike) =>
  subcommands({ name: "feed", cmds: { add: add(path), remove } });
export default feed;

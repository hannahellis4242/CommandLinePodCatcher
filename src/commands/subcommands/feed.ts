import { subcommands } from "cmd-ts";
import add from "./feed/add";
import remove from "./feed/remove";

const feed = (path: string) =>
  subcommands({ name: "feed", cmds: { add: add(path), remove } });
export default feed;

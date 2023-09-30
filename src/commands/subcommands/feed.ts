import { subcommands } from "cmd-ts";
import add from "./feed/add";
import remove from "./feed/remove";

const feed = subcommands({ name: "feed", cmds: { add, remove } });
export default feed;

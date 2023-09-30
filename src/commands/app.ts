import { subcommands } from "cmd-ts";
import init from "./subcommands/init";
import feed from "./subcommands/feed";
import podcasts from "./subcommands/podcasts";
import { PathLike } from "fs";

const app = (topLevelPath: PathLike) =>
  subcommands({
    name: "commands",
    cmds: { init: init(topLevelPath), feed: feed(topLevelPath), podcasts },
  });
export default app;

import { subcommands } from "cmd-ts";
import init from "./subcommands/init";
import feed from "./subcommands/feed";
import podcasts from "./subcommands/podcasts";
import { PathLike } from "fs";

const app = (topLevelPath: PathLike) => {
  const initCommand = init(topLevelPath);
  return subcommands({
    name: "commands",
    cmds: { init: initCommand, feed, podcasts },
  });
};
export default app;

import { subcommands } from "cmd-ts";
import init from "./subcommands/init";
import feed from "./subcommands/feed";
import podcasts from "./subcommands/podcasts";

const app = (topLevelPath: string) =>
  subcommands({
    name: "commands",
    cmds: {
      init: init(topLevelPath),
      feed: feed(topLevelPath),
      podcasts: podcasts(topLevelPath),
    },
  });
export default app;

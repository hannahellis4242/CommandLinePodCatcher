import { subcommands } from "cmd-ts";
import init from "./subcommands/init";
import feed from "./subcommands/feed";
import podcasts from "./subcommands/podcasts";

const app = subcommands({ name: "commands", cmds: { init, feed, podcasts } });
export default app;

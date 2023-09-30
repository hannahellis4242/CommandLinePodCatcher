import { subcommands } from "cmd-ts";
import pull from "./podcasts/pull";

const podcasts = (path: string) =>
  subcommands({
    name: "podcasts",
    cmds: { pull: pull(path) },
  });
export default podcasts;

import { subcommands } from "cmd-ts";
import update from "./podcasts/update";

const podcasts = (path: string) =>
  subcommands({
    name: "podcasts",
    cmds: { update: update(path) },
  });
export default podcasts;

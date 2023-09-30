import { subcommands } from "cmd-ts";
import update from "./podcasts/update";
import { PathLike } from "fs";

const podcasts = (path: PathLike) =>
  subcommands({
    name: "podcasts",
    cmds: { update: update(path) },
  });
export default podcasts;

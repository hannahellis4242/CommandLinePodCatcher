import { subcommands } from "cmd-ts";
import update from "./podcasts/update";

const podcasts = subcommands({ name: "podcasts", cmds: { update } });
export default podcasts;

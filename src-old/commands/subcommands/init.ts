import { command, option } from "cmd-ts";
import { Directory } from "cmd-ts/batteries/fs";

import { PathLike } from "fs";
import handleInit from "../../handlers/handleInit";

const init = (topLevelPath: PathLike) =>
  command({
    name: "init",
    args: {
      initPath: option({
        type: Directory,
        long: "path",
        short: "p",
        description: "Path to create the podcast directory in",
        defaultValue: () => topLevelPath.toString(),
      }),
    },
    handler: async ({ initPath }) => handleInit(initPath),
  });
export default init;

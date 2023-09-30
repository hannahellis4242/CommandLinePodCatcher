import { command } from "cmd-ts";
import handleUpdate from "../../../handlers/handleUpdate";
import { PathLike } from "fs";

const update = (path: PathLike) =>
  command({
    name: "update",
    args: {},
    handler: async () => handleUpdate(path),
  });
export default update;

import { command } from "cmd-ts";
import handleUpdate from "../../../handlers/handleUpdate";

const update = (path: string) =>
  command({
    name: "update",
    args: {},
    handler: async () => handleUpdate(path),
  });
export default update;

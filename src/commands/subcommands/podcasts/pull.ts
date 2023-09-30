import { command } from "cmd-ts";
import handlePull from "../../../handlers/handlePull";

const pull = (path: string) =>
  command({
    name: "pull",
    args: {},
    handler: () => handlePull(path),
  });
export default pull;

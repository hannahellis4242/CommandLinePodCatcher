import { command } from "cmd-ts";
import doInit from "../../handlers/doInit";

const init = command({
  name: "init",
  args: {},
  handler: doInit,
});
export default init;

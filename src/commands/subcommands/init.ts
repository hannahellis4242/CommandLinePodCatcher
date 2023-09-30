import { command } from "cmd-ts";
import handleInit from "../../handlers/handleInit";

const init = command({
  name: "init",
  args: {},
  handler: handleInit,
});
export default init;

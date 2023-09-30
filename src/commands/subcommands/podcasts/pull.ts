import { command } from "cmd-ts";

const pull = (path: string) =>
  command({
    name: "update",
    args: {},
    handler: async () => console.log("TODO"),
  });
export default pull;

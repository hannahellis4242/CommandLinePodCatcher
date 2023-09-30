import { command, positional } from "cmd-ts";
import { HttpUrl } from "cmd-ts/batteries/url";

const add = command({
  name: "add",
  args: { url: positional({ type: HttpUrl, displayName: "feed url" }) },
  handler: () => console.log("TODO"),
});

export default add;

import { command, positional } from "cmd-ts";
import { HttpUrl } from "cmd-ts/batteries/url";
import handleAdd from "../../../handlers/handleAdd";

const add = (path: string) =>
  command({
    name: "add",
    args: { url: positional({ type: HttpUrl, displayName: "feed url" }) },
    handler: ({ url }) => handleAdd(path, url),
  });

export default add;

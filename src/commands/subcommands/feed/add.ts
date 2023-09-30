import { command, positional } from "cmd-ts";
import { HttpUrl } from "cmd-ts/batteries/url";
import handleAdd from "../../../handlers/handleAdd";
import { PathLike } from "fs";

const add = (path: PathLike) =>
  command({
    name: "add",
    args: { url: positional({ type: HttpUrl, displayName: "feed url" }) },
    handler: ({ url }) => handleAdd(path, url),
  });

export default add;

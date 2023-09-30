import { PathLike } from "fs";
import { readFile } from "fs/promises";
import { join } from "path";
import { defaultConfigFilename } from "../../model/Files";

const checkInit = async (path: PathLike) => {
  try {
    await readFile(join(path.toString(), defaultConfigFilename));
    return true;
  } catch (_) {
    return false;
  }
};
export default checkInit;

import { readFile } from "fs/promises";
import { join } from "path";
import { defaultConfigFilename } from "../../model/Files";
import parseAsync from "./parseAsync";
import Config, { ConfigSchema } from "../../model/Config";

const readConfigFile = async (path: string): Promise<Config> =>
  readFile(join(path, defaultConfigFilename))
    .then((raw) => raw.toString())
    .then((str) => JSON.parse(str))
    .then(parseAsync(ConfigSchema));
export default readConfigFile;

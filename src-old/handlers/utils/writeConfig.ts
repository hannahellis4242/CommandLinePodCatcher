import { defaultConfigFilename } from "../../model/Files";
import { rename, stat, writeFile } from "fs/promises";
import Config from "../../model/Config";
import { join } from "path";
import exists from "./exitsts";

const writeFeedsFile = async (path: string, config: Config) => {
  try {
    const targetPath = join(path, defaultConfigFilename);
    const pathExists = await exists(targetPath);
    if (pathExists) {
      await rename(
        join(path, defaultConfigFilename),
        join(path, `backup_${Date.now()}.json`)
      );
    }
    await writeFile(
      join(path.toString(), defaultConfigFilename),
      JSON.stringify(config)
    );
  } catch (err) {
    return Promise.reject(err);
  }
};

export default writeFeedsFile;

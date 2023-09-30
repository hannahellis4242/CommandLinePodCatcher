import { defaultConfigFilename } from "../../model/Files";
import { rename, stat, writeFile } from "fs/promises";
import Config from "../../model/Config";
import { join } from "path";

const writeFeedsFile = async (path: string, config: Config) => {
  try {
    const targetPath = join(path, defaultConfigFilename);
    const exists = await stat(targetPath)
      .then(() => true)
      .catch(() => false);
    if (exists) {
      await rename(
        join(path, defaultConfigFilename),
        join(path, `backup_${Date.now()}`)
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

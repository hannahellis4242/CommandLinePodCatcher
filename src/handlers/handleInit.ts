import { PathLike } from "fs";
import { mkdir, readFile, writeFile } from "fs/promises";
import { join } from "path";
import checkInit from "./utils/checkInit";
import { podcastsDirname } from "../model/Files";
import writeConfig from "./utils/writeConfig";

const setupConfigFile = (path: string) =>
  Promise.resolve({ path: join(path, podcastsDirname), feeds: [] }).then(
    async (config) => {
      await writeConfig(path, config);
      return config;
    }
  );

const setup = async (path: string) => {
  try {
    const config = await setupConfigFile(path);
    await mkdir(config.path);
  } catch (err) {
    console.error("error:", err, "\nCould not initilise your feed 😟");
  }
};

const handleInit = async (path: string) => {
  if (await checkInit(path)) {
    console.log("Current directory is currently initilised. 😁");
    return;
  }
  console.log(
    `Setting up directory ${path}, please wait while I create the required data. ⌛`
  );
  await setup(path);
  console.log("Done setting up. You're already to go. 💯");
};

export default handleInit;

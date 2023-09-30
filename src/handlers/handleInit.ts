import { mkdir } from "fs/promises";
import { join } from "path";
import { podcastsDirname } from "../model/Files";
import writeConfig from "./utils/writeConfig";
import exists from "./utils/exitsts";

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
    Promise.reject(
      new Error(`error: ${err}\nCould not initilise your feed 😟`)
    );
  }
};

const handleInit = async (path: string) => {
  try {
    const itExists = await exists(path);
    if (itExists) {
      console.log("Current directory is currently initilised. 😁");
      return;
    }
    console.log(
      `Setting up directory ${path}, please wait while I create the required data. ⌛`
    );
    await setup(path);
    console.log("Done setting up. You're already to go. 💯");
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};

export default handleInit;

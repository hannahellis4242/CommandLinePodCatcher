import { PathLike } from "fs";
import { mkdir, readFile, writeFile } from "fs/promises";
import { join } from "path";
import checkInit from "../utils/checkInit";

const feedFilename = "feeds.json";
const podcastsDirname = "casts";

const setupFeedFile = (path: PathLike) => {
  const data = { time: Date.now().toString(), feeds: [] };
  return writeFile(join(path.toString(), feedFilename), JSON.stringify(data));
};

const setupPodcastsDir = (path: PathLike) =>
  mkdir(join(path.toString(), podcastsDirname));

const setup = async (path: PathLike) => {
  try {
    await setupFeedFile(path);
    await setupPodcastsDir(path);
  } catch (err) {
    console.error("error:", err, "\nCould not initilise your feed 😟");
  }
};

const handleInit = async (path: PathLike) => {
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

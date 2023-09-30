import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const feedFilename = "feeds.json";

const setupFeedFile = () => {
  const data = { date: Date.now().toString(), feeds: [] };
  return writeFile(join(__dirname, feedFilename), JSON.stringify(data));
};

const setup = async () => setupFeedFile();

const handleInit = () =>
  readFile(join(__dirname, feedFilename))
    .then(() => console.log("Current directory is currently initilised. 😁"))
    .catch(async () => {
      console.log(
        "Setting up directory, please wait while I create the required data. ⌛"
      );
      await setup();
      console.log("Done setting up. You're already to go. 💯");
    });

export default handleInit;

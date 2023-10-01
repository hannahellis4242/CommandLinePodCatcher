import { writeFile } from "fs/promises";
import Episode from "../../model/podcasts/Episode";
import { get } from "superagent";
import { promisify } from "util";

const getPromise = promisify(get);

const download = async (episode: Episode) => {
  try {
    const res = await getPromise(episode.url);
    await writeFile(episode.filePath, res.body);
  } catch (err) {
    console.error(err);
  }
};

export default download;

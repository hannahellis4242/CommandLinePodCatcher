import { writeFile } from "fs/promises";
import Episode from "../../model/podcasts/Episode";
import { get, Response } from "superagent";
import { promisify } from "util";

const getPromise = promisify(get);

const getWithRedirect = async (url: string): Promise<Response> => {
  const res = await getPromise(url);
  if (res.statusCode === 200) {
    return res;
  }
  const { headers } = res;
  const { location } = headers;
  if (location) {
    return await getWithRedirect(location);
  }
  return Promise.reject(new Error("no more redirects found"));
};

const download = async (episode: Episode) => {
  try {
    const res = await getWithRedirect(episode.url);
    if (res.status === 200) {
      await writeFile(episode.filePath, res.body);
      return;
    }
    return Promise.reject(new Error("could not get episode"));
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

export default download;

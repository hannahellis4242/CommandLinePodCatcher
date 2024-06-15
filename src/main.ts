import { exit } from "process";
import createRSS from "./createRSS";
import convertToPodcast from "./convertToPodcast";
import tidyDescriptions from "./tidyDescriptions";
import writePodcast from "./writePodcast";

const [rssURL] = process.argv.slice(2);

if (!rssURL) {
  console.error("Expect a url to the rssFeed as the first and only argument");
  exit(-1);
}

createRSS(rssURL)
  .then(convertToPodcast)
  .then(tidyDescriptions)
  .then(writePodcast("podcast"))
  .catch((err) => console.log(err));

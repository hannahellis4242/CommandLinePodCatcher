import { mkdir, writeFile } from "fs/promises";
import Podcast from "./model/Podcast/Podcast";
import { join } from "path";

const writePodcast = (dir: string) => async (podcast: Podcast) => {
  await mkdir(dir);
  const episodes = podcast.episodes
    .reverse()
    .map(
      (episode) => `# ${episode.title}
  - date : ${episode.date}
  - link : ${episode.link}
  - episode url : ${episode.url}
  ## Description
  ${episode.description}`
    )
    .map((text, i) => writeFile(join(dir, `episode${i}.md`), text));
  await Promise.all([
    writeFile(join(dir, "podcast.json"), JSON.stringify(podcast, null, 2)),
    writeFile(
      join(dir, "description.md"),
      `# ${podcast.title}
  - author : ${podcast.author}
  - link : ${podcast.link}
  ## Description
  ${podcast.description}`
    ),
    ...episodes,
  ]);
};
export default writePodcast;

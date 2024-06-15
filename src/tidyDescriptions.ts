import convertDescription from "./convertDescription";
import Podcast from "./model/Podcast/Podcast";

const tidyDescriptions = (podcast: Podcast): Podcast => ({
  ...podcast,
  description: convertDescription(podcast.description),
  episodes: podcast.episodes.map((episode) => ({
    ...episode,
    description: convertDescription(episode.description),
  })),
});

export default tidyDescriptions;

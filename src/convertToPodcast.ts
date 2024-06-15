import Episode from "./model/Podcast/Episode";
import Podcast from "./model/Podcast/Podcast";
import Item from "./model/RSS/Item";
import RSS from "./model/RSS/RSS";

const convertToEpisode = (item: Item): Episode => ({
  title: item.title,
  description: item.description || "",
  link: item.link || "",
  date: item.pubDate || "",
  url: item.enclosure?.["@_url"] || "",
});

const convertToPodcast = (rss: RSS): Podcast => ({
  title: rss.channel.title,
  link: rss.channel.link || "",
  description: rss.channel.description || "",
  author: rss.channel.author || "",
  episodes: rss.channel.item.map(convertToEpisode),
});

export default convertToPodcast;

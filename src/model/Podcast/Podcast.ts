import Episode from "./Episode";

export default interface Podcast {
  title: string;
  link: string;
  description: string;
  author: string;
  episodes: Episode[];
}

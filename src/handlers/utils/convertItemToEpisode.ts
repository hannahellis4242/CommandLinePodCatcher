import { join } from "path";
import Item from "../../model/RSS/Item";
import Episode from "../../model/podcasts/Episode";
import extension from "./extention";
import sanitiseFilename from "./sanitiseFilename";

const createFilename = ({ title, enclosure }: Item): string => {
  return sanitiseFilename(title) + extension(enclosure["@_type"]);
};

const convertItemToExpisode = (path: string, item: Item): Episode => ({
  title: item.title,
  url: item.enclosure["@_url"],
  filePath: join(path, createFilename(item)),
});

export default convertItemToExpisode;

import { join, resolve } from "path";
import Item from "../../model/RSS/Item";
import Episode from "../../model/podcasts/Episode";
import extension from "./extention";
import sanitiseFilename from "./sanitiseFilename";

const createFilename = ({ title, enclosure }: Item): string => {
  if (!enclosure) {
    return "unknown";
  }
  const fileType = enclosure["@_type"];
  if (fileType) {
    return sanitiseFilename(title) + extension(fileType);
  }
  return sanitiseFilename(
    enclosure["@_url"].split("/").at(-1) || `${title}.temp`
  );
};

const getUrl = ({ enclosure }: Item): string => {
  if (!enclosure) {
    return "unknown";
  }
  return enclosure["@_url"];
};

const convertItemToExpisode = (path: string, item: Item): Episode => ({
  title: item.title,
  url: getUrl(item),
  filePath: resolve(join(path, createFilename(item))),
  valid: item.enclosure !== undefined,
});

export default convertItemToExpisode;

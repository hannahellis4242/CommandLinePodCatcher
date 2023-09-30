import { join } from "path";
import Item from "../../model/RSS/Item";
import Episode from "../../model/podcasts/Episode";
import extension from "./extention";

const convertItemToExpisode = (path: string, x: Item): Episode => ({
  title: x.title,
  url: x.enclosure["@_url"],
  filePath: join(
    path,
    x.title.replaceAll(/\s/g, "-").replaceAll("/", "-") +
      extension(x.enclosure["@_type"])
  ),
});

export default convertItemToExpisode;

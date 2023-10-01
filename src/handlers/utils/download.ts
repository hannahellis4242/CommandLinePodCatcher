import Episode from "../../model/podcasts/Episode";
import downloadHttps from "./downloadHttps";
import downloadHttp from "./downloadHttp";

const download = ({ url, filePath }: Episode): Promise<void> =>
  url.includes("https")
    ? downloadHttps(url, filePath)
    : downloadHttp(url, filePath);

export default download;

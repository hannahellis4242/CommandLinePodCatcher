import { createWriteStream } from "fs";
import https from "https";
import Episode from "../../model/podcasts/Episode";

const getRemoteFile = (file: string, url: string) => {
  let localFile = createWriteStream(file);
  https.get(url, (response) => {
    if (response.statusCode === 200) {
      console.log(response.headers);
      console.log(response.statusCode);
      const len = parseInt(response.headers["content-length"]!, 10);
      let cur = 0;
      const total = len / 1048576; //1048576 - bytes in 1 Megabyte

      response.on("data", (chunk) => {
        cur += chunk.length;
        showProgress(file, cur, len, total);
      });

      response.on("end", function () {
        console.log("Download complete");
      });

      response.pipe(localFile);
    }
    if (response.statusCode === 302) {
      const newLocation = response.headers!.location!;
      getRemoteFile(file, newLocation);
    }
  });
};

const showProgress = (
  file: string,
  cur: number,
  len: number,
  total: number
) => {
  console.log(
    "Downloading " +
      file +
      " - " +
      ((100.0 * cur) / len).toFixed(2) +
      "% (" +
      (cur / 1048576).toFixed(2) +
      " MB) of total size: " +
      total.toFixed(2) +
      " MB"
  );
};

const download = ({ url, filePath }: Episode) => getRemoteFile(filePath, url);

export default download;

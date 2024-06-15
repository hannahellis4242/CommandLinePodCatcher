import http from "http";
import { createWriteStream } from "fs";
import downloadHttps from "./downloadHttps";

const downloadHttp = (url: string, destination: string) =>
  new Promise<void>((resolve, reject) => {
    http
      .get(url, async (response) => {
        const { statusCode } = response;
        if (!statusCode) {
          reject(new Error(`no status code when getting ${url}`));
          return;
        }
        if (statusCode >= 300 && statusCode < 400) {
          const { headers } = response;
          const { location } = headers;
          if (!location) {
            reject(new Error(`no location when being redirected from ${url}`));
            return;
          }
          try {
            if (location.includes("https")) {
              await downloadHttps(location, destination);
            } else {
              await downloadHttp(location, destination);
            }
            resolve();
            return;
          } catch (err) {
            reject(err);
            return;
          }
        }
        if (statusCode === 200) {
          const fileStream = createWriteStream(destination);
          response.pipe(fileStream);
          fileStream.on("finish", () => {
            fileStream.close();
            resolve();
            return;
          });
        } else {
          reject(
            new Error(
              `Failed to download file. Status code: ${response.statusCode}`
            )
          );
        }
      })
      .on("error", (error) => {
        reject(error);
      });
  });

export default downloadHttp;

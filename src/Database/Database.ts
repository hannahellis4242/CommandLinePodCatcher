import Channel from "./Channel";
import Episode from "./Episode";
import Feed from "./Feed";
import File from "./File";

export default interface Database {
  feeds: Feed[];
  channels: Channel[];
  episodes: Episode[];
  files: File[];
}

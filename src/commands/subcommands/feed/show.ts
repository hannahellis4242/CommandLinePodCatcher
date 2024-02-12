import { command, option, string } from "cmd-ts";
import handleShow from "../../../handlers/handleShow";

const show = (path:string) => command({
  name: "show",
  args: {
    id: option({ type: string, long: "id", short: "i" }),
    title: option({ type: string, long: "title", short: "t" }),
  },
  handler: (id: string | undefined, title: string | undefined) =>
    handleShow(path,id,title);
});
export default show;

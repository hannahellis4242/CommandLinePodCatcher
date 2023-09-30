import { stat } from "fs/promises";

const exists = (target: string) =>
  stat(target)
    .then(() => true)
    .catch(() => false);
export default exists;

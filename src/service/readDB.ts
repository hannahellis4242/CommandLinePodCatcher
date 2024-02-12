import { readFile } from "fs/promises";
import Database, { DatabaseSchema } from "../Database/Database";
import parseAsync from "./parseAsync";

const readDB = async (file: string): Promise<Database> =>
  readFile(file)
    .then((raw) => raw.toString())
    .then((str) => JSON.parse(str))
    .then(parseAsync(DatabaseSchema));
export default readDB;

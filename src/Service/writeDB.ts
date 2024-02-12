import { rename, writeFile } from "fs/promises";
import { join } from "path";
import Database from "../Database/Database";
import exists from "./exitsts";

const writeDB = (file: string) => async (db: Database) => {
  try {
    const fileExists = await exists(file);
    if (fileExists) {
      await rename(file, join(file, `backup_${Date.now()}.json`));
    }
    db.updated = new Date();
    await writeFile(file, JSON.stringify(db));
  } catch (err) {
    return Promise.reject(err);
  }
};

export default writeDB;

import type { HymnData } from "../types";
import db from "./index";

export async function updateIndexedDB(
  currentVersion: number,
  data: HymnData[]
) {
  const previousVersion = localStorage.getItem("version");
  if (previousVersion === null || parseInt(previousVersion) < currentVersion) {
    try {
      await db.hymns.clear();
      await db.hymns.bulkAdd(data);
      localStorage.setItem("version", currentVersion.toString());

      console.log("Database updated by simple overwrite!");
      return true;
    } catch (error) {
      console.error("Error updating database (simple overwrite): ", error);
    }
  }

  return false;
}

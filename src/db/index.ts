import Dexie, { type Table } from "dexie";

import { updateIndexedDB } from "./version-db";
import type { HymnData } from "../types";
class MyDatabase extends Dexie {
  hymns!: Table<HymnData, number>;

  constructor() {
    super("sda_hymns");
    this.version(1).stores({
      hymns:
        "++hymn_number, title, category, stanzas, subcategory, first_line, published_at, key, filename, composer, author", // `id` is the primary key
    });
  }
}

const db = new MyDatabase();

export const preloadData = async (
  version: number,
  data: HymnData[]
): Promise<void> => {
  const existingCount = await db.hymns.count();
  if (existingCount === 0) {
    await db.hymns.bulkAdd(data);
    console.log("JSON data preloaded into Dexie database.");
  } else {
    const isUpdated = await updateIndexedDB(version, data);
    if (isUpdated) {
      console.log("The hymn data was updated to version " + version + "");
    } else {
      console.log("Dexie database already contains data.");
    }
  }
};

export function filterHymnsByCategories(
  categories?: string,
  offset: number = 0,
  pageSize: number = 10
): Promise<{
  count: number;
  hymns: HymnData[];
}> {
  return new Promise((resolve, reject) => {
    let query = db.hymns;

    if (categories) {
      const categoryList = categories.split(":");
      if (categoryList.length === 1) {
        query = query.where({ category: categoryList[0] }) as unknown as Table<
          HymnData,
          number,
          HymnData
        >;
      } else if (categoryList.length === 2) {
        query = query
          .where("category")
          .equals(categoryList[0])
          .and(
            (hymns) => hymns.subcategory === categoryList[1]
          ) as unknown as Table<HymnData, number, HymnData>;
      }
    }

    query.count().then((count) => {
      query
        .offset(offset)
        .limit(pageSize)
        .toArray((hymns) => {
          resolve({
            count,
            hymns,
          });
        })
        .catch(reject);
    });
  });
}

export async function fetchHymn(hymnNumber: number) {
  return (await db.hymns.where({ hymn_number: hymnNumber }).toArray())[0];
}

export async function fetchAllHymns() {
  return db.hymns.toArray();
}

export async function fetchCategories() {
  const hymns = await db.hymns.toArray();
  return ["", ...new Set(hymns.map((data) => data.category))];
}

export async function fetchSubcategories(category?: string) {
  const hymns = await db.hymns
    .filter(
      (hymn) =>
        hymn.category.toLowerCase().replace(/ /g, "-") === category &&
        hymn.subcategory !== undefined
    )
    .toArray();

  const subcategories = [
    ...new Set(
      hymns.filter((hymn) => hymn.subcategory).map((data) => data.subcategory)
    ),
  ];

  return hymns.length > 0 ? ["", ...subcategories] : subcategories;
}

export default db;

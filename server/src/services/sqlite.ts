import Database from "better-sqlite3";
import path from "path";

export interface Platform {
  platform: string;
  lastScraped: string;
  data: string;
}

export interface Influencer {
  username: string;
  followers: string;
  engagementRate: string;
}

export interface Top50Data {
  lastScraped: string | null;
  data: Influencer[];
}

// Initialize the SQLite database and create tables if they don't exist
export const initDB = () => {
  const dbPath = path.resolve(process.cwd(), "top50.db");
  const db = new Database(dbPath);

  // Create Top50 table
  db.exec(`
    CREATE TABLE IF NOT EXISTS top50 (
      platform TEXT PRIMARY KEY,
      lastScraped TEXT,
      data TEXT
    )
  `);
  return db;
};

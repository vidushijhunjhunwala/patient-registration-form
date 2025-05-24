import { PGlite } from "https://cdn.jsdelivr.net/npm/@electric-sql/pglite/dist/index.js";

let db;

export async function getDB() {
  if (!db) {
    db = new PGlite();
    await db.exec(`
      CREATE TABLE IF NOT EXISTS patients (
        id INTEGER PRIMARY KEY,
        fullName TEXT,
        dob TEXT,
        gender TEXT,
        maritalStatus TEXT,
        address TEXT,
        phone TEXT,
        email TEXT,
        reason TEXT
      )
    `);
  }
  return db;
}

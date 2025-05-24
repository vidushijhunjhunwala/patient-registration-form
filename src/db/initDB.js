import { PGlite } from "https://cdn.jsdelivr.net/npm/@electric-sql/pglite/dist/index.js";
let db;

export async function getDB() {
  if (!db) {
    // Give the database a name so it persists in IndexedDB
    db = new PGlite("idb://patients");

    await db.exec(`
      CREATE TABLE IF NOT EXISTS patients (
        id SERIAL PRIMARY KEY ,
        fullName TEXT,
        dob TEXT,
        gender TEXT,
        maritalStatus TEXT,
        address TEXT,
        phone TEXT,
        email TEXT,
        reason TEXT,

        emergencyName TEXT,
        emergencyRelation TEXT,
        emergencyPhone TEXT,

        primaryInsurance TEXT,
        primaryPolicyholder TEXT,
        primaryPolicyNumber TEXT,
        primaryGroupNumber TEXT,

        secondaryPolicyholder TEXT,
        secondaryPolicyNumber TEXT,
        secondaryGroupNumber TEXT,

        physicianName TEXT,
        clinicName TEXT,
        physicianPhone TEXT,

        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }
  return db;
}
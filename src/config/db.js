const sqlite3 = require("sqlite3").verbose();
/*
 * .verbose() prints all SQL statements.
 * Good for development, remove in production.
 */
const path = require("path");
const fs = require("fs");

// Absolute path to DB
const dbPath = path.join(__dirname, "../../db/database.sqlite");
console.log("DB PATH:", dbPath);

// Absolute path to schema.sql
const schemaPath = path.join(__dirname, "../../db/schema.sql");


// Create DB connection (file auto-created if missing)
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("❌ Failed to connect to SQLite DB:", err.message);
    } else {
        console.log("✅ Connected to SQLite DB");
    }
});



// Initialize schema
const initDB = () => {
    const schema = fs.readFileSync(schemaPath, "utf8");

    db.exec(schema, (err) => {
        if (err) {
            console.error("❌ Failed to initialize DB schema:", err.message);
        } else {
            console.log("✅ Database schema initialized");
        }
    });
};



module.exports = {
    db,
    initDB
};

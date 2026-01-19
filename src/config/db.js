const sqlite3 = require('sqlite3').verbose(); 

/*  * The .verbose() method enables verbose mode, which prints out all SQL statements
 * and additional debugging information to the console.
 * Note: Remove .verbose() in production for better performance and cleaner logs.
 */
const path = require('path');
//absoulte path to the database file
const dbpath = path.join(__dirname, "../../db/database.sqlite");

// Create a new database connection
const db = new sqlite3.Database(dbpath, (err) => {
    
    if (err){
        console.error('❌ Failed to connect to the sqlite DB', err.message);
    }
    else {
        console.log('✅ Connected to SQLite DB');
    }
});

module.exports = db;    
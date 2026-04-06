const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "..", "database.sqlite");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error connecting to SQLite database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS favorites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      movieId INTEGER UNIQUE,
      title TEXT NOT NULL,
      posterPath TEXT,
      releaseDate TEXT
    )
  `);
});

module.exports = db;
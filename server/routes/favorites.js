const express = require("express");
const router = express.Router();
const db = require("../models/db");

// GET all favorites
router.get("/", (req, res) => {
  db.all("SELECT * FROM favorites ORDER BY id DESC", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch favorites." });
    }
    res.status(200).json(rows);
  });
});

// POST new favorite
router.post("/", (req, res) => {
  const { movieId, title, posterPath, releaseDate } = req.body;

  if (!movieId || !title) {
    return res.status(400).json({ error: "movieId and title are required." });
  }

  const sql = `
    INSERT INTO favorites (movieId, title, posterPath, releaseDate)
    VALUES (?, ?, ?, ?)
  `;

  db.run(sql, [movieId, title, posterPath || "", releaseDate || ""], function (err) {
    if (err) {
      if (err.message.includes("UNIQUE")) {
        return res.status(409).json({ error: "Movie is already in favorites." });
      }
      return res.status(500).json({ error: "Failed to add favorite." });
    }

    res.status(201).json({
      message: "Favorite added successfully.",
      id: this.lastID,
    });
  });
});

// DELETE favorite by movieId
router.delete("/:movieId", (req, res) => {
  const { movieId } = req.params;

  db.run("DELETE FROM favorites WHERE movieId = ?", [movieId], function (err) {
    if (err) {
      return res.status(500).json({ error: "Failed to remove favorite." });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "Favorite not found." });
    }

    res.status(200).json({ message: "Favorite removed successfully." });
  });
});

module.exports = router;
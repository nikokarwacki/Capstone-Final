const express = require('express');
const router = express.Router();
const { Movie } = require('../models');

// GET all saved movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

// POST save movie
router.post('/', async (req, res) => {
  try {
    const { tmdbId, title, posterPath, releaseDate, overview } = req.body;

    if (!tmdbId || !title) {
      return res.status(400).json({ error: 'tmdbId and title are required' });
    }

    const existingMovie = await Movie.findOne({ where: { tmdbId } });

    if (existingMovie) {
      return res.status(409).json({ error: 'Movie already saved' });
    }

    const movie = await Movie.create({
      tmdbId,
      title,
      posterPath,
      releaseDate,
      overview,
    });

    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save movie' });
  }
});

// DELETE movie by tmdbId
router.delete('/:tmdbId', async (req, res) => {
  try {
    const { tmdbId } = req.params;

    const deleted = await Movie.destroy({
      where: { tmdbId },
    });

    if (!deleted) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    res.status(200).json({ message: 'Movie removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete movie' });
  }
});

module.exports = router;
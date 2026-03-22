const express = require('express');
const router = express.Router();
const db = require('../models');

// GET all movies
router.get('/', async (req, res) => {
  const movies = await db.Movie.findAll();
  res.json(movies);
});

// POST create movie
router.post('/', async (req, res) => {
  const movie = await db.Movie.create(req.body);
  res.json(movie);
});

// GET one movie
router.get('/:id', async (req, res) => {
  const movie = await db.Movie.findByPk(req.params.id);
  res.json(movie);
});

// DELETE movie
router.delete('/:id', async (req, res) => {
  await db.Movie.destroy({ where: { id: req.params.id } });
  res.json({ message: 'Deleted' });
});

module.exports = router;
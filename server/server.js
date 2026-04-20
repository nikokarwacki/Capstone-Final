const express = require('express');
const cors = require('cors');
const app = express();

// initialize sqlite db file
require('./models/db');

app.use(cors({
  origin: 'https://capstone-final-olive.vercel.app',
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

// Routes
const movieRoutes = require('./routes/movies');
const favoriteRoutes = require('./routes/favorites');

app.use('/api/movies', movieRoutes);
app.use('/api/favorites', favoriteRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
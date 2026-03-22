const express = require('express');
const app = express();
const db = require('./models');

app.use(express.json());

// Routes
const movieRoutes = require('./routes/movies');
app.use('/api/movies', movieRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Connect DB + start server
db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
});
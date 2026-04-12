const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./models');

app.use(cors());
app.use(express.json());

// Routes
const movieRoutes = require('./routes/movies');
app.use('/api/movies', movieRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Use Render's port in production
const PORT = process.env.PORT || 3000;

// Connect DB + start server
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Database error:', error);
});
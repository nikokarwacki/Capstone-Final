const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'database.sqlite'),
  logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Movie = require('./movie')(sequelize, DataTypes);

module.exports = db;
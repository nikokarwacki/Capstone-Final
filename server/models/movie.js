module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
    },
    posterPath: {
      type: DataTypes.STRING,
    },
    releaseDate: {
      type: DataTypes.STRING,
    },
    overview: {
      type: DataTypes.TEXT,
    }
  });

  return Movie;
};
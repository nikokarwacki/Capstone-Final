module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    tmdbId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    posterPath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    releaseDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    overview: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  });

  return Movie;
};
import { useEffect, useState } from 'react';
import { getMovies, createMovie, deleteMovie } from './api';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    loadMovies();
  }, []);

  async function loadMovies() {
    try {
      const data = await getMovies();
      setMovies(data);
    } catch (err) {
      console.error('Error loading movies:', err);
    }
  }

  async function handleAddMovie() {
    const newMovie = {
      title: 'Test Movie',
      genre: 'Action',
      posterPath: '',
      releaseDate: '2024',
      overview: 'Test overview',
    };

    try {
      await createMovie(newMovie);
      loadMovies();
    } catch (err) {
      console.error('Error adding movie:', err);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteMovie(id);
      setMovies(movies.filter((movie) => movie.id !== id));
    } catch (err) {
      console.error('Error deleting movie:', err);
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>MovieShelf MVP</h1>

      <button onClick={handleAddMovie}>Add Test Movie</button>

      <h2>Saved Movies</h2>

      {movies.length === 0 ? (
        <p>No movies saved yet.</p>
      ) : (
        movies.map((movie) => (
          <div key={movie.id}>
            <p>{movie.title}</p>
            <button onClick={() => handleDelete(movie.id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
import { useEffect, useState } from 'react';
import { searchMovies, getSavedMovies, saveMovie, deleteMovie } from './api';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [view, setView] = useState('search');

  const loadSavedMovies = async () => {
    try {
      const data = await getSavedMovies();
      setSavedMovies(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    loadSavedMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');

    try {
      const results = await searchMovies(query);
      setMovies(results);
    } catch (err) {
      setError(err.message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveMovie = async (movie) => {
    try {
      await saveMovie(movie);
      await loadSavedMovies();
      alert('Movie saved to favorites');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteMovie = async (tmdbId) => {
    try {
      await deleteMovie(tmdbId);
      await loadSavedMovies();
    } catch (err) {
      alert(err.message);
    }
  };

  const savedIds = savedMovies.map((movie) => movie.tmdbId);

  return (
    <div style={{ padding: '20px' }}>
      <h1>MovieShelf Pro</h1>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setView('search')} style={{ marginRight: '10px' }}>
          Search
        </button>
        <button onClick={() => setView('favorites')}>
          Favorites
        </button>
      </div>

      {view === 'search' && (
        <>
          <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Search movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ padding: '10px', width: '250px', marginRight: '10px' }}
            />
            <button type="submit">Search</button>
          </form>

          {loading && <p>Loading movies...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && movies.length === 0 && <p>No search results yet.</p>}

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {movies.map((movie) => (
              <div
                key={movie.id}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '12px',
                  width: '200px',
                }}
              >
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                      : 'https://via.placeholder.com/200x300?text=No+Image'
                  }
                  alt={movie.title}
                  style={{ width: '100%', borderRadius: '8px' }}
                />
                <h3>{movie.title}</h3>
                <p>{movie.release_date || 'No release date'}</p>

                {savedIds.includes(movie.id) ? (
                  <button disabled>Saved</button>
                ) : (
                  <button onClick={() => handleSaveMovie(movie)}>Save Favorite</button>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {view === 'favorites' && (
        <>
          <h2>Your Favorites</h2>
          {savedMovies.length === 0 ? (
            <p>No saved favorites yet.</p>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              {savedMovies.map((movie) => (
                <div
                  key={movie.id}
                  style={{
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '12px',
                    width: '200px',
                  }}
                >
                  <img
                    src={
                      movie.posterPath
                        ? `https://image.tmdb.org/t/p/w200${movie.posterPath}`
                        : 'https://via.placeholder.com/200x300?text=No+Image'
                    }
                    alt={movie.title}
                    style={{ width: '100%', borderRadius: '8px' }}
                  />
                  <h3>{movie.title}</h3>
                  <p>{movie.releaseDate || 'No release date'}</p>
                  <button onClick={() => handleDeleteMovie(movie.tmdbId)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
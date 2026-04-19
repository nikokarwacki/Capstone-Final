const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export async function searchMovies(query) {
  const response = await fetch(
    `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch movies from TMDB');
  }

  const data = await response.json();
  return data.results || [];
}

export async function getSavedMovies() {
  const response = await fetch(`${BASE_URL}/favorites`);

  if (!response.ok) {
    throw new Error('Failed to fetch saved movies');
  }

  return response.json();
}

export async function saveMovie(movie) {
  const response = await fetch(`${BASE_URL}/favorites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tmdbId: movie.id,
      title: movie.title,
      posterPath: movie.poster_path,
      releaseDate: movie.release_date,
      overview: movie.overview,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to save movie');
  }

  return data;
}

export async function deleteMovie(tmdbId) {
  const response = await fetch(`${BASE_URL}/favorites/${tmdbId}`, {
    method: 'DELETE',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to delete movie');
  }

  return data;
}
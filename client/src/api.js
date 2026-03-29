const API_URL = 'http://localhost:3000/api/movies';

// GET all saved movies
export async function getMovies() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed to fetch movies');
  return res.json();
}

// SAVE movie
export async function createMovie(movie) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie),
  });

  if (!res.ok) throw new Error('Failed to save movie');
  return res.json();
}

// DELETE movie
export async function deleteMovie(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) throw new Error('Failed to delete movie');
  return res.json();
}
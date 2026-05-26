import api from './api';

export const movieService = {
  async getTrending() {
    const { data } = await api.get('/movies/trending');
    return data.results; // Returns array of movies
  },

  async getPopular() {
    const { data } = await api.get('/movies/popular');
    return data.results; // Returns array of movies
  },

  async getTopRated() {
    const { data } = await api.get('/movies/top-rated');
    return data.results; // Returns array of movies
  },

  async searchMovies({ q, year, page = 1 }) {
    const params = { q, page };
    if (year) params.year = year;
    const { data } = await api.get('/movies/search', { params });
    return data; // Returns { success, results, totalResults }
  },

  async getGenres() {
    const { data } = await api.get('/movies/genres');
    return data.genres; // Returns array of { id, name }
  },

  async getMovieById(id) {
    const { data } = await api.get(`/movies/${id}`);
    return data.movie; // Returns full movie detail object
  },

  async getCast(id) {
    const { data } = await api.get(`/movies/${id}/cast`);
    return data.cast; // Returns array of actors { name }
  },

  async getTrailer(id) {
    const { data } = await api.get(`/movies/${id}/trailer`);
    return data.trailer; // Returns trailer key or null
  },

  async getSimilar(id) {
    const { data } = await api.get(`/movies/${id}/similar`);
    return data.results; // Returns array of similar movies
  },
};

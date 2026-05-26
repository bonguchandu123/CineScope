import api from './api';

export const watchlistService = {
  async getWatchlist() {
    const { data } = await api.get('/watchlist');
    return data.movies; // Returns array of watchlisted movies
  },

  async addToWatchlist({ movieId, title, poster }) {
    const { data } = await api.post('/watchlist', { movieId, title, poster });
    return data; // Returns { success, message, movies }
  },

  async removeFromWatchlist(movieId) {
    const { data } = await api.delete(`/watchlist/${movieId}`);
    return data; // Returns { success, message, movies }
  },

  async toggleWatched(movieId) {
    const { data } = await api.patch(`/watchlist/${movieId}/watched`);
    return data; // Returns { success, movies }
  },
};

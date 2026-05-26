import api from './api';

export const reviewService = {
  async getMovieReviews(movieId) {
    const { data } = await api.get(`/reviews/movie/${movieId}`);
    return data.reviews; // Returns array of reviews for a movie
  },

  async postReview(movieId, { movieTitle, rating, body }) {
    const { data } = await api.post(`/reviews/movie/${movieId}`, { movieTitle, rating, body });
    return data.review; // Returns populated review object
  },

  async editReview(reviewId, { rating, body }) {
    const { data } = await api.put(`/reviews/${reviewId}`, { rating, body });
    return data.review; // Returns updated review
  },

  async deleteReview(reviewId) {
    const { data } = await api.delete(`/reviews/${reviewId}`);
    return data; // Returns success response
  },

  async getUserReviews() {
    const { data } = await api.get('/reviews/user/me');
    return data.reviews; // Returns list of reviews written by user
  },
};

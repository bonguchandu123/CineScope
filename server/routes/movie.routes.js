import express from 'express'
import {
  getTrending,
  getPopular,
  getTopRated,
  searchMovies,
  getMovieById,
  getMovieCast,
  getMovieTrailer,
  getSimilarMovies,
  getGenres,
} from '../controllers/movie.controller.js'
import { apiLimiter } from '../middleware/rateLimiter.js'

const router = express.Router()

router.use(apiLimiter)

router.get('/trending', getTrending)
router.get('/popular', getPopular)
router.get('/top-rated', getTopRated)
router.get('/search', searchMovies)
router.get('/genres', getGenres)
router.get('/:id', getMovieById)
router.get('/:id/cast', getMovieCast)
router.get('/:id/trailer', getMovieTrailer)
router.get('/:id/similar', getSimilarMovies)

export default router
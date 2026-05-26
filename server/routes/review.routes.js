import express from 'express'
import {
  getMovieReviews,
  postReview,
  editReview,
  deleteReview,
  getUserReviews,
} from '../controllers/review.controller.js'
import { protect } from '../middleware/auth.middleware.js'

const router = express.Router()

router.get('/user/me', protect, getUserReviews)
router.get('/movie/:movieId', getMovieReviews)
router.post('/movie/:movieId', protect, postReview)
router.put('/:reviewId', protect, editReview)
router.delete('/:reviewId', protect, deleteReview)

export default router
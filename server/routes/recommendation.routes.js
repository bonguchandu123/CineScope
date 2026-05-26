import express from 'express'
import {
  getRecommendations,
  getSimilar,
} from '../controllers/recommendation.controller.js'
import { protect } from '../middleware/auth.middleware.js'

const router = express.Router()

router.get('/', protect, getRecommendations)
router.get('/similar/:movieId', getSimilar)

export default router
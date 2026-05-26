import express from 'express'
import {
  getRecentlyViewed,
  logView,
  clearHistory,
} from '../controllers/recentlyViewed.controller.js'
import { protect } from '../middleware/auth.middleware.js'

const router = express.Router()

router.use(protect)

router.get('/', getRecentlyViewed)
router.post('/', logView)
router.delete('/', clearHistory)

export default router
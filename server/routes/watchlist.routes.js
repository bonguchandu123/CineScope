import express from 'express'
import {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  toggleWatched,
} from '../controllers/watchlist.controller.js'
import { protect } from '../middleware/auth.middleware.js'

const router = express.Router()

router.use(protect)

router.get('/', getWatchlist)
router.post('/', addToWatchlist)
router.delete('/:movieId', removeFromWatchlist)
router.patch('/:movieId/watched', toggleWatched)

export default router
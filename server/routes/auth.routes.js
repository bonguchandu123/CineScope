import express from 'express'
import {
  register,
  login,
  getMe,
  logout,
} from '../controllers/auth.controller.js'
import { protect } from '../middleware/auth.middleware.js'
import { authLimiter } from '../middleware/rateLimiter.js'

const router = express.Router()

router.post('/register', authLimiter, register)
router.post('/login', authLimiter, login)
router.get('/me', protect, getMe)
router.post('/logout', protect, logout)

export default router
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import { errorHandler } from './middleware/errorHandler.js'
import authRoutes from './routes/auth.routes.js'
import movieRoutes from './routes/movie.routes.js'
import reviewRoutes from './routes/review.routes.js'
import watchlistRoutes from './routes/watchlist.routes.js'
import recentlyViewedRoutes from './routes/recentlyViewed.routes.js'
import recommendationRoutes from './routes/recommendation.routes.js'

dotenv.config()

const app = express()

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/movies', movieRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/watchlist', watchlistRoutes)
app.use('/api/recently-viewed', recentlyViewedRoutes)
app.use('/api/recommendations', recommendationRoutes)

app.get('/', (req, res) => {
  res.json({ message: '🎬 CineScope API is running' })
})

app.use(errorHandler)

const startServer = async () => {
  try {
    await connectDB()
    app.listen(process.env.PORT, () => {
      console.log(`🚀 CineScope server running on http://localhost:${process.env.PORT}`)
    })
  } catch (err) {
    console.error(`❌ Server failed to start: ${err.message}`)
    process.exit(1)
  }
}

startServer()
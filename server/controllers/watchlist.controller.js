import Watchlist from '../models/Watchlist.js'

// Get watchlist
export const getWatchlist = async (req, res, next) => {
  try {
    let watchlist = await Watchlist.findOne({ userId: req.user.id })
    if (!watchlist) {
      watchlist = await Watchlist.create({ userId: req.user.id, movies: [] })
    }
    res.status(200).json({ success: true, movies: watchlist.movies })
  } catch (err) {
    next(err)
  }
}

// Add to watchlist
export const addToWatchlist = async (req, res, next) => {
  try {
    const { movieId, title, poster } = req.body

    let watchlist = await Watchlist.findOne({ userId: req.user.id })
    if (!watchlist) {
      watchlist = await Watchlist.create({ userId: req.user.id, movies: [] })
    }

    const exists = watchlist.movies.find((m) => m.movieId === movieId)
    if (exists) {
      return res.status(400).json({ success: false, message: 'Movie already in watchlist' })
    }

    watchlist.movies.push({ movieId, title, poster, addedAt: new Date(), watched: false })
    await watchlist.save()

    res.status(200).json({ success: true, message: 'Added to watchlist', movies: watchlist.movies })
  } catch (err) {
    next(err)
  }
}

// Remove from watchlist
export const removeFromWatchlist = async (req, res, next) => {
  try {
    const { movieId } = req.params

    const watchlist = await Watchlist.findOne({ userId: req.user.id })
    if (!watchlist) {
      return res.status(404).json({ success: false, message: 'Watchlist not found' })
    }

    watchlist.movies = watchlist.movies.filter((m) => m.movieId !== movieId)
    await watchlist.save()

    res.status(200).json({ success: true, message: 'Removed from watchlist', movies: watchlist.movies })
  } catch (err) {
    next(err)
  }
}

// Toggle watched status
export const toggleWatched = async (req, res, next) => {
  try {
    const { movieId } = req.params

    const watchlist = await Watchlist.findOne({ userId: req.user.id })
    if (!watchlist) {
      return res.status(404).json({ success: false, message: 'Watchlist not found' })
    }

    const movie = watchlist.movies.find((m) => m.movieId === movieId)
    if (!movie) {
      return res.status(404).json({ success: false, message: 'Movie not found in watchlist' })
    }

    movie.watched = !movie.watched
    await watchlist.save()

    res.status(200).json({ success: true, movies: watchlist.movies })
  } catch (err) {
    next(err)
  }
}
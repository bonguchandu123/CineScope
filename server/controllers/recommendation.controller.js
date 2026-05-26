import omdb from '../config/omdb.js'
import Watchlist from '../models/Watchlist.js'
import NodeCache from 'node-cache'

const cache = new NodeCache({ stdTTL: 300 })

// Get personalized recommendations
export const getRecommendations = async (req, res, next) => {
  try {
    const watchlist = await Watchlist.findOne({ userId: req.user.id })

    if (!watchlist || watchlist.movies.length === 0) {
      const { data } = await omdb.get('/', {
        params: { s: 'popular', type: 'movie' },
      })
      return res.status(200).json({
        success: true,
        results: data.Search || [],
      })
    }

    const lastMovie = watchlist.movies[watchlist.movies.length - 1]
    const cacheKey = `rec_${lastMovie.movieId}`
    const cached = cache.get(cacheKey)

    if (cached) {
      return res.status(200).json({ success: true, results: cached })
    }

    const { data: movieData } = await omdb.get('/', {
      params: { i: lastMovie.movieId, plot: 'short' },
    })

    const genre = movieData.Genre
      ? movieData.Genre.split(',')[0].trim()
      : 'action'

    const { data } = await omdb.get('/', {
      params: { s: genre, type: 'movie' },
    })

    const watchlistIds = watchlist.movies.map((m) => m.movieId)
    const filtered = (data.Search || []).filter(
      (m) => !watchlistIds.includes(m.imdbID)
    )

    cache.set(cacheKey, filtered.slice(0, 10))

    res.status(200).json({ success: true, results: filtered.slice(0, 10) })
  } catch (err) {
    next(err)
  }
}

// Similar movies
export const getSimilar = async (req, res, next) => {
  try {
    const { movieId } = req.params

    const { data: movieData } = await omdb.get('/', {
      params: { i: movieId, plot: 'short' },
    })

    if (movieData.Response === 'False') {
      return res.status(404).json({ success: false, message: movieData.Error })
    }

    const genre = movieData.Genre
      ? movieData.Genre.split(',')[0].trim()
      : 'action'

    const { data } = await omdb.get('/', {
      params: { s: genre, type: 'movie' },
    })

    const filtered = (data.Search || []).filter((m) => m.imdbID !== movieId)

    res.status(200).json({ success: true, results: filtered.slice(0, 10) })
  } catch (err) {
    next(err)
  }
}
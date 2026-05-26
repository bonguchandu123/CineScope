import omdb from '../config/omdb.js'
import NodeCache from 'node-cache'

const cache = new NodeCache({ stdTTL: 300 })

const fetchWithCache = async (key, params) => {
  const cached = cache.get(key)
  if (cached) return cached
  const { data } = await omdb.get('/', { params })
  cache.set(key, data)
  return data
}

// Search movies
export const searchMovies = async (req, res, next) => {
  try {
    const { q = 'movie', genre, year, page = 1 } = req.query

    const params = {
      s: q,
      type: 'movie',
      page,
    }

    if (year) params.y = year

    const data = await fetchWithCache(`search_${q}_${page}_${year}`, params)

    if (data.Response === 'False') {
      return res.status(404).json({ success: false, message: data.Error })
    }

    res.status(200).json({
      success: true,
      results: data.Search,
      totalResults: data.totalResults,
    })
  } catch (err) {
    next(err)
  }
}

// Get movie by ID
export const getMovieById = async (req, res, next) => {
  try {
    const { id } = req.params

    const data = await fetchWithCache(`movie_${id}`, {
      i: id,
      plot: 'full',
    })

    if (data.Response === 'False') {
      return res.status(404).json({ success: false, message: data.Error })
    }

    res.status(200).json({ success: true, movie: data })
  } catch (err) {
    next(err)
  }
}

// Get trending (popular searches)
export const getTrending = async (req, res, next) => {
  try {
    const trendingKeywords = ['avengers', 'batman', 'spider', 'star wars', 'inception']
    const keyword = trendingKeywords[Math.floor(Math.random() * trendingKeywords.length)]

    const data = await fetchWithCache(`trending_${keyword}`, {
      s: keyword,
      type: 'movie',
    })

    if (data.Response === 'False') {
      return res.status(404).json({ success: false, message: data.Error })
    }

    res.status(200).json({ success: true, results: data.Search })
  } catch (err) {
    next(err)
  }
}

// Get popular movies
export const getPopular = async (req, res, next) => {
  try {
    const data = await fetchWithCache('popular', {
      s: 'love',
      type: 'movie',
    })

    if (data.Response === 'False') {
      return res.status(404).json({ success: false, message: data.Error })
    }

    res.status(200).json({ success: true, results: data.Search })
  } catch (err) {
    next(err)
  }
}

// Get top rated movies
export const getTopRated = async (req, res, next) => {
  try {
    const data = await fetchWithCache('toprated', {
      s: 'dark',
      type: 'movie',
    })

    if (data.Response === 'False') {
      return res.status(404).json({ success: false, message: data.Error })
    }

    res.status(200).json({ success: true, results: data.Search })
  } catch (err) {
    next(err)
  }
}

// Get movie cast (OMDB includes actors in movie detail)
export const getMovieCast = async (req, res, next) => {
  try {
    const { id } = req.params

    const data = await fetchWithCache(`cast_${id}`, {
      i: id,
      plot: 'full',
    })

    if (data.Response === 'False') {
      return res.status(404).json({ success: false, message: data.Error })
    }

    const cast = data.Actors
      ? data.Actors.split(',').map((name) => ({ name: name.trim() }))
      : []

    res.status(200).json({ success: true, cast })
  } catch (err) {
    next(err)
  }
}

// Get movie trailer (OMDB does not support trailers — return null)
export const getMovieTrailer = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      trailer: null,
      message: 'Trailers not supported with OMDB',
    })
  } catch (err) {
    next(err)
  }
}

// Get similar movies
export const getSimilarMovies = async (req, res, next) => {
  try {
    const { id } = req.params

    const movieData = await fetchWithCache(`movie_${id}`, {
      i: id,
      plot: 'short',
    })

    if (movieData.Response === 'False') {
      return res.status(404).json({ success: false, message: movieData.Error })
    }

    const genre = movieData.Genre
      ? movieData.Genre.split(',')[0].trim()
      : 'action'

    const data = await fetchWithCache(`similar_${genre}`, {
      s: genre,
      type: 'movie',
    })

    if (data.Response === 'False') {
      return res.status(200).json({ success: true, results: [] })
    }

    const filtered = data.Search.filter((m) => m.imdbID !== id)

    res.status(200).json({ success: true, results: filtered.slice(0, 10) })
  } catch (err) {
    next(err)
  }
}

// Get genres (OMDB does not have genre endpoint — return static list)
export const getGenres = async (req, res, next) => {
  try {
    const genres = [
      { id: 'action', name: 'Action' },
      { id: 'comedy', name: 'Comedy' },
      { id: 'drama', name: 'Drama' },
      { id: 'horror', name: 'Horror' },
      { id: 'romance', name: 'Romance' },
      { id: 'thriller', name: 'Thriller' },
      { id: 'sci-fi', name: 'Sci-Fi' },
      { id: 'animation', name: 'Animation' },
      { id: 'adventure', name: 'Adventure' },
      { id: 'crime', name: 'Crime' },
    ]

    res.status(200).json({ success: true, genres })
  } catch (err) {
    next(err)
  }
}
import Review from '../models/Review.js'

// Get all reviews for a movie
export const getMovieReviews = async (req, res, next) => {
  try {
    const { movieId } = req.params
    const reviews = await Review.find({ movieId })
      .populate('userId', 'name')
      .sort({ createdAt: -1 })
    res.status(200).json({ success: true, reviews })
  } catch (err) {
    next(err)
  }
}

// Post a review
export const postReview = async (req, res, next) => {
  try {
    const { movieId } = req.params
    const { rating, body, movieTitle } = req.body

    const existing = await Review.findOne({ userId: req.user.id, movieId })
    if (existing) {
      return res.status(400).json({ success: false, message: 'You already reviewed this movie' })
    }

    const review = await Review.create({
      userId: req.user.id,
      movieId,
      movieTitle,
      rating,
      body,
    })

    const populated = await review.populate('userId', 'name')
    res.status(201).json({ success: true, review: populated })
  } catch (err) {
    next(err)
  }
}

// Edit a review
export const editReview = async (req, res, next) => {
  try {
    const { reviewId } = req.params
    const { rating, body } = req.body

    const review = await Review.findById(reviewId)
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' })
    }

    if (review.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' })
    }

    review.rating = rating
    review.body = body
    await review.save()

    res.status(200).json({ success: true, review })
  } catch (err) {
    next(err)
  }
}

// Delete a review
export const deleteReview = async (req, res, next) => {
  try {
    const { reviewId } = req.params

    const review = await Review.findById(reviewId)
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' })
    }

    if (review.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' })
    }

    await review.deleteOne()
    res.status(200).json({ success: true, message: 'Review deleted' })
  } catch (err) {
    next(err)
  }
}

// Get user reviews
export const getUserReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ userId: req.user.id }).sort({ createdAt: -1 })
    res.status(200).json({ success: true, reviews })
  } catch (err) {
    next(err)
  }
}
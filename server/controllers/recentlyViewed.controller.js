import RecentlyViewed from '../models/RecentlyViewed.js'

// Get recently viewed
export const getRecentlyViewed = async (req, res, next) => {
  try {
    let recent = await RecentlyViewed.findOne({ userId: req.user.id })
    if (!recent) {
      recent = await RecentlyViewed.create({ userId: req.user.id, views: [] })
    }
    res.status(200).json({ success: true, views: recent.views })
  } catch (err) {
    next(err)
  }
}

// Log a view
export const logView = async (req, res, next) => {
  try {
    const { movieId, title, poster } = req.body

    let recent = await RecentlyViewed.findOne({ userId: req.user.id })
    if (!recent) {
      recent = await RecentlyViewed.create({ userId: req.user.id, views: [] })
    }

    // Remove if already exists
    recent.views = recent.views.filter((v) => v.movieId !== movieId)

    // Add to beginning
    recent.views.unshift({ movieId, title, poster, viewedAt: new Date() })

    // Keep only last 20
    if (recent.views.length > 20) {
      recent.views = recent.views.slice(0, 20)
    }

    await recent.save()
    res.status(200).json({ success: true, views: recent.views })
  } catch (err) {
    next(err)
  }
}

// Clear history
export const clearHistory = async (req, res, next) => {
  try {
    await RecentlyViewed.findOneAndUpdate(
      { userId: req.user.id },
      { views: [] }
    )
    res.status(200).json({ success: true, message: 'History cleared' })
  } catch (err) {
    next(err)
  }
}
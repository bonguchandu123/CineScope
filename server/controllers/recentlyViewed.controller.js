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

    // First, remove the movie if it already exists in the history to avoid duplicates
    await RecentlyViewed.updateOne(
      { userId: req.user.id },
      { $pull: { views: { movieId } } }
    )

    // Then, add it to the front and keep only the last 20
    const recent = await RecentlyViewed.findOneAndUpdate(
      { userId: req.user.id },
      {
        $push: {
          views: {
            $each: [{ movieId, title, poster, viewedAt: new Date() }],
            $position: 0,
            $slice: 20
          }
        }
      },
      { new: true, upsert: true }
    )

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
import mongoose from 'mongoose'

const recentlyViewedSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    views: [
      {
        movieId: { type: String, required: true },
        title: { type: String, required: true },
        poster: { type: String, default: '' },
        viewedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
)

const RecentlyViewed = mongoose.model('RecentlyViewed', recentlyViewedSchema)
export default RecentlyViewed
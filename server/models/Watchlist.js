import mongoose from 'mongoose'

const watchlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    movies: [
      {
        movieId: { type: String, required: true },
        title: { type: String, required: true },
        poster: { type: String, default: '' },
        addedAt: { type: Date, default: Date.now },
        watched: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
)

const Watchlist = mongoose.model('Watchlist', watchlistSchema)
export default Watchlist
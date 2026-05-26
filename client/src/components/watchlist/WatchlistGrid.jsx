import React from 'react';
import { Link } from 'react-router-dom';
import { BiTrash, BiCheckCircle, BiMoviePlay } from 'react-icons/bi';
import { useWatchlist } from '../../hooks/useWatchlist';

const WatchlistGrid = ({ movies }) => {
  const { toggleWatched, removeFromWatchlist } = useWatchlist();

  if (!movies || movies.length === 0) {
    return (
      <div className="bg-dark-100/30 border border-dashed border-neutral-800 rounded-2xl py-24 text-center max-w-lg mx-auto p-6 space-y-4">
        <p className="text-neutral-450 text-sm">
          Your watchlist is empty. Find movies you want to see and add them to keep track of them here!
        </p>
        <Link
          to="/search"
          className="inline-block px-6 py-2.5 bg-brand text-white font-extrabold rounded-lg hover:bg-brand/90 transition shadow-lg shadow-brand/10 text-xs tracking-wider uppercase"
        >
          Browse Films
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 select-none">
      {movies.map((movie) => {
        const id = movie.movieId;
        const isPosterNA = !movie.poster || movie.poster === 'N/A';

        return (
          <div
            key={id}
            className="group relative bg-dark-100 rounded-xl overflow-hidden border border-neutral-800/80 hover:border-brand/40 shadow-lg hover:shadow-brand/5 flex flex-col h-[380px] md:h-[420px] transition-all duration-300 transform hover:-translate-y-1.5"
          >
            {/* Card Poster Image Link */}
            <Link
              to={`/movies/${id}`}
              className="relative flex-grow overflow-hidden bg-neutral-900 flex items-center justify-center cursor-pointer"
            >
              {isPosterNA ? (
                <div className="w-full h-full bg-gradient-to-b from-dark-100 to-dark-300 p-6 flex flex-col items-center justify-between text-center select-none">
                  <BiMoviePlay className="w-12 h-12 text-brand/30 mt-6" />
                  <h4 className="text-white text-xs font-bold leading-snug line-clamp-3 px-2">
                    {movie.title}
                  </h4>
                  <div className="w-6 h-0.5 bg-brand rounded-full mb-4"></div>
                </div>
              ) : (
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              )}

              {/* Hover Details Overlay */}
              <div className="absolute inset-0 bg-dark-300/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <span className="bg-brand text-white text-[10px] font-extrabold px-3 py-1.5 rounded-lg flex items-center space-x-1 shadow-lg">
                  <BiMoviePlay className="w-3.5 h-3.5" />
                  <span>Go to Movie</span>
                </span>
              </div>

              {/* Watched Status Overlay Badge */}
              {movie.watched && (
                <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md px-2 py-0.5 rounded-md text-emerald-500 text-[10px] font-extrabold flex items-center space-x-1 border border-neutral-850 shadow-md">
                  <BiCheckCircle className="w-3.5 h-3.5" />
                  <span>Watched</span>
                </div>
              )}
            </Link>

            {/* Title & Control Panel */}
            <div className="p-4 bg-dark-100 border-t border-neutral-900 flex flex-col justify-between shrink-0 space-y-3">
              <h3 className="text-white text-xs md:text-sm font-bold truncate hover:text-brand transition-colors" title={movie.title}>
                <Link to={`/movies/${id}`}>{movie.title}</Link>
              </h3>

              {/* Action Buttons Panel */}
              <div className="flex items-center justify-between border-t border-neutral-900/60 pt-3">
                {/* Watched Checker Toggle */}
                <button
                  onClick={() => toggleWatched(id)}
                  className={`flex items-center space-x-1 text-[10px] font-extrabold uppercase transition select-none cursor-pointer ${
                    movie.watched
                      ? 'text-emerald-500 hover:text-emerald-600'
                      : 'text-neutral-500 hover:text-white'
                  }`}
                  title={movie.watched ? 'Mark as Unwatched' : 'Mark as Watched'}
                >
                  <BiCheckCircle className="w-4 h-4 fill-current" />
                  <span>{movie.watched ? 'Watched' : 'Watch?'}</span>
                </button>

                {/* Remove Watchlist Button */}
                <button
                  onClick={() => removeFromWatchlist(id)}
                  className="text-neutral-500 hover:text-brand transition select-none cursor-pointer flex items-center space-x-1 text-[10px] font-extrabold uppercase"
                  title="Remove from Watchlist"
                >
                  <BiTrash className="w-4 h-4" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WatchlistGrid;

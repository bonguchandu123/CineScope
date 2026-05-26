import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiPlay, BiInfoCircle, BiPlus, BiCheck, BiStar } from 'react-icons/bi';
import { useMovieDetail } from '../../hooks/useMovies';
import { useWatchlist } from '../../hooks/useWatchlist';
import { formatRating } from '../../utils/formatRating';
import Loader from '../common/Loader';

const HeroBanner = ({ trendingMovie }) => {
  const navigate = useNavigate();
  const { addToWatchlist, removeFromWatchlist, inWatchlist } = useWatchlist();

  // Fetch full details of this spotlight movie to display plot, runtime, etc.
  const { data: movie, isLoading } = useMovieDetail(trendingMovie?.imdbID);

  if (!trendingMovie) return null;
  if (isLoading) return <div className="h-[70vh] flex items-center justify-center"><Loader /></div>;

  const { Title, Year, imdbID, Poster, Genre, Plot, imdbRating, Runtime } = movie || trendingMovie;
  const isWatchlisted = inWatchlist(imdbID);

  const handleWatchlistToggle = (e) => {
    e.preventDefault();
    if (isWatchlisted) {
      removeFromWatchlist(imdbID);
    } else {
      addToWatchlist({ imdbID, Title, Poster });
    }
  };

  const handlePlayClick = () => {
    navigate(`/movies/${imdbID}?play=true`);
  };

  return (
    <div className="relative h-[80vh] md:h-[90vh] w-full overflow-hidden select-none bg-black">
      {/* Background Poster Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={Poster && Poster !== 'N/A' ? Poster : '/placeholder.jpg'}
          alt={Title}
          className="w-full h-full object-cover object-top opacity-35 scale-105 filter blur-xs md:blur-none"
        />
        {/* Cinematic gradients overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-300 via-dark-300/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-dark-300 via-dark-300/20 to-transparent"></div>
      </div>

      {/* Main Spotlight Details */}
      <div className="absolute inset-0 z-10 flex items-center px-6 md:px-12 max-w-7xl mx-auto">
        <div className="max-w-2xl space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
          {/* Genre & Rating tags */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-brand text-white font-extrabold text-xs tracking-widest uppercase px-3 py-1 rounded">
              Spotlight
            </span>
            {imdbRating && imdbRating !== 'N/A' && (
              <span className="bg-black/60 border border-neutral-850 px-2.5 py-1 rounded text-yellow-500 text-xs font-bold flex items-center space-x-1">
                <BiStar className="w-3.5 h-3.5 fill-current" />
                <span>{formatRating(imdbRating)}</span>
              </span>
            )}
            {Runtime && Runtime !== 'N/A' && (
              <span className="text-neutral-300 text-xs font-semibold">{Runtime}</span>
            )}
            {Year && (
              <span className="text-neutral-300 text-xs font-semibold">{Year}</span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-md">
            {Title}
          </h1>

          {/* Genre list */}
          {Genre && Genre !== 'N/A' && (
            <p className="text-brand text-xs sm:text-sm font-bold tracking-wide">
              {Genre.split(',').join('  •  ')}
            </p>
          )}

          {/* Plot */}
          {Plot && Plot !== 'N/A' && (
            <p className="text-neutral-350 text-sm md:text-base leading-relaxed line-clamp-3 drop-shadow">
              {Plot}
            </p>
          )}

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* Play Button */}
            <button
              onClick={handlePlayClick}
              className="flex items-center space-x-2 bg-white text-dark-300 hover:bg-neutral-200 font-extrabold px-6 py-3.5 rounded-lg text-sm md:text-base cursor-pointer transition transform active:scale-95 shadow-xl shadow-black/30"
            >
              <BiPlay className="w-6 md:w-7 h-6 md:h-7 fill-current" />
              <span>Watch Trailer</span>
            </button>

            {/* Watchlist Toggle */}
            <button
              onClick={handleWatchlistToggle}
              className={`flex items-center space-x-2 border font-bold px-6 py-3.5 rounded-lg text-sm md:text-base cursor-pointer transition transform active:scale-95 shadow-xl ${
                isWatchlisted
                  ? 'bg-neutral-800/80 border-neutral-700 text-white hover:bg-neutral-800'
                  : 'bg-black/40 border-neutral-600 text-white hover:bg-black/60'
              }`}
            >
              {isWatchlisted ? <BiCheck className="w-5 h-5" /> : <BiPlus className="w-5 h-5" />}
              <span>{isWatchlisted ? 'In Watchlist' : 'Add Watchlist'}</span>
            </button>

            {/* Info Button */}
            <Link
              to={`/movies/${imdbID}`}
              className="flex items-center space-x-2 bg-neutral-800/80 border border-neutral-700/50 hover:bg-neutral-800 text-white font-bold px-6 py-3.5 rounded-lg text-sm md:text-base transition transform active:scale-95 shadow-xl shadow-black/10"
            >
              <BiInfoCircle className="w-5 h-5" />
              <span>Details</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;

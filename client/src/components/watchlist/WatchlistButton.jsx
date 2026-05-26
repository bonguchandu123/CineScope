import React from 'react';
import { BiPlus, BiCheck } from 'react-icons/bi';
import { useWatchlist } from '../../hooks/useWatchlist';

const WatchlistButton = ({ movie, className = '' }) => {
  const { addToWatchlist, removeFromWatchlist, inWatchlist } = useWatchlist();

  if (!movie) return null;

  const id = movie.imdbID || movie.movieId;
  const isWatchlisted = inWatchlist(id);

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWatchlisted) {
      removeFromWatchlist(id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`flex items-center justify-center space-x-1.5 px-4 py-2 border font-extrabold rounded-lg text-xs tracking-wide uppercase transition active:scale-95 duration-200 cursor-pointer shadow-md select-none ${
        isWatchlisted
          ? 'bg-neutral-850 border-neutral-700 hover:bg-neutral-800 text-white'
          : 'bg-brand border-brand hover:bg-brand/90 text-white shadow-brand/10'
      } ${className}`}
    >
      {isWatchlisted ? (
        <>
          <BiCheck className="w-4 h-4" />
          <span>Saved</span>
        </>
      ) : (
        <>
          <BiPlus className="w-4 h-4" />
          <span>Watchlist</span>
        </>
      )}
    </button>
  );
};

export default WatchlistButton;

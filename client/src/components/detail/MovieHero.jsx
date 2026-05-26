import React from 'react';
import { BiPlus, BiCheck, BiStar, BiCalendar, BiTime, BiMovie } from 'react-icons/bi';
import { useWatchlist } from '../../hooks/useWatchlist';
import { formatRating } from '../../utils/formatRating';

const MovieHero = ({ movie }) => {
  const { addToWatchlist, removeFromWatchlist, inWatchlist } = useWatchlist();
  
  if (!movie) return null;

  const {
    Title,
    Year,
    Rated,
    Released,
    Runtime,
    Genre,
    Director,
    Writer,
    Actors,
    Plot,
    Poster,
    imdbRating,
    imdbVotes,
    imdbID,
  } = movie;

  const isWatchlisted = inWatchlist(imdbID);

  const handleWatchlistToggle = () => {
    if (isWatchlisted) {
      removeFromWatchlist(imdbID);
    } else {
      addToWatchlist({ imdbID, Title, Poster });
    }
  };

  const isPosterNA = !Poster || Poster === 'N/A';

  return (
    <div className="relative min-h-[50vh] md:min-h-[70vh] bg-dark-300 py-24 md:py-32 px-6 md:px-12 flex items-center justify-center">
      {/* Blurred Backsplash Backdrop */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none">
        <img
          src={isPosterNA ? '/placeholder.jpg' : Poster}
          alt={Title}
          className="w-full h-full object-cover object-center opacity-10 filter blur-xl scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-300 via-dark-300/80 to-dark-300"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[340px_1fr] gap-8 md:gap-12 relative z-10">
        {/* Left Column: Poster Image */}
        <div className="w-full max-w-[320px] mx-auto md:mx-0 rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl flex flex-col items-center bg-neutral-900 justify-center aspect-[2/3]">
          {isPosterNA ? (
            <div className="flex flex-col items-center justify-center text-center p-6 space-y-4">
              <BiMovie className="w-16 h-16 text-brand/35 animate-pulse" />
              <h4 className="text-white text-base font-bold leading-tight px-3">{Title}</h4>
              <div className="w-6 h-1 bg-brand rounded-full"></div>
            </div>
          ) : (
            <img
              src={Poster}
              alt={Title}
              className="w-full h-full object-cover shadow-2xl"
            />
          )}
        </div>

        {/* Right Column: Descriptions & Details */}
        <div className="flex flex-col justify-center space-y-6 text-neutral-300">
          {/* Tags bar */}
          <div className="flex flex-wrap items-center gap-3">
            {Rated && Rated !== 'N/A' && (
              <span className="border border-neutral-700 bg-neutral-850 px-2.5 py-0.5 rounded text-neutral-200 text-xs font-bold uppercase tracking-wider">
                {Rated}
              </span>
            )}
            {imdbRating && imdbRating !== 'N/A' && (
              <span className="bg-black/60 border border-neutral-850 px-3 py-1 rounded text-yellow-500 text-xs font-extrabold flex items-center space-x-1">
                <BiStar className="w-4 h-4 fill-current" />
                <span>{formatRating(imdbRating)} ({imdbVotes || 'N/A'})</span>
              </span>
            )}
            {Runtime && Runtime !== 'N/A' && (
              <span className="flex items-center text-xs text-neutral-400 font-semibold space-x-1">
                <BiTime className="w-4 h-4 text-neutral-500" />
                <span>{Runtime}</span>
              </span>
            )}
            {Released && Released !== 'N/A' && (
              <span className="flex items-center text-xs text-neutral-400 font-semibold space-x-1">
                <BiCalendar className="w-4 h-4 text-neutral-500" />
                <span>{Released}</span>
              </span>
            )}
          </div>

          {/* Title */}
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
              {Title}
            </h1>
            <p className="text-neutral-500 text-sm font-semibold mt-1">Released {Year}</p>
          </div>

          {/* Genre list */}
          {Genre && Genre !== 'N/A' && (
            <div className="flex flex-wrap gap-2">
              {Genre.split(',').map((g) => (
                <span
                  key={g}
                  className="bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-bold px-3 py-1.5 rounded-full hover:bg-neutral-850 transition"
                >
                  {g.trim()}
                </span>
              ))}
            </div>
          )}

          {/* Plot */}
          {Plot && Plot !== 'N/A' && (
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider text-neutral-450">Plot Summary</h3>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-4xl">
                {Plot}
              </p>
            </div>
          )}

          {/* Metadata: Cast & Crew */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-neutral-900 pt-6 text-sm">
            {Director && Director !== 'N/A' && (
              <div>
                <span className="text-neutral-500 font-bold uppercase tracking-wider text-xs block mb-1">Director</span>
                <span className="text-white font-semibold">{Director}</span>
              </div>
            )}
            {Writer && Writer !== 'N/A' && (
              <div>
                <span className="text-neutral-500 font-bold uppercase tracking-wider text-xs block mb-1">Writers</span>
                <span className="text-white font-semibold">{Writer}</span>
              </div>
            )}
            {Actors && Actors !== 'N/A' && (
              <div className="sm:col-span-2">
                <span className="text-neutral-500 font-bold uppercase tracking-wider text-xs block mb-1">Starring Cast</span>
                <span className="text-white font-semibold">{Actors}</span>
              </div>
            )}
          </div>

          {/* Watchlist Trigger Button */}
          <div className="pt-4">
            <button
              onClick={handleWatchlistToggle}
              className={`flex items-center space-x-2 border font-bold px-6 py-3 rounded-lg text-sm transition transform active:scale-95 shadow-lg select-none cursor-pointer ${
                isWatchlisted
                  ? 'bg-neutral-850 border-neutral-700 text-white hover:bg-neutral-800'
                  : 'bg-brand border-brand text-white hover:bg-brand/90 shadow-brand/10'
              }`}
            >
              {isWatchlisted ? <BiCheck className="w-5 h-5" /> : <BiPlus className="w-5 h-5" />}
              <span>{isWatchlisted ? 'Added to Watchlist' : 'Add to Watchlist'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieHero;

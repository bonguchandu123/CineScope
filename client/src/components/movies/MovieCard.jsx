import React from 'react';
import { Link } from 'react-router-dom';
import { BiMoviePlay, BiStar } from 'react-icons/bi';
import { formatRating } from '../../utils/formatRating';

const MovieCard = ({ movie }) => {
  const { Title, Year, imdbID, Poster, imdbRating } = movie;

  const isPosterNA = !Poster || Poster === 'N/A';

  return (
    <Link
      to={`/movies/${imdbID}`}
      className="group relative bg-dark-100 rounded-xl overflow-hidden border border-neutral-800/80 hover:border-brand/40 shadow-lg hover:shadow-brand/5 flex flex-col h-[360px] md:h-[400px] w-full transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer"
    >
      {/* Poster / Thumbnail Container */}
      <div className="relative flex-grow overflow-hidden bg-neutral-900 flex items-center justify-center">
        {isPosterNA ? (
          /* High-Fidelity SVG Fallback Poster */
          <div className="w-full h-full bg-gradient-to-b from-dark-100 to-dark-300 p-6 flex flex-col items-center justify-between text-center select-none">
            <div className="pt-8">
              <BiMoviePlay className="w-16 h-16 text-brand/30 animate-pulse mx-auto" />
            </div>
            <div className="space-y-2">
              <h4 className="text-white text-sm font-bold leading-snug line-clamp-3 px-2">
                {Title}
              </h4>
              <p className="text-neutral-500 text-xs font-semibold">{Year}</p>
            </div>
            <div className="w-8 h-1 bg-brand rounded-full"></div>
          </div>
        ) : (
          <img
            src={Poster}
            alt={Title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        )}

        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-300 via-dark-300/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="bg-brand text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center space-x-1 shadow-lg shadow-brand/20">
            <BiMoviePlay className="w-4 h-4" />
            <span>Details</span>
          </span>
        </div>

        {/* Floating Rating Badge if available */}
        {imdbRating && imdbRating !== 'N/A' && (
          <div className="absolute top-3 right-3 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded-md text-yellow-500 text-xs font-bold flex items-center space-x-1 border border-neutral-800 shadow-md">
            <BiStar className="w-3.5 h-3.5 fill-current" />
            <span>{formatRating(imdbRating)}</span>
          </div>
        )}
      </div>

      {/* Info Panel */}
      <div className="p-4 bg-dark-100 border-t border-neutral-900 flex flex-col justify-between shrink-0">
        <h3 className="text-white text-sm font-bold truncate group-hover:text-brand transition-colors duration-200" title={Title}>
          {Title}
        </h3>
        <p className="text-neutral-400 text-xs font-semibold mt-1">{Year}</p>
      </div>
    </Link>
  );
};

export default MovieCard;

import React from 'react';
import { Link } from 'react-router-dom';
import { BiChevronLeft, BiMoviePlay } from 'react-icons/bi';

const NotFound = () => {
  return (
    <main className="min-h-screen bg-dark-300 flex flex-col items-center justify-center text-center px-6 md:px-12 text-white select-none">
      <div className="space-y-6 max-w-md">
        
        {/* Animated Icon */}
        <div className="p-5 bg-brand/10 rounded-full border border-brand/20 inline-block animate-pulse">
          <BiMoviePlay className="w-16 h-16 text-brand" />
        </div>

        {/* 404 Status */}
        <div className="space-y-2">
          <h1 className="text-6xl font-black text-brand tracking-tighter">404</h1>
          <h2 className="text-xl font-bold text-white uppercase tracking-wide">Scene Not Found</h2>
          <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed">
            The film reel or page you are looking for has been cut from the final edit, or does not exist in our library databases.
          </p>
        </div>

        {/* Redirect buttons */}
        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-brand text-white font-extrabold rounded-lg hover:bg-brand/90 transition shadow-lg shadow-brand/20 text-xs tracking-wider uppercase active:scale-95 cursor-pointer"
          >
            <BiChevronLeft className="w-5 h-5" />
            <span>Return to Spotlight</span>
          </Link>
        </div>

      </div>
    </main>
  );
};

export default NotFound;

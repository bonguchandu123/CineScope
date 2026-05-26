import React from 'react';
import MovieCard from './MovieCard';

const MovieGrid = ({ movies }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {movies.map((movie, idx) => (
        <MovieCard key={`${movie.imdbID || movie.movieId}-${idx}`} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;

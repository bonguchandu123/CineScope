import React from 'react';
import MovieRow from '../movies/MovieRow';

const SimilarMovies = ({ movies }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto w-full py-4">
      <MovieRow title="More Like This" movies={movies} />
    </div>
  );
};

export default SimilarMovies;

import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import MovieGrid from '../movies/MovieGrid';
import SkeletonCard from '../common/SkeletonCard';
import { BiSearch } from 'react-icons/bi';

const SearchResults = ({ movies, isLoading, isError, hasNextPage, isFetchingNextPage, fetchNextPage }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: '100px',
  });

  // Trigger next page fetch when scrolled to bottom
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {[...Array(10)].map((_, idx) => (
          <SkeletonCard key={idx} />
        ))}
      </div>
    );
  }

  const hasMovies = movies && movies.length > 0;

  if (!hasMovies && !isLoading) {
    return (
      <div className="bg-dark-100/30 border border-neutral-900 rounded-2xl py-24 text-center px-4 space-y-3">
        <div className="p-4 bg-neutral-900 rounded-full border border-neutral-850 inline-block">
          <BiSearch className="w-8 h-8 text-neutral-600 animate-bounce" />
        </div>
        <h3 className="text-lg font-bold text-white tracking-wide">No Results Found</h3>
        <p className="text-neutral-500 text-xs max-w-sm mx-auto leading-relaxed">
          We couldn't find any films matching your search terms. Try refining the spellings, years, or search a different keyword.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 select-none">
      {/* Grid of Results */}
      <MovieGrid movies={movies} />

      {/* Infinite Scroll Trigger & Skeleton loader for next page */}
      <div ref={ref} className="w-full flex items-center justify-center py-6">
        {isFetchingNextPage && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full">
            {[...Array(5)].map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSearch } from '../hooks/useSearch';
import SearchResults from '../components/search/SearchResults';
import { GENRES } from '../utils/constants';
import { BiChevronLeft } from 'react-icons/bi';

const Genre = () => {
  const { genreId } = useParams();

  // Find genre metadata
  const currentGenre = GENRES.find((g) => g.id === genreId) || {
    id: genreId,
    name: genreId ? genreId.charAt(0).toUpperCase() + genreId.slice(1) : 'Genre',
  };

  // We query search endpoint using genre name as the search text 'q'
  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useSearch(currentGenre.id, '');

  const movies = data ? data.pages.flatMap((page) => page.results || []) : [];

  return (
    <main className="min-h-screen bg-dark-300 pt-28 pb-16 px-6 md:px-12 select-none text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center space-x-2">
          <Link
            to="/"
            className="flex items-center space-x-1 text-xs text-neutral-450 hover:text-brand transition font-extrabold uppercase tracking-wider"
          >
            <BiChevronLeft className="w-5 h-5" />
            <span>Home</span>
          </Link>
          <span className="text-neutral-600 text-xs">/</span>
          <span className="text-neutral-400 text-xs font-bold uppercase tracking-wider">Genres</span>
          <span className="text-neutral-600 text-xs">/</span>
          <span className="text-brand text-xs font-bold uppercase tracking-wider">{currentGenre.name}</span>
        </div>

        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {currentGenre.name} Movies
          </h1>
          <p className="text-neutral-500 text-sm mt-1">Discover popular cinemagraphs in the {currentGenre.name} category.</p>
        </div>

        {/* Results Container */}
        <div className="pt-4">
          <SearchResults
            movies={movies}
            isLoading={isLoading}
            isError={isError}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
            error={error}
            onRetry={refetch}
          />
        </div>

      </div>
    </main>
  );
};

export default Genre;

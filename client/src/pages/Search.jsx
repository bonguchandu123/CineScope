import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSearch } from '../hooks/useSearch';
import { useTrendingMovies } from '../hooks/useMovies';
import { useDebounce } from '../hooks/useDebounce';
import SearchBar from '../components/search/SearchBar';
import FilterPanel from '../components/search/FilterPanel';
import SearchResults from '../components/search/SearchResults';
import MovieGrid from '../components/movies/MovieGrid';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import { BiCompass } from 'react-icons/bi';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialYear = searchParams.get('year') || '';

  const [query, setQuery] = useState(initialQuery);
  const [year, setYear] = useState(initialYear);

  // Debounce the query value to 500ms
  const debouncedQuery = useDebounce(query, 500);

  // Sync URL search params
  useEffect(() => {
    const params = {};
    if (debouncedQuery.trim()) {
      params.q = debouncedQuery;
    }
    if (year) {
      params.year = year;
    }
    setSearchParams(params);
  }, [debouncedQuery, year, setSearchParams]);

  // Sync state if URL changes externally (e.g. Navbar navigation)
  useEffect(() => {
    setQuery(searchParams.get('q') || '');
    setYear(searchParams.get('year') || '');
  }, [searchParams]);

  // Infinite Search Query
  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useSearch(debouncedQuery, year);

  // Explanatory Trending Browsing when query is empty
  const { data: trending, isLoading: loadingTrending } = useTrendingMovies();

  const handleClear = () => {
    setQuery('');
    setYear('');
  };

  const handleResetFilters = () => {
    setYear('');
  };

  // Flatten infinite query page results
  const searchMovies = data ? data.pages.flatMap((page) => page.results || []) : [];

  return (
    <main className="min-h-screen bg-dark-300 pt-28 pb-16 px-6 md:px-12 select-none">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Title */}
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Browse Catalogue
          </h1>
          <p className="text-neutral-500 text-sm mt-1">Search through thousands of films instantaneously.</p>
        </div>

        {/* Inputs & Refiners Panel */}
        <div className="grid grid-cols-1 gap-4">
          <SearchBar value={query} onChange={setQuery} onClear={handleClear} />
          <FilterPanel year={year} onYearChange={setYear} onReset={handleResetFilters} />
        </div>

        {/* Dynamic Display Results */}
        {debouncedQuery.trim() ? (
          isError ? (
            <ErrorMessage message={error.message} onRetry={refetch} />
          ) : (
            <div className="space-y-6">
              <h2 className="text-lg md:text-xl font-bold text-white border-b border-neutral-900 pb-3">
                Search Results for "{debouncedQuery}" {year ? `(${year})` : ''}
              </h2>
              <SearchResults
                movies={searchMovies}
                isLoading={isLoading}
                isError={isError}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                fetchNextPage={fetchNextPage}
              />
            </div>
          )
        ) : (
          /* Explanatory browse state when input is empty */
          <div className="space-y-6">
            <div className="flex items-center space-x-2 border-b border-neutral-900 pb-3">
              <BiCompass className="w-6 h-6 text-brand" />
              <h2 className="text-lg md:text-xl font-extrabold text-white tracking-wide">
                Trending Explorations
              </h2>
            </div>
            
            {loadingTrending ? (
              <Loader />
            ) : (
              <MovieGrid movies={trending} />
            )}
          </div>
        )}

      </div>
    </main>
  );
};

export default Search;

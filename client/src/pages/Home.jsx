import React from 'react';
import { Link } from 'react-router-dom';
import { useTrendingMovies, usePopularMovies, useTopRatedMovies } from '../hooks/useMovies';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import { useAuth } from '../context/AuthContext';
import HeroBanner from '../components/movies/HeroBanner';
import MovieRow from '../components/movies/MovieRow';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import { GENRES } from '../utils/constants';

const Home = () => {
  const { isAuthenticated } = useAuth();
  
  // Queries
  const { data: trending, isLoading: loadingTrending, isError: errorTrending, refetch: refetchTrending } = useTrendingMovies();
  const { data: popular, isLoading: loadingPopular, isError: errorPopular, refetch: refetchPopular } = usePopularMovies();
  const { data: topRated, isLoading: loadingTopRated, isError: errorTopRated, refetch: refetchTopRated } = useTopRatedMovies();

  const { recentlyViewed } = useRecentlyViewed();

  const isLoading = loadingTrending || loadingPopular || loadingTopRated;
  const isError = errorTrending || errorPopular || errorTopRated;

  const handleRetryAll = () => {
    refetchTrending();
    refetchPopular();
    refetchTopRated();
  };

  if (isLoading) return <Loader fullScreen />;
  if (isError) return <ErrorMessage message="Failed to connect with CineScope API. Please check if the server is running." onRetry={handleRetryAll} />;

  const spotlightMovie = trending && trending[0];

  return (
    <div className="pb-16 space-y-12 select-none">
      {/* 1. Cinematic Hero Banner */}
      {spotlightMovie && <HeroBanner trendingMovie={spotlightMovie} />}

      {/* 2. Genre filter pills */}
      <div className="px-6 md:px-12 max-w-7xl mx-auto w-full space-y-3 pt-6 md:pt-0">
        <h3 className="text-xs font-bold text-neutral-450 uppercase tracking-widest">
          Quick Genre Filter
        </h3>
        <div className="flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-hide">
          {GENRES.map((genre) => (
            <Link
              key={genre.id}
              to={`/genres/${genre.id}`}
              className="shrink-0 bg-neutral-900 hover:bg-brand/10 border border-neutral-850 hover:border-brand/40 text-neutral-300 hover:text-brand text-xs font-extrabold px-4 py-2.5 rounded-full transition-all active:scale-95 duration-200"
            >
              {genre.name}
            </Link>
          ))}
        </div>
      </div>

      {/* 3. Slider rows of collections */}
      <div className="space-y-10 md:space-y-16">
        {trending && <MovieRow title="Trending Now" movies={trending} />}

        {/* Recently viewed row (only if logged in and has items) */}
        {isAuthenticated && recentlyViewed && recentlyViewed.length > 0 && (
          <MovieRow
            title="Continue Watching"
            movies={recentlyViewed.map((v) => ({
              imdbID: v.movieId,
              Title: v.title,
              Poster: v.poster,
            }))}
          />
        )}

        {popular && <MovieRow title="Popular on CineScope" movies={popular} />}
        {topRated && <MovieRow title="Top Rated" movies={topRated} />}
      </div>
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useMovieDetail, useMovieCast, useMovieTrailer, useSimilarMovies } from '../hooks/useMovies';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import { useAuth } from '../context/AuthContext';
import MovieHero from '../components/detail/MovieHero';
import CastRow from '../components/detail/CastRow';
import SimilarMovies from '../components/detail/SimilarMovies';
import ReviewList from '../components/reviews/ReviewList';
import ReviewForm from '../components/reviews/ReviewForm';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import YouTube from 'react-youtube';
import { BiPlayCircle, BiX } from 'react-icons/bi';

const MovieDetail = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { isAuthenticated } = useAuth();
  const { logView } = useRecentlyViewed();

  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);

  // Queries
  const { data: movie, isLoading: loadingMovie, isError: errorMovie, refetch } = useMovieDetail(id);
  const { data: cast } = useMovieCast(id);
  const { data: trailer } = useMovieTrailer(id);
  const { data: similar } = useSimilarMovies(id);

  // Auto play if "?play=true" query is in URL
  useEffect(() => {
    if (searchParams.get('play') === 'true') {
      setIsPlayingTrailer(true);
    } else {
      setIsPlayingTrailer(false);
    }
  }, [searchParams, id]);

  // Log to recently viewed history when successfully loaded
  useEffect(() => {
    if (movie && isAuthenticated) {
      logView({
        movieId: movie.imdbID,
        title: movie.Title,
        poster: movie.Poster,
      });
    }
  }, [movie, isAuthenticated, logView]);

  if (loadingMovie) return <Loader fullScreen />;
  if (errorMovie || !movie) return <ErrorMessage message="Failed to load movie details." onRetry={refetch} />;

  // Default trailer ID for Youtube (e.g. general cinematic trailer if OMDB has none)
  const defaultTrailerId = 'd96cjJhvlMA'; // Inception main trailer
  const youtubeVideoId = trailer || defaultTrailerId;

  const youtubeOpts = {
    height: '480',
    width: '100%',
    playerVars: {
      autoplay: 1,
      controls: 1,
      modestbranding: 1,
      rel: 0,
    },
  };

  const handleReviewSuccess = () => {
    // Review list is invalidated and refreshed reactively via queryClient
  };

  return (
    <div className="pb-24 space-y-12 bg-dark-300 min-h-screen text-white select-none">
      
      {/* 1. Statistics Details Header Backdrop */}
      <MovieHero movie={movie} />

      {/* 2. Custom Trailer Frame Section */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12">
        {isPlayingTrailer ? (
          <div className="bg-dark-100 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl space-y-4 p-6">
            <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-brand">Cinematic Movie Trailer</h3>
              <button
                onClick={() => setIsPlayingTrailer(false)}
                className="flex items-center space-x-1.5 bg-neutral-850 hover:bg-neutral-800 border border-neutral-750 px-3 py-1.5 rounded-lg text-xs font-bold transition active:scale-95 cursor-pointer"
              >
                <BiX className="w-4 h-4" />
                <span>Close Player</span>
              </button>
            </div>
            
            <div className="rounded-xl overflow-hidden aspect-video bg-black max-w-4xl mx-auto w-full border border-neutral-850">
              <YouTube videoId={youtubeVideoId} opts={youtubeOpts} className="w-full h-full" />
            </div>
          </div>
        ) : (
          <div className="bg-dark-100 border border-neutral-850 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-sm font-bold">Watch Official Media Video Trailer</h4>
              <p className="text-xs text-neutral-450">Experience cinema buffers before looking at user details.</p>
            </div>
            <button
              onClick={() => setIsPlayingTrailer(true)}
              className="flex items-center space-x-2 bg-white text-dark-300 hover:bg-neutral-200 font-extrabold px-5 py-2.5 rounded-lg text-xs tracking-wider uppercase cursor-pointer transition active:scale-95 shadow-md shadow-black/10"
            >
              <BiPlayCircle className="w-5 h-5 fill-current" />
              <span>Launch Trailer</span>
            </button>
          </div>
        )}
      </div>

      {/* 3. Cast Lists Horizontal Row */}
      {cast && <CastRow cast={cast} />}

      {/* 4. Recommendation Similar movies row */}
      {similar && <SimilarMovies movies={similar} />}

      {/* 5. User Reviews Board Layout */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 border-t border-neutral-900 pt-12">
        {/* Left Col: Chronological Reviews */}
        <div className="space-y-6">
          <ReviewList movieId={movie.imdbID} />
        </div>

        {/* Right Col: Sticky review form input */}
        <div className="space-y-6">
          <div className="bg-dark-100 border border-neutral-850 p-6 rounded-2xl sticky top-24 space-y-4">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Share Your Thoughts
            </h4>
            <ReviewForm
              movieId={movie.imdbID}
              movieTitle={movie.Title}
              onSuccess={handleReviewSuccess}
            />
          </div>
        </div>
      </div>

    </div>
  );
};

export default MovieDetail;

import { useQuery } from '@tanstack/react-query';
import { movieService } from '../services/movie.service';

export const useTrendingMovies = () => {
  return useQuery({
    queryKey: ['movies', 'trending'],
    queryFn: movieService.getTrending,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
};

export const usePopularMovies = () => {
  return useQuery({
    queryKey: ['movies', 'popular'],
    queryFn: movieService.getPopular,
    staleTime: 5 * 60 * 1000,
  });
};

export const useTopRatedMovies = () => {
  return useQuery({
    queryKey: ['movies', 'topRated'],
    queryFn: movieService.getTopRated,
    staleTime: 5 * 60 * 1000,
  });
};

export const useMovieDetail = (id) => {
  return useQuery({
    queryKey: ['movie', id],
    queryFn: () => movieService.getMovieById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes cache
  });
};

export const useMovieCast = (id) => {
  return useQuery({
    queryKey: ['movie', id, 'cast'],
    queryFn: () => movieService.getCast(id),
    enabled: !!id,
    staleTime: 30 * 60 * 1000,
  });
};

export const useMovieTrailer = (id) => {
  return useQuery({
    queryKey: ['movie', id, 'trailer'],
    queryFn: () => movieService.getTrailer(id),
    enabled: !!id,
    staleTime: 30 * 60 * 1000,
  });
};

export const useSimilarMovies = (id) => {
  return useQuery({
    queryKey: ['movie', id, 'similar'],
    queryFn: () => movieService.getSimilar(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
};

export const useGenresList = () => {
  return useQuery({
    queryKey: ['genres'],
    queryFn: movieService.getGenres,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours static cache
  });
};

import { useInfiniteQuery } from '@tanstack/react-query';
import { movieService } from '../services/movie.service';

export const useSearch = (q, year) => {
  return useInfiniteQuery({
    queryKey: ['movies', 'search', q, year],
    queryFn: ({ pageParam }) => movieService.searchMovies({ q, year, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.Response === 'False') return undefined;
      const totalResults = parseInt(lastPage.totalResults || 0, 10);
      const loadedCount = allPages.reduce((acc, p) => acc + (p.results?.length || 0), 0);
      return loadedCount < totalResults ? allPages.length + 1 : undefined;
    },
    enabled: !!q,
    staleTime: 2 * 60 * 1000, // 2 minutes search cache
  });
};

import { useWatchlist as useWatchlistContext } from '../context/WatchlistContext';

export const useWatchlist = () => {
  return useWatchlistContext();
};

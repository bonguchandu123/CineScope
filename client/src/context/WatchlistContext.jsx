import React, { createContext, useState, useEffect, useContext } from 'react';
import { watchlistService } from '../services/watchlist.service';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const WatchlistContext = createContext(null);

export const WatchlistProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWatchlist = async () => {
    if (!isAuthenticated) {
      setWatchlist([]);
      return;
    }
    setLoading(true);
    try {
      const movies = await watchlistService.getWatchlist();
      setWatchlist(movies || []);
    } catch (err) {
      console.error('Failed to fetch watchlist:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, [isAuthenticated]);

  const addToWatchlist = async (movie) => {
    if (!isAuthenticated) {
      toast.error('Please log in to add movies to your watchlist', {
        style: { background: '#1a1a1a', color: '#ffffff', border: '1px solid #e50914' }
      });
      return false;
    }
    try {
      const response = await watchlistService.addToWatchlist({
        movieId: movie.imdbID || movie.movieId,
        title: movie.Title || movie.title,
        poster: movie.Poster || movie.poster,
      });
      if (response.success) {
        setWatchlist(response.movies || []);
        toast.success(`Added "${movie.Title || movie.title}" to Watchlist`, {
          style: { background: '#1a1a1a', color: '#ffffff', border: '1px solid #e50914' }
        });
        return true;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const removeFromWatchlist = async (movieId) => {
    if (!isAuthenticated) return false;
    try {
      const response = await watchlistService.removeFromWatchlist(movieId);
      if (response.success) {
        setWatchlist(response.movies || []);
        toast.success('Removed from Watchlist', {
          style: { background: '#1a1a1a', color: '#ffffff', border: '1px solid #e50914' }
        });
        return true;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const toggleWatched = async (movieId) => {
    if (!isAuthenticated) return false;
    try {
      const response = await watchlistService.toggleWatched(movieId);
      if (response.success) {
        setWatchlist(response.movies || []);
        toast.success('Updated watched status', {
          style: { background: '#1a1a1a', color: '#ffffff', border: '1px solid #e50914' }
        });
        return true;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const inWatchlist = (movieId) => {
    return watchlist.some((m) => m.movieId === movieId);
  };

  const isWatched = (movieId) => {
    const movie = watchlist.find((m) => m.movieId === movieId);
    return movie ? movie.watched : false;
  };

  const value = {
    watchlist,
    loading,
    fetchWatchlist,
    addToWatchlist,
    removeFromWatchlist,
    toggleWatched,
    inWatchlist,
    isWatched,
  };

  return <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>;
};

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
};

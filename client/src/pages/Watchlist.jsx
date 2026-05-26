import React from 'react';
import { useWatchlist } from '../hooks/useWatchlist';
import WatchlistGrid from '../components/watchlist/WatchlistGrid';
import Loader from '../components/common/Loader';
import { BiBookmarkHeart } from 'react-icons/bi';

const Watchlist = () => {
  const { watchlist, loading } = useWatchlist();

  return (
    <main className="min-h-screen bg-dark-300 pt-28 pb-16 px-6 md:px-12 text-white">
      <div className="max-w-7xl mx-auto space-y-8 select-none">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-900 pb-5">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <BiBookmarkHeart className="w-6 h-6 text-brand" />
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                My Watchlist
              </h1>
            </div>
            <p className="text-neutral-500 text-sm">Organize, filter, and track films you are cataloging.</p>
          </div>
          
          {/* Badge count */}
          {!loading && watchlist.length > 0 && (
            <span className="bg-brand/10 border border-brand/20 text-brand text-xs font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
              {watchlist.length} {watchlist.length === 1 ? 'Movie' : 'Movies'}
            </span>
          )}
        </div>

        {/* List Content */}
        {loading ? (
          <Loader />
        ) : (
          <div className="pt-4">
            <WatchlistGrid movies={watchlist} />
          </div>
        )}

      </div>
    </main>
  );
};

export default Watchlist;

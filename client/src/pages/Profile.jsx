import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewService } from '../services/review.service';
import { formatDate } from '../utils/formatDate';
import StarPicker from '../components/reviews/StarPicker';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import { Link } from 'react-router-dom';
import { BiUser, BiMessageRoundedDots, BiHistory, BiTrash, BiChevronRight } from 'react-icons/bi';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { recentlyViewed, clearHistory, isClearing } = useRecentlyViewed();

  // Fetch reviews authored by this user
  const { data: reviews, isLoading: loadingReviews, isError: errorReviews, refetch } = useQuery({
    queryKey: ['reviews', 'user'],
    queryFn: reviewService.getUserReviews,
  });

  // Mutation to delete review
  const deleteReviewMutation = useMutation({
    mutationFn: reviewService.deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] }); // Refresh movie detail review boards
      refetch(); // Refresh user profile reviews list
      toast.success('Review deleted successfully', {
        style: { background: '#1a1a1a', color: '#ffffff', border: '1px solid #e50914' }
      });
    },
  });

  const handleDeleteReview = (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      deleteReviewMutation.mutate(reviewId);
    }
  };

  const firstLetter = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <main className="min-h-screen bg-dark-300 pt-28 pb-16 px-6 md:px-12 text-white">
      <div className="max-w-7xl mx-auto space-y-8 select-none">
        
        {/* Profile Card Section */}
        <div className="bg-dark-100 border border-neutral-850 p-6 md:p-8 rounded-2xl flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 shadow-xl">
          {/* Circular avatar banner */}
          <div className="w-20 h-20 rounded-full bg-brand text-white text-3xl font-black flex items-center justify-center border-2 border-neutral-700 shadow-md">
            {firstLetter}
          </div>
          <div className="text-center sm:text-left space-y-1">
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">{user?.name}</h1>
            <p className="text-neutral-450 text-sm">{user?.email}</p>
            <div className="pt-2">
              <span className="bg-brand/10 border border-brand/20 text-brand text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                CineScope Member
              </span>
            </div>
          </div>
        </div>

        {/* Dashboard Grid split panel */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
          
          {/* Left panel: My Reviews */}
          <div className="bg-dark-100 border border-neutral-850 p-6 rounded-2xl space-y-6">
            <div className="flex items-center space-x-2 border-b border-neutral-900 pb-3">
              <BiMessageRoundedDots className="w-5 h-5 text-brand" />
              <h2 className="text-lg md:text-xl font-extrabold text-white tracking-wide">
                My Reviews ({reviews?.length || 0})
              </h2>
            </div>

            {loadingReviews ? (
              <Loader />
            ) : errorReviews ? (
              <ErrorMessage message="Failed to load your review lists." onRetry={refetch} />
            ) : reviews && reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div
                    key={review._id}
                    className="bg-dark-200 border border-neutral-900 p-5 rounded-xl flex flex-col space-y-3 hover:border-neutral-800 transition"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <Link
                          to={`/movies/${review.movieId}`}
                          className="text-sm font-bold text-white hover:text-brand transition flex items-center space-x-1"
                        >
                          <span>{review.movieTitle || 'View Movie'}</span>
                          <BiChevronRight className="w-4 h-4" />
                        </Link>
                        <p className="text-neutral-500 text-[10px] font-semibold">
                          Reviewed on {formatDate(review.createdAt)}
                        </p>
                      </div>
                      
                      {/* Star Display */}
                      {review.rating > 0 && (
                        <StarPicker rating={review.rating} readonly />
                      )}
                    </div>

                    <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                      {review.body}
                    </p>

                    <div className="flex justify-end pt-2 border-t border-neutral-900">
                      <button
                        onClick={() => handleDeleteReview(review._id)}
                        className="flex items-center space-x-1 text-xs text-brand/80 hover:text-brand font-bold transition select-none cursor-pointer"
                      >
                        <BiTrash className="w-4 h-4" />
                        <span>Delete Review</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-neutral-500 text-xs">
                <p>You haven't written any reviews yet. Share your thoughts on films!</p>
              </div>
            )}
          </div>

          {/* Right panel: History of Recently Viewed */}
          <div className="bg-dark-100 border border-neutral-850 p-6 rounded-2xl space-y-6 self-start">
            <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
              <div className="flex items-center space-x-2">
                <BiHistory className="w-5 h-5 text-brand" />
                <h2 className="text-lg font-extrabold text-white tracking-wide">
                  Viewed History
                </h2>
              </div>
              
              {recentlyViewed && recentlyViewed.length > 0 && (
                <button
                  onClick={() => {
                    if (window.confirm('Wipe your complete viewed history?')) {
                      clearHistory();
                    }
                  }}
                  disabled={isClearing}
                  className="text-neutral-500 hover:text-brand text-xs font-bold transition disabled:opacity-50 select-none cursor-pointer"
                >
                  {isClearing ? 'Clearing...' : 'Clear All'}
                </button>
              )}
            </div>

            {recentlyViewed && recentlyViewed.length > 0 ? (
              <div className="grid grid-cols-1 gap-3">
                {recentlyViewed.map((item) => {
                  const isPosterNA = !item.poster || item.poster === 'N/A';
                  
                  return (
                    <Link
                      key={item.movieId}
                      to={`/movies/${item.movieId}`}
                      className="flex items-center space-x-3 bg-dark-200 border border-neutral-900/60 p-2.5 rounded-xl hover:border-neutral-850 hover:bg-neutral-850/20 transition cursor-pointer"
                    >
                      {/* Image Thumbnail */}
                      <div className="w-10 h-14 rounded overflow-hidden bg-neutral-900 shrink-0 flex items-center justify-center border border-neutral-800">
                        {isPosterNA ? (
                          <span className="text-[9px] text-neutral-500 font-black">N/A</span>
                        ) : (
                          <img
                            src={item.poster}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      
                      {/* Metadata info */}
                      <div className="overflow-hidden space-y-0.5">
                        <h4 className="text-xs font-bold text-white truncate w-56 hover:text-brand" title={item.title}>
                          {item.title}
                        </h4>
                        <p className="text-[10px] text-neutral-500 font-semibold">
                          Viewed {formatDate(item.viewedAt)}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 text-neutral-500 text-xs">
                <p>No recently viewed films recorded in your dashboard.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </main>
  );
};

export default Profile;

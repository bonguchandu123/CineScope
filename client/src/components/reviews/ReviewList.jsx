import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewService } from '../../services/review.service';
import ReviewCard from './ReviewCard';
import Loader from '../common/Loader';
import ErrorMessage from '../common/ErrorMessage';
import { BiMessageAltEdit } from 'react-icons/bi';
import toast from 'react-hot-toast';

const ReviewList = ({ movieId }) => {
  const queryClient = useQueryClient();

  // Query to fetch movie reviews
  const { data: reviews, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['reviews', movieId],
    queryFn: () => reviewService.getMovieReviews(movieId),
    enabled: !!movieId,
  });

  // Mutation to delete a review
  const deleteMutation = useMutation({
    mutationFn: reviewService.deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', movieId] });
      queryClient.invalidateQueries({ queryKey: ['reviews', 'user'] }); // Sync user review profile logs
      toast.success('Review deleted', {
        style: { background: '#1a1a1a', color: '#ffffff', border: '1px solid #e50914' }
      });
    },
  });

  const handleDelete = (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      deleteMutation.mutate(reviewId);
    }
  };

  if (isLoading) return <Loader />;
  if (isError) return <ErrorMessage message={error.message} onRetry={refetch} />;

  const hasReviews = reviews && reviews.length > 0;

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full select-none">
      <div className="flex items-center space-x-2 border-b border-neutral-900 pb-3">
        <BiMessageAltEdit className="w-6 h-6 text-brand" />
        <h3 className="text-lg md:text-xl font-extrabold text-white tracking-wide">
          User Reviews ({reviews?.length || 0})
        </h3>
      </div>

      {hasReviews ? (
        <div className="grid grid-cols-1 gap-4">
          {reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              onUpdate={refetch}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="bg-dark-100/40 border border-neutral-900 rounded-2xl py-12 text-center text-neutral-500 text-sm">
          <p>No reviews posted yet. Be the first to share your thoughts!</p>
        </div>
      )}
    </div>
  );
};

export default ReviewList;

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { reviewService } from '../../services/review.service';
import StarPicker from './StarPicker';
import toast from 'react-hot-toast';

const ReviewForm = ({ movieId, movieTitle = '', existingReview = null, onSuccess }) => {
  const { isAuthenticated, setLoginModalOpen } = useAuth();
  const [rating, setRating] = useState(0);
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (existingReview) {
      setRating(existingReview.rating);
      setBody(existingReview.body);
    }
  }, [existingReview]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setLoginModalOpen(true);
      return;
    }
    
    if (rating === 0) {
      toast.error('Please select a star rating first', {
        style: { background: '#1a1a1a', color: '#ffffff', border: '1px solid #e50914' }
      });
      return;
    }

    if (!body.trim()) {
      toast.error('Please write some review thoughts', {
        style: { background: '#1a1a1a', color: '#ffffff', border: '1px solid #e50914' }
      });
      return;
    }

    setLoading(true);
    try {
      if (existingReview) {
        // Edit Review Mode
        await reviewService.editReview(existingReview._id, { rating, body });
        toast.success('Review updated successfully!', {
          style: { background: '#1a1a1a', color: '#ffffff', border: '1px solid #e50914' }
        });
      } else {
        // Create Review Mode
        await reviewService.postReview(movieId, {
          movieTitle,
          rating,
          body,
        });
        toast.success('Review submitted successfully!', {
          style: { background: '#1a1a1a', color: '#ffffff', border: '1px solid #e50914' }
        });
        // Clear for next review
        setRating(0);
        setBody('');
      }

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated && !existingReview) {
    return (
      <div className="bg-dark-100 border border-dashed border-neutral-850 p-6 rounded-2xl text-center space-y-3">
        <p className="text-neutral-450 text-sm">Have you seen this movie? Share your thoughts with the community.</p>
        <button
          onClick={() => setLoginModalOpen(true)}
          className="px-5 py-2 bg-brand text-white text-xs font-extrabold rounded-lg hover:bg-brand/90 transition"
        >
          Sign In to Write a Review
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Star picker */}
      <div className="space-y-1.5">
        <label className="text-xs font-extrabold text-neutral-450 uppercase tracking-widest">
          Your Rating
        </label>
        <StarPicker rating={rating} onChange={setRating} />
      </div>

      {/* Text body */}
      <div className="space-y-1.5">
        <label className="text-xs font-extrabold text-neutral-450 uppercase tracking-widest">
          Written Review
        </label>
        <textarea
          required
          rows={4}
          maxLength={1000}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="What did you think of the cinematography, performance, storyline? Avoid spoilers..."
          className="w-full bg-dark-200 border border-neutral-850 focus:border-brand rounded-xl px-4 py-3 text-white text-sm placeholder-neutral-500 focus:outline-none transition resize-none"
        />
        <div className="flex justify-end">
          <span className="text-[10px] text-neutral-500 font-bold">
            {body.length} / 1000 characters
          </span>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2.5 bg-brand text-white font-extrabold rounded-lg hover:bg-brand/90 transition shadow-lg shadow-brand/10 disabled:opacity-50 text-xs tracking-wider uppercase active:scale-95"
      >
        {loading ? 'Submitting...' : existingReview ? 'Update Review' : 'Post Review'}
      </button>
    </form>
  );
};

export default ReviewForm;

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { formatDate } from '../../utils/formatDate';
import StarPicker from './StarPicker';
import ReviewForm from './ReviewForm';
import { BiEditAlt, BiTrash, BiUserCircle } from 'react-icons/bi';

const ReviewCard = ({ review, onUpdate, onDelete }) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  if (!review) return null;

  const reviewAuthorId = review.userId?._id || review.userId;
  const reviewAuthorName = review.userId?.name || user?.name || 'Anonymous';
  const isOwner = user && reviewAuthorId === user.id;

  const handleEditSuccess = () => {
    setIsEditing(false);
    if (onUpdate) onUpdate();
  };

  if (isEditing) {
    return (
      <div className="bg-dark-100 border border-neutral-800 p-6 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">Editing Review</h4>
          <button
            onClick={() => setIsEditing(false)}
            className="text-neutral-500 hover:text-white text-xs font-semibold"
          >
            Cancel
          </button>
        </div>
        <ReviewForm
          movieId={review.movieId}
          existingReview={review}
          onSuccess={handleEditSuccess}
        />
      </div>
    );
  }

  return (
    <div className="bg-dark-100 border border-neutral-850 p-6 rounded-2xl space-y-4 hover:border-neutral-800 transition duration-200">
      {/* Header Info */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <BiUserCircle className="w-10 h-10 text-neutral-600" />
          <div>
            <h4 className="text-sm font-bold text-white leading-tight">
              {reviewAuthorName}
              {isOwner && (
                <span className="ml-2 bg-brand/10 border border-brand/20 text-brand text-[10px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider">
                  You
                </span>
              )}
            </h4>
            <p className="text-neutral-500 text-xs mt-0.5">{formatDate(review.createdAt || review.updatedAt)}</p>
          </div>
        </div>

        {/* Rating Value */}
        {review.rating > 0 && (
          <StarPicker rating={review.rating} readonly />
        )}
      </div>

      {/* Review Body Text */}
      <p className="text-neutral-300 text-sm leading-relaxed whitespace-pre-wrap">
        {review.body}
      </p>

      {/* Controls if Owner */}
      {isOwner && (
        <div className="flex items-center space-x-4 border-t border-neutral-900/50 pt-3 mt-1">
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-1.5 text-xs text-neutral-400 hover:text-white font-bold transition select-none cursor-pointer"
          >
            <BiEditAlt className="w-4 h-4" />
            <span>Edit Review</span>
          </button>
          
          <button
            onClick={() => onDelete(review._id)}
            className="flex items-center space-x-1.5 text-xs text-brand/80 hover:text-brand font-bold transition select-none cursor-pointer"
          >
            <BiTrash className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;

import React, { useState } from 'react';
import { BiStar } from 'react-icons/bi';

const STAR_LABELS = {
  1: 'Appalling',
  2: 'Horrible',
  3: 'Very Bad',
  4: 'Bad',
  5: 'Average',
  6: 'Fine',
  7: 'Good',
  8: 'Very Good',
  9: 'Excellent',
  10: 'Masterpiece',
};

const StarPicker = ({ rating, onChange, readonly = false }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const displayRating = hoverRating || rating;

  return (
    <div className="flex flex-col space-y-2 select-none">
      <div className="flex items-center space-x-1.5">
        {[...Array(10)].map((_, index) => {
          const starValue = index + 1;
          const isActive = starValue <= displayRating;
          
          return (
            <button
              key={starValue}
              type="button"
              disabled={readonly}
              onClick={() => onChange(starValue)}
              onMouseEnter={() => !readonly && setHoverRating(starValue)}
              onMouseLeave={() => !readonly && setHoverRating(0)}
              className={`p-0.5 transition-all duration-150 ${
                readonly ? 'cursor-default' : 'cursor-pointer hover:scale-120 active:scale-95'
              }`}
            >
              <BiStar
                className={`w-6 h-6 ${
                  isActive
                    ? 'text-yellow-500 fill-current drop-shadow-[0_0_4px_rgba(234,179,8,0.2)]'
                    : 'text-neutral-600'
                }`}
              />
            </button>
          );
        })}

        {/* Numeric display badge */}
        {displayRating > 0 && (
          <span className="ml-3 px-2 py-0.5 bg-yellow-500/10 border border-yellow-500/25 rounded text-yellow-500 font-extrabold text-sm min-w-9 text-center">
            {displayRating}
          </span>
        )}
      </div>

      {/* Semantic Label */}
      {!readonly && displayRating > 0 && (
        <p className="text-xs text-yellow-500 font-bold tracking-wide italic transition-all animate-fade-in">
          {STAR_LABELS[displayRating]}
        </p>
      )}
    </div>
  );
};

export default StarPicker;

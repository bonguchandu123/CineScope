import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-dark-100 rounded-lg overflow-hidden border border-neutral-800 animate-pulse flex flex-col h-[380px]">
      {/* Poster area */}
      <div className="bg-neutral-800 w-full flex-grow relative overflow-hidden">
        {/* Shimmer gradient */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-neutral-700/20 to-transparent animate-shimmer"></div>
      </div>
      {/* Detail info */}
      <div className="p-4 space-y-3">
        <div className="h-4 bg-neutral-800 rounded w-3/4"></div>
        <div className="h-3 bg-neutral-800 rounded w-1/4"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;

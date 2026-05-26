import React from 'react';
import { BiErrorCircle } from 'react-icons/bi';

const ErrorMessage = ({ message = 'Something went wrong while fetching data.', onRetry }) => {
  return (
    <div className="w-full py-16 flex flex-col items-center justify-center space-y-4 text-center px-4">
      <div className="p-4 bg-brand/10 rounded-full border border-brand/20">
        <BiErrorCircle className="text-brand w-12 h-12 animate-pulse" />
      </div>
      <h3 className="text-xl font-bold text-white tracking-wide">Error Loading Content</h3>
      <p className="text-gray-400 max-w-md text-sm leading-relaxed">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 px-6 py-2 bg-brand text-white font-semibold rounded hover:bg-brand/90 transition-colors duration-200 shadow-lg shadow-brand/20 active:scale-95"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;

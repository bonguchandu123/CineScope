import React from 'react';
import { BiUser } from 'react-icons/bi';

const CastRow = ({ cast }) => {
  if (!cast || cast.length === 0) return null;

  return (
    <div className="space-y-4 px-6 md:px-12 select-none max-w-7xl mx-auto w-full">
      <h3 className="text-lg md:text-xl font-extrabold text-white tracking-wide">
        Starring Cast
      </h3>
      
      {/* Scrollable Cast Cards Row */}
      <div className="flex items-center space-x-6 overflow-x-auto pb-4 scrollbar-hide">
        {cast.map((actor, idx) => {
          const initials = actor.name ? actor.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '?';
          
          return (
            <div
              key={`${actor.name}-${idx}`}
              className="flex flex-col items-center text-center space-y-2 shrink-0 group cursor-pointer"
            >
              {/* Dummy High-Fidelity Avatar */}
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-450 font-bold group-hover:border-brand group-hover:bg-neutral-800 transition duration-300 relative overflow-hidden">
                <span className="text-sm tracking-widest">{initials}</span>
                {/* Visual hover indicator */}
                <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              
              {/* Name */}
              <p className="text-xs md:text-sm text-neutral-300 font-semibold group-hover:text-white transition duration-200 w-20 md:w-24 truncate">
                {actor.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CastRow;

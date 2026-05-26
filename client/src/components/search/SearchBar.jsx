import React from 'react';
import { BiSearch, BiX } from 'react-icons/bi';

const SearchBar = ({ value, onChange, onClear, placeholder = 'Search by title, director, actors...' }) => {
  return (
    <div className="relative w-full">
      <div className="flex items-center w-full bg-dark-100 border border-neutral-800 rounded-xl px-4 py-3 focus-within:border-brand/80 transition duration-300">
        <BiSearch className="text-neutral-500 w-5 h-5 mr-3 shrink-0" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="bg-transparent border-none text-white text-sm placeholder-neutral-500 focus:outline-none w-full"
        />
        {value && (
          <button
            onClick={onClear}
            className="text-neutral-500 hover:text-white p-0.5 ml-2 transition active:scale-90"
            type="button"
          >
            <BiX className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;

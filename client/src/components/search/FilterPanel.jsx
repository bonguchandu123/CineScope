import React from 'react';
import { BiSlider, BiRefresh } from 'react-icons/bi';

const FilterPanel = ({ year, onYearChange, onReset }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(40), (val, index) => currentYear - index);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-dark-100 border border-neutral-900 rounded-xl p-4 gap-4 w-full select-none">
      <div className="flex items-center space-x-2">
        <BiSlider className="w-5 h-5 text-brand" />
        <span className="text-sm font-extrabold text-white uppercase tracking-wider">Refine Search</span>
      </div>

      <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
        {/* Year Filter Dropdown */}
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <label className="text-xs text-neutral-500 font-bold uppercase tracking-wider">Year:</label>
          <select
            value={year}
            onChange={(e) => onYearChange(e.target.value)}
            className="bg-dark-200 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-brand cursor-pointer transition w-full sm:w-36"
          >
            <option value="">All Years</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters Button */}
        {year && (
          <button
            onClick={onReset}
            className="flex items-center space-x-1 px-3 py-1.5 bg-neutral-850 hover:bg-neutral-800 border border-neutral-750 text-neutral-300 hover:text-white rounded-lg text-xs font-bold transition active:scale-95 cursor-pointer ml-auto sm:ml-0"
          >
            <BiRefresh className="w-4 h-4" />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;

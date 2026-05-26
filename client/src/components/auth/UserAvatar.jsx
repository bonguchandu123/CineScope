import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BiUser, BiLogOut, BiMovie } from 'react-icons/bi';

const UserAvatar = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  if (!user) return null;

  const firstLetter = user.name ? user.name.charAt(0).toUpperCase() : 'U';

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
    navigate('/');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Clicker */}
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-brand text-white font-bold border-2 border-transparent hover:border-white transition duration-200 cursor-pointer shadow-lg active:scale-95 text-base"
      >
        {firstLetter}
      </button>

      {/* Dropdown Options */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-dark-200 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden py-2 z-50 animate-in fade-in slide-in-from-top-3 duration-150">
          <div className="px-4 py-3 border-b border-neutral-850">
            <p className="text-sm text-neutral-400 font-medium">Signed in as</p>
            <p className="text-sm font-bold text-white truncate mt-0.5">{user.name}</p>
            <p className="text-xs text-neutral-500 truncate">{user.email}</p>
          </div>

          <div className="py-1">
            <Link
              to="/profile"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center space-x-3 px-4 py-2.5 text-sm text-neutral-300 hover:text-white hover:bg-neutral-800 transition duration-150"
            >
              <BiUser className="w-5 h-5 text-neutral-400" />
              <span>My Profile</span>
            </Link>

            <Link
              to="/watchlist"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center space-x-3 px-4 py-2.5 text-sm text-neutral-300 hover:text-white hover:bg-neutral-800 transition duration-150"
            >
              <BiMovie className="w-5 h-5 text-neutral-400" />
              <span>My Watchlist</span>
            </Link>
          </div>

          <div className="border-t border-neutral-850 pt-1 mt-1">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full text-left px-4 py-2.5 text-sm text-brand hover:bg-brand/10 transition duration-150 font-semibold"
            >
              <BiLogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;

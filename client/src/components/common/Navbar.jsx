import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import UserAvatar from '../auth/UserAvatar';
import { BiMenu, BiX, BiChevronDown, BiSearch } from 'react-icons/bi';
import { GENRES } from '../../utils/constants';
import { useDebounce } from '../../hooks/useDebounce';

const Navbar = () => {
  const { isAuthenticated, setLoginModalOpen, setRegisterModalOpen } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [genreDropdownOpen, setGenreDropdownOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const navigate = useNavigate();
  const debouncedSearch = useDebounce(searchVal, 500);
  const inputRef = useRef(null);

  // Scroll listener — darkens navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigate to /search when debounced value changes
  useEffect(() => {
    if (debouncedSearch.trim()) {
      navigate(`/search?q=${encodeURIComponent(debouncedSearch.trim())}`);
    }
  }, [debouncedSearch, navigate]);

  const handleSearchChange = (e) => {
    setSearchVal(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchVal.trim())}`);
    } else {
      navigate('/search');
    }
  };

  const handleClearSearch = () => {
    setSearchVal('');
    inputRef.current?.focus();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 py-3 px-6 md:px-12 flex items-center justify-between gap-4 ${
        scrolled
          ? 'bg-[#090909]/95 backdrop-blur-md shadow-lg border-b border-neutral-900/50'
          : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      {/* Brand & Desktop Nav Links */}
      <div className="flex items-center space-x-8 shrink-0">
        <Link
          to="/"
          className="text-2xl md:text-3xl font-extrabold text-brand tracking-tighter hover:scale-105 transition-transform duration-200"
        >
          CINE<span className="text-white">SCOPE</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center space-x-6 text-sm font-semibold text-neutral-300">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `hover:text-white transition duration-200 ${isActive ? 'text-white font-bold' : ''}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/search"
            className={({ isActive }) =>
              `hover:text-white transition duration-200 ${isActive ? 'text-white font-bold' : ''}`
            }
          >
            Browse
          </NavLink>

          {/* Genres Dropdown */}
          <div className="relative">
            <button
              onClick={() => setGenreDropdownOpen(!genreDropdownOpen)}
              onMouseEnter={() => setGenreDropdownOpen(true)}
              className="hover:text-white flex items-center space-x-1 transition duration-200 py-1 cursor-pointer"
            >
              <span>Genres</span>
              <BiChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${genreDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {genreDropdownOpen && (
              <div
                onMouseLeave={() => setGenreDropdownOpen(false)}
                className="absolute left-0 mt-2 w-64 bg-dark-200 border border-neutral-800 rounded-xl shadow-2xl grid grid-cols-2 gap-1 p-2 z-50"
              >
                {GENRES.map((genre) => (
                  <Link
                    key={genre.id}
                    to={`/genres/${genre.id}`}
                    onClick={() => setGenreDropdownOpen(false)}
                    className="px-3 py-2 text-xs hover:bg-neutral-800 rounded-md text-neutral-300 hover:text-white font-medium transition duration-150"
                  >
                    {genre.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <NavLink
            to="/watchlist"
            className={({ isActive }) =>
              `hover:text-white transition duration-200 ${isActive ? 'text-white font-bold' : ''}`
            }
          >
            Watchlist
          </NavLink>
        </nav>
      </div>

      {/* Centre: Search Bar — always visible on desktop */}
      <form
        onSubmit={handleSearchSubmit}
        className="hidden md:flex flex-1 max-w-sm items-center bg-neutral-900/80 border border-neutral-800 rounded-full px-4 py-2 gap-2 focus-within:border-brand/60 transition duration-300"
      >
        <BiSearch className="w-4 h-4 text-neutral-500 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={searchVal}
          onChange={handleSearchChange}
          placeholder="Search movies, actors..."
          className="bg-transparent border-none text-sm text-white placeholder-neutral-500 focus:outline-none w-full"
        />
        {searchVal && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="text-neutral-500 hover:text-white transition shrink-0"
          >
            <BiX className="w-4 h-4" />
          </button>
        )}
      </form>

      {/* Right: Auth Buttons / User Avatar + Mobile trigger */}
      <div className="flex items-center space-x-3 shrink-0">
        {isAuthenticated ? (
          <UserAvatar />
        ) : (
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={() => setLoginModalOpen(true)}
              className="text-white hover:text-brand font-semibold text-sm px-4 py-2 transition"
            >
              Sign In
            </button>
            <button
              onClick={() => setRegisterModalOpen(true)}
              className="bg-brand text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-brand/90 transition shadow-md shadow-brand/20 active:scale-95"
            >
              Sign Up
            </button>
          </div>
        )}

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-neutral-300 hover:text-white p-1"
        >
          {mobileMenuOpen ? <BiX className="w-7 h-7" /> : <BiMenu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[64px] bg-dark-300/98 z-30 lg:hidden flex flex-col p-6 space-y-6">
          {/* Mobile Search */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center bg-neutral-900 border border-neutral-800 rounded-full px-4 py-2 gap-2 focus-within:border-brand/60 transition"
          >
            <BiSearch className="w-4 h-4 text-neutral-500 shrink-0" />
            <input
              type="text"
              value={searchVal}
              onChange={handleSearchChange}
              placeholder="Search movies, actors..."
              className="bg-transparent border-none text-sm text-white placeholder-neutral-500 focus:outline-none w-full"
            />
            {searchVal && (
              <button type="button" onClick={handleClearSearch} className="text-neutral-500 hover:text-white transition">
                <BiX className="w-4 h-4" />
              </button>
            )}
          </form>

          <nav className="flex flex-col space-y-4 text-lg font-semibold text-neutral-300">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">
              Home
            </Link>
            <Link to="/search" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">
              Browse Movies
            </Link>
            <div>
              <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-3 mt-1">Genres</p>
              <div className="grid grid-cols-2 gap-2 pl-2">
                {GENRES.map((genre) => (
                  <Link
                    key={genre.id}
                    to={`/genres/${genre.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm text-neutral-400 hover:text-white transition duration-150"
                  >
                    {genre.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              to="/watchlist"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white border-t border-neutral-800 pt-4"
            >
              Watchlist
            </Link>
          </nav>

          {!isAuthenticated && (
            <div className="flex flex-col space-y-3 pt-4 border-t border-neutral-800">
              <button
                onClick={() => { setMobileMenuOpen(false); setLoginModalOpen(true); }}
                className="w-full border border-neutral-700 text-white font-semibold py-2.5 rounded-lg text-sm hover:bg-neutral-800"
              >
                Sign In
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); setRegisterModalOpen(true); }}
                className="w-full bg-brand text-white font-bold py-2.5 rounded-lg text-sm hover:bg-brand/90"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;

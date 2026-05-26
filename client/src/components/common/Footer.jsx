import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-300 border-t border-neutral-900 pt-16 pb-8 px-6 md:px-12 text-sm text-neutral-500 font-medium">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        {/* CineScope Brand Info */}
        <div className="space-y-4">
          <Link to="/" className="text-xl font-extrabold text-brand tracking-tighter">
            CINE<span className="text-white">SCOPE</span>
          </Link>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Discover trending titles, organize your watchlist, write custom ratings and reviews, and find personalized cinema recommendations instantly.
          </p>
          {/* Socials */}
          <div className="flex space-x-4 pt-2">
            <a href="#" className="p-2 bg-neutral-900 hover:bg-brand hover:text-white rounded-full text-neutral-400 transition duration-200">
              <FaFacebookF className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 bg-neutral-900 hover:bg-brand hover:text-white rounded-full text-neutral-400 transition duration-200">
              <FaTwitter className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 bg-neutral-900 hover:bg-brand hover:text-white rounded-full text-neutral-400 transition duration-200">
              <FaInstagram className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 bg-neutral-900 hover:bg-brand hover:text-white rounded-full text-neutral-400 transition duration-200">
              <FaYoutube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Explore</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/" className="hover:text-white transition">Home</Link>
            </li>
            <li>
              <Link to="/search" className="hover:text-white transition">Search Movies</Link>
            </li>
            <li>
              <Link to="/watchlist" className="hover:text-white transition">My Watchlist</Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-white transition">User Dashboard</Link>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Popular Genres</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/genres/action" className="hover:text-white transition">Action</Link>
            </li>
            <li>
              <Link to="/genres/comedy" className="hover:text-white transition">Comedy</Link>
            </li>
            <li>
              <Link to="/genres/drama" className="hover:text-white transition">Drama</Link>
            </li>
            <li>
              <Link to="/genres/sci-fi" className="hover:text-white transition">Sci-Fi</Link>
            </li>
          </ul>
        </div>

        {/* Column 4 */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Help & Legal</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <a href="#" className="hover:text-white transition">Account & Support</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">OMDB API Details</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-neutral-900 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-600 gap-4">
        <p>&copy; {currentYear} CineScope. All rights reserved. Made for cinematic discovery.</p>
        <p>Backend powered by Node.js. Frontend powered by React & Tailwind.</p>
      </div>
    </footer>
  );
};

export default Footer;

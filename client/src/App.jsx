import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { WatchlistProvider } from './context/WatchlistContext';
import { Toaster } from 'react-hot-toast';

// Layout & Common
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';

// Global Modals
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';

// Pages
import Home from './pages/Home';
import Search from './pages/Search';
import MovieDetail from './pages/MovieDetail';
import Genre from './pages/Genre';
import Watchlist from './pages/Watchlist';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <WatchlistProvider>
        <div className="flex flex-col min-h-screen bg-[#0f0f0f] text-white">
          {/* Global Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1a1a1a',
                color: '#ffffff',
                border: '1px solid #333333',
              },
            }}
          />

          {/* Sticky Header Nav */}
          <Navbar />

          {/* Core Routes Container */}
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/movies/:id" element={<MovieDetail />} />
              <Route path="/genres/:genreId" element={<Genre />} />
              
              {/* Protected Dashboards */}
              <Route
                path="/watchlist"
                element={
                  <ProtectedRoute>
                    <Watchlist />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>

          {/* global Modals (controlled via AuthContext triggers) */}
          <LoginForm />
          <RegisterForm />

          {/* Footer banner */}
          <Footer />
        </div>
      </WatchlistProvider>
    </AuthProvider>
  );
}

export default App;
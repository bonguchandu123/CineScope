import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT Token if exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('cinescope_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Centralized Error Toast Handler
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // If auth token expired/invalid (401), we can handle it or let the contexts know
    const status = error.response?.status;
    const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred';
    
    // Ignore errors for check-auth `/auth/me` on initial load (avoids noisy toast when guest visits site)
    const isAuthMe = error.config?.url?.endsWith('/auth/me');
    
    if (!isAuthMe) {
      toast.error(errorMessage, {
        id: error.config?.url + status, // Prevents duplicate toasts for same endpoint
        style: {
          background: '#1a1a1a',
          color: '#ffffff',
          border: '1px solid #e50914',
        },
      });
    }

    if (status === 401 && !isAuthMe) {
      // Clear invalid token
      localStorage.removeItem('cinescope_token');
      // Force reload or auth context sync could handle redirect
    }

    return Promise.reject(error);
  }
);

export default api;

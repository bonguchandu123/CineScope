import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/auth.service';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  const checkAuth = async () => {
    const token = localStorage.getItem('cinescope_token');
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    
    try {
      const data = await authService.getMe();
      if (data.success) {
        setUser(data.user);
      } else {
        localStorage.removeItem('cinescope_token');
        setUser(null);
      }
    } catch (err) {
      console.error('Auth verification failed:', err);
      localStorage.removeItem('cinescope_token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await authService.login({ email, password });
      if (data.success) {
        localStorage.setItem('cinescope_token', data.token);
        setUser(data.user);
        setLoginModalOpen(false);
        toast.success(`Welcome back, ${data.user.name}!`, {
          style: { background: '#1a1a1a', color: '#ffffff', border: '1px solid #e50914' }
        });
        return true;
      }
    } catch (err) {
      // Errors are handled in the API interceptor toast already
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async ({ name, email, password }) => {
    setLoading(true);
    try {
      const data = await authService.register({ name, email, password });
      if (data.success) {
        localStorage.setItem('cinescope_token', data.token);
        setUser(data.user);
        setRegisterModalOpen(false);
        toast.success(`Account created! Welcome, ${data.user.name}!`, {
          style: { background: '#1a1a1a', color: '#ffffff', border: '1px solid #e50914' }
        });
        return true;
      }
    } catch (err) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.warn('Server logout error', err);
    } finally {
      localStorage.removeItem('cinescope_token');
      setUser(null);
      toast.success('Logged out successfully', {
        style: { background: '#1a1a1a', color: '#ffffff', border: '1px solid #e50914' }
      });
    }
  };

  const isAuthenticated = !!user;

  const value = {
    user,
    loading,
    isAuthenticated,
    loginModalOpen,
    registerModalOpen,
    setLoginModalOpen,
    setRegisterModalOpen,
    login,
    register,
    logout,
    checkAuth
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

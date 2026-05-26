import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { useAuth } from '../../context/AuthContext';

const RegisterForm = () => {
  const { registerModalOpen, setRegisterModalOpen, setLoginModalOpen, register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    setLoading(true);
    const success = await register({ name, email, password });
    setLoading(false);
    if (success) {
      setName('');
      setEmail('');
      setPassword('');
    }
  };

  const handleSwitchToLogin = () => {
    setRegisterModalOpen(false);
    setTimeout(() => {
      setLoginModalOpen(true);
    }, 200);
  };

  return (
    <AnimatePresence>
      {registerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setRegisterModalOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative bg-dark-200 border border-neutral-800 p-8 rounded-2xl w-full max-w-md shadow-2xl z-10"
          >
            {/* Close Button */}
            <button
              onClick={() => setRegisterModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors active:scale-95"
            >
              <IoClose className="w-6 h-6" />
            </button>

            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold text-white">Sign Up</h2>
              <p className="text-neutral-400 text-sm mt-2">Create an account to start cataloging your favorite films.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-dark-100 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-brand transition duration-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-dark-100 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-brand transition duration-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-dark-100 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-brand transition duration-200"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand text-white font-bold py-3 px-4 rounded-lg hover:bg-brand/90 transition-colors shadow-lg shadow-brand/20 active:scale-98 disabled:opacity-50"
              >
                {loading ? 'Creating Account...' : 'Get Started'}
              </button>
            </form>

            {/* Bottom link */}
            <div className="mt-8 text-center text-sm text-neutral-400">
              Already have an account?{' '}
              <button
                onClick={handleSwitchToLogin}
                className="text-white font-semibold hover:underline hover:text-brand transition-colors"
              >
                Sign In.
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default RegisterForm;

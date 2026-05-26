import api from './api';

export const authService = {
  async register(userData) {
    const { data } = await api.post('/auth/register', userData);
    return data; // returns { success, token, user: { id, name, email } }
  },

  async login(credentials) {
    const { data } = await api.post('/auth/login', credentials);
    return data; // returns { success, token, user: { id, name, email } }
  },

  async getMe() {
    const { data } = await api.get('/auth/me');
    return data; // returns { success, user: { id, name, email } }
  },

  async logout() {
    const { data } = await api.post('/auth/logout');
    return data; // returns { success, message }
  },
};

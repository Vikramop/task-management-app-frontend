import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const userAuthStore = create((set) => ({
  user: null,
  error: null,

  signup: async (name, email, password, confirmPassword) => {
    set({ error: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        name,
        email,
        password,
        confirmPassword,
      });
      console.log('Response:', response);
      set({ user: response.data.user });
      return response;
    } catch (error) {
      set({ error: error.response.data.message || 'Error signing up' });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ error: null });

    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      const { user } = response.data; // Extract user from response data
      const token = user.token;

      if (token) {
        localStorage.setItem('token', token); // Save token to localStorage
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set default header for future requests

        set({
          user: user,
          error: null,
        });
      } else {
        console.error('Token is undefined');
      }
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error logging in' });
      throw error;
    }
  },

  logout: async () => {
    set({ error: null });
    try {
      await axios.post(`${API_URL}/logout`);
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      set({ user: null, isAuthenticated: false, error: null });
    } catch (error) {
      set({ error: 'Error logging out' });
      throw error;
    }
  },
}));

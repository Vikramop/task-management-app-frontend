import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'https://task-mangement-app-backend-hl6m.onrender.com/api/auth';

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

  update: async (name, newEmail, oldPassword, newPassword) => {
    set({ error: null });

    console.log('Data being sent:', {
      name,
      newEmail,
      oldPassword,
      newPassword,
    });
    try {
      // Retrieve token from localStorage
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('User is not authenticated');
      }

      const response = await axios.put(
        `${API_URL}/update`, // Assuming your API endpoint is '/auth/update'
        {
          name,
          newEmail,
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );

      console.log('Response:', response);

      // Update the user state after successful update
      set({ user: response.data.user });

      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error updating credentials',
      });
      throw error;
    }
  },

  fetchUser: async () => {
    set({ error: null });
    try {
      // Retrieve the token from local storage or wherever it's stored
      const token = localStorage.getItem('token');

      // Send a request to the API to fetch user data
      const response = await axios.get(`${API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Fetched User Data:', response.data.user);

      // Set the user data in state
      set({ user: response.data.user });

      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error fetching user data',
      });
      throw error;
    }
  },
}));

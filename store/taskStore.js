import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/task';

export const userTaskStore = create((set) => ({
  user: null,
  tasks: [],
  error: null,

  createTask: async (title, checklist, dueDate, priority, assignedTo) => {
    set({ error: null }); // Reset error state before making the request
    try {
      const category = 'To-Do';
      const token = localStorage.getItem('token');

      const response = await axios.post(
        `${API_URL}/`,
        {
          title,
          category,
          checklist,
          dueDate,
          priority,
          assignedTo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Response:', response); // Log the response for debugging
      set({ task: response.data.task }); // Store the task data in the state
      return response; // Return the response for any further processing if needed
    } catch (error) {
      set({ error: error.response.data.message || 'Error creating task' }); // Store the error message in state
      throw error; // Re-throw the error for additional error handling
    }
  },

  fetchTasks: async () => {
    set({ error: null }); // Reset error state before making the request
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log('Fetched Tasks:', response);
      set({ tasks: response.data.tasks });
    } catch (error) {
      set({ error: error.response.data.message || 'Error fetching tasks' }); // Store the error message in state
    }
  },
}));

import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/task';

export const userTaskStore = create((set) => ({
  user: null,
  error: null,

  createTask: async (
    title,
    category,
    checklist,
    dueDate,
    priority,
    assignedTo
  ) => {
    set({ error: null }); // Reset error state before making the request
    try {
      const response = await axios.post(`${API_URL}/tasks`, {
        title,
        category,
        checklist,
        dueDate,
        priority,
        assignedTo,
      });

      console.log('Response:', response); // Log the response for debugging
      set({ task: response.data.task }); // Store the task data in the state
      return response; // Return the response for any further processing if needed
    } catch (error) {
      set({ error: error.response.data.message || 'Error creating task' }); // Store the error message in state
      throw error; // Re-throw the error for additional error handling
    }
  },
}));

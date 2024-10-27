import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/task';

export const userTaskStore = create((set) => ({
  user: null,
  tasks: [],
  error: null,

  createTask: async (title, checklist, dueDate, priority, assignedTo) => {
    set({ error: null });
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

      // console.log('Response:', response);
      set((state) => ({
        tasks: [...state.tasks, response.data.task],
      }));
    } catch (error) {
      set({ error: error.response.data.message || 'Error creating task' });
      throw error;
    }
  },

  fetchTasks: async () => {
    set({ error: null });
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log('Fetched Tasks Backen:', response);
      set({ tasks: response.data.tasks });
    } catch (error) {
      set({ error: error.response.data.message || 'Error fetching tasks' });
    }
  },

  editTask: async (
    taskId,
    title,
    checklist,
    dueDate,
    priority,
    assignedTo,
    category
  ) => {
    set({ error: null });
    try {
      const token = localStorage.getItem('token');
      console.log('asigned', assignedTo);

      const response = await axios.put(
        `${API_URL}/${taskId}`,
        {
          title,
          checklist,
          dueDate,
          priority,
          assignedTo,
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log('Response:', response);
      await userTaskStore.getState().fetchTasks();
      set({ task: response.data.task });
      return response;
    } catch (error) {
      set({ error: error.response.data.message || 'Error editing task' });
      throw error;
    }
  },

  shareTask: async (taskId) => {
    try {
      const response = await axios.post(`${API_URL}/share/${taskId}`);

      if (response.data.success) {
        return response.data.link; // Return the shareable link
      } else {
        console.error('Failed to share task:', response.data.message);
        return null;
      }
    } catch (error) {
      console.error('Error sharing task:', error.message);
      return null;
    }
  },

  deleteTask: async (taskId) => {
    try {
      const response = await axios.delete(`${API_URL}/${taskId}`);

      if (response.data.success) {
        // Fetch the updated list of tasks
        const updatedResponse = await axios.get(`${API_URL}/`);
        if (updatedResponse.data.success) {
          return updatedResponse.data.tasks; // Return the updated tasks
        } else {
          console.error(
            'Failed to fetch updated tasks:',
            updatedResponse.data.message
          );
          return null; // Indicate failure to fetch updated tasks
        }
      } else {
        console.error('Failed to delete task:', response.data.message);
        return null; // Indicate failure to delete
      }
    } catch (error) {
      console.error('Error deleting task:', error.message);
      return null; // Indicate an error
    }
  },

  fetchAnalytics: async () => {
    set({ error: null });
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/analytics`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ analyticsData: response.data.analyticsData });
      console.log('analytic', response.data.analyticsData);
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error fetching analytics data',
      });
    }
  },

  addAssignee: async (email) => {
    set({ error: null });
    try {
      const token = localStorage.getItem('token');
      console.log('email', email);

      const response = await axios.post(
        `${API_URL}/add`,
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('response', response.data);

      if (response.data.success) {
        set({
          success: `${email} added to board`, // Set success message
          error: null,
        });
      } else {
        set({ error: response.data.message });
      }
    } catch (error) {
      set({ error: error.response.data.message || 'Error adding assignee' });
    }
  },

  clearMessages: () => set({ success: null, error: null }),
}));

import api from './api';

// Scheduling API service
const schedulingService = {
  // Routes
  routes: {
    getAll: async (params = {}) => {
      const response = await api.get('/scheduling/routes/', { params });
      return response.data;
    },

    getById: async (id) => {
      const response = await api.get(`/scheduling/routes/${id}/`);
      return response.data;
    },

    create: async (data) => {
      const response = await api.post('/scheduling/routes/', data);
      return response.data;
    },

    update: async (id, data) => {
      const response = await api.patch(`/scheduling/routes/${id}/`, data);
      return response.data;
    },

    delete: async (id) => {
      const response = await api.delete(`/scheduling/routes/${id}/`);
      return response.data;
    },
  },

  // Schedules
  schedules: {
    getAll: async (params = {}) => {
      const response = await api.get('/scheduling/schedules/', { params });
      return response.data;
    },

    getById: async (id) => {
      const response = await api.get(`/scheduling/schedules/${id}/`);
      return response.data;
    },

    create: async (data) => {
      const response = await api.post('/scheduling/schedules/', data);
      return response.data;
    },

    update: async (id, data) => {
      const response = await api.patch(`/scheduling/schedules/${id}/`, data);
      return response.data;
    },

    delete: async (id) => {
      const response = await api.delete(`/scheduling/schedules/${id}/`);
      return response.data;
    },

    // Get schedules for a specific date
    getByDate: async (date) => {
      const response = await api.get('/scheduling/schedules/', { 
        params: { date: date } 
      });
      return response.data;
    },
  },

  // Collections
  collections: {
    getAll: async (params = {}) => {
      const response = await api.get('/scheduling/collections/', { params });
      return response.data;
    },

    getById: async (id) => {
      const response = await api.get(`/scheduling/collections/${id}/`);
      return response.data;
    },

    create: async (data) => {
      const response = await api.post('/scheduling/collections/', data);
      return response.data;
    },

    update: async (id, data) => {
      const response = await api.patch(`/scheduling/collections/${id}/`, data);
      return response.data;
    },

    // Start a collection
    start: async (id) => {
      const response = await api.post(`/scheduling/collections/${id}/start/`);
      return response.data;
    },

    // Complete a collection
    complete: async (id, data) => {
      const response = await api.post(`/scheduling/collections/${id}/complete/`, data);
      return response.data;
    },

    // Get today's collections
    getToday: async () => {
      const today = new Date().toISOString().split('T')[0];
      const response = await api.get('/scheduling/collections/', { 
        params: { date: today } 
      });
      return response.data;
    },

    // Get collection statistics
    getStats: async (params = {}) => {
      const response = await api.get('/scheduling/collections/stats/', { params });
      return response.data;
    },
  },
};

export default schedulingService;

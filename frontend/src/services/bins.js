import api from './api';

// Bins API service
const binsService = {
  // Get all bins with optional filters
  getAll: async (params = {}) => {
    const response = await api.get('/bins/', { params });
    return response.data;
  },

  // Get single bin by ID
  getById: async (id) => {
    const response = await api.get(`/bins/${id}/`);
    return response.data;
  },

  // Create a new bin
  create: async (data) => {
    const response = await api.post('/bins/', data);
    return response.data;
  },

  // Update a bin
  update: async (id, data) => {
    const response = await api.patch(`/bins/${id}/`, data);
    return response.data;
  },

  // Delete a bin
  delete: async (id) => {
    const response = await api.delete(`/bins/${id}/`);
    return response.data;
  },

  // Get bin types
  getTypes: async () => {
    const response = await api.get('/bins/types/');
    return response.data;
  },

  // Get bin readings (fill level history)
  getReadings: async (binId, params = {}) => {
    const response = await api.get(`/bins/${binId}/readings/`, { params });
    return response.data;
  },

  // Get bin maintenance logs
  getMaintenanceLogs: async (binId) => {
    const response = await api.get(`/bins/${binId}/maintenance/`);
    return response.data;
  },

  // Create maintenance log
  createMaintenanceLog: async (binId, data) => {
    const response = await api.post(`/bins/${binId}/maintenance/`, data);
    return response.data;
  },

  // Get bins summary/stats
  getStats: async () => {
    const response = await api.get('/bins/stats/');
    return response.data;
  },

  // Get bins by zone
  getByZone: async (zoneId) => {
    const response = await api.get('/bins/', { params: { zone: zoneId } });
    return response.data;
  },

  // Get bins needing attention (high fill level)
  getNeedingAttention: async () => {
    const response = await api.get('/bins/', { params: { fill_level_gte: 80 } });
    return response.data;
  },
};

export default binsService;

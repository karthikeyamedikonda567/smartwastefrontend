import api from './api';

// Analytics API service
const analyticsService = {
  // Get dashboard overview
  getDashboardOverview: async () => {
    const response = await api.get('/analytics/dashboard/');
    return response.data;
  },

  // Get analytics snapshots
  getSnapshots: async (params = {}) => {
    const response = await api.get('/analytics/snapshots/', { params });
    return response.data;
  },

  // Get zone analytics
  getZoneAnalytics: async (params = {}) => {
    const response = await api.get('/analytics/zones/', { params });
    return response.data;
  },

  // Get zone analytics by ID
  getZoneById: async (id) => {
    const response = await api.get(`/analytics/zones/${id}/`);
    return response.data;
  },

  // Get waste type analytics
  getWasteTypeAnalytics: async (params = {}) => {
    const response = await api.get('/analytics/waste-types/', { params });
    return response.data;
  },

  // Get collection trends
  getCollectionTrends: async (params = {}) => {
    const response = await api.get('/analytics/trends/collections/', { params });
    return response.data;
  },

  // Get recycling trends
  getRecyclingTrends: async (params = {}) => {
    const response = await api.get('/analytics/trends/recycling/', { params });
    return response.data;
  },

  // Get efficiency metrics
  getEfficiencyMetrics: async (params = {}) => {
    const response = await api.get('/analytics/efficiency/', { params });
    return response.data;
  },

  // Get environmental impact data
  getEnvironmentalImpact: async (params = {}) => {
    const response = await api.get('/analytics/environmental-impact/', { params });
    return response.data;
  },

  // Get predictive insights
  getPredictions: async () => {
    const response = await api.get('/analytics/predictions/');
    return response.data;
  },

  // Generate custom report
  generateReport: async (data) => {
    const response = await api.post('/analytics/reports/generate/', data);
    return response.data;
  },
};

export default analyticsService;

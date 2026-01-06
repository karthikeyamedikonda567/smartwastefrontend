import api from './api';

// Authentication API service
const authService = {
  // Login user
  login: async (email, password) => {
    const response = await api.post('/auth/token/', { email, password });
    return response.data;
  },

  // Register new user
  register: async (data) => {
    const response = await api.post('/auth/register/', data);
    return response.data;
  },

  // Refresh access token
  refreshToken: async (refreshToken) => {
    const response = await api.post('/auth/token/refresh/', { 
      refresh: refreshToken 
    });
    return response.data;
  },

  // Logout user
  logout: async (refreshToken) => {
    const response = await api.post('/auth/logout/', { 
      refresh: refreshToken 
    });
    return response.data;
  },

  // Get current user profile
  getProfile: async () => {
    const response = await api.get('/users/me/');
    return response.data;
  },

  // Update user profile
  updateProfile: async (data) => {
    const response = await api.patch('/users/me/', data);
    return response.data;
  },

  // Change password
  changePassword: async (data) => {
    const response = await api.post('/auth/password/change/', data);
    return response.data;
  },

  // Request password reset
  requestPasswordReset: async (email) => {
    const response = await api.post('/auth/password/reset/', { email });
    return response.data;
  },

  // Confirm password reset
  confirmPasswordReset: async (data) => {
    const response = await api.post('/auth/password/reset/confirm/', data);
    return response.data;
  },

  // Verify email
  verifyEmail: async (token) => {
    const response = await api.post('/auth/verify-email/', { token });
    return response.data;
  },
};

export default authService;

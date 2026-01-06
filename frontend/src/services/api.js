import axios from 'axios'
import useAuthStore from '../context/authStore'

// Use environment variable for API base URL, fallback to relative path for development
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState()
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      
      const success = await useAuthStore.getState().refreshAccessToken()
      
      if (success) {
        const { accessToken } = useAuthStore.getState()
        originalRequest.headers.Authorization = `Bearer ${accessToken}`
        return api(originalRequest)
      }
    }
    
    return Promise.reject(error)
  }
)

export default api

// API Service Functions
export const authService = {
  login: (credentials) => api.post('/auth/token/', credentials),
  refresh: (refreshToken) => api.post('/auth/token/refresh/', { refresh: refreshToken }),
  register: (data) => api.post('/users/register/', data),
  getProfile: () => api.get('/users/me/'),
  updateProfile: (data) => api.patch('/users/me/', data),
}

export const binService = {
  getAll: (params) => api.get('/bins/', { params }),
  getById: (id) => api.get(`/bins/${id}/`),
  create: (data) => api.post('/bins/', data),
  update: (id, data) => api.patch(`/bins/${id}/`, data),
  delete: (id) => api.delete(`/bins/${id}/`),
  getNearlyFull: () => api.get('/bins/nearly_full/'),
  getNeedsAttention: () => api.get('/bins/needs_attention/'),
  recordReading: (id, data) => api.post(`/bins/${id}/record_reading/`, data),
  markEmptied: (id) => api.post(`/bins/${id}/mark_emptied/`),
  logMaintenance: (id, data) => api.post(`/bins/${id}/log_maintenance/`, data),
  getTypes: () => api.get('/bins/types/'),
}

export const schedulingService = {
  getRoutes: (params) => api.get('/scheduling/routes/', { params }),
  getSchedules: (params) => api.get('/scheduling/schedules/', { params }),
  getTodaySchedules: () => api.get('/scheduling/schedules/today/'),
  getCollections: (params) => api.get('/scheduling/collections/', { params }),
  getCollectionById: (id) => api.get(`/scheduling/collections/${id}/`),
  startCollection: (id) => api.post(`/scheduling/collections/${id}/start/`),
  completeCollection: (id) => api.post(`/scheduling/collections/${id}/complete/`),
  addBinToCollection: (id, data) => api.post(`/scheduling/collections/${id}/add_bin/`, data),
}

export const wasteService = {
  getCategories: () => api.get('/waste/categories/'),
  getItems: (params) => api.get('/waste/items/', { params }),
  getLogs: (params) => api.get('/waste/logs/', { params }),
}

export const inventoryService = {
  getItems: (params) => api.get('/inventory/', { params }),
  getLowStock: () => api.get('/inventory/low_stock/'),
  adjustStock: (id, data) => api.post(`/inventory/${id}/adjust_stock/`, data),
  getTransactions: (params) => api.get('/inventory/transactions/', { params }),
}

export const billingService = {
  getPlans: () => api.get('/billing/plans/'),
  getSubscriptions: (params) => api.get('/billing/subscriptions/', { params }),
  getInvoices: (params) => api.get('/billing/invoices/', { params }),
  getPayments: (params) => api.get('/billing/payments/', { params }),
}

export const notificationService = {
  getAll: (params) => api.get('/notifications/', { params }),
  getUnread: () => api.get('/notifications/unread/'),
  getUnreadCount: () => api.get('/notifications/unread_count/'),
  markRead: (id) => api.post(`/notifications/${id}/mark_read/`),
  markAllRead: () => api.post('/notifications/mark_all_read/'),
  getPreferences: () => api.get('/notifications/preferences/'),
  updatePreferences: (data) => api.post('/notifications/preferences/', data),
}

export const portalService = {
  getRequests: (params) => api.get('/portal/requests/', { params }),
  createRequest: (data) => api.post('/portal/requests/', data),
  addComment: (id, data) => api.post(`/portal/requests/${id}/add_comment/`, data),
  resolveRequest: (id, notes) => api.post(`/portal/requests/${id}/resolve/`, { notes }),
  getFeedback: (params) => api.get('/portal/feedback/', { params }),
  submitFeedback: (data) => api.post('/portal/feedback/', data),
}

export const analyticsService = {
  getDashboard: () => api.get('/analytics/dashboard/'),
  getSnapshots: (params) => api.get('/analytics/snapshots/', { params }),
  getLatestSnapshot: () => api.get('/analytics/snapshots/latest/'),
  getTrends: (days = 30) => api.get('/analytics/snapshots/trends/', { params: { days } }),
  getZoneAnalytics: (params) => api.get('/analytics/zones/', { params }),
  getWasteTypeAnalytics: (params) => api.get('/analytics/waste-types/', { params }),
}

export const reportService = {
  getAll: (params) => api.get('/reports/', { params }),
  create: (data) => api.post('/reports/', data),
  regenerate: (id) => api.post(`/reports/${id}/regenerate/`),
  getSchedules: (params) => api.get('/reports/schedules/', { params }),
  createSchedule: (data) => api.post('/reports/schedules/', data),
}

export const recyclingService = {
  getCenters: (params) => api.get('/recycling/centers/', { params }),
  getLogs: (params) => api.get('/recycling/logs/', { params }),
  getLogsSummary: () => api.get('/recycling/logs/summary/'),
  getGoals: (params) => api.get('/recycling/goals/', { params }),
  getInsights: () => api.get('/recycling/insights/active/'),
}

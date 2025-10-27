// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth if needed
api.interceptors.request.use((config) => {
  // Add Bearer token if available
  return config;
});

// Response interceptor for errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 413) {
      // Handle file too large
      console.error('File too large');
    }
    return Promise.reject(error);
  }
);

export const apiEndpoints = {
  // Status
  getStatus: () => api.get('/status'),
  getMetrics: () => api.get('/status/metrics'),
  getFilesLastDays: (days) => api.get(`/status/metrics/files/last_days/${days}`),
  getFilesByDate: (date) => api.get(`/status/metrics/files/date/${date}`),
  getFilesByStatus: (status) => api.get(`/status/metrics/files/status/${status}`),
  searchFiles: (pattern) => api.get(`/status/metrics/files/search?filename=${pattern}`),
  getFileInfo: (filename) => api.get(`/status/metrics/files/info?filename=${filename}`),
  getTimeline: (date) => api.get(`/status/metrics/timeline?date=${date}`),

  // Config
  getConfig: () => api.get('/config'),
  updateConfig: (updates) => api.put('/config', updates),

  // Control
  pauseApp: () => api.post('/control/pause'),
  resumeApp: () => api.post('/control/resume'),
  stopApp: () => api.post('/control/stop'),

  // Upload
  uploadFile: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

export default api;
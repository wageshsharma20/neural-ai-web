/**
 * api.js — Central Axios instance for all backend calls
 *
 * - All requests automatically include credentials (HTTP-only cookies for JWT)
 * - Responses are unwrapped to return `data` directly
 * - 401 responses redirect to /login (session expired)
 */

import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,          // send HTTP-only JWT cookie automatically
  timeout: 15000,                 // 15 s timeout
  headers: { 'Content-Type': 'application/json' },
});
// ─── Request interceptor ────────────────────────────────────────────────────
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ─── Response interceptor ─────────────────────────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Session expired — redirect to login
    if (error.response?.status === 401) {
      const isAuthRoute = window.location.pathname === '/login';
      if (!isAuthRoute) window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  verifyOtp: (data) => api.post('/auth/verify-otp', data),
  logout: () => api.post('/auth/logout'),
  me: () => api.get('/auth/me'),
  changePassword: (data) => api.patch('/auth/change-password', data),
};

// ─── Notices ──────────────────────────────────────────────────────────────────
export const noticesAPI = {
  getPublic: (params) => api.get('/notices/public', { params }),
  getFeatured: () => api.get('/notices/featured'),
  getById: (id) => api.get(`/notices/public/${id}`),

  // Admin
  getAll: (params) => api.get('/notices', { params }),
  create: (data) => api.post('/notices', data),
  update: (id, data) => api.patch(`/notices/${id}`, data),
  remove: (id) => api.delete(`/notices/${id}`),
};

// ─── Events ───────────────────────────────────────────────────────────────────
export const eventsAPI = {
  getPublic: (params) => api.get('/events/public', { params }),
  getUpcoming: (limit) => api.get('/events/upcoming', { params: { limit } }),
  getById: (id) => api.get(`/events/public/${id}`),
  getCalendar: (params) => api.get('/events/calendar', { params }),

  // Admin
  getAll: (params) => api.get('/events', { params }),
  create: (data) => api.post('/events', data),
  update: (id, data) => api.patch(`/events/${id}`, data),
  remove: (id) => api.delete(`/events/${id}`),
  assignVolunteers: (id, userIds) => api.patch(`/events/${id}/volunteers`, { userIds }),
};

// ─── Blogs ────────────────────────────────────────────────────────────────────
export const blogsAPI = {
  getPublic: (params) => api.get('/blogs/public', { params }),
  getFeatured: () => api.get('/blogs/featured'),
  getBySlug: (slug) => api.get(`/blogs/public/${slug}`),
  like: (id) => api.post(`/blogs/${id}/like`),

  // Resources
  getResources: (params) => api.get('/blogs/resources/public', { params }),

  // Admin
  getAll: (params) => api.get('/blogs', { params }),
  getById: (id) => api.get(`/blogs/${id}`),
  create: (data) => api.post('/blogs', data),
  update: (id, data) => api.patch(`/blogs/${id}`, data),
  remove: (id) => api.delete(`/blogs/${id}`),

  // Review flow
  submit: (id) => api.post(`/blogs/${id}/submit`),
  review: (id, data) => api.post(`/blogs/${id}/review`, data),
};

// ─── Recruitment ──────────────────────────────────────────────────────────────
export const recruitmentAPI = {
  getPublicCycle: () => api.get('/recruitment/public'),
  apply: (data) => api.post('/recruitment/apply', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),

  // Admin
  getApplications: (params) => api.get('/recruitment/applications', { params }),
  getApplication: (id) => api.get(`/recruitment/applications/${id}`),
  updateStatus: (id, data) => api.patch(`/recruitment/applications/${id}/status`, data),
  bulkUpdateStatus: (data) => api.patch('/recruitment/applications/bulk-status', data),
  getStats: (params) => api.get('/recruitment/stats', { params }),
  getCycles: () => api.get('/recruitment/cycles'),
  createCycle: (data) => api.post('/recruitment/cycles', data),
  updateCycle: (id, data) => api.patch(`/recruitment/cycles/${id}`, data),
};

// ─── Contact ──────────────────────────────────────────────────────────────────
export const contactAPI = {
  submit: (data) => api.post('/contact', data),
  getAll: (params) => api.get('/contact', { params }),
  getById: (id) => api.get(`/contact/${id}`),
  updateStatus: (id, data) => api.patch(`/contact/${id}/status`, data),
  reply: (id, text) => api.post(`/contact/${id}/reply`, { replyText: text }),
  markSpam: (id) => api.patch(`/contact/${id}/spam`),
  remove: (id) => api.delete(`/contact/${id}`),
};

// ─── Analytics ────────────────────────────────────────────────────────────────
export const analyticsAPI = {
  dashboard: () => api.get('/analytics/dashboard'),
  memberGrowth: () => api.get('/analytics/member-growth'),
  taskTrends: () => api.get('/analytics/task-trends'),
  blogEngagement: () => api.get('/analytics/blog-engagement'),
  events: () => api.get('/analytics/events'),
  members: () => api.get('/analytics/members'),
  health: () => api.get('/analytics/platform-health'),
};

// ─── Users ────────────────────────────────────────────────────────────────────
export const usersAPI = {
  getAll: (params) => api.get('/users', { params }),
  getById: (id) => api.get(`/users/${id}`),
  update: (id, data) => api.patch(`/users/${id}`, data),
  addMember: (data) => api.post('/users/addmember', data),
  remove: (id) => api.delete(`/users/${id}`),
  orgTree: () => api.get('/users/org-tree'),
};

// ─── Upload ───────────────────────────────────────────────────────────────────
export const uploadAPI = {
  avatar: (formData) => api.post('/upload/avatar', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  cover: (formData) => api.post('/upload/cover', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  gallery: (formData) => api.post('/upload/gallery', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  resume: (formData) => api.post('/upload/resume', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  remove: (publicId) => api.delete(`/upload/${encodeURIComponent(publicId)}`),
};

// ─── Gallery ────────────────────────────────────────────────────────────────
export const galleryAPI = {
  // Public (society website, no login required)
  getPublic:     (params) => api.get('/gallery/public', { params }),
  getPublicById: (id)     => api.get(`/gallery/public/${id}`),

  // Portal (authenticated)
  getAll:  (params) => api.get('/gallery', { params }),
  getById: (id)     => api.get(`/gallery/${id}`),
  create:  (data)   => api.post('/gallery', data),
  update:  (id, data) => api.patch(`/gallery/${id}`, data),
  remove:  (id)     => api.delete(`/gallery/${id}`),
};

// ─── Tasks & Projects ─────────────────────────────────────────────────────────
export const tasksAPI = {
  getAll: (params) => api.get('/tasks', { params }),
  create: (data) => api.post('/tasks', data),
  update: (id, data) => api.patch(`/tasks/${id}`, data),
  remove: (id) => api.delete(`/tasks/${id}`),
  addComment: (id, text) => api.post(`/tasks/${id}/comments`, { text }),

  // Workflow
  submit: (id, data) => api.post(`/tasks/${id}/submit`, data),
  unsubmit: (id) => api.post(`/tasks/${id}/unsubmit`),
  review: (id, data) => api.post(`/tasks/${id}/review`, data),
  uploadSolution: (id, formData) => api.post(`/tasks/${id}/solution`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getAssignments: () => api.get('/tasks/assignments'),
};

// ─── Notifications ────────────────────────────────────────────────────────────
export const notificationsAPI = {
  getAll: () => api.get('/notifications'),
  markRead: (id) => api.patch(`/notifications/${id}/read`),
  markAllRead: () => api.patch('/notifications/read-all'),
};

export const projectsAPI = {
  getPublic: (params) => api.get('/projects/public', { params }),
  getAll: (params) => api.get('/projects', { params }),
  getById: (id) => api.get(`/projects/${id}`),
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.patch(`/projects/${id}`, data),
  remove: (id) => api.delete(`/projects/${id}`),
};

export default api;

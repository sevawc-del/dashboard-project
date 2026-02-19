import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const login = (data) => api.post('/auth/login', data);

// Child Marriage Cases
export const getChildMarriageCases = () => api.get('/child-marriage-cases');
export const getChildMarriageCaseById = (id) => api.get(`/child-marriage-cases/${id}`);
export const createChildMarriageCase = (data) => api.post('/child-marriage-cases', data);
export const updateChildMarriageCase = (id, data) => api.put(`/child-marriage-cases/${id}`, data);
export const deleteChildMarriageCase = (id) => api.delete(`/child-marriage-cases/${id}`);

// Seed Distribution
export const getSeedDistributions = () => api.get('/seed-distributions');
export const getSeedDistributionById = (id) => api.get(`/seed-distributions/${id}`);
export const createSeedDistribution = (data) => api.post('/seed-distributions', data);
export const updateSeedDistribution = (id, data) => api.put(`/seed-distributions/${id}`, data);
export const deleteSeedDistribution = (id) => api.delete(`/seed-distributions/${id}`);

// Users
export const getUsers = () => api.get('/users');
export const createUser = (data) => api.post('/users', data);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/users/${id}`);

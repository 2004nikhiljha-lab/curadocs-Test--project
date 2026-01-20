import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

export const doctorAPI = {
  getDashboard: () => api.get('/doctor/dashboard'),
  getPatients: () => api.get('/doctor/patients'),
  getAppointments: () => api.get('/doctor/appointments'),
  updateProfile: (data) => api.put('/doctor/profile', data),
};

export const patientAPI = {
  getDashboard: () => api.get('/patient/dashboard'),
  getMedicalHistory: () => api.get('/patient/medical-history'),
  getAppointments: () => api.get('/patient/appointments'),
  getHealthStats: () => api.get('/patient/health-stats'),
  updateProfile: (data) => api.put('/patient/profile', data),
};

export default api;
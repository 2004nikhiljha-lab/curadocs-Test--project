import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
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

// Auth API
export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

// Doctor API
export const doctorAPI = {
  getDashboard: () => api.get('/doctor/dashboard'),
  getPatients: () => api.get('/doctor/patients'),
  getAppointments: () => api.get('/doctor/appointments'),
  updateProfile: (data) => api.put('/doctor/profile', data),
  // Get all registered doctors (for patient booking)
  getAllDoctors: (filters) => api.get('/doctor/list', { params: filters }),
  getDoctorById: (id) => api.get(`/doctor/${id}`),
};

// Patient API
export const patientAPI = {
  getDashboard: () => api.get('/patient/dashboard'),
  getMedicalHistory: () => api.get('/patient/medical-history'),
  getAppointments: () => api.get('/patient/appointments'),
  getHealthStats: () => api.get('/patient/health-stats'),
  updateProfile: (data) => api.put('/patient/profile', data),
  // Book appointment with a doctor
  bookAppointment: (appointmentData) => api.post('/patient/appointments', appointmentData),
  cancelAppointment: (appointmentId) => api.delete(`/patient/appointments/${appointmentId}`),
};

// Health Bot API
export const healthBotAPI = {
  sendMessage: (message) => api.post('/healthbot/message', { message }),
  getChatHistory: (limit = 50) => api.get(`/healthbot/history?limit=${limit}`),
  clearChatHistory: () => api.delete('/healthbot/history'),
  getChatStats: () => api.get('/healthbot/stats'),
};

export default api;
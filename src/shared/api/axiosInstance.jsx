import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api-farmacia-production.up.railway.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores globalmente (opcional)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
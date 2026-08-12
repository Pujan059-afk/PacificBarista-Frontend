import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const isAdminArea = window.location.pathname.startsWith('/admin-pacific');
      const isOnLoginPage =
        window.location.pathname === '/admin-pacific' ||
        window.location.pathname === '/admin-pacific/login';
      if (isAdminArea && !isOnLoginPage) {
        window.location.href = '/admin-pacific';
      }
    }
    const message =
      error.response?.data?.message || error.message || 'Something went wrong';
    return Promise.reject({ ...error, message });
  }
);

export default api;

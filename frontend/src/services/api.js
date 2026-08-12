import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true, // sends httpOnly cookie automatically
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Only redirect to admin login if the user is already inside the admin area
      // Public pages should silently ignore 401 (e.g. /api/auth/me check on load)
      const isAdminArea = window.location.pathname.startsWith('/admin-pacific');
      const isAlreadyOnLogin = window.location.pathname === '/admin-pacific' || window.location.pathname === '/admin-pacific/login';
      if (isAdminArea && !isAlreadyOnLogin) {
        window.location.href = '/admin-pacific';
      }
    }
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    return Promise.reject({ ...error, message });
  }
);

export default api;

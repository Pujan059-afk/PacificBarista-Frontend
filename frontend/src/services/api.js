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
      // On any 401, the cookie is invalid/expired — redirect to login
      // unless we're already on the login page to avoid redirect loops
      if (!window.location.pathname.includes('/admin-pacific/login')) {
        window.location.href = '/admin-pacific/login';
      }
    }
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    return Promise.reject({ ...error, message });
  }
);

export default api;

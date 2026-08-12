import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [superAdmin, setSuperAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // On mount, check if the httpOnly cookie session is still valid
  useEffect(() => {
    api
      .get('/auth/me')
      .then((res) => {
        const userData = res.data.user || res.data;
        setUser(userData);
        setIsAuthenticated(true);
        setAdmin(userData.role === 'admin' || userData.role === 'superadmin');
        setSuperAdmin(userData.role === 'superadmin');
      })
      .catch(() => {
        // No valid session — stay logged out, don't redirect here
        // (api.js interceptor handles 401 redirect on protected page requests)
      })
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email, otp) => {
    const res = await api.post('/auth/verify-otp', { email, otp });
    const userData = res.data.user || res.data;
    setUser(userData);
    setIsAuthenticated(true);
    setAdmin(userData.role === 'admin' || userData.role === 'superadmin');
    setSuperAdmin(userData.role === 'superadmin');
    return userData;
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // ignore errors — still clear local state
    }
    setUser(null);
    setIsAuthenticated(false);
    setAdmin(false);
    setSuperAdmin(false);
  }, []);

  const value = { user, isAuthenticated, admin, superAdmin, loading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

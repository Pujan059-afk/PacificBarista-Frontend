import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';

const AdminLogin = () => {
  const { login, isAuthenticated, admin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const userData = await login(email, password);
      if (userData.role !== 'admin') {
        setError('You do not have admin access');
        return;
      }
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isAuthenticated && admin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <>
      <Helmet><title>Admin Login - Pacific Barista</title></Helmet>
      <div className="min-h-screen bg-primary flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-cream rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="font-heading text-3xl font-bold text-primary">Pacific Barista</h1>
              <p className="font-body text-text/60 mt-2">Admin Dashboard</p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg font-body text-sm mb-6"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-primary font-body font-medium text-sm mb-1.5">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@pacificbarista.com"
                  className="w-full px-4 py-3 bg-white border-2 border-primary/10 rounded-lg text-text font-body text-sm outline-none transition-all duration-300 focus:border-accent focus:shadow-[0_0_0_3px_rgba(200,155,60,0.1)] placeholder:text-text/30"
                />
              </div>
              <div>
                <label className="block text-primary font-body font-medium text-sm mb-1.5">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-white border-2 border-primary/10 rounded-lg text-text font-body text-sm outline-none transition-all duration-300 focus:border-accent focus:shadow-[0_0_0_3px_rgba(200,155,60,0.1)] placeholder:text-text/30"
                />
              </div>
              <Button type="submit" loading={loading} className="w-full justify-center" size="lg">
                Sign In
              </Button>
            </form>
          </div>
          <p className="text-center text-cream/50 font-body text-sm mt-6">
            Pacific Barista Training Academy &copy; {new Date().getFullYear()}
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default AdminLogin;

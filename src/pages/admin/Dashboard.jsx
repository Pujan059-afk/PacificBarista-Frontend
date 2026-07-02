import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import api from '../../services/api';
import PageTransition from '../../components/common/PageTransition';
import { FiBook, FiUsers, FiMessageSquare, FiDollarSign, FiEye, FiPlus } from 'react-icons/fi';

const StatCard = ({ icon: Icon, label, value, color, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="bg-white rounded-xl p-6 shadow-sm border border-primary/5"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="font-body text-sm text-text/60">{label}</p>
        <p className="font-heading text-3xl font-bold text-primary mt-1 tabular-nums">
          {value}
        </p>
      </div>
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    courses: 0,
    enrollments: 0,
    blogs: 0,
    contacts: 0,
  });
  const [recentEnrollments, setRecentEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, enrollmentsRes, blogsRes, contactsRes] = await Promise.all([
          api.get('/courses'),
          api.get('/enrollments?limit=5'),
          api.get('/blogs'),
          api.get('/contacts'),
        ]);
        setStats({
          courses: coursesRes.data?.courses?.length || coursesRes.data?.length || 0,
          enrollments: enrollmentsRes.data?.total || enrollmentsRes.data?.enrollments?.length || 0,
          blogs: blogsRes.data?.blogs?.length || blogsRes.data?.length || 0,
          contacts: contactsRes.data?.contacts?.length || contactsRes.data?.length || 0,
        });
        setRecentEnrollments(enrollmentsRes.data?.enrollments?.slice(0, 5) || enrollmentsRes.data?.slice(0, 5) || []);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-700',
      approved: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700',
    };
    return `px-2.5 py-1 rounded-full text-xs font-medium font-body ${styles[status] || 'bg-gray-100 text-gray-700'}`;
  };

  return (
    <PageTransition>
      <Helmet><title>Dashboard - Pacific Barista Admin</title></Helmet>

      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-primary">Dashboard</h1>
        <p className="font-body text-text/60 text-sm mt-1">Overview of your academy</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        <StatCard icon={FiBook} label="Total Courses" value={stats.courses} color="bg-blue-500" delay={0} />
        <StatCard icon={FiDollarSign} label="Enrollments" value={stats.enrollments} color="bg-green-500" delay={0.1} />
        <StatCard icon={FiMessageSquare} label="Blog Posts" value={stats.blogs} color="bg-purple-500" delay={0.2} />
        <StatCard icon={FiUsers} label="Contacts" value={stats.contacts} color="bg-orange-500" delay={0.3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-primary/5 p-6">
          <h2 className="font-heading text-lg font-bold text-primary mb-4">Recent Enrollments</h2>
          {recentEnrollments.length === 0 ? (
            <p className="font-body text-text/40 text-sm">No enrollments yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-primary/5">
                    <th className="font-body text-xs text-text/50 uppercase tracking-wider pb-3 pr-4">Student</th>
                    <th className="font-body text-xs text-text/50 uppercase tracking-wider pb-3 pr-4">Course</th>
                    <th className="font-body text-xs text-text/50 uppercase tracking-wider pb-3 pr-4">Status</th>
                    <th className="font-body text-xs text-text/50 uppercase tracking-wider pb-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentEnrollments.map((enr, i) => (
                    <tr key={enr._id || i} className="border-b border-primary/5 last:border-0">
                      <td className="py-3 pr-4 font-body text-sm text-text">{enr.name || enr.studentName || 'N/A'}</td>
                      <td className="py-3 pr-4 font-body text-sm text-text/70">{enr.courseName || enr.course?.title || 'N/A'}</td>
                      <td className="py-3 pr-4">
                        <span className={getStatusBadge(enr.status)}>{enr.status || 'pending'}</span>
                      </td>
                      <td className="py-3 font-body text-sm text-text/50">
                        {enr.createdAt ? new Date(enr.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-primary/5 p-6">
          <h2 className="font-heading text-lg font-bold text-primary mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              to="/admin/courses/add"
              className="flex items-center gap-3 p-4 rounded-lg border border-primary/10 hover:border-accent/30 hover:bg-accent/5 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <FiPlus className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-body text-sm font-medium text-primary">Add Course</p>
                <p className="font-body text-xs text-text/40">Create a new course</p>
              </div>
            </Link>
            <Link
              to="/admin/blogs/add"
              className="flex items-center gap-3 p-4 rounded-lg border border-primary/10 hover:border-accent/30 hover:bg-accent/5 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                <FiPlus className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="font-body text-sm font-medium text-primary">Add Blog</p>
                <p className="font-body text-xs text-text/40">Write a new post</p>
              </div>
            </Link>
            <Link
              to="/admin/enrollments"
              className="flex items-center gap-3 p-4 rounded-lg border border-primary/10 hover:border-accent/30 hover:bg-accent/5 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                <FiEye className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="font-body text-sm font-medium text-primary">View Enrollments</p>
                <p className="font-body text-xs text-text/40">Manage student enrollments</p>
              </div>
            </Link>
            <Link
              to="/admin/gallery"
              className="flex items-center gap-3 p-4 rounded-lg border border-primary/10 hover:border-accent/30 hover:bg-accent/5 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                <FiPlus className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="font-body text-sm font-medium text-primary">Upload Gallery</p>
                <p className="font-body text-xs text-text/40">Add new images</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Dashboard;

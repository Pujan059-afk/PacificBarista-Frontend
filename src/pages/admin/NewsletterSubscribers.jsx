import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import api from '../../services/api';
import { useApp } from '../../contexts/AppContext';
import PageTransition from '../../components/common/PageTransition';
import Button from '../../components/ui/Button';
import { FiAward, FiTrash2, FiSearch, FiDownload } from 'react-icons/fi';

const NewsletterSubscribers = () => {
  const { showToast } = useApp();
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const res = await api.get('/newsletter/subscribers');
      setSubscribers(res.data?.subscribers || res.data || []);
    } catch (err) {
      showToast('Failed to load subscribers', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await api.delete(`/newsletter/subscribers/${deleteId}`);
      setSubscribers((prev) => prev.filter((s) => s._id !== deleteId));
      showToast('Subscriber removed', 'success');
    } catch (err) {
      showToast(err.message || 'Failed to remove', 'error');
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  const handleExport = () => {
    const csv = ['Email,Subscribed Date'];
    subscribers.forEach((s) => {
      csv.push(`${s.email},${s.createdAt ? new Date(s.createdAt).toLocaleDateString() : 'N/A'}`);
    });
    const blob = new Blob([csv.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'newsletter-subscribers.csv';
    a.click();
    URL.revokeObjectURL(url);
    showToast('CSV exported successfully', 'success');
  };

  const filtered = subscribers.filter(
    (s) => s.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageTransition>
      <Helmet><title>Newsletter Subscribers - Pacific Barista Admin</title></Helmet>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-primary">Newsletter Subscribers</h1>
          <p className="font-body text-text/60 text-sm mt-1">
            {subscribers.length} subscriber{subscribers.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          icon={FiDownload}
          onClick={handleExport}
          disabled={subscribers.length === 0}
        >
          Export CSV
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-primary/5 p-4 sm:p-6">
        <div className="relative mb-4 max-w-md">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text/30" />
          <input
            type="text"
            placeholder="Search by email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-cream border border-primary/10 rounded-lg text-text font-body text-sm outline-none focus:border-accent"
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12">
            <FiAward className="w-12 h-12 mx-auto text-text/20 mb-3" />
            <p className="font-body text-text/40">
              {search ? 'No matching subscribers' : 'No subscribers yet'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-primary/5">
                  <th className="font-body text-xs text-text/50 uppercase tracking-wider pb-3 pr-4">#</th>
                  <th className="font-body text-xs text-text/50 uppercase tracking-wider pb-3 pr-4">Email</th>
                  <th className="font-body text-xs text-text/50 uppercase tracking-wider pb-3 pr-4 hidden sm:table-cell">Subscribed</th>
                  <th className="font-body text-xs text-text/50 uppercase tracking-wider pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((sub, i) => (
                  <motion.tr
                    key={sub._id || i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.02 }}
                    className="border-b border-primary/5 last:border-0 hover:bg-cream/50 transition-colors"
                  >
                    <td className="py-3 pr-4 font-body text-sm text-text/40">{i + 1}</td>
                    <td className="py-3 pr-4 font-body text-sm text-text font-medium">{sub.email}</td>
                    <td className="py-3 pr-4 hidden sm:table-cell font-body text-sm text-text/50">
                      {sub.createdAt ? new Date(sub.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="py-3">
                      <button
                        onClick={() => setDeleteId(sub._id)}
                        className="p-2 rounded-lg hover:bg-red-50 text-text/40 hover:text-red-500 transition-colors"
                        title="Remove"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setDeleteId(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl"
            >
              <h3 className="font-heading text-lg font-bold text-primary mb-2">Remove Subscriber</h3>
              <p className="font-body text-sm text-text/60 mb-6">
                Are you sure you want to remove this subscriber?
              </p>
              <div className="flex gap-3 justify-end">
                <button onClick={() => setDeleteId(null)} className="px-4 py-2 rounded-lg font-body text-sm text-text/60 hover:bg-primary/5">Cancel</button>
                <Button variant="secondary" size="sm" loading={deleting} onClick={handleDelete}>Remove</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};

export default NewsletterSubscribers;

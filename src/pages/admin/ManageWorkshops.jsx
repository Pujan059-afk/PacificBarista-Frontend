import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import api from '../../services/api';
import { useApp } from '../../contexts/AppContext';
import PageTransition from '../../components/common/PageTransition';
import Button from '../../components/ui/Button';
import { FiPlus, FiEdit2, FiTrash2, FiCalendar, FiX, FiUpload } from 'react-icons/fi';

const emptyForm = {
  title: '',
  description: '',
  date: '',
  time: '',
  duration: '',
  price: '',
  capacity: '',
  location: '',
  instructor: '',
  isActive: true,
};

const ManageWorkshops = () => {
  const { showToast } = useApp();
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchWorkshops();
  }, []);

  const fetchWorkshops = async () => {
    try {
      const res = await api.get('/workshops');
      setWorkshops(res.data?.workshops || res.data || []);
    } catch (err) {
      showToast('Failed to load workshops', 'error');
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setEditId(null);
    setForm(emptyForm);
    setImage(null);
    setImagePreview('');
    setModalOpen(true);
  };

  const openEdit = async (id) => {
    try {
      const res = await api.get(`/workshops/${id}`);
      const w = res.data?.workshop || res.data;
      setEditId(id);
      setForm({
        title: w.title || '',
        description: w.description || '',
        date: w.date ? new Date(w.date).toISOString().split('T')[0] : '',
        time: w.time || '',
        duration: w.duration || '',
        price: w.price?.toString() || '',
        capacity: w.capacity?.toString() || '',
        location: w.location || '',
        instructor: w.instructor || '',
        isActive: w.isActive ?? true,
      });
      if (w.image) setImagePreview(w.image);
      setImage(null);
      setModalOpen(true);
    } catch (err) {
      showToast('Failed to load workshop', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.date) {
      showToast('Title and date are required', 'error');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...form,
        price: parseFloat(form.price) || 0,
        capacity: parseInt(form.capacity) || 0,
      };
      const formData = new FormData();
      Object.keys(payload).forEach((key) => formData.append(key, payload[key]));
      if (image) formData.append('image', image);

      if (editId) {
        await api.put(`/workshops/${editId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        showToast('Workshop updated', 'success');
      } else {
        await api.post('/workshops', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        showToast('Workshop created', 'success');
      }
      setModalOpen(false);
      fetchWorkshops();
    } catch (err) {
      showToast(err.message || 'Failed to save workshop', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await api.delete(`/workshops/${deleteId}`);
      setWorkshops((prev) => prev.filter((w) => w._id !== deleteId));
      showToast('Workshop deleted', 'success');
    } catch (err) {
      showToast(err.message || 'Failed to delete', 'error');
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  return (
    <PageTransition>
      <Helmet><title>Manage Workshops - Pacific Barista Admin</title></Helmet>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-primary">Workshops</h1>
          <p className="font-body text-text/60 text-sm mt-1">Manage workshops & events</p>
        </div>
        <Button icon={FiPlus} size="sm" onClick={openAdd}>Add Workshop</Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      ) : workshops.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-primary/5">
          <FiCalendar className="w-12 h-12 mx-auto text-text/20 mb-3" />
          <p className="font-body text-text/40">No workshops yet</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-primary/5">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-primary/5">
                <th className="font-body text-xs text-text/50 uppercase tracking-wider pb-3 pr-4 p-4">Title</th>
                <th className="font-body text-xs text-text/50 uppercase tracking-wider pb-3 pr-4 hidden md:table-cell">Date</th>
                <th className="font-body text-xs text-text/50 uppercase tracking-wider pb-3 pr-4 hidden md:table-cell">Price</th>
                <th className="font-body text-xs text-text/50 uppercase tracking-wider pb-3 pr-4 hidden sm:table-cell">Active</th>
                <th className="font-body text-xs text-text/50 uppercase tracking-wider pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {workshops.map((w, i) => (
                <motion.tr
                  key={w._id || i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-primary/5 last:border-0 hover:bg-cream/50 transition-colors"
                >
                  <td className="py-3 pr-4 p-4 font-body text-sm text-text font-medium">{w.title}</td>
                  <td className="py-3 pr-4 hidden md:table-cell font-body text-sm text-text/70">
                    {w.date ? new Date(w.date).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="py-3 pr-4 hidden md:table-cell font-body text-sm text-text">
                    {w.price ? `$${w.price}` : 'Free'}
                  </td>
                  <td className="py-3 pr-4 hidden sm:table-cell">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium font-body ${w.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                      {w.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(w._id)} className="p-2 rounded-lg hover:bg-accent/10 text-text/40 hover:text-accent transition-colors" title="Edit">
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => setDeleteId(w._id)} className="p-2 rounded-lg hover:bg-red-50 text-text/40 hover:text-red-500 transition-colors" title="Delete">
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-primary/5">
                <h2 className="font-heading text-lg font-bold text-primary">
                  {editId ? 'Edit Workshop' : 'Add Workshop'}
                </h2>
                <button onClick={() => setModalOpen(false)} className="p-1 rounded-lg hover:bg-primary/5 text-text/40 hover:text-text transition-colors">
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-primary font-body font-medium text-sm mb-1.5">Title</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-white border-2 border-primary/10 rounded-lg text-text font-body text-sm outline-none focus:border-accent"
                    placeholder="Workshop title"
                  />
                </div>
                <div>
                  <label className="block text-primary font-body font-medium text-sm mb-1.5">Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-white border-2 border-primary/10 rounded-lg text-text font-body text-sm outline-none focus:border-accent min-h-[80px] resize-y"
                    placeholder="Workshop description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-primary font-body font-medium text-sm mb-1.5">Date</label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-white border-2 border-primary/10 rounded-lg text-text font-body text-sm outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-primary font-body font-medium text-sm mb-1.5">Time</label>
                    <input
                      type="text"
                      value={form.time}
                      onChange={(e) => setForm((p) => ({ ...p, time: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-white border-2 border-primary/10 rounded-lg text-text font-body text-sm outline-none focus:border-accent"
                      placeholder="e.g. 10:00 AM - 4:00 PM"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-primary font-body font-medium text-sm mb-1.5">Duration</label>
                    <input
                      type="text"
                      value={form.duration}
                      onChange={(e) => setForm((p) => ({ ...p, duration: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-white border-2 border-primary/10 rounded-lg text-text font-body text-sm outline-none focus:border-accent"
                      placeholder="e.g. 6 hours"
                    />
                  </div>
                  <div>
                    <label className="block text-primary font-body font-medium text-sm mb-1.5">Price ($)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.price}
                      onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-white border-2 border-primary/10 rounded-lg text-text font-body text-sm outline-none focus:border-accent"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-primary font-body font-medium text-sm mb-1.5">Capacity</label>
                    <input
                      type="number"
                      min="0"
                      value={form.capacity}
                      onChange={(e) => setForm((p) => ({ ...p, capacity: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-white border-2 border-primary/10 rounded-lg text-text font-body text-sm outline-none focus:border-accent"
                      placeholder="e.g. 20"
                    />
                  </div>
                  <div>
                    <label className="block text-primary font-body font-medium text-sm mb-1.5">Instructor</label>
                    <input
                      type="text"
                      value={form.instructor}
                      onChange={(e) => setForm((p) => ({ ...p, instructor: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-white border-2 border-primary/10 rounded-lg text-text font-body text-sm outline-none focus:border-accent"
                      placeholder="Instructor name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-primary font-body font-medium text-sm mb-1.5">Location</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-white border-2 border-primary/10 rounded-lg text-text font-body text-sm outline-none focus:border-accent"
                    placeholder="e.g. Pacific Barista Academy"
                  />
                </div>
                <div>
                  <label className="block text-primary font-body font-medium text-sm mb-1.5">Image</label>
                  <div className="flex items-center gap-3">
                    <div className="w-20 h-14 rounded-lg border-2 border-dashed border-primary/10 overflow-hidden flex items-center justify-center bg-cream shrink-0">
                      {imagePreview ? (
                        <img src={imagePreview} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <FiUpload className="w-5 h-5 text-text/20" />
                      )}
                    </div>
                    <label className="px-4 py-2 bg-cream border border-primary/10 rounded-lg cursor-pointer hover:border-accent/30 transition-colors font-body text-sm text-text">
                      Choose File
                      <input type="file" accept="image/*" onChange={(e) => {
                        const f = e.target.files[0];
                        if (f) { setImage(f); setImagePreview(URL.createObjectURL(f)); }
                      }} className="hidden" />
                    </label>
                  </div>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={(e) => setForm((p) => ({ ...p, isActive: e.target.checked }))}
                    className="w-4 h-4 rounded border-primary/20 text-accent focus:ring-accent"
                  />
                  <span className="font-body text-sm text-text">Active</span>
                </label>
                <div className="flex gap-3 justify-end pt-2">
                  <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-lg font-body text-sm text-text/60 hover:bg-primary/5">Cancel</button>
                  <Button type="submit" size="sm" loading={saving}>
                    {editId ? 'Update' : 'Save'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
              <h3 className="font-heading text-lg font-bold text-primary mb-2">Delete Workshop</h3>
              <p className="font-body text-sm text-text/60 mb-6">Are you sure? This cannot be undone.</p>
              <div className="flex gap-3 justify-end">
                <button onClick={() => setDeleteId(null)} className="px-4 py-2 rounded-lg font-body text-sm text-text/60 hover:bg-primary/5">Cancel</button>
                <Button variant="secondary" size="sm" loading={deleting} onClick={handleDelete}>Delete</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};

export default ManageWorkshops;

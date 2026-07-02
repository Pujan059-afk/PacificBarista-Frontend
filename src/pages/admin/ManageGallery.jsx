import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import api from '../../services/api';
import { useApp } from '../../contexts/AppContext';
import PageTransition from '../../components/common/PageTransition';
import Button from '../../components/ui/Button';
import { FiPlus, FiTrash2, FiImage, FiUpload, FiX } from 'react-icons/fi';

const ManageGallery = () => {
  const { showToast } = useApp();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [uploading, setUploading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [showCategoryInput, setShowCategoryInput] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await api.get('/gallery');
      setImages(res.data?.images || res.data || []);
    } catch (err) {
      showToast('Failed to load gallery', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      if (category) formData.append('category', category);
      await api.post('/gallery', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      showToast('Image uploaded', 'success');
      fetchImages();
    } catch (err) {
      showToast(err.message || 'Failed to upload', 'error');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await api.delete(`/gallery/${deleteId}`);
      setImages((prev) => prev.filter((img) => img._id !== deleteId));
      showToast('Image deleted', 'success');
    } catch (err) {
      showToast(err.message || 'Failed to delete', 'error');
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  const categories = [...new Set(images.map((img) => img.category).filter(Boolean))];
  const filtered = activeCategory ? images.filter((img) => img.category === activeCategory) : images;

  return (
    <PageTransition>
      <Helmet><title>Manage Gallery - Pacific Barista Admin</title></Helmet>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-primary">Gallery</h1>
          <p className="font-body text-text/60 text-sm mt-1">Manage gallery images</p>
        </div>
        <div className="flex items-center gap-3">
          {showCategoryInput ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category name"
                className="w-40 px-3 py-2 bg-white border border-primary/10 rounded-lg text-text font-body text-sm outline-none focus:border-accent"
              />
              <button onClick={() => { setShowCategoryInput(false); setCategory(''); }} className="p-2 rounded-lg hover:bg-primary/5 text-text/40">
                <FiX className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowCategoryInput(true)}
              className="px-3 py-2 rounded-lg font-body text-sm text-text/60 hover:bg-primary/5 transition-colors border border-primary/10"
            >
              + Category
            </button>
          )}
          <label className={`inline-flex items-center gap-2 px-4 py-2.5 bg-accent text-white rounded-lg cursor-pointer hover:bg-accent/90 transition-colors font-body text-sm font-medium ${uploading ? 'opacity-60' : ''}`}>
            {uploading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <FiUpload className="w-4 h-4" />
            )}
            Upload
            <input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} className="hidden" />
          </label>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <button
          onClick={() => setActiveCategory('')}
          className={`px-3 py-1.5 rounded-full font-body text-xs font-medium transition-colors ${!activeCategory ? 'bg-accent text-white' : 'bg-primary/5 text-text/60 hover:bg-primary/10'}`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full font-body text-xs font-medium transition-colors ${activeCategory === cat ? 'bg-accent text-white' : 'bg-primary/5 text-text/60 hover:bg-primary/10'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-primary/5">
          <FiImage className="w-12 h-12 mx-auto text-text/20 mb-3" />
          <p className="font-body text-text/40">No images yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filtered.map((img, i) => (
            <motion.div
              key={img._id || i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              className="relative group rounded-xl overflow-hidden bg-white shadow-sm border border-primary/5 aspect-square"
            >
              <img
                src={img.image || img.url}
                alt={img.category || ''}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <button
                  onClick={() => setDeleteId(img._id)}
                  className="p-2.5 rounded-full bg-white/90 text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500 hover:text-white"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
              {img.category && (
                <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/50 text-white text-xs rounded font-body">
                  {img.category}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      )}

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
              <h3 className="font-heading text-lg font-bold text-primary mb-2">Delete Image</h3>
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

export default ManageGallery;

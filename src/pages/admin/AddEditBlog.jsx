import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import api from '../../services/api';
import { useApp } from '../../contexts/AppContext';
import PageTransition from '../../components/common/PageTransition';
import Button from '../../components/ui/Button';
import { FiChevronLeft, FiUpload } from 'react-icons/fi';
import { slugify } from '../../utils/helpers';

const AddEditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useApp();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    category: '',
    tags: '',
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEdit) {
      const fetchBlog = async () => {
        try {
          const res = await api.get(`/blogs/${id}`);
          const blog = res.data?.blog || res.data;
          setForm({
            title: blog.title || '',
            slug: blog.slug || '',
            content: blog.content || '',
            excerpt: blog.excerpt || '',
            category: blog.category || '',
            tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : (blog.tags || ''),
          });
          if (blog.image) setImagePreview(blog.image);
        } catch (err) {
          showToast('Failed to load blog', 'error');
          navigate('/admin/blogs');
        } finally {
          setFetching(false);
        }
      };
      fetchBlog();
    }
  }, [id]);

  const handleChange = (field, value) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === 'title' && !isEdit) {
        updated.slug = slugify(value);
      }
      return updated;
    });
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required';
    if (!form.content.trim()) errs.content = 'Content is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const payload = {
        ...form,
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      };

      const formData = new FormData();
      Object.keys(payload).forEach((key) => formData.append(key, payload[key]));
      if (image) formData.append('image', image);

      if (isEdit) {
        await api.put(`/blogs/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        showToast('Blog updated successfully', 'success');
      } else {
        await api.post('/blogs', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        showToast('Blog created successfully', 'success');
      }
      navigate('/admin/blogs');
    } catch (err) {
      showToast(err.message || 'Failed to save blog', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const inputClass = (field) =>
    `w-full px-4 py-2.5 bg-white border-2 rounded-lg text-text font-body text-sm outline-none transition-all duration-300 focus:border-accent focus:shadow-[0_0_0_3px_rgba(200,155,60,0.1)] placeholder:text-text/30 ${
      errors[field] ? 'border-red-300' : 'border-primary/10'
    }`;

  const labelClass = 'block text-primary font-body font-medium text-sm mb-1.5';

  return (
    <PageTransition>
      <Helmet>
        <title>{isEdit ? 'Edit Blog' : 'Add Blog'} - Pacific Barista Admin</title>
      </Helmet>

      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/admin/blogs')}
          className="p-2 rounded-lg hover:bg-primary/5 text-primary transition-colors"
        >
          <FiChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="font-heading text-2xl font-bold text-primary">
            {isEdit ? 'Edit Blog' : 'Add New Blog'}
          </h1>
          <p className="font-body text-text/60 text-sm mt-1">
            {isEdit ? 'Update blog post' : 'Create a new blog post'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-primary/5 p-6">
          <h2 className="font-heading text-lg font-bold text-primary mb-4">Blog Details</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className={inputClass('title')}
                placeholder="Blog post title"
              />
              {errors.title && <p className="text-red-500 text-xs mt-1 font-body">{errors.title}</p>}
            </div>
            <div>
              <label className={labelClass}>Slug</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => handleChange('slug', e.target.value)}
                className={inputClass('slug')}
                placeholder="blog-post-slug"
              />
            </div>
            <div>
              <label className={labelClass}>Category</label>
              <input
                type="text"
                value={form.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className={inputClass('category')}
                placeholder="e.g. Coffee Tips"
              />
            </div>
            <div>
              <label className={labelClass}>Tags (comma separated)</label>
              <input
                type="text"
                value={form.tags}
                onChange={(e) => handleChange('tags', e.target.value)}
                className={inputClass('tags')}
                placeholder="espresso, latte, tips"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className={labelClass}>Excerpt</label>
            <textarea
              value={form.excerpt}
              onChange={(e) => handleChange('excerpt', e.target.value)}
              className={`${inputClass('excerpt')} min-h-[80px] resize-y`}
              placeholder="Short summary of the blog post..."
            />
          </div>
          <div className="mt-4">
            <label className={labelClass}>Content</label>
            <textarea
              value={form.content}
              onChange={(e) => handleChange('content', e.target.value)}
              className={`${inputClass('content')} min-h-[300px] resize-y`}
              placeholder="Write your blog content here..."
            />
            {errors.content && <p className="text-red-500 text-xs mt-1 font-body">{errors.content}</p>}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-primary/5 p-6">
          <h2 className="font-heading text-lg font-bold text-primary mb-4">Featured Image</h2>
          <div className="flex items-start gap-4">
            <div className="w-32 h-24 rounded-lg border-2 border-dashed border-primary/10 overflow-hidden flex items-center justify-center bg-cream shrink-0">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <FiUpload className="w-6 h-6 text-text/20" />
              )}
            </div>
            <div>
              <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-cream border border-primary/10 rounded-lg cursor-pointer hover:border-accent/30 transition-colors font-body text-sm text-text">
                <FiUpload className="w-4 h-4" />
                Upload Image
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
              <p className="font-body text-xs text-text/30 mt-2">Recommended: 1200x630px, JPG or PNG</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 justify-end pb-8">
          <button
            type="button"
            onClick={() => navigate('/admin/blogs')}
            className="px-6 py-3 rounded-lg font-body text-sm text-text/60 hover:bg-primary/5 transition-colors"
          >
            Cancel
          </button>
          <Button type="submit" loading={loading} size="lg">
            {isEdit ? 'Update Blog' : 'Create Blog'}
          </Button>
        </div>
      </form>
    </PageTransition>
  );
};

export default AddEditBlog;
